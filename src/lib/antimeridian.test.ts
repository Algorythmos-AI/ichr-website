import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import type { MultiPolygon } from 'geojson';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { unwrapAntimeridian } from './antimeridian.ts';

const maxJump = (g: MultiPolygon) => {
  let max = 0;
  for (const poly of g.coordinates)
    for (const ring of poly)
      for (let i = 1; i < ring.length; i++) max = Math.max(max, Math.abs(ring[i][0] - ring[i - 1][0]));
  return max;
};

test('a ring crossing 180° becomes continuous and is mirrored to the other side', () => {
  const square: MultiPolygon = {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [178, 60],
          [-178, 60],
          [-178, 62],
          [178, 62],
          [178, 60],
        ],
      ],
    ],
  };
  const out = unwrapAntimeridian(square);
  assert.equal(out.coordinates.length, 2);
  assert.deepEqual(
    out.coordinates[0][0].map(([lon]) => lon),
    [178, 182, 182, 178, 178],
  );
  assert.deepEqual(
    out.coordinates[1][0].map(([lon]) => lon),
    [-182, -178, -178, -182, -182],
  );
  assert.ok(maxJump(out) < 180);
});

test('ordinary polygons pass through unchanged', () => {
  const ring = [
    [6, 46],
    [7, 46],
    [7, 47],
    [6, 46],
  ];
  const out = unwrapAntimeridian({ type: 'Polygon', coordinates: [ring] });
  assert.deepEqual(out.coordinates, [[ring]]);
});

test('the bundled Natural Earth land has no edge spanning the world after unwrapping', () => {
  const topo = JSON.parse(
    readFileSync(new URL('../../node_modules/world-atlas/land-50m.json', import.meta.url), 'utf8'),
  ) as Topology<{ land: GeometryCollection }>;
  const land = feature(topo, topo.objects.land);
  const geometry = land.features[0].geometry as MultiPolygon;
  assert.ok(maxJump(geometry) > 180, 'source data no longer crosses the seam: helper may be obsolete');

  const out = unwrapAntimeridian(geometry);
  assert.ok(maxJump(out) < 180);
  // Antarctica dropped; nothing left south of the map's -60° bound.
  assert.ok(out.coordinates.every((poly) => poly[0].some(([, lat]) => lat >= -60)));
});
