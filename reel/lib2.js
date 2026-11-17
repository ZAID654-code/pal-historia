// Shared building blocks for day 3+ episodes.
const WHITE = "#ffffff";
window.SUBT = 0;

/* generic side character */
function npc(o) {
  const s = o.s || 1.1, w = o.w || 1, skin = o.skin || "#d9a27a", top = o.top || "#fff", leg = o.leg || "#2b2f3a";
  const arm = (side, ang, held) => `<g transform="translate(${side * 74 * w},-374) rotate(${-side * ang})">
    <rect class="o" x="${-18 * w}" y="0" width="${36 * w}" height="150" rx="${18 * w}" fill="${o.bare ? skin : top}"/><circle class="o" cx="0" cy="156" r="${19 * w}" fill="${skin}"/>${held || ""}</g>`;
  return `<g transform="translate(${o.x},${o.y ?? 1085}) scale(${(o.flip ? -1 : 1) * s},${s})">
    <ellipse cx="0" cy="4" rx="${100 * w}" ry="14" fill="#000" opacity=".2"/>
    <rect class="o" x="${-50 * w}" y="-190" width="${42 * w}" height="184" rx="10" fill="${leg}"/><rect class="o" x="${8 * w}" y="-190" width="${42 * w}" height="184" rx="10" fill="${leg}"/>
    <ellipse class="o" cx="${-30 * w}" cy="-6" rx="34" ry="13" fill="${o.shoe || "#111"}"/><ellipse class="o" cx="${30 * w}" cy="-6" rx="34" ry="13" fill="${o.shoe || "#111"}"/>
    <g transform="scale(${w},1)"><path class="o" d="M-70,-390 q-14,120 -4,210 h148 q10,-90 -4,-210 q-70,-20 -140,0Z" fill="${top}"/></g>
    ${o.body || ""}
    ${arm(-1, o.armL ?? 8, o.heldL)}${arm(1, o.armR ?? 10, o.heldR)}
    <circle class="o" cx="0" cy="-455" r="64" fill="${skin}"/>
    ${o.hairPath ? `<path class="o" d="${o.hairPath}" fill="${o.hair || "#222"}"/>` : `<path class="o" d="M-62,-470 q0,-66 62,-66 q62,0 62,66 q-30,-30 -62,-28 q-32,-2 -62,28Z" fill="${o.hair || "#222"}"/>`}
    <circle class="o" cx="-22" cy="-458" r="${o.scared ? 17 : 13}" fill="#fff"/><circle class="o" cx="26" cy="-458" r="${o.scared ? 17 : 13}" fill="#fff"/>
    <circle cx="${-22 + (o.lookx ?? 0) * 6}" cy="${-458 + (o.looky ?? 0) * 6}" r="5" fill="#151515"/><circle cx="${26 + (o.lookx ?? 0) * 6}" cy="${-458 + (o.looky ?? 0) * 6}" r="5" fill="#151515"/>
    ${o.mouth === "open" ? `<ellipse class="o" cx="2" cy="-420" rx="11" ry="9" fill="#5a1a1a"/>` : o.mouth === "smile" ? `<path class="o" d="M-16,-424 q18,16 36,0" fill="none"/>` : `<path class="o" d="M-12,-420 h26" fill="none"/>`}
    ${o.face || ""}
  </g>`;
}

const lieKevin = (o, ang) => `<g transform="translate(${o.x},${o.y}) rotate(${ang}) translate(${-o.x},${-o.y})">${kevin(Object.assign({ noShadow: true }, o))}</g>`;

function titleCard(t, t0, a, b) {
  return `<rect width="720" height="1280" fill="#0d0d12"/><g transform="translate(360,620) scale(${pop(t, t0 - 0.2)})">
    <text text-anchor="middle" font-size="${a.length > 11 ? 74 : 96}" fill="#fff">${a}</text><text text-anchor="middle" y="110" font-size="96" fill="${COL.y}">${b}</text></g>`;
}

function starburst(t, bg = "#ffd23c", ray = "#ffe680") {
  let rays = "";
  for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8 + t * 0.4; rays += `<path d="M360,600 L${360 + Math.cos(a) * 1400},${600 + Math.sin(a) * 1400} L${360 + Math.cos(a + 0.2) * 1400},${600 + Math.sin(a + 0.2) * 1400}Z" fill="${ray}"/>`; }
  return `<rect width="720" height="1280" fill="${bg}"/>${rays}`;
}
const sparkles = (t, pts) => pts.map(([x, y], i) => { const s = 0.6 + 0.5 * Math.abs(Math.sin(t * 5 + i * 1.3)); return `<path transform="translate(${x},${y}) scale(${s})" d="M0,-30 l7,23 l23,7 l-23,7 l-7,23 l-7,-23 l-23,-7 l23,-7Z" fill="#fff" stroke="#151515" stroke-width="3"/>`; }).join("");

/* vote result card. c = {title, win:{label,pct,col}, lose:{label,pct,col}, tBars, tWin, tLose, extra} */
function resultCard(t, c) {
  const bar = (y, o, t0, st) => { const k = eo(prog(t, t0, 0.5)); return `
    <text x="90" y="${y - 20}" font-size="${o.label.length > 7 ? 52 : 64}" fill="${o.col}">${o.label}</text>
    <rect x="90" y="${y}" width="540" height="64" rx="12" fill="#2a2a34"/><rect x="90" y="${y}" width="${540 * o.pct / 100 * k}" height="64" rx="12" fill="${o.col}"/>
    <text x="${110 + 540 * o.pct / 100 * k}" y="${y + 50}" font-size="52" fill="#fff">${Math.round(o.pct * k)}%</text>${st}`; };
  return `<rect width="720" height="1280" fill="#14141c"/>
    <text x="360" y="330" text-anchor="middle" font-size="58" fill="#fff">${c.title}</text>
    <text class="ui" x="360" y="372" text-anchor="middle" font-size="22" font-weight="800" fill="#8a8aa0">YOUR COMMENTS, COUNTED</text>
    ${bar(520, c.win, c.tBars, sticker(580, 455, "WINNER", COL.g, pop(t, c.tWin), 8, 34))}
    ${bar(720, c.lose, c.tBars + 0.2, sticker(580, 655, "LOST", COL.r, pop(t, c.tLose), -8, 34, "#fff"))}
    ${c.extra || ""}`;
}

/* angry bedsheet mascot */
function sheetGhost(x, y, k, t, col = "#e9e3c8", n = 1) {
  return k <= 0 ? "" : `<g transform="translate(${x},${y}) scale(${k}) rotate(${Math.sin(t * 5) * 4})"><path class="o" d="M-90,70 v-90 q0,-80 90,-80 q90,0 90,80 v90 l-30,-24 l-30,24 l-30,-24 l-30,24 l-30,-24Z" fill="${col}"/>
    <circle cx="-46" cy="-10" r="12" fill="#c9b458"/><ellipse cx="40" cy="36" rx="20" ry="10" fill="#b9a24a"/>
    <path class="o" d="M-52,-56 l34,14 M52,-56 l-34,14" fill="none" stroke-width="7"/><circle cx="-30" cy="-28" r="8" fill="#151515"/><circle cx="30" cy="-28" r="8" fill="#151515"/><path class="o" d="M-22,10 q22,-16 44,0" fill="none"/>
    ${n > 1 ? `<text x="70" y="-70" font-size="40" fill="${COL.r}" stroke="#151515" stroke-width="6" paint-order="stroke">x${n}</text>` : ""}</g>`;
}

/* chat on the phone. bubbles = [{lines:[...], at}] */
function chat(t, t0, bubbles) {
  let y = 440, inner = "";
  for (const b of bubbles) {
    if (b.pic) {  // photo sent by Kevin: an elbow
      const k = pop(t, b.at);
      if (k > 0) inner += `<g transform="translate(548,${y}) scale(${k})"><rect x="-190" y="0" width="190" height="150" rx="22" fill="#1d8bff"/><rect x="-180" y="10" width="170" height="130" rx="14" fill="#cfe6ff"/>
        <path d="M-170,120 q60,-110 90,-40 q30,50 60,40" stroke="${SKIN}" stroke-width="46" fill="none" stroke-linecap="round"/><path d="M-96,62 q8,-10 16,0" stroke="#b9805c" stroke-width="4" fill="none"/></g>`;
      y += 166; continue;
    }
    const h = 28 * b.lines.length + 28, k = pop(t, b.at);
    const w = Math.max(...b.lines.map(l => l.length)) * 11.5 + 44;
    if (k > 0) inner += `<g transform="translate(172,${y}) scale(${k})"><rect width="${w}" height="${h}" rx="24" fill="#e9e9ee"/>
      <text class="ui" font-size="20" fill="#111">${b.lines.map((l, i) => `<tspan x="20" y="${36 + i * 28}">${l}</tspan>`).join("")}</text></g>`;
    y += h + 16;
  }
  return phone(t, inner, t0);
}

/* bedroom with the big bed. o = {sheet colour, stains, angry (0..1), stink (0..1)} */
function bedroom(t, o = {}) {
  let st = "";
  for (let i = 0; i < 5; i++) { const k = (t * 0.4 + i / 5) % 1; st += `<path d="M${120 + i * 120},${900 - k * 120} q14,-14 0,-28 q-14,-14 0,-28" stroke="#74b33c" stroke-width="6" fill="none" stroke-linecap="round" opacity="${(o.stink || 0) * 0.9 * Math.sin(k * Math.PI)}"/>`; }
  const a = o.angry || 0;
  return `<rect width="720" height="1280" fill="#1c2452"/><rect y="1060" width="720" height="220" fill="#4a3528"/>
    <rect class="o" x="545" y="250" width="110" height="150" fill="#b8323a"/><path d="M600,285 l34,62 h-68Z" fill="#ffd23c"/>
    <rect class="o" x="20" y="800" width="60" height="280" rx="10" fill="#7a5236"/>
    <rect class="o" x="60" y="930" width="640" height="150" rx="14" fill="#7a5236"/>
    <path class="o" d="M70,900 h620 q14,0 14,30 v50 h-648 v-50 q0,-30 14,-30Z" fill="${o.sheet || "#ddd6b3"}"/>
    ${o.clean ? "" : `<ellipse cx="300" cy="940" rx="46" ry="16" fill="#b9a24a"/><ellipse cx="520" cy="952" rx="60" ry="14" fill="#a8913f"/><circle cx="420" cy="925" r="12" fill="#8a5a2c"/>`}
    <rect class="o" x="84" y="860" width="150" height="56" rx="24" fill="#efe9d2"/>
    ${a <= 0 ? "" : `<g transform="translate(${o.ax || 560},935) scale(${a})"><path class="o" d="M-40,-22 l30,12 M40,-22 l-30,12" fill="none" stroke-width="7"/><circle cx="-22" cy="2" r="8" fill="#151515"/><circle cx="22" cy="2" r="8" fill="#151515"/><path class="o" d="M-14,22 q14,-10 28,0" fill="none"/></g>`}${st}`;
}

/* split-screen vote. c = {a:{label,col,s1,s2,k:{kevin opts},extra}, b:{...}, ta, tb, tv, tf, footer} */
function voteScene(t, c) {
  const title = (x, k, o) => k <= 0 ? "" : `<g transform="translate(${x},400) scale(${k})"><text text-anchor="middle" font-size="${o.label.length > 7 ? 54 : 74}" fill="${o.col}" stroke="#0a0a0a" stroke-width="10" paint-order="stroke">${o.label}</text>
    <text class="ui" text-anchor="middle" y="36" font-size="17" font-weight="800" fill="#fff">${o.s1}</text><text class="ui" text-anchor="middle" y="58" font-size="17" font-weight="800" fill="#fff">${o.s2}</text></g>`;
  const v = pop(t, c.tv - 0.1);
  return `<rect width="360" height="1280" fill="#4a1414"/><rect x="360" width="360" height="1280" fill="#123d22"/>
    <path d="M360,0 v1280" stroke="${COL.y}" stroke-width="4"/>
    <text x="360" y="300" text-anchor="middle" font-size="44" fill="${COL.y}" stroke="#0a0a0a" stroke-width="8" paint-order="stroke">COMMENT ONE WORD</text>
    ${title(180, pop(t, c.ta), c.a)}${title(540, pop(t, c.tb), c.b)}
    ${kevin(Object.assign({ x: 180, y: 980, s: 0.72, t }, c.a.k))}${kevin(Object.assign({ x: 540, y: 980, s: 0.72, t: t + 2 }, c.b.k))}
    ${pop(t, c.ta) > 0 ? c.a.extra || "" : ""}${pop(t, c.tb) > 0 ? c.b.extra || "" : ""}
    ${v <= 0 ? "" : `<g transform="translate(360,1030) scale(${v * (1 + 0.05 * Math.sin(t * 9))})"><rect class="o" x="-130" y="-34" width="260" height="68" rx="14" fill="${COL.y}"/><text text-anchor="middle" y="16" font-size="42" fill="#151515">VOTE NOW</text></g>`}
    ${t > c.tf ? `<text class="ui" x="360" y="1238" text-anchor="middle" font-size="20" font-weight="800" fill="#fff" opacity="${prog(t, c.tf, 0.3)}">${c.footer} →</text>` : ""}`;
}

const HELD = {
  dumbbell: `<g transform="translate(0,150)"><rect class="o" x="-50" y="-7" width="100" height="14" fill="#888"/><rect class="o" x="-64" y="-26" width="22" height="52" rx="5" fill="#333"/><rect class="o" x="42" y="-26" width="22" height="52" rx="5" fill="#333"/></g>`,
  comb: `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-10" y="0" width="20" height="80" rx="4" fill="#5cc8ff"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M10,${12 + i * 11} h16" stroke="#151515" stroke-width="4"/>`).join("")}</g>`,
  sheet: `<g transform="translate(0,150) rotate(180)"><path class="o" d="M-40,0 h80 v90 l-20,-14 l-20,14 l-20,-14 l-20,14Z" fill="#ddd6b3"/><circle cx="-10" cy="40" r="9" fill="#b9a24a"/></g>`,
  spray: `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-18" y="0" width="36" height="80" rx="8" fill="#5cc8ff"/><rect class="o" x="-10" y="80" width="20" height="16" fill="#fff"/></g>`,
  razor: `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-7" y="0" width="14" height="70" rx="5" fill="#c9d3da"/><rect class="o" x="-26" y="66" width="52" height="20" rx="4" fill="#8a97a3"/></g>`,
  phone: `<g transform="translate(0,150)"><rect class="o" x="-22" y="-40" width="44" height="76" rx="8" fill="#fff"/><rect x="-16" y="-30" width="32" height="50" fill="#cfe6ff"/></g>`,
};

