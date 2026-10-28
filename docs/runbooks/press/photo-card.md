# The client-style photo card

The square 1600×1600 cover the client designs for their own statements (Al-Zawiya Ghara,
August 2026), reproduced for statements that arrive as text only. Used first for the Dumaya
market statement (27 October 2026). Renderer: `scripts/lib/photo-card.mjs`; generator:
`scripts/gen-photo-card.mjs`.

Layout, top to bottom: a red-toned image band cut by a diagonal · the client's badge on the
cut · a navy label · the organisation (black, capitals in EN/FR) · the headline (red) ·
dateline and date · a short rule · the lead paragraph, justified · three red marks.

## When to use it

- The client supplied **no card**, and the statement is about a specific event or place.
- For a text-only statement with no place to show (a petition, a meeting), the typographic
  card (`gen-press-cover.mjs`, `COVERS`) still fits better.
- A statement uses **one** of the two. `gen-photo-card.mjs` refuses a seed that also exports
  `COVERS`, because both write `cover*.jpg`.

## The image band — what may go in it

- **A photo the client supplied, of this event**, and nothing else. The card is read as a
  picture of what happened; an unrelated or stock photo misrepresents it.
- Otherwise **the map**: Sudan with the place marked (`map: 'sudan'`). Disputed areas
  (Hala'ib, Bir Tawil) are hatched and belong to neither state, as on UN maps. Abyei is not
  in the source data, so it is not marked — mention that if the event is in Abyei.
- Ask the client which, in the editorial-gate question, before building.

## Config — exported by the seed

```js
export const PHOTO_CARD_BAND = { map: 'sudan', marker: { lon: 24.88, lat: 12.05 } };
// or: { photo: 'press/OCT/9/photo.jpg' }   (repo-relative; greyscaled and toned red)

export const PHOTO_CARDS = {
  en: {
    file: 'cover.jpg',
    label: 'STATEMENT',                 // 'JOINT STATEMENT', 'PRESS RELEASE' … as the client says
    org: 'The International Coalition of Human Rights Organizations',
    headline: 'Strongly condemns …',    // continues the org line as one sentence
    dateline: 'GENEVA',
    date: 'Date: 27 October 2026',
    lead: '…',                           // ~45 words; keep every hedge from the body
    mapLabels: { country: 'SUDAN', marker: 'NYALA', markerSub: 'DUMAYA MARKET',
                 neighbours: { EGY: 'EGYPT', TCD: 'CHAD', SDS: 'SOUTH SUDAN' /* … */ } },
  },
  ar: { file: 'cover-ar.jpg', rtl: true, /* same keys, Arabic */ },
  fr: { file: 'cover-fr.jpg', /* same keys, French */ },
};
```

Copy the Dumaya seed (`prisma/seed-statement-dumaya-market-nyala.mjs`) — it is the
worked example in all three languages. Marker coordinates: decimal degrees, from a gazetteer.

## Render, look, ship

```bash
FORCE=1 node scripts/gen-photo-card.mjs prisma/seed-statement-<name>.mjs
FORCE=1 node scripts/gen-image-variants.mjs <slug>
```

- Needs Google Chrome (macOS path, or `CHROME_BIN`). Fonts (Poppins, Cairo — OFL) and the
  badge are inlined; nothing is fetched.
- The page shrinks the lead (36→30px), then the headline (46→40), then the org line (40→34)
  until the text clears the footer marks, and prints the sizes and line counts. It aborts if
  the text still overflows: shorten the lead.
- **Open every JPEG.** Check: Arabic joins and the date's direction; no orphan word on a
  line; no map label crossing a border or hidden by the badge (positions: `NEIGHBOUR_AT`);
  the marker label beside the pin, not on it.
- The covers must be live in production before the article references them — as for any
  cover (publishing runbook §6–§9).

## Fixed decisions — don't "fix" them

- The badge (`scripts/assets/photo-card/badge.png`) is cut from the client's own Al-Zawiya
  card at its native size. It reads "ICHR": client artwork, not retouched (handbook, house
  style). `public/logo.png` is only 200px and would print soft.
- In RTL the marker label anchors `text-anchor="end"` at the pin's right: with
  `direction="rtl"`, "end" is the **left** edge of the text.
- `text-wrap: balance` on the org and headline is what stops "L'HOMME" sitting alone on a line.
- Map data: Natural Earth 1:50m countries + 1:10m disputed areas (public domain), cut to the
  region in `scripts/assets/photo-card/sudan-region.json`.
