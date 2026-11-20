const VARIANT = "C";

function bossBar(t, y, label, show, hits) {
  if (t < show) return "";
  let v = 100, from = 100, at = -9;
  for (const [x, to] of hits) if (t >= x) { from = v; v = to; at = x; }
  const cur = lerp(from, v, eo(prog(t, at, 0.35))), hit = t - at < 0.25, ko = v === 0 && t - at > 0.3;
  return `<g transform="translate(${hit ? Math.sin(t * 90) * 5 : 0},0)" opacity="${prog(t, show, 0.3)}">
    <rect class="o" x="28" y="${y}" width="664" height="34" rx="10" fill="#14141c"/>
    <rect x="170" y="${y + 8}" width="${514 * Math.min(cur, 100 * eo(prog(t, show, 0.8))) / 100}" height="18" rx="6" fill="${hit ? "#fff" : mixCol(COL.r, "#ff9a2e", 1 - cur / 100)}"/>
    <text class="ui" x="40" y="${y + 23}" font-size="16" font-weight="800" fill="#fff">${label}</text>
    ${ko ? `<text x="427" y="${y + 27}" text-anchor="middle" font-size="26" fill="${COL.g}">K.O.</text>` : ""}</g>`;
}

function dog(x, y, k = 0, happy = false, t = 0) {
  const wag = Math.sin(t * (happy ? 30 : 6)) * (happy ? 30 : 8);
  return `<g transform="translate(${x},${y - Math.abs(Math.sin(t * 12)) * k * 30})">
    <path class="o" d="M40,-60 l${30 + wag * 0.3},-${30 - wag * 0.4}" fill="none" stroke-width="10"/>
    <ellipse class="o" cx="0" cy="-50" rx="58" ry="34" fill="#c98a4b"/>
    <rect class="o" x="-44" y="-26" width="16" height="30" rx="6" fill="#c98a4b"/><rect class="o" x="24" y="-26" width="16" height="30" rx="6" fill="#c98a4b"/>
    <circle class="o" cx="-58" cy="-86" r="30" fill="#c98a4b"/><path class="o" d="M-80,-108 q-14,26 2,36 M-40,-110 q14,24 -2,34" fill="#8a5a2c"/>
    <circle cx="-68" cy="-90" r="5" fill="#151515"/><circle cx="-48" cy="-90" r="5" fill="#151515"/><ellipse cx="-58" cy="-74" rx="8" ry="6" fill="#151515"/>
    ${happy ? `<path class="o" d="M-66,-64 q8,14 16,0" fill="#ff7ac0"/>` : ""}</g>`;
}

function shopBg(t) {
  let sh = "";
  for (let r = 0; r < 3; r++) { sh += `<rect class="o" x="20" y="${470 + r * 140}" width="680" height="18" fill="#a07a55"/>`;
    for (let i = 0; i < 11; i++) sh += `<rect class="o" x="${36 + i * 60}" y="${400 + r * 140}" width="${34 + (i % 3) * 6}" height="70" rx="8" fill="${["#5cc8ff", "#ff7ac0", "#7be04a", "#f2c94c", "#b06fd8"][(i + r) % 5]}" stroke-width="3"/>`; }
  return `<rect width="720" height="1280" fill="#e8f1ee"/>${sh}<rect y="1040" width="720" height="240" fill="#cfd9d6"/><path d="M0,1040 h720" stroke="#151515" stroke-width="5"/>
    <rect class="o" x="210" y="300" width="300" height="70" rx="10" fill="#2fa36b"/><text x="360" y="352" text-anchor="middle" font-size="46" fill="#fff">PHARMACY</text>
    <rect class="o" x="370" y="840" width="380" height="250" fill="#f5f5f5"/><rect class="o" x="350" y="820" width="420" height="34" rx="8" fill="#2fa36b"/>`;
}

