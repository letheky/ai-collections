// The press conference of 9 November 1989 (East Berlin, International Press Centre), as a paper diorama: the panel
// at a long table, microphones, the spokesman with the paper, journalists and TV cameras, a desk with the regulation
// text and its stamp, and a corner with a TV set and a telex for the news going out.
/* PAPER SPEC
BRIEF    an evening press hall, warm ceiling light, a long table with a cloth, a curtained back wall; no real faces, no
         logos, no readable text on the documents (ruled lines and a stamp only)
PALETTE  floor #c9b48e parquet; wall curtain #4f5d6e; tablecloth #efe6d2 + skirt #46604f; suits greys and browns;
         accents: microphone black, camera red tally #c0392b, screen glow #9ec3e6; ink #2a2420
LIGHT    golden mood, practical pools over the table and the desk
*/
import * as P2 from 'papercraft/lib/paperkit-2d.js';
import { makeCard, platform } from 'papercraft/lib/paperkit-3d.js';
import { createHarness } from '../berlin/harness.js';
import { figures } from '../film-lib/figures.js';

const C = { floor: '#c9b48e', wall: '#4f5d6e', cloth: '#efe6d2', skirt: '#46604f', ink: '#2a2420', suit: ['#4a4a4e', '#5a4a3e', '#3e4652', '#6a5f52'], skin: ['#f1d9b8', '#e8c9a4'], red: '#c0392b' };
const H = createHarness({ ground: C.floor, mood: 'golden', view: { pitch: 46, dist: 62, target: [0, 2, -5] }, bounds: { x0: -60, x1: 60, z0: -60, z1: 40 },
  play: false, subject: [0, -8], focus: [0, 2, -7], lens: { focusBand: 0.36, ramp: 0.45, maxBlur: 10 } });
const D = P2.draw2;
let rnd = P2.rng(911);
const FIG = figures(() => rnd());
const between = (a, b) => a + rnd() * (b - a), pick = (a) => a[Math.floor(rnd() * a.length)];
const piece = (draw, w, h, name) => P2.drawnPiece(draw, { w, h, name });
const plain = (c, k = 0.1) => (P) => { P.gradient(P2.shade(c, k), P2.shade(c, -k), 0.5); P.felt(0.4); P.innerShade(P2.shade(c, -0.55), { alpha: 0.3, blurPx: 8 }); };
const card = (pts, paint, seed) => makeCard(pts, { paint, paper: H.paper, thickness: 0.08, edgeWidth: 0.06, pxPerUnit: 48, seed, folds: [] });

// ---- ground: parquet in herringbone strips, a carpet runner under the press rows -----------------------------------
H.printGround(({ g, ppu, X, Z, washes, torn, rnd: r }) => {
  washes([C.floor, '#bfa883', '#d2bf98']);
  g.strokeStyle = P2.rgba('#8a6a44', 0.35); g.lineWidth = 0.08 * ppu;
  for (let z = -60; z < 40; z += 1.2) for (let x = -60; x < 60; x += 2.4) { const o = (Math.round(z / 1.2) % 2) * 1.2; g.beginPath(); g.moveTo(X(x + o), Z(z)); g.lineTo(X(x + o + 1.2), Z(z + 1.2)); g.stroke(); }
  torn([[-18, -4], [18, -4], [18, 14], [-18, 14]], P2.rgba('#8a3a2e', 0.85));
  g.fillStyle = P2.rgba('#b9584a', 0.5); for (let k = 0; k < 400; k++) { g.beginPath(); g.arc(X(-18 + r() * 36), Z(-4 + r() * 18), 0.08 * ppu, 0, 7); g.fill(); }
});

// ---- the back wall: a curtain card cut by the top edge ----------------------------------------------------------------
const curtain = [P2.shape.rect(56, 16), (P) => { const { box } = P; plain(C.wall, 0.08)(P);
  P.draw((g) => { for (let x = box.x0; x < box.x1; x += 1.4) { g.fillStyle = P2.rgba('#3a4552', 0.55); g.fillRect(x, box.y0, 0.5, box.h); g.fillStyle = P2.rgba('#6b7a8c', 0.35); g.fillRect(x + 0.6, box.y0, 0.25, box.h); } });
  P.layer((g) => { g.fillStyle = '#c9a65a'; g.fillRect(box.x0 - 1, box.y0 + box.h * 0.1, box.w + 2, 0.25); }, '#c9a65a', { lip: 0.5 }); }];