/* ---------- template v3 pieces: stamp, vote overlay, meter, ticks, achievement ---------- */
const hex2 = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const mixCol = (c1, c2, k) => { const a = hex2(c1), b = hex2(c2); return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * clamp(k)).toString(16).padStart(2, "0")).join(""); };
const stepsOf = (t, ticks) => ticks.filter(x => t >= x).length;
// eased 0..1 progress across a list of tick times
function tickProg(t, ticks) { const n = stepsOf(t, ticks); return n ? clamp((n - 1 + eo(prog(t, ticks[n - 1], 0.4))) / ticks.length) : 0; }

function stampFx(t, small, big, tOut, y = 420) {
  const slam = t < 0.25 ? 1.5 - 0.5 * eo(t / 0.25) : 1, out = 1 - prog(t, tOut - 0.15, 0.2);
  return out <= 0 ? "" : `<g transform="translate(360,${y}) rotate(-7) scale(${slam * out})"><rect x="-310" y="-92" width="620" height="184" rx="16" fill="#fff" stroke="${COL.r}" stroke-width="12"/>
    <text text-anchor="middle" y="-18" font-size="${small.length > 16 ? 44 : 54}" fill="#151515">${small}</text><text text-anchor="middle" y="66" font-size="84" fill="${COL.r}">${big}</text></g>`;
}
function voteWon(t, t0, t1, label, col = COL.b, y = 420) {
  const v = t >= t0 ? pop(t, t0) * (1 - prog(t, t1, 0.2)) : 0;
  return v <= 0 ? "" : `<g transform="translate(360,${y}) rotate(-3) scale(${v})"><rect class="o" x="-260" y="-70" width="520" height="140" rx="18" fill="#14141c"/>
    <text class="ui" x="-230" y="-26" font-size="20" font-weight="800" fill="#8a8aa0">YOUR VOTE</text><text x="-230" y="40" font-size="${label.length > 10 ? 48 : 60}" fill="${col}">${label} WON</text>
    <circle class="o" cx="200" cy="6" r="36" fill="${COL.g}"/><path d="M182,6 l14,14 l24,-28" stroke="#151515" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
}
function meterFx(x, y, label, clean, bad = "#8a5a2c") {
  return `<g transform="translate(${x},${y}) scale(.92)"><rect class="o" x="-34" y="-240" width="68" height="480" rx="14" fill="#14141c"/>
    <rect x="-22" y="${-228 + 456 * clean}" width="44" height="${456 * (1 - clean)}" rx="8" fill="${mixCol(bad, COL.g, clean)}"/>
    <text text-anchor="middle" y="-262" font-size="30" fill="#151515" stroke="#fff" stroke-width="6" paint-order="stroke">${label}</text>
    <text text-anchor="middle" y="290" font-size="40" fill="#151515" stroke="#fff" stroke-width="6" paint-order="stroke">${Math.round(100 * (1 - clean))}%</text></g>`;
}
function tickFx(t, ticks, x = 300) {
  let s = "";
  ticks.forEach((x0, i) => { const k = prog(t, x0, 0.9); if (k > 0 && k < 1) s += `<text x="${x + i * 20}" y="${620 - eo(k) * 380}" text-anchor="middle" font-size="${70 + 30 * back(prog(t, x0, 0.2))}" fill="${COL.g}" stroke="#0a0a0a" stroke-width="12" paint-order="stroke" opacity="${1 - k * k}">+1%</text>`; });
  return s;
}
function steamFx(open, cy = 700) {
  let s = "";
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, r = 60 + rnd(i) * 160; s += `<circle cx="${360 + Math.cos(a) * (r + open * 620)}" cy="${cy + Math.sin(a) * (r * 1.4 + open * 760)}" r="${200 + rnd(i + 9) * 80}" fill="#fff" opacity="${0.96 * (1 - open * 0.6)}"/>`; }
  return s + `<circle cx="360" cy="${cy}" r="${320 * (1 - open)}" fill="#fff"/>`;
}
function confettiFx(t, t0) {
  const w = t - t0; let s = "";
  if (w >= 0) for (let i = 0; i < 46; i++) { const x = rnd(i) * 720, v = 500 + rnd(i + 70) * 500; s += `<rect x="${x + Math.sin(w * 5 + i) * 30}" y="${-40 + w * v - 60 * rnd(i + 30)}" width="16" height="26" fill="${[COL.y, COL.g, COL.p, COL.b, COL.r][i % 5]}" transform="rotate(${w * 400 + i * 40},${x},${-40 + w * v})"/>`; }
  return s;
}
function achieve(t, t0, n, title, y = 420) {
  const k = pop(t, t0);
  return k <= 0 ? "" : `<g transform="translate(360,${y}) rotate(-3) scale(${k})"><rect class="o" x="-300" y="-66" width="600" height="132" rx="20" fill="#14141c"/>
    <circle class="o" cx="-230" cy="0" r="44" fill="${COL.y}"/><path d="M-230,-24 l8,16 l18,2 l-13,13 l3,18 l-16,-9 l-16,9 l3,-18 l-13,-13 l18,-2Z" fill="#151515"/>
    <text class="ui" x="-166" y="-16" font-size="20" font-weight="800" fill="#8a8aa0">FIX ${n} OF 30 UNLOCKED</text><text x="-166" y="40" font-size="${title.length > 14 ? 42 : 52}" fill="${COL.g}">${title}</text></g>`;
}
const premiseTag = name => name === "vote" ? "" : `<g class="ui"><rect x="474" y="140" width="218" height="78" rx="10" fill="#101014" opacity=".92"/>
  <text class="ui" x="583" y="162" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">KEVIN VS</text><text x="583" y="204" text-anchor="middle" font-size="30" fill="${COL.p}">A WEDDING</text></g>`;
function voteBadge(t, t0, a, b, y = 290) {
  return t < t0 ? "" : `<g transform="translate(360,${y - 60 * (1 - eo(prog(t, t0, 0.3)))})" opacity="${prog(t, t0, 0.3)}">
    <rect class="o" x="-250" y="-34" width="500" height="68" rx="34" fill="#14141c"/>
    <text text-anchor="middle" y="14" font-size="${(a + b).length > 14 ? 32 : 36}" fill="#fff">NEXT: <tspan fill="${COL.y}">${a}</tspan> OR <tspan fill="${COL.b}">${b}</tspan>?</text></g>`;
}

/* vote laid over a scene that keeps playing (a cut to a separate vote screen made viewers swipe away).
   c = {t0, ta, tb, a, b, note} */
function voteOverlay(t, c) {
  if (t < c.t0) return "";
  const k = eo(prog(t, c.t0, 0.3));
  const pill = (x, label, col, t1) => { const p = pop(t, t1); return p <= 0 ? "" : `<g transform="translate(${x},440) scale(${p * (1 + 0.04 * Math.sin(t * 9 + x))})"><rect class="o" x="-150" y="-50" width="300" height="100" rx="22" fill="${col}"/>
    <text text-anchor="middle" y="20" font-size="${label.length > 7 ? 46 : 62}" fill="#151515">${label}</text></g>`; };
  return `<g opacity="${k}"><rect x="24" y="${262 - 40 * (1 - k)}" width="672" height="316" rx="26" fill="#14141c" opacity=".94" stroke="#151515" stroke-width="5"/>
      <text x="360" y="340" text-anchor="middle" font-size="46" fill="${COL.y}">COMMENT ONE WORD</text></g>
    ${pill(190, c.a, COL.y, c.ta)}${pill(530, c.b, COL.b, c.tb)}
    ${pop(t, c.tb) > 0 ? `<text x="360" y="452" text-anchor="middle" font-size="30" fill="#fff">OR</text>` : ""}
    ${t > c.tb + 0.4 ? `<text class="ui" x="360" y="548" text-anchor="middle" font-size="21" font-weight="800" fill="#fff" opacity="${prog(t, c.tb + 0.4, 0.3)}">${c.note || "BEST COMMENT GETS SHOWN TOMORROW"}</text>` : ""}`;
}