function assistant(t, o = {}) {
  const tongs = `<g transform="translate(0,150)"><path d="M-6,0 L-4,130 M6,0 L4,130" stroke="#8a97a3" stroke-width="8" stroke-linecap="round"/><g transform="translate(0,170) rotate(180)">${o.held || ""}</g></g>`;
  return npc({ x: 560, y: 1085, s: 1.0, flip: true, top: "#fff", leg: "#2b2f3a", skin: "#e8c4a0", hair: "#6b3a1e", lookx: 1, scared: true,
    armR: o.armR ?? 95, heldR: o.armR === 10 ? "" : tongs, armL: o.armL ?? 8, heldL: o.heldL || "",
    face: `<path class="o" d="M-16,-410 h32" fill="none"/><rect class="o" x="-40" y="-430" width="80" height="34" rx="12" fill="#cfe9ff" stroke-width="3"/>` });
}

function hoodieEyes(t, angry) {
  return `<g transform="translate(0,-250)"><circle class="o" cx="-30" cy="0" r="14" fill="#fff"/><circle class="o" cx="30" cy="0" r="14" fill="#fff"/>
    <circle cx="-28" cy="2" r="5" fill="#151515"/><circle cx="32" cy="2" r="5" fill="#151515"/>
    ${angry ? `<path class="o" d="M-46,-20 l28,10 M46,-20 l-28,10" fill="none" stroke-width="5"/><ellipse class="o" cx="0" cy="36" rx="14" ry="${8 + 6 * Math.abs(Math.sin(t * 14))}" fill="#4a1414"/>` : ""}</g>`;
}

const can = (fill = "#5cc8ff", label = "", sx = 1, sy = 1) => `<g transform="scale(${sx},${sy})"><rect class="o" x="-22" y="-60" width="44" height="90" rx="9" fill="${fill}"/><rect class="o" x="-11" y="-76" width="22" height="16" fill="#fff"/>${label ? `<text x="0" y="-6" text-anchor="middle" font-size="16" fill="#fff">${label}</text>` : ""}</g>`;
// Day 5: MUSA ARRIVES. Musa is a looksmaxxer friend who has 26 days to teach Kevin to mog.
// Musa's look is a placeholder: change MUSA_LOOK to match the real person.
const MUSA_LOOK = { skin: "#b98257", hair: "#151515", top: "#151515", leg: "#2b2f3a", chain: "#e8b923" };
const K = { teeth: WHITE, clean: true, stink: true, noFlies: true };
const TICKS = () => [LS(17), LS(18), LS(19), LS(20)];
const HITS = () => [[CS(16, 1), 80], [LS(17), 60], [LS(18), 40], [LS(19), 20], [LS(20), 0]];

function musa(o) {
  const L = MUSA_LOOK;
  return npc(Object.assign({ s: 1.18, top: L.top, leg: L.leg, skin: L.skin, hair: L.hair, shoe: "#fff",
    hairPath: "M-62,-476 q0,-62 62,-62 q62,0 62,62 q-62,-18 -124,0Z",
    body: `<path d="M-34,-388 q34,46 68,0" stroke="${L.chain}" stroke-width="7" fill="none"/>`,
    face: `<path d="M-40,-470 h34 M8,-470 h36" stroke="${L.skin}" stroke-width="14"/><path d="M-42,-478 h36 M8,-478 h36" stroke="#151515" stroke-width="7" stroke-linecap="round"/>
      <path d="M-58,-432 L-22,-394 h44 L58,-432" fill="none" stroke="#151515" stroke-width="4" opacity=".5"/>` }, o));
}
function rating(x, y, n, k, col) {
  return k <= 0 ? "" : `<g transform="translate(${x},${y}) rotate(-8) scale(${k})"><circle r="92" fill="#fff" stroke="${col}" stroke-width="12"/>
    <text text-anchor="middle" y="28" font-size="84" fill="${col}">${n}<tspan font-size="40">/10</tspan></text></g>`;
}