H.popup(...curtain, { x: 0, z: -16, yaw: 0 });

// ---- the panel table: a platform with a cloth front and a deck for the microphones and papers --------------------
const TW = 20, TD = 3.4, TH = 1.7;
const table = platform({ w: TW, d: TD, h: TH, paper: H.paper, seed: 931, print: H.cardOpts(0, -9),
  paints: { face: (P) => { const { box } = P; plain(C.cloth, 0.06)(P); P.layer((g) => { g.fillStyle = C.skirt; g.fillRect(box.x0 - 1, box.y0 - 1, box.w + 2, box.h * 0.62); }, C.skirt, { lip: 0.8 }); P.marks('stripe', { color: '#3a5040', alpha: 0.3, size: 0.04, region: { ...box, y1: box.y0 + box.h * 0.6 } }); },
    deck: plain(C.cloth, 0.05), support: plain(C.skirt, 0.08) } });
const tableH = H.popup(null, null, { node: table, height: TH, x: 0, z: -7.6, level: true });
// the panel: four seated men behind the table (upper bodies), the spokesman second from the left holding the paper
const official = (holding) => FIG.official({ paper: holding });
rnd = P2.rng(5);
[-6.5, -2.2, 2.2, 6.5].forEach((x, i) => H.popup(...official(i === 1), { x, z: -11.3, yaw: 0, scale: 1.85, res: 1 }));
H.spots.spokesman = [-2, -10];
// microphones, glasses and papers on the table deck (deck frame: x along the table, z 0 at its front edge to -TD)
const mic = () => piece((g, ink) => { g.fillStyle = ink('#2a2a2c'); D.rect(g, -0.3, 0, 0.6, 0.12, 0.04); D.poly(g, [[-0.04, 0.1], [0.04, 0.1], [0.3, 1.3], [0.22, 1.32]]); D.ell(g, 0.28, 1.38, 0.14, 0.2); }, 0.9, 1.7, 'mic');
const glass = () => piece((g, ink) => { g.fillStyle = ink('#d8e6ec'); D.poly(g, [[-0.18, 0], [0.18, 0], [0.22, 0.55], [-0.22, 0.55]]); g.fillStyle = ink('#9fb8c4', 'print'); D.rect(g, -0.16, 0.05, 0.32, 0.22); }, 0.5, 0.6, 'glass');
let o = tableH.order + 0.5;
for (const x of [-7.6, -6.3, -3.6, -2.4, -1.4, 0.4, 3.6, 4.6, 7.4]) H.popup(...mic(), { parent: table.userData.deck, x, z: -0.9 - rnd() * 0.5, yaw: 0, order: (o += 0.01), scale: 1.2 });
for (const x of [-5, 1, 5]) H.popup(...glass(), { parent: table.userData.deck, x, z: -1.4, yaw: 0, order: (o += 0.01) });
for (const [x, w] of [[-8.5, 1], [-4.2, 1.2], [3, 1], [8.2, 0.9]]) H.popup(...piece((g, ink) => { g.fillStyle = ink('#efe6d2'); D.rect(g, -0.6 * w, 0, 1.2 * w, 0.55, 0.03); g.fillStyle = ink('#3a3a3a', 'print'); D.rect(g, -0.45 * w, 0.22, 0.9 * w, 0.1); }, 1.4 * w, 0.6, 'name plate'), { parent: table.userData.deck, x, z: -0.4, yaw: 0, order: (o += 0.01) });

