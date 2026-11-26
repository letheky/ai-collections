// Paper maps for the Berlin documentary: ?map=city (Berlin split in four sectors, the Wall, landmarks, the bridge) or
// ?map=europe (GDR, FRG, CSSR, Austria, Hungary, Poland, the two detours of 1989). ?state=demo adds the 4 Nov crowd.
/* PAPER SPEC
BRIEF    a school-atlas map printed on card, seen as a pop-up: regions are torn coloured paper, borders are cut paper bands,
         the Wall and landmarks fold up from it. Day light, calm. Labels printed in Vietnamese on the ground.
PALETTE  ground #d9cfb6 (atlas cream); East #d7a77a (warm ochre), West #8fb3a8 (sea-green) split in three tints; GDR
         beyond the city #c9bf9f; Wall #8a8478; accents: route red #c0392b, Spree blue #6fa3b8, ink #2a2420
LIGHT    golden-hour key from the west-south-west, warm shadows
LAYOUT   city: the West enclave left of the inner border, the East right; the border bends north-south; the bridge pin at
         the north end of the inner border. europe: GDR top centre, routes run south then west
*/
import * as P2 from 'papercraft/lib/paperkit-2d.js';
import { createHarness } from '../berlin/harness.js';

const Q = new URLSearchParams(location.search), MAP = Q.get('map') || 'city', STATE = Q.get('state') || '';
const C = { ground: '#d9cfb6', east: '#d7a77a', west: ['#9cbcb0', '#8fb3a8', '#a9c3b2'], gdr: '#cbc0a0', wall: '#8a8478', red: '#c0392b', spree: '#6fa3b8',
  ink: '#2a2420', cream: '#efe6d2', roof: ['#b8553e', '#9c5636', '#7a6a5a', '#c47a4a'], wallW: '#e4dccb', green: '#6f8f5a', frg: '#a8c2b0', pol: '#d8b98e', cssr: '#c9a88a', aut: '#b9b48c', hun: '#d2b07a', yug: '#c4b9a4' };
const H = createHarness({ ground: C.ground, mood: 'golden', view: { pitch: 50, dist: MAP === 'europe' ? 92 : 78, target: MAP === 'europe' ? [0, 1, -2] : [0, 1, -4] },
  bounds: { x0: -70, x1: 70, z0: -66, z1: 44 }, play: false, subject: [0, -4], focus: [0, 0, MAP === 'europe' ? -2 : -4],
  lens: { focusBand: 0.5, ramp: 0.5, maxBlur: 7 } });