// FRAME 0: the mog shot. Musa lit and tall on the left, Kevin grey and shrinking on the right.
// ---- opening variants for the trial-reel test (A = original) ----
function hookB(t) {  // gross real moment, mid-action: Musa smells Kevin before he sees him
  const z = 1 + 0.5 * (1 - eo(prog(t, 0, LS(1)))), flash = t > 0.04 && t < 0.2 ? 1 - (t - 0.04) / 0.16 : 0;
  let cloud = "";
  for (let i = 0; i < 9; i++) { const k = (t * 0.8 + i / 9) % 1; cloud += `<circle cx="${560 - k * 380}" cy="${700 + Math.sin(i * 2.1 + t * 3) * 120}" r="${40 + k * 50}" fill="#9bbf3a" opacity="${0.55 * Math.sin(k * Math.PI)}"/>`; }
  const scene = `<rect width="720" height="1280" fill="#8a929e"/><rect y="1040" width="720" height="240" fill="#2b2f3a"/>`
    + kevin(Object.assign({ x: 560, y: 1090, s: 1.0, t: t * 2, expr: "smug", look: -1 }, K))
    + cloud
    + musa({ x: 180, lookx: 1, armR: 150, mouth: "open", scared: true, face: `<path class="o" d="M-46,-500 l30,14 M48,-500 l-30,14" fill="none" stroke-width="7"/>` });
  return `<g transform="translate(220,700) scale(${z}) translate(-220,-700)">${scene}</g>`
    + sticker(400, 360, "SMELLED FROM THE CAR PARK", COL.r, 1, -4, 44, "#fff")
    + `<rect width="720" height="1280" fill="#ff2a2a" opacity="${0.5 * flash}"/>`;
}
function hookC(t) {  // direct question to the viewer: rate him before you scroll
  const z = 1 + 0.12 * Math.sin(t * 2);
  return `<rect width="720" height="1280" fill="#14141c"/>`
    + `<g transform="translate(360,1500) scale(${z}) translate(-360,-1500)">${kevin(Object.assign({ x: 360, y: 1500, s: 2.0, t, expr: "grin" }, K))}</g>`
    + `<g transform="translate(360,330) scale(${1 + 0.15 * (1 - eo(prog(t, 0, 0.25)))})"><rect class="o" x="-320" y="-70" width="640" height="140" rx="16" fill="#fff"/>
        <text text-anchor="middle" y="-10" font-size="52" fill="#151515">RATE HIM 1-10</text><text text-anchor="middle" y="48" font-size="40" fill="${COL.r}">BEFORE YOU SCROLL</text></g>`
    + rating(560, 620, "?", pop(t, 0.2), COL.y);
}