// ---- the press: rows of journalists seen from behind, TV cameras on tripods, photographers -------------------------
const back = () => FIG.back();
rnd = P2.rng(21);
for (let row = 0; row < 4; row++) for (let k = 0; k < 9; k++) { const x = -14 + k * 3.4 + (row % 2) * 1.6 + between(-0.4, 0.4), z = -1.5 + row * 3.2 + between(-0.3, 0.3); if ((Math.abs(x) < 1.2 && row < 2) || (x > 10.5 && z > 4.5) || (x < -10.5 && z > 4.5)) continue; H.popup(...back(), { x, z, yaw: 0, scale: between(1.25, 1.4), res: 0.7 }); }
const tvcam = () => piece((g, ink) => { g.fillStyle = ink('#3a3a3c'); D.poly(g, [[-1.0, 0], [-0.85, 0], [0, 2.6], [0.85, 0], [1.0, 0], [0.1, 2.9], [-0.1, 2.9]]); g.fillStyle = ink('#4a4c50'); D.rect(g, -0.9, 2.8, 1.8, 1.0, 0.1); D.rect(g, 0.85, 3.0, 0.6, 0.6, 0.05); g.fillStyle = ink(C.red, 'print'); D.ell(g, -0.6, 3.6, 0.1, 0.1); g.fillStyle = ink('#8a8c90', 'print'); D.rect(g, -0.9, 3.3, 1.8, 0.08); }, 3.2, 4.1, 'tv camera');
for (const [x, z] of [[-11, -5], [10.5, -5.2], [0.4, 11]]) H.popup(...tvcam(), { x, z, yaw: 0, scale: 1.4 });
for (const [x, z] of [[-16.5, -3], [15.5, -1]]) H.lamp(x, 6, z, 1.0, 14);
H.lamp(0, 7, -9, 1.6, 16);

// ---- the desk with the regulation text (front right): a paper lying flat, a stamp, a pen ---------------------------
{ const desk = platform({ w: 7, d: 4.2, h: 2.0, paper: H.paper, seed: 951, print: H.cardOpts(15, 6), paints: { face: plain('#7a5a3a', 0.1), deck: (P) => { plain('#8a6a46', 0.08)(P); P.marks('hatch', { color: '#6a4a2a', alpha: 0.3, size: 0.06 });
    const { box } = P; const sheetAt = (x0, y0, w, h, a, stamp) => { P.layer((g) => { g.save(); g.translate(x0 + w / 2, y0 + h / 2); g.rotate(a); g.fillStyle = '#fbf6ea'; g.fillRect(-w / 2, -h / 2, w, h);
        g.fillStyle = '#3a3a3a'; g.fillRect(-w * 0.25, h * 0.36, w * 0.5, 0.12); for (let y = -h * 0.38; y < h * 0.28; y += 0.22) g.fillRect(-w * 0.4, y, w * (0.55 + ((y * 7 + 9) % 1) * 0.3), 0.06);
        if (stamp) { g.strokeStyle = '#3a5a9a'; g.lineWidth = 0.1; g.beginPath(); g.arc(w * 0.22, -h * 0.3, 0.4, 0, 7); g.stroke(); g.beginPath(); g.arc(w * 0.22, -h * 0.3, 0.24, 0, 7); g.stroke(); g.fillStyle = '#3a5a9a'; g.fillRect(w * 0.22 - 0.3, -h * 0.3 - 0.04, 0.6, 0.08); }
        g.restore(); }, '#fbf6ea', { lip: 0.8 }); };
    sheetAt(box.x0 + 0.5, box.y0 + 0.3, 3.0, 3.6, 0.1, true); sheetAt(box.x0 + 3.7, box.y0 + 0.4, 2.6, 3.2, -0.18, false); }, support: plain('#6a4a2a', 0.1) } });
  const dh = H.popup(null, null, { node: desk, height: 2.0, x: 15, z: 8.4, level: true });
  const sheet = (w, h, stamp, seed) => { const g = new H.THREE.Group(); const [pts, paint] = piece((gg, ink) => { gg.fillStyle = ink('#fbf6ea'); D.rect(gg, 0, 0, w, h, 0.02); gg.fillStyle = ink('#3a3a3a', 'print'); D.rect(gg, w * 0.25, h * 0.88, w * 0.5, 0.12); for (let y = h * 0.12; y < h * 0.8; y += 0.22) D.rect(gg, w * 0.1, y, w * (0.55 + ((y * 7) % 1) * 0.3), 0.06);
      if (stamp) { gg.fillStyle = ink('#3a5a9a', 'print'); D.ell(gg, w * 0.75, h * 0.18, 0.42, 0.42); gg.fillStyle = ink('#fbf6ea', 'print'); D.ell(gg, w * 0.75, h * 0.18, 0.3, 0.3); gg.fillStyle = ink('#3a5a9a', 'print'); D.ell(gg, w * 0.75, h * 0.18, 0.12, 0.12); } }, w + 0.1, h + 0.1, 'sheet');
    const m = card(pts, paint, seed); g.add(m); return g; };
  let od = dh.order + 0.5;

  H.popup(...piece((g, ink) => { g.fillStyle = ink('#5a3a2a'); D.rect(g, -0.25, 0, 0.5, 0.25, 0.05); D.rect(g, -0.08, 0.25, 0.16, 0.5); D.ell(g, 0, 0.85, 0.2, 0.16); }, 0.6, 1.1, 'stamp'), { parent: desk.userData.deck, x: 2.6, z: -2.8, yaw: 0, order: (od += 0.01) });
  H.spots.desk = [15, 6.5]; H.lamp(15, 5, 7, 1.2, 9); }

