// Bornholmer Strasse, 9 November 1989, ~23:30: the checkpoint at the east end of the Boesebruecke opens.
// A papercraft scene for the documentary "Dau vet thoi dai" (pilot shot N21a-N21b).
/* PAPER SPEC
BRIEF    East Berlin, a cold November night; the GDR checkpoint at Bornholmer Strasse and the steel bridge over the
         railway cut; a crowd pressing at the barrier; guards; the moment before the gate opens. No snow, no sky.
SUBJECT  the riveted green-grey bridge leading west, the lit control booths, the red-white barrier, the crowd. First
         read: the barrier with the crowd on one side and the empty bridge on the other.
STOCK    matte cardstock, quiet fibre; kraft backs
PALETTE  ground #a9a497 (worn asphalt) / #8d8a80 cobble; lead GDR family steel #6d7d74, booth #d6cfbb, roof #5f625c;
         accents barrier red #c0392b + cream #efe6d2, sodium amber #ffc664; coats ochre/rust/blue/plum; ink #2a2420
LIGHT    night mood (pale-blue moon key), warm practical pools at the floodlights, street lamps and booth windows
LENS     harness default (fov ~26, pitch 47); sharp band across barrier and booths; bare trees blurred at the bottom edge
GROUND   asphalt with patched cobble, the road (Bornholmer Strasse) bending from the checkpoint onto the bridge, lane
         lines; the railway cut: ballast band with four tracks and sleepers
LAYOUT   road = leading line (lower right -> centre -> upper left over the bridge); rail cut crosses under the bridge;
         checkpoint right of centre, crowd east of the barrier, bridge left, tenement blocks along the far edge
LIFE     breath / lamp haze puffs over the crowd, a few dry leaves
TYPES    truss = card with holes; deck = platform; booths = box folds; trees = crosses; everything else frontal cards
BANNED   sky, snow, glossy steel, readable slogans, stamped identical people
*/
import * as P2 from 'papercraft/lib/paperkit-2d.js';
import { makeCard, platform, boxFold } from 'papercraft/lib/paperkit-3d.js';
import { createLife } from 'papercraft/lib/paper-life.js';
import { createHarness } from './harness.js';

const C = {
  ground: '#a9a497', asphalt: '#9a978e', cobble: '#8d8a80', lane: '#e9e2cf', ballast: '#9c8f7c', rail: '#5b5048', sleeper: '#6e5642',
  steel: '#6d7d74', steelDark: '#4d5a54', rivet: '#c9d2c6', booth: '#d6cfbb', boothB: '#c8c3ae', roof: '#5f625c', window: '#ffc664',
  red: '#c0392b', cream: '#efe6d2', ink: '#2a2420', uniform: '#66704f', wall: '#cbc6b8', brick: '#9a5a44', plaster: '#bfae93',
  trunk: '#5a4636', trab: ['#9fb7c4', '#d9c9a0', '#b9c79a', '#c98f6a'], coats: ['#b0803a', '#8b3a2e', '#3f5a7a', '#5d4a6a', '#7a6a50', '#a2553a', '#4f6b5e', '#c9b48a'],
};
const H = createHarness({ ground: C.ground, stock: '#eef0f2', mood: 'night', view: { pitch: 47, dist: 66, target: [0, 1.5, -6] },
  bounds: { x0: -64, x1: 64, z0: -62, z1: 38 }, play: false, subject: [4, -5] });
const D = P2.draw2;
let rnd = P2.rng(1989);
const between = (a, b) => a + rnd() * (b - a), pick = (a) => a[Math.floor(rnd() * a.length)];

// ---- leading lines --------------------------------------------------------------------------------------------------
const roadZ = (x) => -7 + (x > -2 ? 0.0105 * (x + 2) ** 2 : 0) + Math.sin(x * 0.09) * 0.4;   // flat over the bridge, bends toward us east of it
const railX = (z) => -14 + z * 0.32 + Math.sin(z * 0.11 + 0.7) * 1.6;                           // the rail cut, under the bridge
const roadPts = Array.from({ length: 121 }, (_, i) => { const x = -64 + i * (128 / 120); return [x, roadZ(x)]; });
const railPts = Array.from({ length: 121 }, (_, i) => { const z = -62 + i * (100 / 120); return [railX(z), z]; });
const BR = { x0: -25, x1: -3 };                                                                  // the bridge span along x
const keep = [], mark = (x, z, r) => keep.push([x, z, r]);
const free = (x, z, m = 0) => Math.abs(z - roadZ(x)) > 3.4 + m && Math.abs(x - railX(z)) > 6 + m && keep.every(([a, b, r]) => Math.hypot(x - a, z - b) > r + m);