function sMog(t) {
  if (typeof VARIANT !== "undefined" && t < LS(1) - 0.1) return VARIANT === "B" ? hookB(t) : hookC(t);
  let rays = "";
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i - 4.5) * 0.22 + Math.sin(t) * 0.03; rays += `<path d="M190,560 L${190 + Math.cos(a - 0.08) * 1200},${560 + Math.sin(a - 0.08) * 1200} L${190 + Math.cos(a + 0.08) * 1200},${560 + Math.sin(a + 0.08) * 1200}Z" fill="#ffe680" opacity=".55"/>`; }
  const shrink = 1 - 0.12 * eo(prog(t, 0, 0.6)), sniff = t >= CS(6, 2);
  const tk = 1 + 0.15 * (1 - eo(prog(t, 0, 0.25)));
  return `<rect width="360" height="1280" fill="#f2c94c"/>${rays}<rect x="360" width="360" height="1280" fill="#6b7280"/><rect y="1040" width="720" height="240" fill="#2b2f3a"/>
    <path d="M360,0 v1040" stroke="#151515" stroke-width="5"/>
    ${musa({ x: 190, lookx: sniff ? 1 : 0, armR: sniff ? 150 : 10, mouth: sniff ? "open" : "" })}
    <g style="filter:saturate(.2) brightness(.85)" transform="translate(540,1090) scale(${shrink}) translate(-540,-1090)">${kevin(Object.assign({ x: 540, y: 1090, s: 1.0, t, expr: "sad", look: -1 }, K))}</g>
    <text x="190" y="1150" text-anchor="middle" font-size="44" fill="#fff" stroke="#151515" stroke-width="8" paint-order="stroke">MUSA</text>
    <text x="540" y="1150" text-anchor="middle" font-size="44" fill="#ddd" stroke="#151515" stroke-width="8" paint-order="stroke">KEVIN</text>
    ${sticker(540, 560, "MOGGED", COL.r, pop(t, 0.3) * (t < LS(2) ? 1 : 0), 10, 54, "#fff")}
    ${rating(540, 600, 1, pop(t, CS(3, 0)), COL.r)}
    ${t >= LS(4) && t < LS(6) ? sticker(360, 360, "NOBODY VOTED", "#fff", pop(t, LS(4)), -4, 48) : ""}
    ${t >= LS(6) ? `<g transform="translate(360,350) scale(${pop(t, LS(6))})"><rect class="o" x="-300" y="-60" width="600" height="120" rx="16" fill="#14141c"/>
       <text class="ui" x="0" y="-18" text-anchor="middle" font-size="20" font-weight="800" fill="${COL.y}">MOG RULE #1</text><text x="0" y="36" text-anchor="middle" font-size="48" fill="#fff">DON'T SMELL</text></g>` : ""}
    ${t < LS(2) ? `<g transform="translate(360,330) scale(${tk})"><rect class="o" x="-320" y="-62" width="640" height="124" rx="16" fill="#fff"/>
      <text text-anchor="middle" y="-8" font-size="44" fill="#151515">MUSA HAS 26 DAYS</text>
      <text text-anchor="middle" y="44" font-size="46" fill="${COL.r}">TO TEACH HIM HOW TO MOG</text></g>` : ""}`;
}

function sShop(t) {
  const horse = t >= CS(9, 2), deflate = eo(prog(t, LS(11), 0.5));
  let held = can("#5cc8ff", "", 1 - 0.2 * deflate, 1 - 0.55 * deflate);
  if (horse) held = can("#8a5a2c", "HORSE", 1.25, 1.25);
  const dk = prog(t, CS(12, 1), 1.4);
  return shopBg(t) + (dk < 1 ? dog(640 + dk * 400, 1085, 0, false, t) : "")
    + kevin(Object.assign({ x: 190, y: 1090, s: 1.0, t, look: 1, expr: horse ? "shock" : "sad", aR: 20 }, K))
    + assistant(t, { held: t >= LS(8) && t < CS(9, 2) ? "" : held })
    + sticker(500, 560, "FOR HORSES", COL.o, pop(t, CS(9, 2)) * (t < LS(10) ? 1 : 0), 6, 50, "#fff")
    + (dk > 0.2 && dk < 1 ? `<text class="ui" x="${Math.min(640 + dk * 400, 640)}" y="900" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" stroke="#151515" stroke-width="6" paint-order="stroke">nope.</text>` : "");
}

function sSpray(t) {
  const back = t >= CS(14, 1), k = eo(prog(t, CS(13, 2), 0.5)), kb = eo(prog(t, CS(14, 1), 0.6));
  let cloud = "";
  for (let i = 0; i < 7; i++) { const cx = back ? lerp(360, 220, kb) + Math.cos(i) * 60 : 360 + Math.cos(i) * 70 * k, cy = back ? lerp(780, 620, kb) + Math.sin(i * 1.7) * 50 : 780 + Math.sin(i * 1.7) * 60 * k;
    if (t >= CS(13, 2)) cloud += `<circle cx="${cx}" cy="${cy}" r="${40 + 20 * k}" fill="${back ? "#b9a24a" : "#dff4ff"}" opacity=".8"/>`; }
  return shopBg(t) + assistant(t, { armR: 10 })
    + kevin(Object.assign({ x: 300, y: 1090, s: 1.1, t, look: 1, expr: back ? "shock" : "neutral", aR: 120, heldR: `<g transform="translate(0,150) rotate(180)">${can("#8a5a2c", "", 0.9, 0.9)}</g>`, extra: t >= LS(13) ? hoodieEyes(t, back) : "" }, K))
    + cloud + sticker(240, 520, "COUGH", COL.r, pop(t, CS(14, 1)), -8, 54, "#fff");
}

function sMusa(t) {
  const x = lerp(860, 540, eo(prog(t, LS(15) - 0.3, 0.8))), say = pop(t, CS(16, 1));
  return shopBg(t) + musa({ x, lookx: -1, armR: t >= LS(16) ? 120 : 10, mouth: t >= LS(16) ? "open" : "" })
    + kevin(Object.assign({ x: 200, y: 1090, s: 1.0, t, look: 1, expr: "sad", extra: hoodieEyes(t, false) }, K))
    + (say > 0 ? `<g transform="translate(450,500) scale(${say})"><path class="o" d="M-230,-70 h460 v130 h-150 l30,50 l-80,-50 h-260Z" fill="#fff"/>
        <text text-anchor="middle" y="18" font-size="58" fill="#151515">ARMPITS. <tspan fill="#d99a00">BRO.</tspan></text></g>` : "");
}

