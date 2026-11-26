// Una familia, en acuarela. Todo se pinta con el motor de pinceladas (engine.js); el cuadro es una función de t.
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
window.DUR = 40;
let PAPER_IMG;
const SS = 2;              // sprites al doble para que el zoom no los ablande
const INK3 = '#3d3129', SHADOW = '#a79f93', VERM = '#c8442a';

// ---------- línea de tiempo (la leen la mezcla, los subtítulos y los chequeos) ----------
const VO = [   // id, inicio (s), duración (s, de voice/dur.json), texto
  ['l1', 4.4, 4.195, 'Empieza por la mesa. Siempre hay una mesa, y siempre falta una silla.'],
  ['l2', 10.5, 3.214, 'Después, las cosas chicas. El mate, que da la vuelta.'],
  ['l3', 15.6, 2.51, 'La olla, que siempre alcanza para uno más.'],
  ['l4', 20.4, 2.339, 'Las zapatillas, tiradas en la puerta.'],
  ['l5', 27.6, 3.043, 'Y cuando se sientan todos, hablan al mismo tiempo.'],
  ['l6', 31.7, 2.254, 'Alguien se ríe. Alguien pide el pan.'],
  ['l7', 35.4, 2.211, 'Y siempre queda un lugar, para el que llega.'],
];
const T = {          // ventanas de pintura
  q0: .5, q1: 3.5,                      // la pregunta, escrita a mano
  table: [4.3, 6.6], plates: [6.2, 7.5], chairs: [7.0, 8.8],
  mate: [11.0, 13.3], olla: [16.4, 18.4], shoes: [20.8, 22.8],
  mist: [24.2, 25.8], skip: [25.8, 27.0],
  burst: [27.0, 28.0], people: [27.2, 28.0],
  chair: [36.4, 38.3], chairMax: .62,
};
const NOTES = { mate: [12.2, 15.6], olla: [17.3, 21.3], shoes: [21.6, 25.0], sigue: [37.2, 40] };