// ---- the printed ground ---------------------------------------------------------------------------------------------
H.printGround(({ g, ppu, X, Z, rnd: r, washes, torn, bandOf, line, drifts }) => {
  washes([C.ground, C.asphalt, '#b3ad9f', '#9f9b90']);
  // the rail cut: a torn ballast band, four tracks with sleepers
  torn(bandOf(railPts, 6.2), P2.rgba(C.ballast, 0.95));
  for (let k = 0; k < 900; k++) { const z = -62 + r() * 100, x = railX(z) + (r() - 0.5) * 11; g.fillStyle = r() < 0.5 ? P2.rgba('#7d7062', 0.6) : P2.rgba('#c2b7a4', 0.6); g.beginPath(); g.arc(X(x), Z(z), (0.06 + r() * 0.08) * ppu, 0, 7); g.fill(); }
  for (const off of [-3.9, -1.3, 1.3, 3.9]) {
    for (let z = -62; z < 38; z += 0.9) { const x = railX(z) + off, a = Math.atan2(1, 0.32); g.save(); g.translate(X(x), Z(z)); g.rotate(-Math.atan(0.32)); g.fillStyle = P2.rgba(C.sleeper, 0.85); g.fillRect(-1.1 * ppu, -0.16 * ppu, 2.2 * ppu, 0.32 * ppu); g.restore(); }
    for (const s of [-0.6, 0.6]) line(railPts.map(([x, z]) => [x + off + s, z]), 0.16, P2.rgba(C.rail, 0.95));
  }
  // the road: a torn asphalt strip with a cobbled verge, lane lines and the stop line at the barrier
  torn(bandOf(roadPts, 3.6), P2.rgba('#b8b2a3', 0.9));
  torn(bandOf(roadPts, 2.9), P2.rgba(C.asphalt, 0.95));
  for (const s of [-1, 1]) line(roadPts.map(([x, z]) => [x, z + s * 3.25]), 0.5, P2.rgba(C.cobble, 0.6));
  for (let x = -60; x < 60; x += 3.2) { if (x > BR.x0 && x < BR.x1) continue; g.save(); g.translate(X(x), Z(roadZ(x))); g.rotate(Math.atan(roadZ(x + 0.1) - roadZ(x)) * 10 / ppu * ppu / 10); g.fillStyle = P2.rgba(C.lane, 0.7); g.fillRect(0, -0.08 * ppu, 1.6 * ppu, 0.16 * ppu); g.restore(); }
  { const x = 1.2, z = roadZ(x); g.fillStyle = P2.rgba(C.lane, 0.85); g.fillRect(X(x), Z(z - 2.8), 0.35 * ppu, 5.6 * ppu); }
  // cobble patches and oil stains in drifts
  drifts((x, y) => { g.fillStyle = r() < 0.6 ? P2.rgba('#7f7b72', 0.45) : P2.rgba('#c9c3b4', 0.5); g.fillRect(x, y, 2.2 + r() * 1.5, 1.6 + r() * 1.2); });
});

// ---- pieces ---------------------------------------------------------------------------------------------------------
const plain = (c, k = 0.1) => (P) => { P.gradient(P2.shade(c, k), P2.shade(c, -k), 0.5); P.felt(0.4); P.innerShade(P2.shade(c, -0.55), { alpha: 0.3, blurPx: 8 }); };
const steelPrint = (P) => { P.gradient(P2.shade(C.steel, 0.12), P2.shade(C.steel, -0.14), 0.4); P.felt(0.35);
  P.marks('panel', { color: C.steelDark, alpha: 0.35, size: 0.06 }); P.marks('rivet', { color: C.steelDark, alpha: 0.7, size: 0.035 });
  P.innerShade(P2.shade(C.steelDark, -0.5), { alpha: 0.35, blurPx: 6 }); };