function sReward(t) {
  const n = stepsOf(t, TICKS()), c = tickProg(t, TICKS()), left = n % 2 === 1;
  let cloud = "";
  if ((n > 0 && n < 4) || (n === 4 && t - LS(20) < 0.6)) { const ax = left ? 200 : 520; for (let i = 0; i < 6; i++) { const a = t * 6 + i; cloud += `<circle cx="${ax + Math.cos(a) * 40}" cy="${640 + Math.sin(a) * 30}" r="${28 + (i % 3) * 8}" fill="#dff4ff" opacity=".85"/>`; } }
  return shopBg(t) + musa({ x: 640, s: 0.9, lookx: -1, armR: n >= 4 ? 150 : 10 })
    + kevin(Object.assign({ x: 330, y: 1100, s: 1.15, t, expr: n >= 3 ? "grin" : "smug", aL: left || n === 0 ? 165 : 20, aR: !left && n > 0 ? 165 : 20,
        heldR: !left && n > 0 ? `<g transform="translate(0,150) rotate(180)">${can("#5cc8ff")}</g>` : "", heldL: left ? `<g transform="translate(0,150) rotate(180)">${can("#5cc8ff")}</g>` : "" }, K, { stink: c < 0.95 }))
    + cloud + meterFx(80, 720, "STINK", c, "#7a8a2c") + tickFx(t, TICKS(), 360);
}

function sReveal(t) {
  return starburst(t, "#bff0d0", "#e6fff0") + kevin(Object.assign({ x: 360, y: 1500, s: 2.0, t, expr: "grin" }, K, { stink: false }))
    + sparkles(t, [[150, 860], [570, 880], [120, 1000], [600, 1020]])
    + confettiFx(t, CS(22, 1)) + achieve(t, CS(22, 1), 4, "MOG RULE #1 DONE", 420);
}

function sRate(t) {
  const flip = t >= CS(24, 0), k = flip ? 1 - Math.abs(Math.cos(Math.min(1, prog(t, CS(24, 0), 0.4)) * Math.PI / 2 * 2)) * 0 : 1;
  const grey = flip ? 0.2 + 0.4 * eo(prog(t, CS(24, 0), 0.5)) : 0.2;
  return `<rect width="360" height="1280" fill="#f2c94c"/><rect x="360" width="360" height="1280" fill="#8a929e"/><rect y="1040" width="720" height="240" fill="#2b2f3a"/>
    <path d="M360,0 v1040" stroke="#151515" stroke-width="5"/>
    ${musa({ x: 190, lookx: 1, armR: t >= LS(25) ? 120 : 10, mouth: t >= CS(25, 1) ? "smile" : "",
      heldR: t >= LS(25) ? `<g transform="translate(0,150)"><circle class="o" r="22" fill="${MUSA_LOOK.skin}"/><rect class="o" x="-8" y="-52" width="16" height="36" rx="8" fill="${MUSA_LOOK.skin}"/></g>` : "" })}
    <g style="filter:saturate(${grey})">${kevin(Object.assign({ x: 540, y: 1090, s: 1.0, t, expr: flip ? "grin" : "neutral", look: -1 }, K, { stink: false }))}</g>
    ${rating(540, 600, flip ? 2 : 1, 1, flip ? COL.g : COL.r)}
    ${flip ? sticker(540, 470, "+1", COL.g, pop(t, CS(24, 0)), 8, 60) : ""}
    ${sticker(190, 470, "WE MOVE.", "#fff", pop(t, CS(25, 1)), -6, 54)}`;
}