// ---------- geometría ----------
const ell = (cx, cy, rx, ry, rot = 0, n = 36) => { const o = [], c = Math.cos(rot), s = Math.sin(rot); for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, x = Math.cos(a) * rx, y = Math.sin(a) * ry; o.push([cx + x * c - y * s, cy + x * s + y * c]); } return o; };
function rrect(x0, y0, x1, y1, r, n = 5) {
  const o = [], arc = (cx, cy, a0) => { for (let i = 0; i <= n; i++) { const a = a0 + i / n * Math.PI / 2; o.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
  arc(x1 - r, y0 + r, -Math.PI / 2); arc(x1 - r, y1 - r, 0); arc(x0 + r, y1 - r, Math.PI / 2); arc(x0 + r, y0 + r, Math.PI); return o;
}
const shift = (S, dx, dy) => { for (const s of S) s.pts = s.pts.map(([x, y]) => [x + dx, y + dy]); return S; };

// rellena un polígono con pinceladas horizontales, de ida y vuelta, que se superponen (el pigmento se oscurece donde se cruzan)
function fillPoly(poly, col, w, o = {}) {
  const sp = o.sp ?? w * .62, a = o.a ?? .55, S = [], ys = poly.map(p => p[1]);
  const y0 = Math.min(...ys), y1 = Math.max(...ys); let dir = 1;
  for (let y = y0 + sp * .5; y < y1; y += sp) {
    const xs = [];
    for (let i = 0; i < poly.length; i++) { const [ax, ay] = poly[i], [bx, by] = poly[(i + 1) % poly.length]; if ((ay <= y && by > y) || (by <= y && ay > y)) xs.push(ax + (y - ay) / (by - ay) * (bx - ax)); }
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const xa = xs[k] - (o.pad ?? 3), xb = xs[k + 1] + (o.pad ?? 3); if (xb - xa < 5) continue;
      const ya = y + rnd(-1.5, 1.5), yb = y + rnd(-2, 2), pts = dir > 0 ? qcurve(xa, ya, xb, yb, rnd(-3, 3), 8) : qcurve(xb, ya, xa, yb, rnd(-3, 3), 8);
      S.push(mk(pts, w, col, { prof: 'even', nb: o.nb ?? (w >= 14 ? 4 : 0), a: a * rnd(.85, 1.1), rough: .28 }));
    }
    dir = -dir;
  }
  return S;
}
const outline = (poly, col, w, a = .7) => mk([...poly, poly[0], poly[1]], w, col, { prof: 'even', nb: 0, a, rough: .35 });
const line = (x0, y0, x1, y1, w, col, o = {}) => mk(qcurve(x0, y0, x1, y1, o.bend ?? 0, o.n ?? 10), w, col, { prof: o.prof || 'even', nb: o.nb ?? 0, a: o.a ?? .85, rough: o.rough ?? .25 });
const xf = (pts, flip, rot, ox, oy) => pts.map(([x, y]) => { x *= flip; const c = Math.cos(rot), s = Math.sin(rot); return [ox + x * c - y * s, oy + x * s + y * c]; });

function sprite2(L, pad = 10) {
  const [x0, y0, x1, y1] = bbox(L, pad), c = document.createElement('canvas');
  c.width = Math.ceil((x1 - x0) * SS); c.height = Math.ceil((y1 - y0) * SS);
  const g = c.getContext('2d'); g.scale(SS, SS); g.translate(-x0, -y0); for (const s of L) drawS(g, s, 1);
  return { cv: c, x0, y0, w: x1 - x0, h: y1 - y0 };
}
const Obj = S => { const o = { S }; o.spr = sprite2(S); return o; };
function drawObj(o, p, am = 1) {
  if (p <= 0) return;
  ctx.save(); ctx.globalAlpha = am;
  if (p >= 1) ctx.drawImage(o.spr.cv, o.spr.x0, o.spr.y0, o.spr.w, o.spr.h); else drawList(ctx, o.S, p);
  ctx.restore();
}

// ---------- la mesa (vista desde arriba) ----------
const TRX = 470, TRY = 230;
const SEATS = [51, 103, 154, 206, 257, 309].map(d => d * Math.PI / 180);
let TABLE, PLATES, CHAIRS, DISH_STEAM, PEOPLE = [], CHAIR_FINAL, MATE, OLLA, SHOES, STEAMS = {};

function chairPoly(a, off = 0) {
  const cxp = Math.cos(a) * (TRX + 82 + off), cyp = Math.sin(a) * (TRY + 70 + off), r = Math.atan2(cyp, cxp);
  return { c: [cxp, cyp], r, seat: xf(rrect(-52, -43, 52, 43, 14).map(([x, y]) => [y, x]), 1, r, cxp, cyp) };
}
function buildTable() {
  return withSeed(11, () => {
    const S = [], Tp = ell(0, 0, TRX, TRY, 0, 56);
    S.push(...fillPoly(ell(16, 24, TRX, TRY, 0, 56), SHADOW, 46, { a: .2 }));
    S.push(...fillPoly(Tp, '#c9a173', 40, { a: .52 }));
    S.push(...fillPoly(ell(-6, -8, TRX * .86, TRY * .84, 0, 48), '#d9b98a', 30, { a: .33 }));
    S.push(outline(Tp, '#6b4a2f', 5, .7));
    for (let i = 0; i < 9; i++) { const y = -190 + i * 48 + rnd(-8, 8), hx = Math.sqrt(Math.max(0, 1 - (y / TRY) ** 2)) * TRX * .9; S.push(line(-hx * rnd(.7, .95), y, hx * rnd(.7, .95), y + rnd(-6, 6), 3, '#a6794a', { a: .38, bend: rnd(-12, 12), nb: 0 })); }
    // fuente en el centro
    const D = ell(0, -6, 96, 46, 0, 36);
    S.push(...fillPoly(D, '#e7d5b3', 16, { a: .6 }), outline(D, '#7a5a3a', 3.5, .65));
    clump(S, 0, -10, 62, 26, ['#d9944a', '#c98a4a', '#8ea860', '#e0b46a'], { sx: 1.3, sy: .55, l0: 10, l1: 20, w0: 7, w1: 12 });
    return Obj(S);
  });
}
function buildPlates() {
  return withSeed(21, () => {
    const S = [], place = (px, py, rim, accent) => {
      const P = ell(px, py, 40, 40, 0, 28);
      S.push(...fillPoly(P, accent ? '#e8c9b8' : '#c9d6df', 14, { a: .38 }), outline(P, rim, 5, .85), outline(ell(px, py, 26, 26, 0, 22), rim, 2, .45));
      const g = ell(px + 56, py - 30, 12, 12, 0, 14); S.push(...fillPoly(g, '#9fb4c4', 8, { a: .5 }), outline(g, '#6f8793', 2.5, .6));
    };
    for (const a of SEATS) place(Math.cos(a) * 385, Math.sin(a) * 182, '#6f8793', false);
    place(405, 0, VERM, true);        // el lugar que no tiene silla
    return Obj(S);
  });
}
function buildChairs() {
  return withSeed(31, () => {
    const S = [];
    for (const a of SEATS) {
      const ch = chairPoly(a);
      S.push(...fillPoly(ch.seat, '#b98f68', 26, { a: .5 }), outline(ch.seat, '#6b4a2f', 3.5, .7));
      const nx = Math.cos(ch.r), ny = Math.sin(ch.r), tx = -ny, ty = nx, bx = ch.c[0] + nx * 56, by = ch.c[1] + ny * 56;
      S.push(mk(qcurve(bx - tx * 52, by - ty * 52, bx + tx * 52, by + ty * 52, 8, 10), 16, '#7a5a3a', { prof: 'even', nb: 4, a: .85 }));
    }
    return Obj(S);
  });
}
function buildChairFinal() {   // la silla que falta: sólo el contorno y el respaldo a medio trazar, todo en el bermellón del plato vacío
  return withSeed(41, () => {
    const ch = chairPoly(0), S = [], bx = ch.c[0] + 56, by = ch.c[1];
    S.push(outline(ch.seat, VERM, 5, .85));
    S.push(mk(qcurve(ch.c[0] - 30, ch.c[1] - 26, ch.c[0] + 30, ch.c[1] - 26, 4, 8), 3, VERM, { prof: 'even', nb: 0, a: .5 }), mk(qcurve(ch.c[0] - 30, ch.c[1] + 26, ch.c[0] + 30, ch.c[1] + 26, -4, 8), 3, VERM, { prof: 'even', nb: 0, a: .5 }));
    S.push(mk(qcurve(bx, by - 52, bx, by + 52, 8, 14), 16, VERM, { prof: 'even', nb: 4, a: .85 }));
    return Obj(S);
  });
}
const PEOPLE_DEF = [   // ángulo de la silla, escala, camisa, pelo, piel, rol
  [51, 1.08, '#5f7486', '#5a4230', '#d9a87c', 'papa'],
  [103, .72, '#d9944a', '#7a5230', '#ecc7a0', 'nene'],
  [154, 1.0, '#8a5a6a', '#4a3322', '#c68f65', 'mama'],
  [206, .76, '#8ea860', '#b8864a', '#e0b48a', 'nena'],
  [257, .98, '#9fb4c4', '#c9c4bc', '#e0b48a', 'abuela'],
  [309, 1.04, '#6f8793', '#7a5d40', '#d9a87c', 'tio'],
];
function buildPerson(d, i) {
  return withSeed(100 + i, () => {
    const [deg, sc0, shirt, hair, skin, role] = d, sc = sc0 * 1.3, a = deg * Math.PI / 180;
    const px = Math.cos(a) * (TRX + 66), py = Math.sin(a) * (TRY + 54), r = Math.atan2(py, px), nx = Math.cos(r), ny = Math.sin(r), tx = -ny, ty = nx;
    const S = [], Sh = ell(px, py, 52 * sc, 26 * sc, r + Math.PI / 2, 30);
    const plx = Math.cos(a) * 385, ply = Math.sin(a) * 182;
    for (const sd of [-1, 1]) {   // brazos: del hombro al plato, con un codo
      const sx = px + tx * 40 * sc * sd - nx * 10, sy = py + ty * 40 * sc * sd - ny * 10, ex = plx + tx * 24 * sd + nx * 16, ey = ply + ty * 24 * sd + ny * 16;
      S.push(mk(qcurve(sx, sy, ex, ey, sd * 16, 10), 17 * sc, shirt, { prof: 'even', nb: 3, a: .8 }));
    }
    S.push(...fillPoly(Sh, shirt, 15 * sc, { a: .66 }), outline(Sh, INK3, 3, .55));
    for (const sd of [-1, 1]) { const hx = plx + tx * 24 * sd + nx * 6, hy = ply + ty * 24 * sd + ny * 6; S.push(...fillPoly(ell(hx, hy, 10 * sc, 10 * sc, 0, 10), skin, 7, { a: .85 })); }
    const hx = px - nx * 16, hy = py - ny * 16, Hd = ell(hx, hy, 24 * sc, 25 * sc, r + Math.PI / 2, 24);
    S.push(...fillPoly(Hd, skin, 9 * sc + 3, { a: .82 }), outline(Hd, INK3, 2.5, .5));
    const hr = ell(hx + nx * 8, hy + ny * 8, 23 * sc, 18 * sc, r + Math.PI / 2, 24);   // el pelo cubre la coronilla; la frente queda a la vista
    S.push(...fillPoly(hr, hair, 8 * sc + 3, { a: .72 }));
    if (role === 'abuela') S.push(...fillPoly(ell(hx + nx * 30 * sc, hy + ny * 30 * sc, 11 * sc, 11 * sc, 0, 12), hair, 8, { a: .85 }));
    if (role === 'mama') S.push(...fillPoly(ell(hx + nx * 26 * sc, hy + ny * 26 * sc, 28 * sc, 14 * sc, r + Math.PI / 2, 18), hair, 8, { a: .8 }));
    const o = Obj(S); o.piv = [px, py]; o.ph = i * 1.3; return o;
  });
}

// ---------- los ejemplares ----------
function steamWisps(n, w, col) {   // plantillas de vapor, en coordenadas locales (base en 0,0)
  return withSeed(7 + n, () => Array.from({ length: n }, (_, i) => ({ s: mk(qctrl(0, 0, rnd(-26, 26), -50, rnd(-14, 14), -100, 10), w, col, { prof: 'leaf', nb: 0, a: .55, rough: .3 }), dx: (i - (n - 1) / 2) * (w * 1.6), ph: i / n })));
}
function drawSteam(W_, x, y, t, h, am = 1) {
  for (const k of W_) {
    const ph = (t * .32 + k.ph) % 1, a = Math.sin(Math.PI * ph) * am; if (a <= .02) continue;
    ctx.save(); ctx.translate(x + k.dx + Math.sin(t * 1.3 + k.ph * 6) * 10, y - ph * h); drawS(ctx, k.s, 1, null, a); ctx.restore();
  }
}
function buildMate() {
  return withSeed(51, () => {
    const S = [];
    S.push(...fillPoly(ell(0, 12, 190, 11, 0, 24), SHADOW, 9, { a: .3 }), line(-205, 4, 205, 6, 5, INK3, { a: .65, bend: 3 }));
    const G = ell(-90, -82, 74, 84, 0, 40).map(([x, y]) => y < -82 ? [-90 + (x + 90) * (.86 + .14 * (1 + (y + 82) / 84)), y] : [x, y]);
    S.push(...fillPoly(G, '#8a6a43', 20, { sp: 13, a: .6 }), outline(G, INK3, 4, .75));
    S.push(line(-148, -58, -32, -58, 6, '#d3b88a', { a: .8, bend: 16 }), line(-144, -36, -36, -36, 6, '#d3b88a', { a: .8, bend: 14 }));
    const R = ell(-90, -160, 50, 12, 0, 24); S.push(...fillPoly(R, '#4d3b26', 8, { a: .8 }));
    clump(S, -90, -168, 34, 24, ['#6f8a4a', '#8ea860', '#5f7a3a'], { sx: 1.25, sy: .5, l0: 8, l1: 16, w0: 4, w1: 8 });
    S.push(line(-76, -164, 12, -284, 6, '#8d98a0', { a: .95 }), line(12, -284, 28, -304, 13, '#8d98a0', { prof: 'tip', a: .9 }), line(-72, -166, 10, -280, 2, '#eef2f4', { a: .8 }));
    const TH = rrect(40, -250, 140, 0, 22); S.push(...fillPoly(TH, '#7f95a6', 18, { a: .6 }), outline(TH, INK3, 4, .75));
    const CAP = rrect(44, -292, 136, -246, 10); S.push(...fillPoly(CAP, '#47586a', 12, { a: .7 }), outline(CAP, INK3, 3.5, .7));
    const LB = rrect(41, -130, 139, -98, 4); S.push(...fillPoly(LB, '#d3a35a', 10, { a: .7 }));
    S.push(line(60, -230, 66, -20, 5, '#dfe7ec', { a: .45, bend: 4 }));
    return shift(S, 1485 - 20, 0), Obj(S);
  });
}
function buildOlla() {
  return withSeed(61, () => {
    const S = [];
    S.push(...fillPoly(ell(0, 12, 215, 12, 0, 24), SHADOW, 9, { a: .3 }), line(-220, 4, 220, 6, 5, INK3, { a: .6, bend: 3 }));
    // fuego debajo de la hornalla
    clump(S, 0, -2, 94, 34, ['#d9944a', '#e9c06a', '#c8742a'], { sx: 1.4, sy: .4, dir: -Math.PI / 2, spread: .35, l0: 14, l1: 30, w0: 5, w1: 9 });
    S.push(line(-190, -10, 190, -10, 9, INK3, { a: .8, nb: 0 }), line(-150, -6, -150, 6, 8, INK3, { a: .8 }), line(150, -6, 150, 6, 8, INK3, { a: .8 }));
    const B = rrect(-150, -230, 150, -14, 36); S.push(...fillPoly(B, '#6f8793', 24, { a: .6 }), outline(B, INK3, 4.5, .75));
    const band = rrect(-151, -230, 151, -196, 14); S.push(...fillPoly(band, '#4e6672', 12, { a: .65 }));
    const Rim = ell(0, -232, 150, 32, 0, 40); S.push(...fillPoly(Rim, '#3d2f24', 12, { a: .8 }), outline(Rim, INK3, 4, .75));
    S.push(...fillPoly(ell(0, -228, 130, 24, 0, 36), '#c98a4a', 10, { a: .65 }));
    clump(S, 0, -228, 80, 18, ['#d9944a', '#8ea860', '#e0b46a'], { sx: 1.5, sy: .3, l0: 8, l1: 16, w0: 6, w1: 10 });
    S.push(line(-150, -176, -200, -160, 9, INK3, { a: .8, bend: -14 }), line(150, -176, 200, -160, 9, INK3, { a: .8, bend: 14 }));
    S.push(line(46, -236, 196, -384, 11, '#b98f5c', { a: .9, bend: -10 }), ...fillPoly(ell(204, -392, 24, 16, .7, 16), '#b98f5c', 8, { a: .85 }));
    S.push(line(-110, -190, -108, -40, 6, '#dfe7ec', { a: .4, bend: 6 }));
    return shift(S, 2500, 0), Obj(S);
  });
}
function shoe(col, flip, rot, ox, oy, k = 1.5) {
  const tf = pts => xf(pts.map(([x, y]) => [x * k, y * k]), flip, rot, ox, oy), S = [];
  const up = [[0, 0], [-6, -34], [-2, -66], [16, -76], [44, -82], [66, -70], [96, -52], [130, -42], [166, -24], [176, -8], [172, 0]];
  const P = tf(up);
  S.push(...fillPoly(P, col, 18, { a: .66 }), outline(P, INK3, 4, .75));
  const sole = tf([[-8, 0], [174, 0], [180, -12], [-10, -14]]);
  S.push(...fillPoly(sole, '#e8dfcc', 12, { a: .92 }), outline(sole, INK3, 3, .6));
  S.push(mk(tf(qcurve(112, -44, 140, -6, 8, 8)), 6, '#f1e9da', { prof: 'even', nb: 0, a: .75 }), mk(tf(qcurve(22, -40, 112, -26, -10, 8)), 9, '#f1e9da', { prof: 'even', nb: 0, a: .8 }));
  for (let i = 0; i < 4; i++) { const f = i / 3, px = lerp(62, 104, f), py = lerp(-68, -50, f); S.push(mk(tf([[px + 5, py - 11], [px - 3, py + 7]]), 4, '#f4ece0', { prof: 'even', nb: 0, a: .92 })); }
  S.push(...fillPoly(tf(ell(24, -72, 22, 7, 0, 14)), '#3d2f24', 6, { a: .8 }), mk(tf([[-2, -66], [16, -76], [44, -82], [66, -70]]), 5, INK3, { prof: 'even', nb: 0, a: .6 }));
  return S;
}
function buildShoes() {
  return withSeed(71, () => {
    const S = [];
    S.push(line(-380, 0, 380, 0, 6, INK3, { a: .6 }));
    S.push(...fillPoly([[-300, 14], [300, 14], [330, 64], [-330, 64]], '#9aa58c', 14, { a: .5 }));
    S.push(...fillPoly(ell(-10, 74, 290, 8, 0, 20), SHADOW, 8, { a: .28 }));
    S.push(...shoe('#4f6d8a', -1, .03, -30, 38), ...shoe('#d9944a', 1, -.5, 70, 34));
    return shift(S, 2500, 760), Obj(S);
  });
}

// ---------- textos a mano ----------
function hand(txt, x, y, p, o = {}) {
  if (p <= 0) return;
  ctx.save(); ctx.font = `${o.w || 500} ${o.size || 30}px Caveat`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = 'middle';
  const w = ctx.measureText(txt).width, x0 = o.align === 'right' ? x - w : o.align === 'center' ? x - w / 2 : x;
  ctx.beginPath(); ctx.rect(x0 - 6, y - 90, (w + 12) * eo(p), 180); ctx.clip();
  ctx.shadowColor = rgba(PAPER, .95); ctx.shadowBlur = 12; ctx.fillStyle = rgba(o.col || INK, o.a ?? .9); ctx.fillText(txt, x, y); ctx.fillText(txt, x, y);
  ctx.restore();
}
function leader(x0, y0, x1, y1, p, bend = 20, a = .75) {
  if (p <= 0) return;
  const pts = qcurve(x0, y0, x1, y1, bend, 16), m = Math.max(1, Math.round(16 * clamp(p)));
  ctx.beginPath(); for (let i = 0; i <= m; i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = rgba(INK, a); ctx.lineWidth = 1.8; ctx.lineCap = 'round'; ctx.stroke();
  if (p >= 1) { ctx.beginPath(); ctx.arc(x1, y1, 3.4, 0, 7); ctx.fillStyle = rgba(INK, a); ctx.fill(); }
}
function note(t, win, ax, ay, lx, ly, txt, o = {}) {
  const [t0, t1] = win, f = 1 - ss(seg(t, t1 - .5, t1)); if (t < t0 || f <= 0) return;
  ctx.save(); ctx.globalAlpha = f;
  leader(lx + (o.lead ?? 30), ly + 26, ax, ay, seg(t, t0, t0 + .7), o.bend ?? 22);
  hand(txt, lx, ly, seg(t, t0 + .3, t0 + 1.4), { size: 34, ...o });
  ctx.restore();
}

// ---------- cámara ----------
const P1 = { cx: monotone([[0, 0], [10, 0], [11.8, 1485], [15, 1485], [16.8, 2500], [26, 2500]]),
             cy: monotone([[0, 0], [11, 0], [11.8, -130], [15, -130], [16.8, -210], [19.8, -210], [22.2, 735], [26, 735]]),
             z: monotone([[0, 1.3], [4, 1.3], [8.8, .9], [10, .9], [11.8, 1.65], [15, 1.65], [16.8, 1.35], [19.8, 1.35], [22.2, 1.5], [26, 1.5]]) };
const P2 = { cx: monotone([[25.5, 0], [33.2, 0], [36.4, 380], [40, 380]]),
             cy: monotone([[25.5, 0], [40, 0]]),
             z: monotone([[25.5, 1.25], [27, 1.25], [31, .9], [33.2, .9], [36.4, 1.3], [40, 1.3]]) };
const cam = t => t < T.skip[0] ? { cx: P1.cx(t), cy: P1.cy(t), z: P1.z(t) } : { cx: P2.cx(t), cy: P2.cy(t), z: P2.z(t) };

// ---------- niebla y textos de pantalla ----------
function drawMist(t) {
  const c = eio(seg(t, T.mist[0], T.mist[1])); if (c <= 0 || t >= T.skip[0]) return;
  for (let L = 0; L < 3; L++) {
    const edge = lerp(H + 120, -140 - L * 60, clamp(c * 1.12 - L * .05)), amp = 30 + L * 12;
    ctx.beginPath(); ctx.moveTo(0, H + 40);
    for (let x = 0; x <= W; x += 40) ctx.lineTo(x, edge + amp * Math.sin(x * .0058 + 1.3 + L * 2) + amp * .5 * Math.sin(x * .013 + t * .6 + L));
    ctx.lineTo(W, H + 40); ctx.closePath();
    const g = ctx.createLinearGradient(0, edge - 140, 0, edge + 80); g.addColorStop(0, rgba(PAPER, 0)); g.addColorStop(1, rgba(PAPER, L === 0 ? 1 : .9));
    ctx.fillStyle = g; ctx.fill();
    ctx.fillStyle = rgba(PAPER, L === 0 ? 1 : .9); ctx.fillRect(0, edge + amp * 2 + 60, W, H);
  }
}
function questionGeom(t) {
  const m = eio(seg(t, 4.1, 5.3)); return { y: lerp(500, 92, m), size: lerp(112, 50, m), a: .9 * (1 - ss(seg(t, 9.2, 10.2))) };
}
function drawQuestion(t) {
  if (t < T.q0 || t > 10.3) return;
  const g = questionGeom(t); if (g.a <= 0) return;
  hand('¿Cómo se dibuja una familia?', W / 2, g.y, seg(t, T.q0, T.q1), { size: g.size, w: 600, align: 'center', a: g.a });
  const u = seg(t, 3.3, 3.9) * (1 - ss(seg(t, 4.1, 4.6)));   // subrayado de lápiz
  if (u > 0) { ctx.save(); ctx.globalAlpha = u; drawS(ctx, UNDERLINE, seg(t, 3.3, 3.9)); ctx.restore(); }
}
let UNDERLINE;
const SUBS = VO.map(([id, t0, d, text]) => ({ t0: t0 - .1, t1: Math.max(t0 + d + .6, t0 - .1 + 1.8), text }));
function drawSubs(t) {
  for (const s of SUBS) {
    if (t < s.t0 || t > s.t1) continue;
    const a = ss(seg(t, s.t0, s.t0 + .25)) * (1 - ss(seg(t, s.t1 - .3, s.t1)));
    ctx.save(); ctx.font = 'italic 400 42px "Cormorant Garamond"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = rgba(PAPER, .95); ctx.shadowBlur = 16; ctx.fillStyle = rgba(INK, .8 * a); ctx.fillText(s.text, W / 2, 990); ctx.fillText(s.text, W / 2, 990); ctx.restore();
  }
}

// ---------- el cuadro ----------
function render(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.drawImage(PAPER_IMG, 0, 0);
  const { cx, cy, z } = cam(t);
  if (t < T.skip[0] || t >= T.skip[1]) {
    ctx.setTransform(z, 0, 0, z, W / 2 - cx * z, H / 2 - cy * z);
    if (t < T.skip[0]) {
      drawObj(TABLE, seg(t, ...T.table)); drawObj(PLATES, seg(t, ...T.plates)); drawObj(CHAIRS, seg(t, ...T.chairs));
      if (t > 6.4) drawSteam(STEAMS.dish, 0, -40, t, 90, ss(seg(t, 6.6, 8)));
      drawObj(MATE, seg(t, ...T.mate)); drawObj(OLLA, seg(t, ...T.olla)); drawObj(SHOES, seg(t, ...T.shoes));
      const pm = seg(t, ...T.mate), po = seg(t, ...T.olla);
      if (pm >= 1) drawSteam(STEAMS.thermos, 1485 + 70, -292, t, 120, ss(seg(t, 13.3, 14.5)));
      if (po >= 1) drawSteam(STEAMS.olla, 2500, -252, t, 170, ss(seg(t, 18.4, 19.6)));
      note(t, NOTES.mate, 1485 - 110, -150, 1485 - 300, -320, 'el mate: da la vuelta');
      note(t, NOTES.olla, 2500 - 110, -190, 2500 - 400, -400, 'la olla: alcanza para uno más', { lead: 60 });
      note(t, NOTES.shoes, 2500 - 170, 690, 2500 - 380, 520, 'en la puerta, como siempre', { lead: 40, bend: -18 });
    } else {
      const bt = seg(t, ...T.burst);
      drawObj(TABLE, bt); drawObj(PLATES, seg(t, T.burst[0] + .2, T.burst[1])); drawObj(CHAIRS, seg(t, T.burst[0] + .1, T.burst[1] - .1));
      if (t > 28) drawSteam(STEAMS.dish, 0, -40, t, 90, ss(seg(t, 28, 29.5)));
      PEOPLE.forEach((o, i) => {
        const p = seg(t, T.people[0] + i * .09, T.people[0] + i * .09 + .55);
        if (p <= 0) return;
        if (p < 1) { drawObj(o, p); return; }
        const laugh = (t > 31.8 && t < 34) ? 1 : .35, rotv = Math.sin(t * (1.6 + i * .17) + o.ph) * .014 * laugh * 1.6;
        ctx.save(); ctx.translate(o.piv[0], o.piv[1]); ctx.rotate(rotv); ctx.translate(-o.piv[0], -o.piv[1]); drawObj(o, 1); ctx.restore();
      });
      drawObj(CHAIR_FINAL, seg(t, ...T.chair) * T.chairMax);
    }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  drawMist(t); drawQuestion(t);
  const sg = seg(t, ...NOTES.sigue); if (sg > 0) hand('(sigue…)', 1560, 900, seg(t, NOTES.sigue[0], NOTES.sigue[0] + .9), { size: 52, w: 600, a: .85 });
  drawSubs(t);
}
window.render = render;

// textos visibles (readcheck): cajas aproximadas en píxeles de pantalla
window.TEXTS = t => {
  const out = [], { cx, cy, z } = cam(t), sx = x => W / 2 + (x - cx) * z, sy = y => H / 2 + (y - cy) * z;
  const add = (id, text, x0, y0, x1, y1) => out.push({ id, text, x0, y0, x1, y1 });
  if (t >= T.q0 && t <= 10.2) { const g = questionGeom(t); add('q', '¿Cómo se dibuja una familia?', W / 2 - 7 * g.size, g.y - g.size / 2, W / 2 + 7 * g.size, g.y + g.size / 2); }
  const w = (a) => t >= a[0] && t <= a[1];
  if (w(NOTES.mate)) add('mate', 'el mate: da la vuelta', sx(1485 - 300), sy(-370), sx(1485 + 60), sy(-280));
  if (w(NOTES.olla)) add('olla', 'la olla: alcanza para uno más', sx(2500 - 400), sy(-450), sx(2500 + 40), sy(-360));
  if (w(NOTES.shoes) && t < 25.2) add('shoes', 'en la puerta, como siempre', sx(2500 - 380), sy(470), sx(2500 + 60), sy(570));
  if (w(NOTES.sigue)) add('sigue', '(sigue…)', 1560, 860, 1760, 940);
  return out;
};
// eventos de sonido para la mezcla
window.EV = [
  { t: .5, type: 'pencil', dur: 3.2 }, { t: 3.3, type: 'pencil', dur: .6 },
  { t: T.table[0], type: 'brush', dur: T.table[1] - T.table[0], gain: .8 }, { t: T.plates[0], type: 'brush', dur: T.plates[1] - T.plates[0], gain: .6 },
  { t: T.chairs[0], type: 'brush', dur: T.chairs[1] - T.chairs[0], gain: .8 },
  { t: 7.0, type: 'plate' }, { t: 7.25, type: 'plate' }, { t: 7.5, type: 'plate' },
  { t: T.mate[0], type: 'brush', dur: T.mate[1] - T.mate[0], gain: .8 }, { t: 13.4, type: 'pour', dur: 1.4 },
  { t: 12.2, type: 'pencil', dur: 1.3 },
  { t: T.olla[0], type: 'brush', dur: T.olla[1] - T.olla[0], gain: .8 }, { t: 17.3, type: 'pencil', dur: 1.3 }, { t: 18.4, type: 'boil', dur: 6 },
  { t: T.shoes[0], type: 'brush', dur: T.shoes[1] - T.shoes[0], gain: .8 }, { t: 22.0, type: 'thump', g: .9 }, { t: 22.5, type: 'thump', g: .6 }, { t: 21.6, type: 'pencil', dur: 1.3 },
  { t: 24.2, type: 'mist', dur: 1.5 },
  { t: 26.9, type: 'brush', dur: 1.3, gain: 1 }, { t: 27.0, type: 'burst' },
  { t: 28.2, type: 'murmur', dur: 8.0 }, { t: 29.4, type: 'plate' }, { t: 30.6, type: 'glass' }, { t: 32.0, type: 'plate' }, { t: 33.1, type: 'glass' }, { t: 34.4, type: 'plate' },
  { t: T.chair[0], type: 'brush', dur: T.chair[1] - T.chair[0], gain: .7 }, { t: 38.3, type: 'lift' }, { t: 37.2, type: 'pencil', dur: 1.0 },
  ...VO.map(([id, t0, d]) => ({ t: t0, type: 'vo', id, dur: d })),
];

(async () => {
  PAPER_IMG = new Image(); PAPER_IMG.src = 'paper.jpg'; await PAPER_IMG.decode();
  await Promise.all(['italic 400 42px "Cormorant Garamond"', '500 40px Caveat', '600 40px Caveat'].map(f => document.fonts.load(f, '¿Cómo se dibuja una familia? áéíóúñ¿¡…')));
  TABLE = buildTable(); PLATES = buildPlates(); CHAIRS = buildChairs(); CHAIR_FINAL = buildChairFinal();
  PEOPLE = PEOPLE_DEF.map(buildPerson);
  MATE = buildMate(); OLLA = buildOlla(); SHOES = buildShoes();
  STEAMS = { dish: steamWisps(3, 20, '#aab9c4'), thermos: steamWisps(3, 12, '#aab9c4'), olla: steamWisps(5, 26, '#aab9c4') };
  UNDERLINE = withSeed(3, () => mk(qcurve(W / 2 - 400, 600, W / 2 + 400, 596, 6, 24), 5, INK2, { prof: 'even', nb: 0, a: .75, rough: .3 }));
  window.READY = true;
})();