// the bridge truss: a riveted arch girder, one card with its panels cut out (holes), standing on the deck's edge
function truss(L, Hh) {
  const top = (x) => 1.1 + (Hh - 1.1) * (1 - (2 * x / L) ** 2);
  const pts = [[-L / 2, 0], [L / 2, 0]]; for (let i = 0; i <= 40; i++) { const x = L / 2 - i * L / 40; pts.push([x, top(x)]); }
  const holes = [], n = 11, m = 0.32, yb = 0.55;
  for (let i = 0; i < n; i++) {
    const a = -L / 2 + i * L / n + m, b = -L / 2 + (i + 1) * L / n - m, ta = top(a) - m, tb = top(b) - m;
    if (Math.min(ta, tb) - yb < 0.9) continue;
    const d = 0.38, up = i < n / 2;
    if (up) { holes.push([[a, yb], [b - d, yb], [a, ta - d * 1.4]]); holes.push([[b, yb + d * 1.4], [b, tb], [a + d, ta]]); }
    else { holes.push([[a + d, yb], [b, yb], [b, tb - d * 1.4]]); holes.push([[a, yb + d * 1.4], [b - d, tb], [a, ta]]); }
  }
  return { pts, holes };
}
// a control booth: GDR prefab, cream walls with a grey band, a lit window strip, a flat dark roof
const boothPaint = (col) => ({
  front: (P) => { const { box } = P; plain(col, 0.08)(P);
    P.layer((g) => { g.fillStyle = C.roof; g.fillRect(box.x0 - 1, box.y0 + box.h * 0.86, box.w + 2, box.h); }, C.roof, { lip: 0.6 });
    P.layer((g) => { g.fillStyle = '#3c3a36'; g.fillRect(box.x0 + box.w * 0.12, box.y0 + box.h * 0.42, box.w * 0.76, box.h * 0.32); }, '#3c3a36', { lip: 0.8 });
    P.draw((g) => { g.fillStyle = C.window; g.fillRect(box.x0 + box.w * 0.15, box.y0 + box.h * 0.45, box.w * 0.7, box.h * 0.26); g.fillStyle = '#3c3a36'; for (let k = 1; k < 4; k++) g.fillRect(box.x0 + box.w * (0.15 + k * 0.175) - 0.03, box.y0 + box.h * 0.45, 0.06, box.h * 0.26); });
    P.glow((g) => g.fillRect(box.x0 + box.w * 0.15, box.y0 + box.h * 0.45, box.w * 0.7, box.h * 0.26));
    P.marks('stripe', { color: P2.shade(col, -0.25), alpha: 0.25, size: 0.05, region: { ...box, y1: box.y0 + box.h * 0.38 } }); },
  gable: (P) => { const { box } = P; plain(P2.shade(col, -0.05), 0.08)(P); P.layer((g) => { g.fillStyle = C.roof; g.fillRect(box.x0 - 1, box.y0 + box.h * 0.8, box.w + 2, box.h); }, C.roof, { lip: 0.6 }); },
  roof: (P) => { plain(C.roof, 0.1)(P); P.marks('panel', { color: '#3e403b', alpha: 0.4, size: 0.12 }); },
});
const piece = (draw, w, h, name) => P2.drawnPiece(draw, { w, h, name });
const K = {
  barrierPost: () => piece((g, ink) => { g.fillStyle = ink('#3c3f3a'); D.rect(g, -0.22, 0, 0.44, 1.6, 0.05); g.fillStyle = ink(C.red); D.rect(g, -0.26, 1.4, 0.52, 0.42, 0.08); g.fillStyle = ink(C.cream, 'print'); D.rect(g, -0.26, 1.52, 0.52, 0.12); }, 0.7, 1.9, 'barrier post'),
  barrierBar: (L) => piece((g, ink) => { g.fillStyle = ink(C.cream); D.rect(g, 0, 0, L, 0.32, 0.12); g.fillStyle = ink(C.red, 'print'); for (let x = 0.2; x < L - 0.3; x += 1.2) D.rect(g, x, 0, 0.6, 0.32); }, L + 0.1, 0.4, 'barrier bar'),
  barrierRaised: () => piece((g, ink) => { g.fillStyle = ink('#3c3f3a'); D.rect(g, 1.6, 0, 0.5, 1.7, 0.05); g.fillStyle = ink(C.red); D.rect(g, 1.5, 1.45, 0.7, 0.5, 0.08);
    const a = 0.62, L = 4.6, c = Math.cos(a), sn = Math.sin(a), bar = (t0, t1) => [[1.85 - c * t0, 1.7 + sn * t0], [1.85 - c * t1, 1.7 + sn * t1], [1.85 - c * t1 - sn * 0.46, 1.7 + sn * t1 + c * 0.46], [1.85 - c * t0 - sn * 0.46, 1.7 + sn * t0 + c * 0.46]];
    g.fillStyle = ink(C.cream); D.poly(g, bar(-0.3, L)); g.fillStyle = ink(C.red, 'print'); for (let t = 0.4; t < L - 0.4; t += 1.2) D.poly(g, bar(t, t + 0.6));
    g.fillStyle = ink('#2c2e26'); D.ell(g, 1.85, 1.72, 0.16, 0.16); }, 6.6, 5.5, 'barrier raised'),
  bollard: () => piece((g, ink) => { g.fillStyle = ink(C.cream); D.rect(g, -0.18, 0, 0.36, 1.3, 0.12); g.fillStyle = ink(C.red, 'print'); D.rect(g, -0.18, 0.35, 0.36, 0.2); D.rect(g, -0.18, 0.85, 0.36, 0.2); }, 0.5, 1.4, 'bollard'),
  bin: () => piece((g, ink) => { g.fillStyle = ink('#6a6f5a'); D.rect(g, -0.4, 0, 0.8, 1.1, 0.12); g.fillStyle = ink('#4f5444', 'print'); D.rect(g, -0.4, 0.8, 0.8, 0.1); D.rect(g, -0.25, 0.2, 0.06, 0.5); D.rect(g, 0.19, 0.2, 0.06, 0.5); }, 0.9, 1.2, 'bin'),
  bench: () => piece((g, ink) => { g.fillStyle = ink('#7a5a3a'); D.rect(g, -1.1, 0.5, 2.2, 0.16); D.rect(g, -1.1, 0.95, 2.2, 0.16); g.fillStyle = ink('#3f423c'); D.rect(g, -0.95, 0, 0.12, 1.1); D.rect(g, 0.83, 0, 0.12, 1.1); }, 2.4, 1.2, 'bench'),
  shed: () => [P2.shape.rect(5, 2.6), (P) => { const { box } = P; plain('#8e8a7c', 0.1)(P); P.marks('panel', { color: '#6a675c', alpha: 0.45, size: 0.2 }); P.layer((g) => { g.fillStyle = '#4c4f48'; g.fillRect(box.x0 - 1, box.y1 - box.h * 0.14, box.w + 2, box.h); }, '#4c4f48', { lip: 0.6 }); }],
  floodlight: () => piece((g, ink) => { g.fillStyle = ink('#4a4d48'); D.rect(g, -0.12, 0, 0.24, 7.6); D.rect(g, -0.5, 0, 1.0, 0.3, 0.06); g.fillStyle = ink('#5a5d57'); D.rect(g, -0.9, 7.4, 1.8, 0.5, 0.08); g.fillStyle = ink('#fff1c4', 'print'); for (const x of [-0.7, -0.2, 0.3]) D.rect(g, x, 7.47, 0.38, 0.32, 0.05); }, 2, 8, 'floodlight'),
  streetLamp: () => piece((g, ink) => { g.fillStyle = ink('#4f524c'); D.rect(g, -0.09, 0, 0.18, 4.6); D.poly(g, [[-0.09, 4.5], [0.09, 4.6], [1.2, 4.9], [1.2, 4.75]]); g.fillStyle = ink('#ffd88a', 'print'); D.ell(g, 1.25, 4.72, 0.3, 0.12); }, 1.8, 5.1, 'street lamp'),
  trabant: (col) => piece((g, ink) => { g.fillStyle = ink(col); D.rect(g, -1.6, 0.35, 3.2, 0.8, 0.25); D.poly(g, [[-0.9, 1.1], [0.95, 1.1], [0.6, 1.65], [-0.6, 1.65]]); g.fillStyle = ink('#3a4048', 'print'); D.poly(g, [[-0.75, 1.15], [-0.05, 1.15], [-0.05, 1.55], [-0.5, 1.55]]); D.poly(g, [[0.05, 1.15], [0.8, 1.15], [0.52, 1.55], [0.05, 1.55]]);
    g.fillStyle = ink('#2b2a28'); D.ell(g, -1.0, 0.33, 0.33, 0.33); D.ell(g, 1.0, 0.33, 0.33, 0.33); g.fillStyle = ink('#c9c5bb', 'print'); D.ell(g, -1.0, 0.33, 0.13, 0.13); D.ell(g, 1.0, 0.33, 0.13, 0.13); D.rect(g, -1.6, 0.55, 3.2, 0.08); g.fillStyle = ink('#ffe2a0', 'print'); D.rect(g, 1.45, 0.75, 0.15, 0.15, 0.04); }, 3.3, 1.8, 'trabant'),
  wallSlab: () => piece((g, ink) => { g.fillStyle = ink(C.wall); D.rect(g, -1.4, 0, 2.8, 3.0); g.fillStyle = ink('#dcd8cc'); D.rect(g, -1.5, 2.9, 3.0, 0.45, 0.22); g.fillStyle = ink('#aaa596', 'print'); D.rect(g, -1.4, 1.4, 2.8, 0.06); D.rect(g, 1.35, 0, 0.05, 2.9); }, 3.1, 3.4, 'wall slab'),
  sign: () => piece((g, ink) => { g.fillStyle = ink('#4f524c'); D.rect(g, -0.07, 0, 0.14, 2.3); g.fillStyle = ink(C.cream); D.rect(g, -0.75, 2.0, 1.5, 0.9, 0.06); g.fillStyle = ink(C.red, 'print'); D.rect(g, -0.75, 2.62, 1.5, 0.22); g.fillStyle = ink(C.ink, 'print'); for (const y of [2.2, 2.36]) D.rect(g, -0.55, y, 1.1, 0.07); }, 1.6, 3.0, 'sign'),
  fence: () => piece((g, ink) => { g.fillStyle = ink('#5d605a'); D.rect(g, -2.2, 0.95, 4.4, 0.12); D.rect(g, -2.2, 0.15, 4.4, 0.1); for (let x = -2.1; x <= 2.1; x += 0.35) D.rect(g, x, 0, 0.07, 1.05); g.fillStyle = ink('#5d605a'); D.rect(g, -2.25, 0, 0.12, 1.1); D.rect(g, 2.13, 0, 0.12, 1.1); }, 4.6, 1.2, 'crowd fence'),
  // a tenement block at the far edge (Altbau): brick-red or plaster, rows of windows, a few lit
  block: (w, h, col) => [P2.shape.rect(w, h), (P) => { const { box } = P; plain(col, 0.08)(P); P.marks('window', { color: C.window, alpha: 0.9, size: 0.09, lit: 0.22, dark: '#3b3a44', region: { ...box, y1: box.y1 - box.h * 0.08 } });
    P.layer((g) => { g.fillStyle = P2.shade(col, -0.3); g.fillRect(box.x0 - 1, box.y1 - box.h * 0.06, box.w + 2, box.h); }, P2.shade(col, -0.3), { lip: 0.6 }); }],
  // a bare November tree: trunk and forked limbs (both planes of a cross)
  bareTree: () => { const h = between(7, 9.5); return piece((g, ink) => { g.fillStyle = ink('#4f433a'); for (const [cx, cy, rx, ry] of [[0, 0.74, 0.2, 0.17], [-0.17, 0.62, 0.14, 0.12], [0.18, 0.64, 0.14, 0.12], [-0.06, 0.88, 0.12, 0.08], [0.1, 0.86, 0.11, 0.08]]) D.ell(g, cx * h, cy * h, rx * h, ry * h);
      g.fillStyle = ink('#8a7258', 'print'); for (let k = 0; k < 9; k++) { const a = -0.3 + k * 0.45; D.poly(g, [[-0.04, h * 0.5], [0.04, h * 0.5], [Math.cos(Math.PI / 2 + a - 2) * h * 0.3 + 0.03, h * 0.72 + Math.sin(Math.PI / 2 + a - 2) * h * 0.2], [Math.cos(Math.PI / 2 + a - 2) * h * 0.3 - 0.03, h * 0.72 + Math.sin(Math.PI / 2 + a - 2) * h * 0.2]]); }
      g.fillStyle = ink(C.trunk, 'print'); D.poly(g, [[-0.28, 0], [0.28, 0], [0.16, h * 0.45], [-0.16, h * 0.45]]);
      const limb = (x, y, a, L, w, d) => { if (d > 3) return; const x1 = x + Math.cos(a) * L, y1 = y + Math.sin(a) * L; D.poly(g, [[x - w, y], [x + w, y], [x1 + w * 0.5, y1], [x1 - w * 0.5, y1]]); limb(x1, y1, a + 0.45 + rnd() * 0.2, L * 0.72, w * 0.62, d + 1); limb(x1, y1, a - 0.45 - rnd() * 0.2, L * 0.72, w * 0.62, d + 1); };
      limb(0, h * 0.42, Math.PI / 2 + 0.35, h * 0.24, 0.16, 0); limb(0, h * 0.42, Math.PI / 2 - 0.35, h * 0.24, 0.16, 0); limb(0, h * 0.4, Math.PI / 2, h * 0.28, 0.17, 1);
      g.fillStyle = ink('#7a6248', 'print'); for (let k = 0; k < 6; k++) D.rect(g, -0.2, h * 0.05 + k * 0.5, 0.18, 0.06); }, h * 0.9, h, 'bare tree'); },
  hedge: () => [P2.shape.mound(rnd, { w: between(4, 5.5), h: 1.8, lobes: 6, depth: 0.2 }), (P) => { plain('#56664f', 0.12)(P); P.marks('dab', { color: '#41503c', alpha: 0.55, size: 0.09 }); P.marks('dab', { color: '#8a8f6a', alpha: 0.45, size: 0.06 }); }],
};
// a person in the crowd: one frontal card, coat, scarf, hat or bare head; every one printed with its own colours
function person(seedCol) {
  const coat = pick(C.coats), scarf = pick(['#c0392b', '#efe6d2', '#d9a03a', '#3f5a7a']), hat = rnd() < 0.55, h = between(2.7, 3.2), skin = pick(['#f1d9b8', '#e8c9a4', '#dcb894']);
  const arm = rnd() < 0.3;   // some raise an arm
  return piece((g, ink) => {
    g.fillStyle = ink('#2f2d2b'); D.rect(g, -0.28, 0, 0.22, h * 0.36, 0.06); D.rect(g, 0.06, 0, 0.22, h * 0.36, 0.06);
    g.fillStyle = ink(coat); D.rect(g, -0.42, h * 0.28, 0.84, h * 0.46, 0.18);
    if (arm) { D.poly(g, [[0.3, h * 0.66], [0.44, h * 0.62], [0.62, h * 0.98], [0.5, h * 1.0]]); g.fillStyle = ink(skin); D.ell(g, 0.57, h * 1.0, 0.09, 0.09); }
    g.fillStyle = ink(scarf, 'print'); D.rect(g, -0.32, h * 0.68, 0.64, 0.14, 0.05);
    g.fillStyle = ink(skin); D.rect(g, -0.1, h * 0.7, 0.2, h * 0.16); D.ell(g, 0, h * 0.85, 0.24, 0.27);
    g.fillStyle = ink('#2a1608', 'print'); D.ell(g, -0.08, h * 0.86, 0.03, 0.035); D.ell(g, 0.08, h * 0.86, 0.03, 0.035);
    g.fillStyle = ink(hat ? pick(['#4a4038', '#6b2f2a', '#3c4a5a']) : pick(['#4a2e1c', '#8a6a3a', '#2a2420'])); hat ? D.rect(g, -0.28, h * 0.85 + 0.17, 0.56, 0.22, 0.1) : D.ell(g, 0, h * 0.85 + 0.2, 0.25, 0.13);
    g.fillStyle = ink(P2.shade(coat, -0.3), 'print'); D.rect(g, -0.02, h * 0.3, 0.04, h * 0.38); D.ell(g, 0.12, h * 0.5, 0.03, 0.03); D.ell(g, 0.12, h * 0.6, 0.03, 0.03);
  }, 1.4, h * 1.1, 'person');
}
// a guard: grey-green uniform, peaked cap, belt
function guard() {
  const h = 3.2;
  return piece((g, ink) => {
    g.fillStyle = ink('#3f4433'); D.rect(g, -0.28, 0, 0.24, h * 0.38, 0.05); D.rect(g, 0.04, 0, 0.24, h * 0.38, 0.05);
    g.fillStyle = ink(C.uniform); D.rect(g, -0.44, h * 0.3, 0.88, h * 0.45, 0.14);
    g.fillStyle = ink('#3a3226', 'print'); D.rect(g, -0.44, h * 0.42, 0.88, 0.09);
    g.fillStyle = ink('#f1d9b8'); D.rect(g, -0.1, h * 0.7, 0.2, h * 0.16); D.ell(g, 0, h * 0.84, 0.23, 0.26);
    g.fillStyle = ink(C.uniform); D.rect(g, -0.3, h * 0.84 + 0.18, 0.6, 0.22, 0.08); g.fillStyle = ink('#2c2e26'); D.rect(g, -0.34, h * 0.84 + 0.16, 0.68, 0.08, 0.03);
    g.fillStyle = ink('#c0392b', 'print'); D.ell(g, 0, h * 0.84 + 0.3, 0.05, 0.05);
  }, 1.2, h * 1.1, 'guard');
}

