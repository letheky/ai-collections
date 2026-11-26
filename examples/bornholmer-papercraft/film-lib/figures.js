// Paper figures for the Berlin documentary: crowd members, border guards, journalists seen from behind, seated
// officials. Every figure is one card cut from a layered drawing (P2.drawnPiece): body parts are cut layers (a pale lip
// and a short shadow each), details are flat print. Proportions: toy-like, head ~1/5.5 of the height, chunky limbs.
import * as P2 from 'papercraft/lib/paperkit-2d.js';
const D = P2.draw2;

export function figures(rnd) {
  const between = (a, b) => a + rnd() * (b - a), pick = (a) => a[Math.floor(rnd() * a.length)];
  const SKIN = ['#f1d9b8', '#e8c9a4', '#dcb894', '#f0d2b0'], HAIR = ['#3a2a1a', '#6a4a2a', '#8a8a88', '#2a2420', '#b08a5a', '#a04a2a'];
  const COATS = ['#b0803a', '#8b3a2e', '#3f5a7a', '#5d4a6a', '#7a6a50', '#a2553a', '#4f6b5e', '#c9b48a', '#6a3a4a', '#38506a', '#9a6a3a'];
  const piece = (draw, w, h, name) => P2.drawnPiece(draw, { w, h, name });
  const face = (g, ink, cx, cy, s, skin) => {
    g.fillStyle = ink(skin); D.ell(g, cx, cy, 0.22 * s, 0.25 * s); D.ell(g, cx - 0.21 * s, cy, 0.05 * s, 0.07 * s); D.ell(g, cx + 0.21 * s, cy, 0.05 * s, 0.07 * s);
    g.fillStyle = ink('#2a1608', 'print'); D.ell(g, cx - 0.08 * s, cy + 0.01, 0.028 * s, 0.036 * s); D.ell(g, cx + 0.08 * s, cy + 0.01, 0.028 * s, 0.036 * s);
    g.fillStyle = ink('#e39a86', 'print'); D.ell(g, cx - 0.13 * s, cy - 0.07 * s, 0.045 * s, 0.03 * s); D.ell(g, cx + 0.13 * s, cy - 0.07 * s, 0.045 * s, 0.03 * s);
    g.fillStyle = ink(P2.shade(skin, -0.25), 'print'); D.ell(g, cx, cy - 0.04 * s, 0.025 * s, 0.035 * s);
  };
  const topping = (g, ink, style, cx, cy, s, hair) => {   // cy = head centre
    if (style === 'cap') { g.fillStyle = ink(pick(['#4a4038', '#5a5048', '#3c4a5a', '#6a5a40'])); D.poly(g, [[cx - 0.25 * s, cy + 0.12 * s], [cx + 0.25 * s, cy + 0.12 * s], [cx + 0.34 * s, cy + 0.17 * s], [cx + 0.18 * s, cy + 0.3 * s], [cx - 0.2 * s, cy + 0.3 * s]]); }
    else if (style === 'beanie') { const c = pick(['#c0392b', '#d9a03a', '#3f5a7a', '#efe6d2', '#4f6b5e']); g.fillStyle = ink(c); D.rect(g, cx - 0.23 * s, cy + 0.08 * s, 0.46 * s, 0.24 * s, 0.11 * s); g.fillStyle = ink(P2.shade(c, -0.25)); D.rect(g, cx - 0.24 * s, cy + 0.06 * s, 0.48 * s, 0.08 * s, 0.03); g.fillStyle = ink('#efe6d2'); D.ell(g, cx, cy + 0.34 * s, 0.08 * s, 0.07 * s); }
    else if (style === 'fur') { g.fillStyle = ink(pick(['#5a4030', '#7a6a5a', '#3a3028'])); D.rect(g, cx - 0.26 * s, cy + 0.06 * s, 0.52 * s, 0.3 * s, 0.08 * s); g.fillStyle = ink('#8a7a6a', 'print'); for (let k = 0; k < 5; k++) D.rect(g, cx - 0.22 * s + k * 0.1 * s, cy + 0.12 * s, 0.03 * s, 0.2 * s); }
    else if (style === 'scarf') { const c = pick(['#c0392b', '#d9a03a', '#6a3a4a', '#4f6b5e', '#efe6d2']); g.fillStyle = ink(c); D.poly(g, [[cx - 0.27 * s, cy - 0.12 * s], [cx - 0.25 * s, cy + 0.18 * s], [cx, cy + 0.32 * s], [cx + 0.25 * s, cy + 0.18 * s], [cx + 0.27 * s, cy - 0.12 * s], [cx + 0.2 * s, cy - 0.2 * s], [cx + 0.2 * s, cy + 0.12 * s], [cx - 0.2 * s, cy + 0.12 * s], [cx - 0.2 * s, cy - 0.2 * s]]); g.fillStyle = ink(P2.shade(c, 0.3), 'print'); D.ell(g, cx - 0.12 * s, cy + 0.2 * s, 0.03 * s, 0.03 * s); D.ell(g, cx + 0.1 * s, cy + 0.22 * s, 0.03 * s, 0.03 * s); }
    else { g.fillStyle = ink(hair); D.ell(g, cx, cy + 0.12 * s, 0.24 * s, 0.15 * s); D.rect(g, cx - 0.23 * s, cy, 0.08 * s, 0.14 * s, 0.03); D.rect(g, cx + 0.15 * s, cy, 0.08 * s, 0.14 * s, 0.03); }
  };

  /** A member of the crowd, facing the camera: coat (short or long), trousers or skirt, scarf, a hat or bare head,
   *  arms down, one arm raised, or holding a bag. */
  function person({ h = between(2.75, 3.15), wave = rnd() < 0.22 } = {}) {
    const coat = pick(COATS), dark = P2.shade(coat, -0.22), trou = pick(['#2f2d2b', '#3a3430', '#4a4440', '#2e3440']), skin = pick(SKIN), hair = pick(HAIR);
    const long = rnd() < 0.45, style = pick(['cap', 'beanie', 'bare', 'scarf', 'fur', 'bare']), scarf = pick(['#c0392b', '#efe6d2', '#d9a03a', '#3f5a7a', '#6a3a4a', null]);
    const bag = !wave && rnd() < 0.25, s = h / 3, bottom = (long ? 0.2 : 0.33) * h, shY = 0.73 * h;
    return piece((g, ink) => {
      g.fillStyle = ink(trou); D.poly(g, [[-0.26 * s, 0.1], [-0.05 * s, 0.1], [-0.07 * s, bottom + 0.2], [-0.25 * s, bottom + 0.2]]); D.poly(g, [[0.05 * s, 0.1], [0.26 * s, 0.1], [0.25 * s, bottom + 0.2], [0.07 * s, bottom + 0.2]]);
      g.fillStyle = ink('#1f1b18'); D.ell(g, -0.18 * s, 0.08, 0.15 * s, 0.08); D.ell(g, 0.18 * s, 0.08, 0.15 * s, 0.08);
      g.fillStyle = ink(coat); D.poly(g, [[-0.46 * s, bottom], [0.46 * s, bottom], [0.4 * s, shY - 0.08], [0.3 * s, shY + 0.04], [-0.3 * s, shY + 0.04], [-0.4 * s, shY - 0.08]]);
      g.fillStyle = ink(P2.shade(coat, 0.18), 'print'); D.poly(g, [[-0.16 * s, shY + 0.02], [0, shY - 0.3 * s], [0.16 * s, shY + 0.02]]);
      g.fillStyle = ink(dark, 'print'); D.rect(g, -0.015, bottom + 0.05, 0.03, shY - bottom - 0.3 * s); for (const y of [0.42, 0.55, 0.66]) D.ell(g, 0.08 * s, y * h, 0.035 * s, 0.035 * s);
      D.rect(g, -0.36 * s, bottom + 0.25 * h * 0.3, 0.18 * s, 0.05 * s); D.rect(g, 0.18 * s, bottom + 0.25 * h * 0.3, 0.18 * s, 0.05 * s);
      if (rnd() < 0.35) { g.fillStyle = ink(P2.shade(coat, -0.35), 'print'); D.rect(g, -0.44 * s, 0.47 * h, 0.88 * s, 0.07 * s); }
      // arms: sleeves hanging beside the coat (a cut layer each), hands
      g.fillStyle = ink(dark); D.poly(g, [[-0.42 * s, shY - 0.02], [-0.3 * s, shY - 0.02], [-0.4 * s, 0.4 * h], [-0.55 * s, 0.42 * h]]);
      if (wave) { D.poly(g, [[0.3 * s, shY - 0.02], [0.44 * s, shY - 0.1], [0.66 * s, 0.98 * h], [0.52 * s, 1.0 * h]]); g.fillStyle = ink(skin); D.ell(g, -0.48 * s, 0.39 * h, 0.08 * s, 0.08 * s); D.ell(g, 0.6 * s, 1.02 * h, 0.09 * s, 0.09 * s); }
      else { D.poly(g, [[0.3 * s, shY - 0.02], [0.42 * s, shY - 0.02], [0.55 * s, 0.42 * h], [0.4 * s, 0.4 * h]]); g.fillStyle = ink(skin); D.ell(g, -0.48 * s, 0.39 * h, 0.08 * s, 0.08 * s); D.ell(g, 0.48 * s, 0.39 * h, 0.08 * s, 0.08 * s); }
      if (bag) { g.fillStyle = ink(pick(['#5a3a2a', '#3a3a3a', '#7a5a3a'])); D.rect(g, 0.42 * s, 0.22 * h, 0.3 * s, 0.24 * s, 0.04); g.fillStyle = ink('#2a2420', 'print'); D.rect(g, 0.47 * s, 0.4 * h, 0.2 * s, 0.03 * s); }
      if (scarf) { g.fillStyle = ink(scarf); D.rect(g, -0.24 * s, shY - 0.05, 0.48 * s, 0.14 * s, 0.05); D.rect(g, 0.08 * s, shY - 0.4 * s, 0.13 * s, 0.38 * s, 0.03); g.fillStyle = ink(P2.shade(scarf, -0.25), 'print'); D.rect(g, 0.08 * s, shY - 0.36 * s, 0.13 * s, 0.03 * s); D.rect(g, 0.08 * s, shY - 0.3 * s, 0.13 * s, 0.03 * s); }
      g.fillStyle = ink(skin); D.rect(g, -0.08 * s, shY - 0.02, 0.16 * s, 0.16 * s);
      const hy = shY + 0.33 * s; face(g, ink, 0, hy, s, skin); topping(g, ink, style, 0, hy, s, hair);
    }, 1.6 * s + 0.2, h * 1.12, 'person');
  }

  /** A border guard: knee-length greatcoat, belt, shoulder boards, peaked cap with a red band, boots. */
  function guard({ h = 3.2 } = {}) {
    const s = h / 3, uni = '#66704f', dark = '#4f5840', shY = 0.73 * h, skin = pick(SKIN);
    return piece((g, ink) => {
      g.fillStyle = ink('#1d1c18'); D.rect(g, -0.25 * s, 0, 0.2 * s, 0.32 * h, 0.04); D.rect(g, 0.05 * s, 0, 0.2 * s, 0.32 * h, 0.04);
      g.fillStyle = ink(uni); D.poly(g, [[-0.48 * s, 0.24 * h], [0.48 * s, 0.24 * h], [0.4 * s, shY - 0.08], [0.32 * s, shY + 0.04], [-0.32 * s, shY + 0.04], [-0.4 * s, shY - 0.08]]);
      g.fillStyle = ink('#3a3226'); D.rect(g, -0.42 * s, 0.47 * h, 0.84 * s, 0.07 * s); g.fillStyle = ink('#c9a65a', 'print'); D.rect(g, -0.05 * s, 0.47 * h + 0.01, 0.1 * s, 0.05 * s);
      g.fillStyle = ink(dark, 'print'); D.rect(g, -0.015, 0.26 * h, 0.03, shY - 0.26 * h - 0.1); for (const y of [0.56, 0.64]) { D.ell(g, -0.09 * s, y * h, 0.03 * s, 0.03 * s); D.ell(g, 0.09 * s, y * h, 0.03 * s, 0.03 * s); }
      g.fillStyle = ink('#8a8f6a', 'print'); D.rect(g, -0.38 * s, shY - 0.04, 0.16 * s, 0.05 * s); D.rect(g, 0.22 * s, shY - 0.04, 0.16 * s, 0.05 * s);
      g.fillStyle = ink(dark); D.poly(g, [[-0.42 * s, shY - 0.02], [-0.3 * s, shY - 0.02], [-0.4 * s, 0.42 * h], [-0.55 * s, 0.44 * h]]); D.poly(g, [[0.3 * s, shY - 0.02], [0.42 * s, shY - 0.02], [0.55 * s, 0.44 * h], [0.4 * s, 0.42 * h]]);
      g.fillStyle = ink(skin); D.ell(g, -0.48 * s, 0.41 * h, 0.08 * s, 0.08 * s); D.ell(g, 0.48 * s, 0.41 * h, 0.08 * s, 0.08 * s); D.rect(g, -0.08 * s, shY - 0.02, 0.16 * s, 0.16 * s);
      g.fillStyle = ink('#8a8f6a'); D.rect(g, -0.18 * s, shY - 0.04, 0.36 * s, 0.1 * s, 0.03);
      const hy = shY + 0.33 * s; face(g, ink, 0, hy, s, skin);
      g.fillStyle = ink(uni); D.poly(g, [[-0.24 * s, hy + 0.1 * s], [0.24 * s, hy + 0.1 * s], [0.32 * s, hy + 0.32 * s], [-0.32 * s, hy + 0.32 * s]]);
      g.fillStyle = ink('#c0392b'); D.rect(g, -0.25 * s, hy + 0.12 * s, 0.5 * s, 0.06 * s); g.fillStyle = ink('#1d1c18'); D.poly(g, [[-0.27 * s, hy + 0.12 * s], [0.27 * s, hy + 0.12 * s], [0.2 * s, hy + 0.04 * s], [-0.2 * s, hy + 0.04 * s]]);
      g.fillStyle = ink('#d9c07a', 'print'); D.ell(g, 0, hy + 0.24 * s, 0.05 * s, 0.05 * s);
    }, 1.5 * s, h * 1.15, 'guard');
  }

  /** A journalist seen from behind: coat back with a seam, collar, hair; some hold a camera up. */
  function back({ h = between(2.8, 3.1) } = {}) {
    const coat = pick(COATS), s = h / 3, shY = 0.73 * h, hair = pick(HAIR), cam = rnd() < 0.22;
    return piece((g, ink) => {
      g.fillStyle = ink(P2.shade(coat, -0.1)); D.poly(g, [[-0.5 * s, 0], [0.5 * s, 0], [0.42 * s, shY - 0.08], [0.3 * s, shY + 0.04], [-0.3 * s, shY + 0.04], [-0.42 * s, shY - 0.08]]);
      g.fillStyle = ink(P2.shade(coat, -0.32), 'print'); D.rect(g, -0.015, 0.05, 0.03, shY - 0.1); D.rect(g, -0.42 * s, 0.45 * h, 0.84 * s, 0.04 * s);
      g.fillStyle = ink(P2.shade(coat, 0.12)); D.rect(g, -0.22 * s, shY - 0.06, 0.44 * s, 0.14 * s, 0.05);
      g.fillStyle = ink(pick(SKIN)); D.rect(g, -0.08 * s, shY, 0.16 * s, 0.14 * s);
      g.fillStyle = ink(hair); D.ell(g, 0, shY + 0.33 * s, 0.24 * s, 0.27 * s); g.fillStyle = ink(P2.shade(hair, 0.25), 'print'); D.ell(g, -0.06 * s, shY + 0.42 * s, 0.08 * s, 0.05 * s);
      if (cam) { g.fillStyle = ink(P2.shade(coat, -0.2)); D.poly(g, [[0.3 * s, shY - 0.05], [0.44 * s, shY - 0.1], [0.36 * s, shY + 0.75 * s], [0.24 * s, shY + 0.72 * s]]); g.fillStyle = ink('#2a2a2c'); D.rect(g, 0.05 * s, shY + 0.7 * s, 0.5 * s, 0.3 * s, 0.04); g.fillStyle = ink('#8a8c90', 'print'); D.ell(g, 0.3 * s, shY + 0.85 * s, 0.07 * s, 0.07 * s); }
    }, 1.3 * s, h * (cam ? 1.3 : 1.05), 'journalist');
  }

  /** A seated official behind a table (upper body only): suit, lapels, shirt and tie, face, grey or dark hair;
   *  `paper` gives him a sheet held up in his right hand. */
  function official({ paper = false, glasses = rnd() < 0.5 } = {}) {
    const suit = pick(['#4a4a4e', '#5a4a3e', '#3e4652', '#6a5f52']), skin = pick(SKIN), hair = pick(['#8a8a88', '#5a4030', '#b9b5ac', '#3a2a1a']), s = 1.4;
    return piece((g, ink) => {
      g.fillStyle = ink(suit); D.poly(g, [[-0.62 * s, 0], [0.62 * s, 0], [0.56 * s, 0.9 * s], [0.4 * s, 1.02 * s], [-0.4 * s, 1.02 * s], [-0.56 * s, 0.9 * s]]);
      g.fillStyle = ink('#f2ede2'); D.poly(g, [[-0.16 * s, 1.0 * s], [0.16 * s, 1.0 * s], [0, 0.45 * s]]);
      g.fillStyle = ink(pick(['#7a2a2a', '#2a3a5a', '#4a4a2a']), 'print'); D.poly(g, [[-0.05 * s, 0.95 * s], [0.05 * s, 0.95 * s], [0.07 * s, 0.55 * s], [0, 0.48 * s], [-0.07 * s, 0.55 * s]]);
      g.fillStyle = ink(P2.shade(suit, -0.25), 'print'); D.poly(g, [[-0.16 * s, 1.0 * s], [-0.3 * s, 0.85 * s], [0, 0.42 * s]]); D.poly(g, [[0.16 * s, 1.0 * s], [0.3 * s, 0.85 * s], [0, 0.42 * s]]);
      g.fillStyle = ink(skin); D.rect(g, -0.09 * s, 0.95 * s, 0.18 * s, 0.15 * s);
      const hy = 1.34 * s; face(g, ink, 0, hy, s, skin); g.fillStyle = ink(hair); D.ell(g, 0, hy + 0.16 * s, 0.22 * s, 0.11 * s);
      if (glasses) { g.fillStyle = ink('#2a2420', 'print'); D.rect(g, -0.17 * s, hy + 0.0, 0.34 * s, 0.025 * s); }
      if (paper) { g.fillStyle = ink(suit); D.poly(g, [[0.42 * s, 0.75 * s], [0.58 * s, 0.68 * s], [0.95 * s, 1.15 * s], [0.8 * s, 1.24 * s]]);
        g.fillStyle = ink('#fbf6ea'); D.rect(g, 0.72 * s, 1.1 * s, 0.62 * s, 0.82 * s, 0.02); g.fillStyle = ink('#8a8478', 'print'); for (let y = 1.25; y < 1.82; y += 0.1) D.rect(g, 0.8 * s, y * s, 0.46 * s, 0.025 * s);
        g.fillStyle = ink(skin); D.ell(g, 0.86 * s, 1.18 * s, 0.09 * s, 0.09 * s); }
    }, 3.0 * s, 2.1 * s, 'official');
  }
  return { person, guard, back, official };
}
