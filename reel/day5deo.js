// Day 5, branch B: DEODORANT won. Pharmacy episode; the laundromat lady returns as the helper.
const K = { teeth: WHITE, clean: true, stink: true, noFlies: true };
const TICKS = () => [LS(13), LS(14), LS(15), LS(16)];
const fresh = t => t >= LS(16) + 0.2;

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
const HITS = () => [[CS(12, 1), 80], [LS(13), 60], [LS(14), 40], [LS(15), 20], [LS(16), 0]];
function bars(t, name) {
  if (name === "phone" || name === "cliff" || name === "dog") return "";
  const note = (t0, txt, col) => { const k = prog(t, t0, 1.0); return k > 0 && k < 1 ? `<text x="600" y="${410 - k * 30}" text-anchor="middle" font-size="44" fill="${col}" stroke="#0a0a0a" stroke-width="9" paint-order="stroke" opacity="${1 - k * k}">${txt}</text>` : ""; };
  return bossBar(t, 230, "STINK HP", LS(1), HITS())
    + note(LS(6), "BLOCKED!", COL.r) + note(CS(8, 1), "BLOCKED!", COL.r) + note(CS(10, 1), "MISS!", "#fff")
    + HITS().map(([x], i) => note(x, "-20", COL.y)).join("");
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
const can = (fill = "#5cc8ff", label = "", sx = 1, sy = 1) => `<g transform="scale(${sx},${sy})"><rect class="o" x="-22" y="-60" width="44" height="90" rx="9" fill="${fill}"/><rect class="o" x="-11" y="-76" width="22" height="16" fill="#fff"/>${label ? `<text x="0" y="-6" text-anchor="middle" font-size="16" fill="#fff">${label}</text>` : ""}</g>`;

function assistant(t, o = {}) {
  const tongs = `<g transform="translate(0,150)"><path d="M-6,0 L-4,130 M6,0 L4,130" stroke="#8a97a3" stroke-width="8" stroke-linecap="round"/><g transform="translate(0,170) rotate(180)">${o.held || ""}</g></g>`;
  return npc({ x: 560, y: 1085, s: 1.0, flip: true, top: "#fff", leg: "#2b2f3a", skin: "#e8c4a0", hair: "#6b3a1e", lookx: 1, scared: true,
    armR: o.armR ?? 95, heldR: o.armR === 10 ? "" : tongs, armL: o.armL ?? 8, heldL: o.heldL || "",
    face: `<path class="o" d="M-16,-410 h32" fill="none"/><rect class="o" x="-40" y="-430" width="80" height="34" rx="12" fill="#cfe9ff" stroke-width="3"/>` });
}

function sShop(t) {
  const z = 1 + 1.1 * (1 - eo(prog(t, 0, LS(1)))), flash = t > 0.04 && t < 0.2 ? 1 - (t - 0.04) / 0.16 : 0;
  const horse = t >= CS(4, 2), deflate = eo(prog(t, LS(6), 0.5));
  let held = can("#5cc8ff", "", 1 - 0.2 * deflate, 1 - 0.55 * deflate);
  if (horse) held = can("#8a5a2c", "HORSE", 1.25, 1.25);
  const strip = t >= LS(8) ? `<g transform="translate(470,700) rotate(-20) scale(${pop(t, LS(8))})"><rect class="o" x="-14" y="-70" width="28" height="140" rx="4" fill="${mixCol("#ffffff", "#7a4a1e", eo(prog(t, CS(8, 1), 0.6)))}"/></g>` : "";
  const dk = prog(t, CS(7, 1), 1.4);
  const scene = shopBg(t) + (dk < 1 ? dog(640 + dk * 400, 1085, 0, false, t) : "")
    + kevin(Object.assign({ x: 190, y: 1090, s: 1.0, t, look: 1, expr: horse ? "shock" : t >= LS(1) ? "sad" : "neutral", aR: 20 }, K))
    + assistant(t, { held: t < CS(4, 2) && t >= LS(3) && t < CS(4, 1) ? "" : held, armR: t >= LS(8) ? 10 : 95, heldL: "" }) + strip;
  const tk = 1 + 0.15 * (1 - eo(prog(t, 0, 0.25)));
  const title = t < LS(3) ? `<g transform="translate(360,330) scale(${tk})"><rect class="o" x="-320" y="-62" width="640" height="124" rx="16" fill="#fff"/>
      <text text-anchor="middle" y="-8" font-size="44" fill="#151515">HE HAS NEVER OWNED DEODORANT</text>
      <text text-anchor="middle" y="44" font-size="46" fill="${COL.r}">SHE USES TONGS</text></g>` : "";
  return `<g transform="translate(380,760) scale(${z}) translate(-380,-760)">${scene}</g>`
    + voteWon(t, LS(2), LS(3) - 0.2, "DEODORANT", COL.y, 540)
    + sticker(500, 560, "FOR HORSES", COL.o, pop(t, CS(4, 2)) * (t < LS(5) ? 1 : 0), 6, 50, "#fff")
    + (dk > 0.2 && dk < 1 ? `<text class="ui" x="${Math.min(640 + dk * 400, 640)}" y="900" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" stroke="#151515" stroke-width="6" paint-order="stroke">nope.</text>` : "")
    + title + `<rect width="720" height="1280" fill="#ff2a2a" opacity="${0.6 * flash}"/>`;
}

function hoodieEyes(t, angry) {
  return `<g transform="translate(0,-250)"><circle class="o" cx="-30" cy="0" r="14" fill="#fff"/><circle class="o" cx="30" cy="0" r="14" fill="#fff"/>
    <circle cx="-28" cy="2" r="5" fill="#151515"/><circle cx="32" cy="2" r="5" fill="#151515"/>
    ${angry ? `<path class="o" d="M-46,-20 l28,10 M46,-20 l-28,10" fill="none" stroke-width="5"/><ellipse class="o" cx="0" cy="36" rx="14" ry="${8 + 6 * Math.abs(Math.sin(t * 14))}" fill="#4a1414"/>` : ""}</g>`;
}

function sSpray(t) {
  const back = t >= CS(10, 1), k = eo(prog(t, CS(9, 2), 0.5)), kb = eo(prog(t, CS(10, 1), 0.6));
  let cloud = "";
  for (let i = 0; i < 7; i++) { const cx = back ? lerp(360, 220, kb) + Math.cos(i) * 60 : 360 + Math.cos(i) * 70 * k, cy = back ? lerp(780, 620, kb) + Math.sin(i * 1.7) * 50 : 780 + Math.sin(i * 1.7) * 60 * k;
    if (t >= CS(9, 2)) cloud += `<circle cx="${cx}" cy="${cy}" r="${40 + 20 * k}" fill="${back ? "#b9a24a" : "#dff4ff"}" opacity=".8"/>`; }
  return shopBg(t) + assistant(t, { armR: 10 })
    + kevin(Object.assign({ x: 300, y: 1090, s: 1.1, t, look: 1, expr: back ? "shock" : "neutral", aR: 120, heldR: `<g transform="translate(0,150) rotate(180)">${can("#8a5a2c", "", 0.9, 0.9)}</g>`, extra: t >= LS(9) ? hoodieEyes(t, back) : "" }, K))
    + cloud + sticker(240, 520, "COUGH", COL.r, pop(t, CS(10, 1)), -8, 54, "#fff");
}

function lady(x, t, talk) {
  return npc({ x, s: 0.9, flip: true, top: "#b06fd8", leg: "#b06fd8", skin: "#e8c4a0", hair: "#d9d9de", lookx: 1, mouth: talk ? "open" : "",
    hairPath: "M-62,-470 q0,-66 62,-66 q62,0 62,66 q-30,-30 -62,-28 q-32,-2 -62,28Z M-20,-560 a22,22 0 1,0 40,0 a22,22 0 1,0 -40,0",
    armR: talk ? 150 : 10, face: `<circle class="o" cx="-22" cy="-458" r="20" fill="none" stroke-width="4"/><circle class="o" cx="26" cy="-458" r="20" fill="none" stroke-width="4"/>` });
}

function sLady(t) {
  const x = lerp(860, 560, eo(prog(t, CS(11, 2), 0.8))), say = pop(t, CS(12, 1));
  return shopBg(t) + lady(x, t, t >= LS(12))
    + kevin(Object.assign({ x: 220, y: 1090, s: 1.0, t, look: 1, expr: "sad", extra: hoodieEyes(t, false) }, K))
    + (say > 0 ? `<g transform="translate(470,520) scale(${say})"><path class="o" d="M-220,-70 h440 v130 h-120 l-40,50 l0,-50 h-280Z" fill="#fff"/>
        <text text-anchor="middle" y="18" font-size="58" fill="#151515">ARMPITS, <tspan fill="#b06fd8">DEAR.</tspan></text></g>` : "");
}

function sReward(t) {
  const n = stepsOf(t, TICKS()), c = tickProg(t, TICKS()), left = n % 2 === 1;
  let cloud = "";
  if (n > 0 && n < 4 || (n === 4 && t - LS(16) < 0.6)) { const ax = left ? 200 : 520; for (let i = 0; i < 6; i++) { const a = t * 6 + i; cloud += `<circle cx="${ax + Math.cos(a) * 40}" cy="${640 + Math.sin(a) * 30}" r="${28 + (i % 3) * 8}" fill="#dff4ff" opacity=".85"/>`; } }
  let sparks = "";
  for (let i = 0; i < 10; i++) { const k = (t * 0.7 + rnd(i)) % 1; sparks += `<text x="${80 + rnd(i + 3) * 560}" y="${1000 - k * 500}" font-size="${34 + rnd(i) * 20}" fill="${COL.g}" opacity="${c * Math.sin(k * Math.PI)}">✿</text>`; }
  return shopBg(t) + sparks
    + kevin(Object.assign({ x: 360, y: 1100, s: 1.15, t, expr: n >= 3 ? "grin" : "smug", aL: left || n === 0 ? 165 : 20, aR: !left && n > 0 ? 165 : 20,
        heldR: !left && n > 0 ? `<g transform="translate(0,150) rotate(180)">${can("#5cc8ff")}</g>` : "", heldL: left ? `<g transform="translate(0,150) rotate(180)">${can("#5cc8ff")}</g>` : "" }, K, { stink: c < 0.95 }))
    + cloud + meterFx(636, 720, "STINK", c, "#7a8a2c") + tickFx(t, TICKS(), 300);
}

function sReveal(t) {
  return starburst(t, "#bff0d0", "#e6fff0") + kevin(Object.assign({ x: 360, y: 1500, s: 2.0, t, expr: "grin" }, K, { stink: false }))
    + sparkles(t, [[150, 860], [570, 880], [120, 1000], [600, 1020]])
    + sticker(360, 560, "SMELL: PERSON", COL.g, pop(t, CS(18, 1)), -4, 50)
    + confettiFx(t, LS(19)) + achieve(t, LS(19), 4, "SMELLS LIKE A PERSON", 420);
}

function sDog(t) {
  const k = eo(prog(t, LS(20), 0.9)), hug = t >= LS(21);
  let hearts = "";
  if (hug) for (let i = 0; i < 6; i++) { const q = (t * 0.9 + i / 6) % 1; hearts += `<text x="${200 + i * 50}" y="${700 - q * 220}" font-size="44" fill="${COL.p}" opacity="${Math.sin(q * Math.PI)}">♥</text>`; }
  return shopBg(t) + kevin(Object.assign({ x: 220, y: 1090, s: 1.0, t, look: 1, expr: "grin", aL: hug ? 70 : 12, aR: hug ? 70 : 12 }, K, { stink: false }))
    + (hug ? `<g transform="translate(250,880) rotate(-70)">${dog(0, 0, 0, true, t)}</g>` : dog(lerp(900, 380, k), 1085, 1 - k, true, t)) + hearts;
}

function sCliff(t) {
  const sees = t >= CS(28, 2);
  const hairEyes = t >= CS(28, 1) ? `<g transform="translate(0,-478) scale(${pop(t, CS(28, 1))})">
      <circle class="o" cx="-30" cy="0" r="16" fill="#fff"/><circle class="o" cx="30" cy="0" r="16" fill="#fff"/>
      <circle cx="${sees ? -26 : -34}" cy="${sees ? 4 : -2}" r="6" fill="#151515"/><circle cx="${sees ? 34 : 26}" cy="${sees ? 4 : -2}" r="6" fill="#151515"/>
      ${sees ? `<path class="o" d="M-48,-22 l30,10 M48,-22 l-30,10" fill="none" stroke-width="6"/>` : ""}</g>` : "";
  return city(t, "#2a3a5a") + `<defs><clipPath id="gw"><rect x="70" y="420" width="580" height="640"/></clipPath></defs>
    <rect class="o" x="58" y="408" width="604" height="664" fill="#39424f"/><rect x="70" y="420" width="580" height="640" fill="#7fa9bf"/>
    <rect class="o" x="160" y="330" width="400" height="70" rx="10" fill="${COL.r}"/><text x="360" y="382" text-anchor="middle" font-size="46" fill="#fff">IRON DEN</text>
    <g clip-path="url(#gw)"><g opacity=".35">${npc({ x: 540, y: 1000, s: 1.1, w: 1.75, top: "#151515", bare: true, skin: "#b9764a", leg: "#2a5fd0", armL: 160, armR: 160 })}</g>
      <g opacity=".85">${kevin(Object.assign({ x: 330, y: 1640, s: 2.0, t, expr: sees ? "shock" : "neutral", head: hairEyes }, K, { stink: false }))}</g></g>`
    + voteOverlay(t, { t0: LS(29) - 0.25, ta: LS(29), tb: CS(29, 1), a: "GYM", b: "HAIRCUT" })
    + (t >= LS(30) ? `<g transform="translate(360,640) scale(${pop(t, LS(30))})"><rect class="o" x="-300" y="-40" width="600" height="80" rx="40" fill="${COL.p}"/>
        <text text-anchor="middle" y="14" font-size="36" fill="#fff">FOLLOW: DOES HE MAKE THE WEDDING?</text></g>` : "");
}

window.EP = {
  days: 26, pct: [13, 17, 0], pctFn: t => 13 + stepsOf(t, TICKS()),
  punch: [0, CS(1, 1), LS(2), CS(4, 2), LS(6), CS(7, 1), CS(8, 1), CS(9, 2), CS(10, 1), CS(12, 1), ...TICKS(), CS(18, 1), LS(19), LS(21), CS(23, 2), CS(25, 1), CS(26, 1), CS(28, 2)],
  CAPY: { shop: 1180, spray: 1180, lady: 1180, reward: 1180, reveal: 1080, dog: 1180, phone: 1195, cliff: 1170 },
  overlay: (t, n) => premiseTag(n) + bars(t, n) + (n !== "shop" && n !== "cliff" && n !== "phone" ? voteBadge(t, LS(9), "GYM", "HAIRCUT", 300) : ""),
  SC: { shop: sShop, spray: sSpray, lady: sLady, reward: sReward, reveal: sReveal, dog: sDog, cliff: sCliff,
    phone: t => chat(t, LS(22) - 0.25, [{ lines: ["my aunt says you smell", "different. she was on", "your bus"], at: LS(23) }, { me: true, lines: ["which aunt"], at: CS(25, 1) }, { lines: ["all of them"], at: CS(26, 1) }]) },
};