// ---- the hero: the passport-control officer as a small 3D paper model (front + profile cards per part) -------------
const officer = () => {
  const g = new H.THREE.Group(), body = new H.THREE.Group(); g.add(body);
  const T = 0.05, GAP = 0.03, SIDE = 0.01, PROFILE = -Math.PI / 2;
  const card = ([pts, paint], seed, { x = 0, y = 0, z = 0, ry = 0, parent = body, name = '', cut = null } = {}) => {
    const m = makeCard(pts, { paint, paper: H.paper, thickness: T, edgeWidth: 0.04, pxPerUnit: 64, seed, back: 'mirror', folds: [], geomPts: cut });
    m.position.set(x, y, z); m.rotation.y = ry; m.name = name; parent.add(m); return m; };
  const ext = ([pts]) => pts.reduce((e, [x, y]) => ({ x0: Math.min(e.x0, x), x1: Math.max(e.x1, x), y0: Math.min(e.y0, y), y1: Math.max(e.y1, y) }), { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity });
  const behind = (p, z0) => z0 - T / 2 - GAP - ext(p).x1;
  const band = (pts, lo, hi, k = 1) => [[lo, 1], [hi, -1]].reduce((poly, [v, sg]) => { const out = [], ok = (q) => sg * (q[k] - v) >= 0;
    poly.forEach((a, i) => { const b = poly[(i + 1) % poly.length]; if (ok(a)) out.push(a); if (ok(a) !== ok(b)) { const t = (v - a[k]) / (b[k] - a[k]); out.push(k ? [a[0] + (b[0] - a[0]) * t, v] : [v, a[1] + (b[1] - a[1]) * t]); } }); return out; }, pts);
  const uni = C.uniform, uniSide = P2.shade(C.uniform, -0.1);
  const torso = piece((gg, ink) => { gg.fillStyle = ink(uni); D.rect(gg, -0.38, 0, 0.76, 1.28, 0.16); gg.fillStyle = ink('#3a3226', 'print'); D.rect(gg, -0.38, 0.38, 0.76, 0.1); gg.fillStyle = ink('#d9c07a', 'print'); for (const y of [0.62, 0.85, 1.05]) D.ell(gg, 0, y, 0.035, 0.035); gg.fillStyle = ink('#4a5236', 'print'); D.rect(gg, -0.3, 1.0, 0.18, 0.06); D.rect(gg, 0.12, 1.0, 0.18, 0.06); }, 0.85, 1.3, 'tunic');
  const jx = ext(torso), jy = 0.78; card(torso, 401, { y: jy, name: 'tunic' });
  const torsoSide = piece((gg, ink) => { gg.fillStyle = ink(uniSide); D.rect(gg, -0.22, 0, 0.44, 1.24, 0.14); gg.fillStyle = ink('#3a3226', 'print'); D.rect(gg, -0.22, 0.36, 0.44, 0.1); }, 0.5, 1.3, 'tunic side');
  card(torsoSide, 402, { y: 0.8, z: behind(torsoSide, 0), ry: PROFILE, name: 'tunic side' });
  const legF = (i) => piece((gg, ink) => { gg.fillStyle = ink('#4a5038'); D.rect(gg, -0.1, 0.2, 0.2, 0.78, 0.04); gg.fillStyle = ink('#1f1d1a'); D.rect(gg, -0.12, 0, 0.24, 0.26, 0.06); }, 0.3, 1.0, `leg ${i}`);
  const legS = (i) => piece((gg, ink) => { gg.fillStyle = ink('#434830'); D.rect(gg, -0.1, 0.2, 0.2, 0.78, 0.04); gg.fillStyle = ink('#1f1d1a'); D.rect(gg, -0.1, 0, 0.3, 0.26, 0.06); }, 0.45, 1.0, `leg ${i} side`);
  const hipX = ext(legF(0)).x1 + T / 2 + SIDE;
  const legs = [-hipX, hipX].map((x, i) => { const hip = new H.THREE.Group(); hip.position.set(x, 0.95, -0.16); body.add(hip); const s = legS(i);
    card(legF(i), 410 + i, { y: -0.97, parent: hip, name: `leg ${i}` }); card(s, 420 + i, { y: -0.97, z: behind(s, 0), ry: PROFILE, parent: hip, name: `leg ${i} side` }); return hip; });
  const face = piece((gg, ink) => { gg.fillStyle = ink('#f1d9b8'); D.ell(gg, 0, 0.38, 0.34, 0.38); gg.fillStyle = ink('#2a1608', 'print'); D.ell(gg, -0.12, 0.36, 0.04, 0.05); D.ell(gg, 0.12, 0.36, 0.04, 0.05); gg.fillStyle = ink('#7a4a30', 'print'); D.rect(gg, -0.14, 0.2, 0.28, 0.05, 0.02); }, 0.75, 0.8, 'face');
  card(face, 404, { y: 1.88, z: 0.08, name: 'face' });
  const headS = piece((gg, ink) => { gg.fillStyle = ink('#ead0ae'); D.ell(gg, 0, 0.38, 0.32, 0.36); gg.fillStyle = ink('#5a4030'); D.ell(gg, -0.14, 0.42, 0.2, 0.26); gg.fillStyle = ink('#2a1608', 'print'); D.ell(gg, 0.2, 0.36, 0.03, 0.045); }, 0.72, 0.8, 'head side');
  card(headS, 405, { y: 1.86, z: behind(headS, 0.08), ry: PROFILE, name: 'head side', cut: band(headS[0], jy + jx.y1 + GAP - 1.86, 2.42 - GAP - 1.86) });
  const cap = (c) => piece((gg, ink) => { gg.fillStyle = ink(c); D.rect(gg, -0.36, 0.06, 0.72, 0.34, 0.1); gg.fillStyle = ink('#262820'); D.rect(gg, -0.38, 0, 0.76, 0.1, 0.04); gg.fillStyle = ink('#c0392b', 'print'); D.rect(gg, -0.36, 0.14, 0.72, 0.06); gg.fillStyle = ink('#d9c07a', 'print'); D.ell(gg, 0, 0.29, 0.06, 0.06); }, 0.8, 0.45, 'cap');
  card(cap(uni), 406, { y: 2.42, z: 0.16, name: 'cap' }); const capS = cap(uniSide); card(capS, 407, { y: 2.42, z: behind(capS, 0.08), ry: PROFILE, name: 'cap side' });
  const armArt = (c, n) => piece((gg, ink) => { gg.fillStyle = ink(c); D.rect(gg, -0.1, 0.14, 0.2, 0.66, 0.08); gg.fillStyle = ink('#f1d9b8'); D.ell(gg, 0, 0.08, 0.09, 0.08); }, 0.3, 0.85, n);
  const shX = jx.x1 + ext(armArt(uni, 'a')).x1 + SIDE;
  const arms = [-shX, shX].map((x, i) => { const sh = new H.THREE.Group(); sh.position.set(x, 1.98, 0); body.add(sh); const s = armArt(uniSide, `arm ${i} side`);
    card(armArt(uni, `arm ${i}`), 430 + i, { y: -0.8, parent: sh, name: `arm ${i}` }); card(s, 440 + i, { y: -0.8, z: behind(s, 0), ry: PROFILE, parent: sh, name: `arm ${i} side` }); return sh; });
  const legLen = 1.2, stepLen = 1.2, R = stepLen / (2 * legLen);
  const leg = (ph, gait) => { const u = (ph / Math.PI) % 2, A = gait * R; if (u >= 1) return A * (3 - 2 * u); const e = u * u * (3 - 2 * u); return A * (2 * e - 1); };
  g.userData.stride = (walked, gait) => { const ph = walked / stepLen * Math.PI, l0 = leg(ph, gait), l1 = leg(ph + Math.PI, gait);
    legs[0].rotation.x = -l0; legs[1].rotation.x = -l1; arms[0].rotation.x = l0 * 0.7; arms[1].rotation.x = l1 * 0.7; body.position.y = Math.abs(Math.sin(ph)) * 0.05 * gait; };
  return g;
};

