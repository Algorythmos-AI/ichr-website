import type { MultiPolygon, Polygon, Position } from 'geojson';

/*
 * world-atlas geometry is made for d3's spherical renderer, which cuts rings at the 180°
 * meridian. Leaflet draws planar, so a ring that hops from +179° to −179° is drawn as an edge
 * across the whole world, striping the map (Eurasia at Chukotka, Wrangel Island, a Fijian
 * islet). This makes each such ring continuous (longitudes past ±180) and adds a copy shifted
 * one world over, so both sides of the seam still render.
 *
 * Polygons entirely south of `minLat` are dropped: Antarctica is a pole-wrapping ring with a
 * single jump, which has no planar fix, and the map's bounds never show it anyway.
 */

const unwrapRing = (ring: Position[]): { ring: Position[]; crossed: boolean } => {
  let offset = 0;
  let crossed = false;
  const out = ring.map(([lon, lat], i) => {
    if (i > 0) {
      const delta = lon - ring[i - 1][0];
      if (delta > 180) offset -= 360;
      else if (delta < -180) offset += 360;
      if (Math.abs(delta) > 180) crossed = true;
    }
    return [lon + offset, lat];
  });
  return { ring: out, crossed };
};

const shift = (poly: Position[][], dLon: number): Position[][] =>
  poly.map((ring) => ring.map(([lon, lat]) => [lon + dLon, lat]));

export function unwrapAntimeridian(geometry: Polygon | MultiPolygon, minLat = -60): MultiPolygon {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  const out: Position[][][] = [];
  for (const poly of polygons) {
    if (poly[0].every(([, lat]) => lat < minLat)) continue;
    const rings = poly.map(unwrapRing);
    const unwrapped = rings.map((r) => r.ring);
    out.push(unwrapped);
    if (rings.some((r) => r.crossed)) {
      // The unwrapped ring sits on one side of the seam; mirror it onto the other.
      const east = unwrapped[0].some(([lon]) => lon > 180);
      out.push(shift(unwrapped, east ? -360 : 360));
    }
  }
  return { type: 'MultiPolygon', coordinates: out };
}