// ---- the news corner (front left): a TV set with a glowing screen and a telex printing a strip ---------------------
{ const tv = [P2.shape.rect(3.6, 3.0), (P) => { const { box } = P; plain('#5a4a3a', 0.08)(P); P.layer((g) => { g.fillStyle = '#2a2a2c'; g.fillRect(box.x0 + 0.3, box.y0 + 0.5, 2.5, 2.1); }, '#2a2a2c', { lip: 0.6 });
    P.draw((g) => { g.fillStyle = '#9ec3e6'; g.fillRect(box.x0 + 0.45, box.y0 + 0.65, 2.2, 1.8); g.fillStyle = '#3a4a6a'; g.beginPath(); g.ellipse(box.x0 + 1.55, box.y0 + 1.75, 0.32, 0.38, 0, 0, 7); g.fill(); g.fillRect(box.x0 + 1.0, box.y0 + 0.65, 1.1, 0.8); g.fillStyle = '#efe6d2'; g.fillRect(box.x0 + 0.55, box.y0 + 0.75, 2.0, 0.22); });
    P.glow((g) => g.fillRect(box.x0 + 0.45, box.y0 + 0.65, 2.2, 1.8));
    P.draw((g) => { g.fillStyle = '#c9a65a'; for (const y of [0.9, 1.5]) { g.beginPath(); g.arc(box.x0 + 3.2, box.y0 + y, 0.14, 0, 7); g.fill(); } }); }];
  const stand = platform({ w: 5, d: 3.4, h: 2.0, paper: H.paper, seed: 971, print: H.cardOpts(-15, 7), paints: { face: plain('#6a4a2a', 0.1), deck: plain('#7a5a3a', 0.08), support: plain('#5a3a20', 0.1) } });
  const sh = H.popup(null, null, { node: stand, height: 2.0, x: -15, z: 8.4, level: true });
  const tvH = H.popup(...tv, { parent: stand.userData.deck, x: -0.6, z: -2.4, yaw: 0, order: sh.order + 0.5 }); H.glowing(tvH.group);
  H.popup(...piece((g, ink) => { g.fillStyle = ink('#8a8a80'); D.rect(g, -0.8, 0, 1.6, 0.8, 0.1); g.fillStyle = ink('#fbf6ea'); D.rect(g, -0.25, 0.7, 0.5, 1.5); g.fillStyle = ink('#3a3a3a', 'print'); for (let y = 0.9; y < 2.1; y += 0.18) D.rect(g, -0.18, y, 0.3, 0.04); }, 1.8, 2.3, 'telex'), { parent: stand.userData.deck, x: 1.6, z: -1.6, yaw: 0, order: sh.order + 0.6 });
  H.spots.news = [-15, 6.5]; H.lamp(-15, 5, 7, 0.8, 8); }

H.setHero(H.popup(...back(), { x: -40, z: 30 }), {});
H.start();