// ---- the world ------------------------------------------------------------------------------------------------------
const LIFE = { breath: [] };
{
  // 1. the bridge: deck (platform) over the rail cut, two riveted arch girders with their panels cut out
  const L = BR.x1 - BR.x0, cx = (BR.x0 + BR.x1) / 2, cz = roadZ(cx), W = 6.2, DH = 1.4;
  const deck = platform({ w: L, d: W, h: DH, paper: H.paper, seed: 501, print: H.cardOpts(cx, cz),
    paints: { face: steelPrint, deck: (P) => { plain(C.asphalt, 0.06)(P); P.draw((g) => { g.fillStyle = P2.rgba(C.lane, 0.6); for (let x = P.box.x0 + 0.5; x < P.box.x1; x += 3.2) g.fillRect(x, P.box.y0 + P.box.h * 0.48, 1.6, 0.16); }); }, support: steelPrint } });
  H.popup(null, null, { node: deck, height: DH, x: cx, z: cz + W / 2, level: true });
  mark(cx, cz, L / 2 + 1);
  for (const [dz, seed] of [[W / 2 + 0.15, 511], [-W / 2 - 0.15, 513]]) {
    const t = truss(L, 6.2);
    H.popup(t.pts, steelPrint, { x: cx, z: cz + dz, yaw: 0, holes: t.holes, edge: 0.06 });
  }
  // lamp standards on the bridge
  for (const x of [BR.x0 + 4, cx, BR.x1 - 4]) { H.popup(...K.streetLamp(), { x, z: cz + W / 2 + 0.9, yaw: 0, scale: 1.1 }); H.lamp(x + 1.3, 5, cz + W / 2, 0.7, 9); }

  // 2. the checkpoint: three booths along the lanes, a barrier across the road, floodlights, the wall at the cut
  const booths = [[7.5, -1], [13, -1], [18.5, -1]];
  booths.forEach(([x, s], i) => {
    const z = roadZ(x) + s * 4.6, col = i % 2 ? C.boothB : C.booth;
    const node = boxFold({ w: 4.2, d: 3.2, wallH: 3.6, roofH: 0.5, overhang: 0.35, paper: H.paper, seed: 521 + i * 7, paints: boothPaint(col), print: H.cardOpts(x, z) });
    const h = H.popup(null, null, { node, height: 4.1, x, z, yaw: -0.08 * s, solid: 2.6 }); H.glowing(h.group); H.lamp(x, 2.4, z + 2.2, 0.8, 8); mark(x, z, 3.4);
  });
  { const x = 2.0, z = roadZ(x) - 2.4; H.popup(...K.barrierRaised(), { x, z, yaw: 0, scale: 1.25 }); mark(x, z, 2.5); }
  for (const [x, dz] of [[-0.5, -5.5], [13, 6.8], [21, -6.5]]) { const z = roadZ(x) + dz; H.popup(...K.floodlight(), { x, z, yaw: 0, scale: 1.2 }); H.lamp(x, 8.6, z + 1, 2.2, 18); mark(x, z, 1.2); }
  { const x = 4.5, z = roadZ(x) + 4.2; H.popup(...K.sign(), { x, z, yaw: -0.1, scale: 1.2 }); mark(x, z, 1); }
  // crowd fences along the verge east of the booths
  for (const x of [20, 25]) { const z = roadZ(x) - 3.4; H.popup(...K.fence(), { x, z, yaw: -Math.atan(0.0105 * 2 * (x + 2)), scale: 1 }); }
  // the wall (Hinterlandmauer) along the east edge of the rail cut, broken by the road
  for (let z = -40; z < 30; z += 2.9) { const x = railX(z) + 7.2; if (Math.abs(z - roadZ(x)) < 5) continue; H.popup(...K.wallSlab(), { x, z, yaw: -Math.atan(0.32) + Math.PI / 2 - Math.PI / 2, scale: 1 }); }

  // 3. the crowd: pressed against the barrier and the booths, looking west; a few guards between them and the gate
  rnd = P2.rng(77);
  for (let k = 0; k < 46; k++) {
    const x = between(3.6, 24), off = between(-2.6, 2.6), z = roadZ(x) + off;
    if (Math.hypot(x - 7, z - (roadZ(7) - 4.6)) < 2.8 || false) continue;
    H.popup(...person(), { x, z, res: 0.7, scale: between(0.95, 1.08) });
    if (k % 6 === 0) LIFE.breath.push([x, 2.8, z]);
  }
  for (const [x, dz] of [[1.2, -1.2], [0.8, 1.6], [5.2, -4.8]]) H.popup(...guard(), { x, z: roadZ(x) + dz, res: 0.8 });
  // the officer (the hero), off-centre between the barrier and the first booth
  { const doll = officer(), x = 3.6, z = roadZ(x) - 1.0; H.setHero(H.popup(null, null, { node: doll, height: 3.1, x, z, sway: 0.15, scale: 1.2 }), { stride: doll.userData.stride }); mark(x, z, 1.5); }
  // Trabants queued on the east approach
  for (const [x, dz, i] of [[27, 1.2, 0], [32, -1.0, 1], [37, 1.0, 2], [42, -0.8, 3]]) H.popup(...K.trabant(C.trab[i]), { x, z: roadZ(x) + dz, yaw: -Math.atan(0.0105 * 2 * (x + 2)), scale: 1.15 });

  // 4. the far edge: tenement blocks (layered flats cut by the top edge), hedges and bare trees
  rnd = P2.rng(303);
  { const far = H.groundAt(0, 0.92), fz = far ? far.z : -30;
    for (let x = -70; x < 70; x += between(8, 10)) { const z = fz + Math.sin(x * 0.1) * 1.5; if (Math.abs(x - railX(z)) < 8) continue;
      const w = between(8, 10.5), hgt = between(12, 16), col = pick([C.brick, C.plaster, '#a99a86', '#b57a5a']);
      H.popup(...K.block(w, hgt, col), { x, z, yaw: 0, res: 0.75 }); mark(x, z, 4); } }
  for (let x = -2; x <= 26; x += 3) mark(x, roadZ(x) + 6, 3.2);
  // the fill: groups of 3-6 different street pieces, bare trees and hedges, everywhere off the road and the cut
  const placed = [], DRESS = ['hedge', 'hedge', 'bollard', 'bin', 'bench', 'tree', 'tree', 'shed', 'lamp'];
  for (let gz = -40; gz <= 22; gz += 4.2) for (let gx = -56; gx <= 56; gx += 4.2) {
    rnd = P2.rng((Math.imul(Math.round(gx * 10), 73856093) ^ Math.imul(Math.round(gz * 10), 19349663)) >>> 0);
    const x = gx + (rnd() - 0.5) * 3, z = gz + (rnd() - 0.5) * 3;
    if (!H.inFrame(x, z, 0.12, 3) || !free(x, z, 0.8) || placed.some(([px, pz]) => Math.hypot(x - px, z - pz) < 3.6) || rnd() < 0.18) continue;
    placed.push([x, z]);
    const k = pick(DRESS);
    if (k === 'tree' && z > roadZ(x) + 2 && x > -4 && x < 30) { H.popup(...K.hedge(), { x, z, res: 0.75 }); } else if (k === 'tree') H.popup(...K.bareTree(), { x, z, cross: true, sway: 0.3, res: 0.75 });
    else if (k === 'shed') { if (free(x, z, 2.5)) { H.popup(...K.shed(), { x, z, yaw: (rnd() - 0.5) * 0.3, res: 0.75 }); mark(x, z, 3); } }
    else if (k === 'lamp') { H.popup(...K.streetLamp(), { x, z, scale: 1.05 }); H.lamp(x + 1.2, 4.8, z, 0.55, 8); }
    else { const ks = [k, ...['hedge', 'bollard', 'bin', 'bench'].filter((q) => q !== k).sort(() => rnd() - 0.5).slice(0, 2)];
      ks.forEach((q, i) => { const xx = x + (i - 1) * 1.7, zz = z + (i % 2) * 0.9; if (free(xx, zz, 0.2)) H.popup(...K[q](), { x: xx, z: zz, res: 0.75, scale: between(0.9, 1.1) }); }); }
  }
  // big blurred bare trees across the bottom edge
  for (const [sx, dz, s] of [[-0.95, 5.5, 1.6], [0.9, 6.5, 1.8], [0.1, 8, 1.3]]) { const p = H.groundAt(sx, -1); if (p) H.popup(...K.bareTree(), { x: p.x, z: p.z + dz, cross: true, scale: s, sway: 0.3, res: 0.75 }); }
  // catenary masts along the tracks
  for (let z = -36; z < 24; z += 9) for (const s of [-1, 1]) { const x = railX(z) + s * 5.4; if (Math.abs(z - roadZ(x)) < 5) continue;
    H.popup(...piece((g, ink) => { g.fillStyle = ink('#5d605a'); D.rect(g, -0.1, 0, 0.2, 5.2); D.rect(g, -0.1 - s * 0, 4.9, s * 2.6 || 2.6, 0.14); }, 3, 5.4, 'mast'), { x, z, yaw: 0 }); }
}

// ---- life: breath and lamp haze over the crowd, a few dry leaves ---------------------------------------------------
const life = createLife({ scene: H.scene, camera: H.camera, heroHeight: H.heroHeight, seed: 9, wind: [0.9, 0.3] });
life.puffs({ at: LIFE.breath, night: 1, perEmitter: 2, life: 3.5, rise: 0.3, size: [0.06, 0.12], colors: ['#e8ecf2', '#dfe4ec'] });
life.fallers({ night: 1, count: 18, cut: 'leaf', colors: ['#8a5a32', '#a7743e', '#6e4a2c'], size: [0.18, 0.26], land: 9 });
life.setNight(1);
life.reset(H.target);
H.onStep((t, dt) => life.update(dt, H.target));
H.onRestart(() => life.reset(H.target));

H.start();