function sCliff(t) {
  let tiles = "";
  for (let i = 0; i < 12; i++) tiles += `<path d="M${i * 60},0 v1280 M0,${i * 110} h720" stroke="#a9d6cf" stroke-width="3"/>`;
  const search = t >= LS(27), q = pop(t, CS(26, 1));
  const lens = search ? `<g transform="translate(${360 + Math.sin(t * 3) * 120},${1020 + Math.cos(t * 2.3) * 30})"><circle r="70" fill="#fff" opacity=".25" stroke="#151515" stroke-width="10"/><path d="M50,50 l70,70" stroke="#151515" stroke-width="18" stroke-linecap="round"/></g>` : "";
  return `<rect width="720" height="1280" fill="#c4e8e2"/>${tiles}<defs><clipPath id="mc5"><rect x="70" y="350" width="580" height="760" rx="12"/></clipPath></defs>
    <rect class="o" x="58" y="338" width="604" height="784" rx="18" fill="#8fa3a8"/><rect x="70" y="350" width="580" height="760" rx="12" fill="#e2f4f8"/>
    <g clip-path="url(#mc5)">${kevin(Object.assign({ x: 360, y: 1640, s: 2.0, t, expr: search ? "shock" : "neutral" }, K, { stink: false }))}${lens}</g>
    ${q > 0 && t < LS(29) - 0.3 ? `<g transform="translate(360,470) scale(${q})"><rect class="o" x="-300" y="-60" width="600" height="120" rx="16" fill="#14141c"/>
       <text class="ui" x="0" y="-18" text-anchor="middle" font-size="20" font-weight="800" fill="${COL.y}">MOG RULE #2</text><text x="0" y="36" text-anchor="middle" font-size="48" fill="#fff">THE JAWLINE</text></g>` : ""}
    ${search && t < LS(28) ? sticker(360, 1080, "JAWLINE: NOT FOUND", COL.r, pop(t, CS(27, 1)), -4, 46, "#fff") : ""}`
    + voteOverlay(t, { t0: LS(28) - 0.25, ta: CS(29, 0), tb: CS(29, 1), a: "HAIRCUT", b: "BEARD", note: "RATE HIM 1-10 IN THE COMMENTS" })
    + (t >= LS(28) ? `<g transform="translate(360,1050) scale(${pop(t, LS(28))})"><rect class="o" x="-260" y="-44" width="520" height="88" rx="44" fill="${COL.p}"/>
        <text text-anchor="middle" y="16" font-size="42" fill="#fff">RATE HIM 1-10 ↓</text></g>` : "");
}

function bars(t, name) {
  if (name === "mog" || name === "rate" || name === "cliff" || name === "reveal") return "";
  const note = (t0, txt, col) => { const k = prog(t, t0, 1.0); return k > 0 && k < 1 ? `<text x="600" y="${410 - k * 30}" text-anchor="middle" font-size="44" fill="${col}" stroke="#0a0a0a" stroke-width="9" paint-order="stroke" opacity="${1 - k * k}">${txt}</text>` : ""; };
  return bossBar(t, 230, "STINK HP", LS(7), HITS())
    + note(LS(11), "BLOCKED!", COL.r) + note(CS(12, 1), "BLOCKED!", COL.r) + note(CS(14, 1), "MISS!", "#fff")
    + HITS().map(([x]) => note(x, "-20", COL.y)).join("");
}

window.EP = {
  days: 26, pct: [13, 17, 0], pctFn: t => 13 + stepsOf(t, TICKS()),
  punch: [0, CS(1, 3), CS(3, 0), CS(5, 1), CS(6, 2), CS(9, 2), LS(11), CS(12, 1), CS(14, 1), CS(16, 1), ...TICKS(), CS(22, 1), CS(24, 0), CS(25, 1), CS(26, 1), CS(27, 1)],
  CAPY: { mog: 1230, shop: 1180, spray: 1180, musa: 1180, reward: 1180, reveal: 1080, rate: 1230, cliff: 1200 },
  overlay: (t, n) => premiseTag(n) + bars(t, n) + (n === "spray" || n === "musa" || n === "reward" ? voteBadge(t, LS(13), "HAIRCUT", "BEARD", 300) : ""),
  SC: { mog: sMog, shop: sShop, spray: sSpray, musa: sMusa, reward: sReward, reveal: sReveal, rate: sRate, cliff: sCliff },
};
