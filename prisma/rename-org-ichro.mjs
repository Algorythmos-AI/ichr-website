// One-off, idempotent: rename the organisation in the database to "International Coalition of
// Human Rights Organizations (ICHRO)" — 20 October 2026, at the client's request.
//
// It touches ONLY the stories that cannot be re-seeded:
//   - the four June stories and procedural-bias / cargo-trucks, whose seeds are the record of
//     what was executed against production and are not to be edited or re-run;
//   - UPR-54, whose live text carries a "Read the full submission (PDF)" link its seed lacks,
//     so a re-seed would silently delete it.
// The other stories are renamed by re-running their (renamed) seeds.
//
// What it does: applies scripts/lib/org-name.mjs — the same rules as the site source and the
// seeds — to title, excerpt, body and authorName of every locale row, and to the captions of
// their gallery images, in ONE transaction. Nothing else in a row is touched. Running it twice
// changes nothing the second time.
//
//   DRY_RUN=1 node --env-file=.env.local prisma/rename-org-ichro.mjs   # report only
//             node --env-file=.env.local prisma/rename-org-ichro.mjs   # write
import { connect } from './lib/press-statement.mjs';
import { renameOrg } from '../scripts/lib/org-name.mjs';

const SLUGS = [
  'eu-delegation-geneva-sudan-june-2026',
  '62nd-session-palais-des-nations-june-2026',
  'un-fact-finding-mission-sudan-geneva-june-2026',
  'ffm-head-meets-ichr-representative-geneva-june-2026',
  'procedural-bias-selective-handling-sudan-july-2026',
  'condemnation-cargo-trucks-el-fasher-al-koma-july-2026',
  'upr-54th-session-procedural-bias-sudan-july-2026',
];
const FIELDS = ['title', 'excerpt', 'body', 'authorName'];
const OLD =
  /International Coalition for Human Rights|Coalition internationale pour les droits|التحالف الدولي لحقوق الإنسان|(?<![\w@#./-])ICHR(?![\w-])/;

const sql = connect();
const DRY = process.env.DRY_RUN === '1';

const posts =
  await sql`SELECT id, slug, locale, title, excerpt, body, "authorName" FROM "Post" WHERE slug = ANY(${SLUGS}) ORDER BY slug, locale`;
const images =
  await sql`SELECT g.id, g.caption, p.slug, p.locale FROM "GalleryImage" g JOIN "Post" p ON p.id = g."postId" WHERE p.slug = ANY(${SLUGS})`;
if (new Set(posts.map((p) => p.slug)).size !== SLUGS.length) {
  console.error(
    'ABORT: not every slug was found:',
    SLUGS.filter((s) => !posts.some((p) => p.slug === s)),
  );
  process.exit(1);
}

const batch = [];
for (const p of posts) {
  const next = Object.fromEntries(FIELDS.map((f) => [f, renameOrg(p[f])]));
  const changed = FIELDS.filter((f) => next[f] !== p[f]);
  console.log(`${changed.length ? 'UPDATE' : 'ok    '} ${p.slug} [${p.locale}] ${changed.join(', ')}`);
  if (changed.length)
    batch.push(
      sql`UPDATE "Post" SET title=${next.title}, excerpt=${next.excerpt}, body=${next.body}, "authorName"=${next.authorName}, "updatedAt"=now() WHERE id=${p.id}`,
    );
}
for (const g of images) {
  const next = renameOrg(g.caption);
  if (next !== g.caption) {
    console.log(`UPDATE caption ${g.slug} [${g.locale}]`);
    batch.push(sql`UPDATE "GalleryImage" SET caption=${next} WHERE id=${g.id}`);
  }
}

if (DRY) {
  console.log(`\nDRY_RUN=1 → no write. ${batch.length} statement(s) would run.`);
  process.exit(0);
}
if (batch.length) await sql.transaction(batch);

// Read back: nothing in these rows may still carry the old name.
const after =
  await sql`SELECT slug, locale, title, excerpt, body, "authorName" FROM "Post" WHERE slug = ANY(${SLUGS})`;
const capsAfter =
  await sql`SELECT g.caption FROM "GalleryImage" g JOIN "Post" p ON p.id = g."postId" WHERE p.slug = ANY(${SLUGS})`;
const left = after.filter((r) => FIELDS.some((f) => OLD.test(r[f] ?? '')));
const capsLeft = capsAfter.filter((g) => OLD.test(g.caption ?? ''));
if (left.length || capsLeft.length) {
  console.error(
    'READ-BACK FAILED, old name still present in:',
    left.map((r) => `${r.slug} [${r.locale}]`),
    capsLeft.length,
    'captions',
  );
  process.exit(1);
}
console.log(`\n✅ ${batch.length} statement(s) applied; read-back clean across ${after.length} rows.`);