const D = P2.draw2;
let rnd = P2.rng(61);
const between = (a, b) => a + rnd() * (b - a), pick = (a) => a[Math.floor(rnd() * a.length)];
const piece = (draw, w, h, name) => P2.drawnPiece(draw, { w, h, name });
const plain = (c, k = 0.1) => (P) => { P.gradient(P2.shade(c, k), P2.shade(c, -k), 0.5); P.felt(0.4); P.innerShade(P2.shade(c, -0.55), { alpha: 0.3, blurPx: 8 }); };
const label = (g, X, Z, ppu, text, x, z, size = 1.6, col = C.ink, weight = 700) => { g.save(); g.font = `${weight} ${size * ppu}px "DejaVu Sans", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = P2.rgba(col, 0.85); g.fillText(text, X(x), Z(z)); g.restore(); };
const poly = (g, X, Z, pts) => { g.beginPath(); pts.forEach(([x, z], i) => (i ? g.lineTo(X(x), Z(z)) : g.moveTo(X(x), Z(z)))); g.closePath(); };
const keep = [], mark = (x, z, r) => keep.push([x, z, r]);

// a fold-up wall slab (concrete, rounded top) and a watchtower
const slab = () => piece((g, ink) => { g.fillStyle = ink('#cfc9bb'); D.rect(g, -0.7, 0, 1.4, 1.5); g.fillStyle = ink('#e2ddd0'); D.rect(g, -0.75, 1.45, 1.5, 0.3, 0.14); g.fillStyle = ink('#a39e90', 'print'); D.rect(g, -0.7, 0.7, 1.4, 0.05); }, 1.6, 1.8, 'slab');
const tower = () => piece((g, ink) => { g.fillStyle = ink('#bdb7a8'); D.rect(g, -0.28, 0, 0.56, 3.4); g.fillStyle = ink('#a9a395'); D.rect(g, -0.6, 3.3, 1.2, 0.9, 0.08); g.fillStyle = ink('#3c3f44', 'print'); D.rect(g, -0.5, 3.6, 1.0, 0.35); g.fillStyle = ink('#6a6458'); D.rect(g, -0.66, 4.15, 1.32, 0.16); }, 1.4, 4.4, 'watchtower');
const house = (c) => piece((g, ink) => { g.fillStyle = ink(C.wallW); D.rect(g, -0.9, 0, 1.8, 1.4); g.fillStyle = ink(c); D.poly(g, [[-1.05, 1.3], [1.05, 1.3], [0.6, 2.0], [-0.6, 2.0]]); g.fillStyle = ink('#5a4a3a', 'print'); for (const x of [-0.5, 0.1]) D.rect(g, x, 0.55, 0.35, 0.4); g.fillStyle = ink(P2.shade(c, -0.25), 'print'); D.rect(g, -0.9, 1.3, 1.8, 0.08); }, 2.2, 2.1, 'house');
const block = (c) => piece((g, ink) => { g.fillStyle = ink(c); D.rect(g, -1.1, 0, 2.2, 3.0); g.fillStyle = ink(P2.shade(c, -0.35), 'print'); for (let y = 0.4; y < 2.7; y += 0.55) for (let x = -0.85; x < 0.9; x += 0.5) D.rect(g, x, y, 0.26, 0.3); g.fillStyle = ink(P2.shade(c, -0.2)); D.rect(g, -1.15, 2.9, 2.3, 0.15); }, 2.4, 3.2, 'block');
const tree = () => piece((g, ink) => { g.fillStyle = ink('#6a4a32'); D.rect(g, -0.1, 0, 0.2, 0.9); g.fillStyle = ink(C.green); D.ell(g, 0, 1.4, 0.75, 0.7); g.fillStyle = ink('#88a86a', 'print'); for (let k = 0; k < 7; k++) D.ell(g, (rnd() - 0.5) * 0.9, 1.2 + rnd() * 0.6, 0.14, 0.09); }, 1.7, 2.2, 'tree');
const pin = (text) => piece((g, ink) => { g.fillStyle = ink('#3c3a36'); D.rect(g, -0.07, 0, 0.14, 4.2); g.fillStyle = ink(C.red); D.poly(g, [[0.07, 4.2], [2.6, 3.75], [0.07, 3.3]]); g.fillStyle = ink(C.cream, 'print'); D.ell(g, 0.7, 3.75, 0.18, 0.18); }, 2.8, 4.4, 'pin');
const person = (h = 1.5) => { const coat = pick(['#b0803a', '#8b3a2e', '#3f5a7a', '#5d4a6a', '#7a6a50', '#4f6b5e']); return piece((g, ink) => { g.fillStyle = ink('#2f2d2b'); D.rect(g, -0.15, 0, 0.3, h * 0.4); g.fillStyle = ink(coat); D.rect(g, -0.22, h * 0.32, 0.44, h * 0.45, 0.08); g.fillStyle = ink('#f1d9b8'); D.rect(g, -0.05, h * 0.72, 0.1, h * 0.12); D.ell(g, 0, h * 0.86, 0.13, 0.15); }, 0.6, h * 1.05, 'figure'); };
const banner = () => piece((g, ink) => { g.fillStyle = ink('#5a4a3a'); D.rect(g, -1.3, 0, 0.1, 2.8); D.rect(g, 1.2, 0, 0.1, 2.8); g.fillStyle = ink(C.cream); D.rect(g, -1.3, 1.9, 2.6, 0.9); g.fillStyle = ink(C.red, 'print'); D.rect(g, -1.1, 2.2, 2.2, 0.12); D.rect(g, -1.1, 2.45, 1.6, 0.12); }, 2.8, 3.0, 'banner');

if (MAP === 'city') {
  // ---- Berlin: an oval city, the inner border north-south, West sectors F / UK / US from north to south --------------
  const CX = 0, CZ = -4, RX = 30, RZ = 19;
  const rim = (a) => 1 + 0.07 * Math.sin(3 * a + 0.4) + 0.05 * Math.sin(5 * a + 1.3);
  const cityPts = Array.from({ length: 90 }, (_, i) => { const a = i / 90 * Math.PI * 2; return [CX + Math.cos(a) * RX * rim(a), CZ + Math.sin(a) * RZ * rim(a)]; });
  const borderX = (z) => -2 + Math.sin(z * 0.17) * 2.2 + Math.sin(z * 0.4 + 1) * 0.8;   // the inner border
  const insideCity = (x, z) => { const a = Math.atan2((z - CZ) / RZ, (x - CX) / RX); return ((x - CX) / (RX * rim(a))) ** 2 + ((z - CZ) / (RZ * rim(a))) ** 2 < 1; };
  const spree = Array.from({ length: 60 }, (_, i) => { const x = -36 + i * 1.2; return [x, CZ + 1 + Math.sin(x * 0.12) * 3 + Math.sin(x * 0.31) * 1.2]; });
  H.printGround(({ g, ppu, X, Z, washes, torn, line, bandOf }) => {
    washes([C.ground, C.gdr, '#d2c7aa']);
    torn(cityPts, P2.rgba(C.east, 0.95));
    g.save(); poly(g, X, Z, cityPts); g.clip();
    const west = (z0, z1, col) => { const pts = [[-80, z0]]; for (let z = z0; z <= z1; z += 0.5) pts.push([borderX(z), z]); pts.push([-80, z1]); g.fillStyle = col; poly(g, X, Z, pts); g.fill(); };
    west(-40, -9, C.west[0]); west(-9, 1, C.west[1]); west(1, 40, C.west[2]);
    g.restore();
    line(spree, 1.1, P2.rgba(C.spree, 0.9));
    // the Wall: a dark band along the inner border and around the West's outer edge
    line(Array.from({ length: 81 }, (_, i) => { const z = CZ - RZ * 1.1 + i * (RZ * 2.2 / 80); return [borderX(z), z]; }).filter(([x, z]) => insideCity(x, z)), 0.9, P2.rgba(C.wall, 0.95));
    line(cityPts.filter(([x, z]) => x < borderX(z) + 0.5).concat([]), 0.9, P2.rgba(C.wall, 0.9));
    label(g, X, Z, ppu, 'TÂY BERLIN', -16, -4, 2.3); label(g, X, Z, ppu, 'ĐÔNG BERLIN', 16, 5, 2.3);
    label(g, X, Z, ppu, 'Pháp', -14, -15, 1.4, '#3a4a44', 600); label(g, X, Z, ppu, 'Anh', -19, 2.5, 1.4, '#3a4a44', 600); label(g, X, Z, ppu, 'Mỹ', -12, 10, 1.4, '#3a4a44', 600);
    label(g, X, Z, ppu, 'Liên Xô', 18, 9, 1.4, '#5a3a24', 600); label(g, X, Z, ppu, 'CỘNG HÒA DÂN CHỦ ĐỨC', 0, 21, 1.7, '#5a4a34', 700);
  });
  // the Wall folds up along the inner border and the West's rim; watchtowers every so often
  let n = 0;
  for (let z = CZ - RZ; z <= CZ + RZ; z += 1.7) { const x = borderX(z); if (!insideCity(x, z)) continue; H.popup(...slab(), { x: x + 0.4, z, yaw: 0, res: 0.6 }); if (n++ % 5 === 2) H.popup(...tower(), { x: x + 1.6, z: z + 0.4, yaw: 0, res: 0.7 }); }
  for (let i = 0; i < cityPts.length; i += 2) { const [x, z] = cityPts[i]; if (x > borderX(z) - 1) continue; H.popup(...slab(), { x, z, yaw: 0, res: 0.6 }); if (i % 10 === 4) H.popup(...tower(), { x: x + 0.8, z: z + 0.6, yaw: 0, res: 0.7 }); }
  // landmarks: the TV tower (East), the Brandenburg Gate (on the border), the bridge pin at the north end of the border
  const tv = piece((g, ink) => { g.fillStyle = ink('#d8d4cc'); D.poly(g, [[-0.5, 0], [0.5, 0], [0.22, 6.5], [-0.22, 6.5]]); D.ell(g, 0, 7.1, 0.9, 0.85); D.rect(g, -0.1, 7.8, 0.2, 2.2); g.fillStyle = ink('#c0392b', 'print'); D.rect(g, -0.1, 9.4, 0.2, 0.6); g.fillStyle = ink('#9aa0a8', 'print'); D.rect(g, -0.9, 7.0, 1.8, 0.18); }, 2, 10.2, 'tv tower');
  H.popup(...tv, { x: 9, z: -1.5, cross: true, res: 0.9 }); mark(9, -1.5, 3);
  const gate = piece((g, ink) => { g.fillStyle = ink('#e0d2b0'); D.rect(g, -2.2, 2.0, 4.4, 0.7, 0.05); for (let k = 0; k < 6; k++) D.rect(g, -2.1 + k * 0.82, 0, 0.32, 2.1); g.fillStyle = ink('#6f8a6a'); D.rect(g, -0.5, 2.7, 1.0, 0.6, 0.1); g.fillStyle = ink('#b9a882', 'print'); D.rect(g, -2.2, 2.3, 4.4, 0.08); }, 4.6, 3.4, 'gate');
  H.popup(...gate, { x: borderX(-1) + 1.8, z: -1, yaw: 0, scale: 1.1 }); mark(borderX(-1) + 1.8, -1, 3);
  { const z = CZ - RZ * 0.82, x = borderX(z); H.spots.bridge = [x, z]; H.popup(...pin('Bornholmer'), { x: x + 1.2, z: z + 0.6, yaw: 0, scale: 1.3 }); mark(x, z, 3);
    H.popup(...piece((g, ink) => { g.fillStyle = ink('#6d7d74'); D.poly(g, [[-2.2, 0], [2.2, 0], [2.0, 0.5], [0, 1.4], [-2.0, 0.5]]); g.fillStyle = ink('#c9d2c6', 'print'); for (let x = -1.8; x < 1.9; x += 0.45) D.rect(g, x, 0.1, 0.06, 0.6); }, 4.6, 1.5, 'bridge'), { x: x - 1.6, z: z + 1.2, yaw: 0 }); }
  for (const [x, z, r] of [[-16, -4, 5.5], [16, 5, 6], [-14, -15, 2.5], [-19, 2.5, 2.5], [-12, 10, 2.5], [18, 9, 3], [0, 21, 6]]) mark(x, z, r);
  // a paper city: houses and blocks in both halves, trees in the parks
  rnd = P2.rng(4);
  for (let k = 0; k < 520; k++) {
    const x = between(-34, 34), z = between(-26, 16);
    if (!insideCity(x, z) || Math.abs(x - borderX(z)) < 2.4 || keep.some(([a, b, r]) => Math.hypot(x - a, z - b) < r) || !H.inFrame(x, z, 0.1, 3)) continue;
    if (spree.some(([sx, sz]) => Math.hypot(x - sx, z - sz) < 1.4)) continue;
    const east = x > borderX(z), r = rnd();
    if (r < 0.22) H.popup(...tree(), { x, z, res: 0.55, scale: between(0.8, 1.1) });
    else if (r < 0.55) H.popup(...block(east ? pick(['#d8c3a0', '#c9b08a', '#bfae93']) : pick(['#cfd8cc', '#bcc9bf', '#d9d2c0'])), { x, z, res: 0.55, scale: between(0.8, 1.05) });
    else H.popup(...house(pick(C.roof)), { x, z, res: 0.55, scale: between(0.8, 1.05) });
    keep.push([x, z, 1.6]);
  }
  if (STATE === 'demo') {   // 4 November 1989: hundreds of thousands at Alexanderplatz, by the TV tower
    rnd = P2.rng(11);
    for (let k = 0; k < 120; k++) { const a = rnd() * 6.28, r = Math.sqrt(rnd()) * 5.5, x = 9 + Math.cos(a) * r * 1.3, z = -1 + Math.sin(a) * r * 0.8; if (Math.hypot(x - 9, z + 1.5) < 1.2) continue; H.popup(...person(), { x, z, res: 0.5, scale: between(0.9, 1.1) }); }
    for (const [x, z] of [[6, 1.5], [12, 2], [10.5, -4.5], [5.5, -3]]) H.popup(...banner(), { x, z, yaw: 0, res: 0.7 });
  }
  H.setHero(H.popup(...person(1.6), { x: -40, z: 30 }), {});
} else {
  // ---- Central Europe, autumn 1989: the two detours to the West ------------------------------------------------------
  const P = (lon, lat) => [(lon - 15.5) * 3.4, -(lat - 50.2) * 5.2];
  const shapes = {
    gdr: [[11, 54], [12.3, 54.4], [14.2, 53.9], [14.4, 53.2], [14.6, 52.6], [14.7, 51.3], [15, 51], [14.3, 50.9], [12.9, 50.4], [12.1, 50.3], [11.9, 50.5], [10.9, 50.4], [10.1, 50.7], [10, 51.5], [10.6, 51.9], [11, 52.3], [10.8, 53], [10.9, 53.6]],
    frg: [[8.6, 54.9], [10, 54.6], [11, 54], [10.9, 53.6], [10.8, 53], [11, 52.3], [10.6, 51.9], [10, 51.5], [10.1, 50.7], [10.9, 50.4], [11.9, 50.5], [12.1, 50.3], [12.5, 49.8], [13, 49.3], [13.8, 48.7], [13, 48.3], [12.9, 47.7], [10.5, 47.5], [9.5, 47.6], [7.6, 47.6], [7.6, 48.6], [8.2, 49], [6.4, 49.5], [6.1, 50.8], [5.9, 51.8], [7, 52.2], [7, 53.3], [7.3, 53.7]],
    pol: [[14.2, 53.9], [18, 54.8], [23.5, 54.3], [23.7, 52.6], [24.1, 50.9], [22.6, 49.1], [19.3, 49.4], [18.8, 49.5], [17, 50.3], [15, 51], [14.7, 51.3], [14.6, 52.6], [14.4, 53.2]],
    cssr: [[12.1, 50.3], [12.9, 50.4], [14.3, 50.9], [15, 51], [17, 50.3], [18.8, 49.5], [19.3, 49.4], [22.6, 49.1], [22.1, 48.4], [20.5, 48.5], [18.9, 47.8], [17.2, 48], [16.9, 48.6], [15, 49], [13.8, 48.7], [13, 49.3], [12.5, 49.8]],
    aut: [[9.5, 47.6], [10.5, 47.5], [12.9, 47.7], [13, 48.3], [13.8, 48.7], [15, 49], [16.9, 48.6], [17.2, 48], [16.5, 47.5], [16.1, 46.9], [14.5, 46.4], [12.4, 46.7], [10.5, 46.9], [9.5, 47.1]],
    hun: [[16.1, 46.9], [16.5, 47.5], [17.2, 48], [18.9, 47.8], [20.5, 48.5], [22.1, 48.4], [22.9, 47.9], [21.1, 46.2], [18.8, 45.9], [17.3, 45.9], [16.4, 46.5]],
  };
  const col = { gdr: C.east, frg: C.frg, pol: C.pol, cssr: C.cssr, aut: C.aut, hun: C.hun };
  const names = { gdr: ['ĐÔNG ĐỨC', 12.4, 52.2], frg: ['TÂY ĐỨC', 8.6, 50.6], pol: ['BA LAN', 19.5, 52.2], cssr: ['TIỆP KHẮC', 16.3, 49.6], aut: ['ÁO', 13.6, 47.2], hun: ['HUNGARY', 19.3, 47.0] };
  const routeA = [[13.4, 52.5], [14.4, 50.1], [13.2, 49.6], [11.5, 49.6], [10.2, 49.9]];          // via CSSR to the FRG (Nov)
  const routeB = [[13.4, 52.5], [14.4, 50.1], [17.1, 48.15], [19.0, 47.5], [16.9, 47.8], [16.4, 48.2], [13.0, 48.0], [11.6, 48.1]];   // via Hungary and Austria
  H.printGround(({ g, ppu, X, Z, washes, torn, line }) => {
    washes([C.ground, '#d2c7aa', '#ddd3bb']);
    for (const [k, pts] of Object.entries(shapes)) torn(pts.map(([lo, la]) => P(lo, la)), P2.rgba(col[k], 0.95));
    for (const [k, [t, lo, la]] of Object.entries(names)) { const [x, z] = P(lo, la); label(g, X, Z, ppu, t, x, z, 1.7); }
    const dash = (pts, c) => { const P2pts = pts.map(([lo, la]) => P(lo, la)); g.save(); g.strokeStyle = P2.rgba(c, 0.9); g.lineWidth = 0.55 * ppu; g.setLineDash([1.4 * ppu, 0.9 * ppu]); g.lineCap = 'round'; g.beginPath(); P2pts.forEach(([x, z], i) => (i ? g.lineTo(X(x), Z(z)) : g.moveTo(X(x), Z(z)))); g.stroke(); g.restore(); };
    dash(routeB, C.red); dash(routeA, '#8a3a6a');
    const [bx, bz] = P(13.4, 52.5); g.fillStyle = C.ink; g.beginPath(); g.arc(X(bx), Z(bz), 0.7 * ppu, 0, 7); g.fill(); label(g, X, Z, ppu, 'Berlin', bx + 3.2, bz - 1.2, 1.3, C.ink, 600);
    const [vx, vz] = P(16.37, 48.2); g.beginPath(); g.arc(X(vx), Z(vz), 0.45 * ppu, 0, 7); g.fill(); label(g, X, Z, ppu, 'Viên', vx + 2.2, vz + 1.6, 1.1, C.ink, 600);
    const [px, pz] = P(14.42, 50.08); g.beginPath(); g.arc(X(px), Z(pz), 0.45 * ppu, 0, 7); g.fill(); label(g, X, Z, ppu, 'Praha', px - 3.2, pz - 0.2, 1.1, C.ink, 600);
    const [hx, hz] = P(19.04, 47.5); g.beginPath(); g.arc(X(hx), Z(hz), 0.45 * ppu, 0, 7); g.fill(); label(g, X, Z, ppu, 'Budapest', hx + 3.6, hz + 0.6, 1.1, C.ink, 600);
  });
  // the Hungarian-Austrian border fence, cut open; small Trabants on both routes; the Berlin Wall ring
  const fence = piece((g, ink) => { g.fillStyle = ink('#6a6d66'); for (let x = -1.8; x <= 1.8; x += 0.9) D.rect(g, x - 0.06, 0, 0.12, 1.8); g.fillStyle = ink('#8f928a', 'print'); for (let y = 0.3; y < 1.7; y += 0.35) D.rect(g, -1.8, y, 3.6, 0.05); }, 4, 1.9, 'fence');
  for (const [lo, la, yw] of [[16.55, 47.2, 0], [16.75, 47.9, 0]]) { const [x, z] = P(lo, la); H.popup(...fence, { x, z, yaw: yw, scale: 0.9 }); }
  const trab = (c) => piece((g, ink) => { g.fillStyle = ink(c); D.rect(g, -1.1, 0.25, 2.2, 0.55, 0.18); D.poly(g, [[-0.6, 0.75], [0.65, 0.75], [0.42, 1.12], [-0.42, 1.12]]); g.fillStyle = ink('#3a4048', 'print'); D.rect(g, -0.45, 0.8, 0.8, 0.25); g.fillStyle = ink('#2b2a28'); D.ell(g, -0.7, 0.23, 0.23, 0.23); D.ell(g, 0.7, 0.23, 0.23, 0.23); }, 2.3, 1.2, 'trabant');
  rnd = P2.rng(8);
  for (const [lo, la] of [[14.0, 51.2], [14.3, 50.6], [12.6, 49.6], [15.4, 49.3], [17.9, 47.9], [16.0, 48.0], [13.8, 48.05]]) { const [x, z] = P(lo, la); H.popup(...trab(pick(['#9fb7c4', '#d9c9a0', '#b9c79a', '#c98f6a'])), { x, z, res: 0.7, scale: 1.1 }); }
  { const [bx, bz] = P(13.4, 52.5); for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28; H.popup(...slab(), { x: bx + Math.cos(a) * 1.8, z: bz + Math.sin(a) * 1.2, yaw: 0, scale: 0.55, res: 0.6 }); } }
  // paper trees and towns scattered over the countries, never on the routes' labels
  for (const [, lo, la] of Object.values(names)) { const [x, z] = P(lo, la); mark(x, z, 6); }
  for (const pts of [routeA, routeB]) for (const [lo, la] of pts) { const [x, z] = P(lo, la); mark(x, z, 2.5); }
  rnd = P2.rng(5);
  for (let k = 0; k < 260; k++) { const x = between(-36, 36), z = between(-28, 22); if (!H.inFrame(x, z, 0.1, 2) || keep.some(([a, b, r]) => Math.hypot(x - a, z - b) < r)) continue;
    rnd() < 0.6 ? H.popup(...tree(), { x, z, res: 0.5, scale: between(0.7, 1.0) }) : H.popup(...house(pick(C.roof)), { x, z, res: 0.5, scale: between(0.7, 0.95) }); keep.push([x, z, 2.6]); }
  H.setHero(H.popup(...person(1.6), { x: -60, z: 40 }), {});
}
H.start();
