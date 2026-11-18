// Day 5, branch A: GYM won. One boss bar (gravity); the smell stays and sets up the next vote.
const K = { teeth: WHITE, clean: true, stink: false, noFlies: true };
const TICKS = () => [CS(19, 0), CS(19, 1), CS(19, 2), LS(20)];

function gym(t, fog = 0) {
  let rack = "";
  for (let i = 0; i < 5; i++) rack += `<g transform="translate(${70 + i * 60},700)"><rect class="o" x="-22" y="-6" width="44" height="12" fill="#888"/><rect class="o" x="-28" y="-18" width="12" height="36" rx="3" fill="#333"/><rect class="o" x="16" y="-18" width="12" height="36" rx="3" fill="#333"/></g>`;
  return `<rect width="720" height="1280" fill="#39424f"/><rect y="1040" width="720" height="240" fill="#22262d"/><path d="M0,1040 h720" stroke="#151515" stroke-width="5"/>
    <rect class="o" x="380" y="400" width="300" height="350" fill="#a9d2e6"/><path d="M410,430 l60,-20 M420,480 l100,-36" stroke="#fff" stroke-width="8"/>
    <rect x="383" y="403" width="294" height="344" fill="#fff" opacity="${0.85 * fog}"/>
    <rect class="o" x="40" y="400" width="260" height="70" rx="10" fill="${COL.r}"/><text x="170" y="452" text-anchor="middle" font-size="46" fill="#fff">IRON DEN</text>
    <rect class="o" x="30" y="720" width="320" height="16" fill="#555"/>${rack}`;
}

// ---------- two boss bars ----------
function bossBar(t, y, label, show, hits) {
  if (t < show) return "";
  let v = 100, from = 100, at = -9;
  for (const [x, to] of hits) if (t >= x) { from = v; v = to; at = x; }
  const cur = lerp(from, v, eo(prog(t, at, 0.35))), hit = t - at < 0.25, ko = v === 0 && t - at > 0.3;
  const fill = Math.min(cur, 100 * eo(prog(t, show, 0.8)));
  return `<g transform="translate(${hit ? Math.sin(t * 90) * 5 : 0},0)" opacity="${prog(t, show, 0.3)}">
    <rect class="o" x="28" y="${y}" width="664" height="34" rx="10" fill="#14141c"/>
    <rect x="170" y="${y + 8}" width="${514 * fill / 100}" height="18" rx="6" fill="${hit ? "#fff" : mixCol(COL.r, "#ff9a2e", 1 - cur / 100)}"/>
    <text class="ui" x="40" y="${y + 23}" font-size="16" font-weight="800" fill="#fff">${label}</text>
    ${ko ? `<text x="427" y="${y + 27}" text-anchor="middle" font-size="26" fill="${COL.g}">K.O.</text>` : ""}</g>`;
}
const GRAV = () => [[CS(19, 0), 75], [CS(19, 1), 50], [CS(19, 2), 25], [LS(20), 0]];
const STINK = () => [[CS(14, 2), 50], [LS(16) + 0.3, 0]];
function bars(t, name) {
  if (name === "cliff" || name === "phone") return "";
  const note = (t0, txt, col, y) => { const k = prog(t, t0, 1.0); return k > 0 && k < 1 ? `<text x="600" y="${y - k * 30}" text-anchor="middle" font-size="44" fill="${col}" stroke="#0a0a0a" stroke-width="9" paint-order="stroke" opacity="${1 - k * k}">${txt}</text>` : ""; };
  return bossBar(t, 230, "GRAVITY HP", LS(3), GRAV()) 
    + note(CS(4, 1), "MISS!", "#fff", 400) + note(CS(8, 1), "BLOCKED!", COL.r, 400)
    + note(CS(4, 1) + 0.5, "NO HELP", COL.r, 470)
    + GRAV().map(([x]) => note(x, "-25", COL.y, 400)).join("");
}

// ---------- scenes ----------
function sHook(t) {
  const wob = Math.sin(t * 10) * 2, kick = Math.sin(t * 18) * 14;
  const z = 1 + 0.8 * (1 - eo(prog(t, 0, LS(1)))), flash = t > 0.04 && t < 0.2 ? 1 - (t - 0.04) / 0.16 : 0;
  const scene = gym(t)
    + npc({ x: 640, s: 0.95, top: "#151515", leg: "#151515", skin: "#c98d63", looky: 1, lookx: -1, body: `<text x="0" y="-290" text-anchor="middle" font-size="30" fill="#fff">STAFF</text>` })
    + `<rect class="o" x="110" y="960" width="520" height="34" rx="10" fill="#b8323a"/><rect class="o" x="170" y="994" width="24" height="90" fill="#555"/><rect class="o" x="540" y="994" width="24" height="90" fill="#555"/>
       <rect class="o" x="180" y="640" width="16" height="330" fill="#777"/><rect class="o" x="560" y="640" width="16" height="330" fill="#777"/>`
    + lieKevin(Object.assign({ x: 560, y: 955, s: 0.95, t: t * 3, expr: "shock", aL: 175 + wob, aR: 175 - wob, tilt: kick * 0.2 }, K), -90)
    + `<g transform="translate(0,${wob})"><rect class="o" x="60" y="772" width="600" height="18" rx="9" fill="#c9d3da"/>
       <rect class="o" x="60" y="762" width="26" height="38" rx="4" fill="#8a97a3"/><rect class="o" x="634" y="762" width="26" height="38" rx="4" fill="#8a97a3"/></g>`;
  const tk = 1 + 0.15 * (1 - eo(prog(t, 0, 0.25)));
  const title = t < LS(3) ? `<g transform="translate(360,330) scale(${tk})"><rect class="o" x="-320" y="-62" width="640" height="124" rx="16" fill="#fff"/>
      <text text-anchor="middle" y="-8" font-size="44" fill="#151515">HIS FIRST TIME IN A GYM</text>
      <text text-anchor="middle" y="44" font-size="46" fill="${COL.r}">ELEVEN MINUTES IN</text></g>` : "";
  return `<g transform="translate(240,880) scale(${z}) translate(-240,-880)">${scene}</g>`
    + voteWon(t, LS(2), LS(3) - 0.2, "GYM", COL.b, 540)
    + (t >= CS(0, 2) && t < LS(2) ? `<g transform="translate(200,560) rotate(-5) scale(${pop(t, CS(0, 2))})"><rect class="o" x="-100" y="-50" width="200" height="100" rx="14" fill="#151515"/><text text-anchor="middle" y="24" font-size="64" fill="${COL.r}">11:00</text></g>` : "")
    + sticker(360, 690, "0 KG", COL.y, pop(t, CS(1, 1)) * (t < LS(2) ? 1 : 0), -6, 60)
    + title + `<rect width="720" height="1280" fill="#ff2a2a" opacity="${0.6 * flash}"/>`;
}

function sDesk(t) {
  const base = gym(t) + npc({ x: 520, s: 1.0, flip: true, top: "#e2574c", skin: "#e8c4a0", hair: "#f2c94c", mouth: "smile", lookx: 1 })
    + `<rect class="o" x="300" y="820" width="430" height="270" fill="#7a5236"/><rect class="o" x="280" y="800" width="460" height="34" rx="8" fill="#a07a55"/>
       <rect class="o" x="400" y="880" width="230" height="64" rx="8" fill="${COL.y}"/><text x="515" y="926" text-anchor="middle" font-size="38" fill="#151515">FREE TRIAL</text>`
    + kevin(Object.assign({ x: 170, y: 1090, s: 1.0, t, look: 1, expr: "grin", aR: 80 }, K));
  const k = pop(t, LS(5) + 0.3);
  if (k <= 0) return base;
  const w = prog(t, CS(6, 2), 0.5);
  return base + `<rect width="720" height="1280" fill="#000" opacity="${0.55 * Math.min(k, 1)}"/><g transform="translate(360,700) rotate(-3) scale(${k})">
      <rect class="o" x="-250" y="-270" width="500" height="540" rx="10" fill="#fff"/><rect class="o" x="-70" y="-300" width="140" height="50" rx="10" fill="#8a97a3"/>
      <text x="0" y="-190" text-anchor="middle" font-size="44" fill="#151515">NEW MEMBER</text>
      <text class="ui" x="-210" y="-110" font-size="24" font-weight="800" fill="#666">NAME</text><text class="ui" x="-210" y="-66" font-size="38" font-style="italic" fill="#1d4fd0">Kevin</text><path d="M-210,-50 h420" stroke="#bbb" stroke-width="3"/>
      <text class="ui" x="-210" y="10" font-size="24" font-weight="800" fill="#666">GOAL</text><text class="ui" x="-210" y="54" font-size="38" font-style="italic" fill="#1d4fd0">a wedding</text><path d="M-210,70 h420" stroke="#bbb" stroke-width="3"/>
      <text class="ui" x="-210" y="130" font-size="24" font-weight="800" fill="#666">OCCUPATION</text><text class="ui" x="-210" y="180" font-size="44" font-style="italic" font-weight="800" fill="#1d4fd0">${"goblin".slice(0, Math.ceil(w * 6))}</text><path d="M-210,196 h420" stroke="#bbb" stroke-width="3"/></g>`;
}

function sTread(t) {
  const off = t - CS(8, 1);
  const kx = off > 0 ? 330 + off * 700 : 330 + Math.sin(t * 3) * 14;
  const belt = (t * 300) % 60;
  let lines = "";
  for (let i = 0; i < 8; i++) lines += `<path d="M${150 + i * 60 - belt},1062 h26" stroke="#555" stroke-width="6"/>`;
  return gym(t)
    + `<rect class="o" x="120" y="1040" width="470" height="46" rx="20" fill="#151515"/>${lines}
       <path class="o" d="M150,1040 L190,700" fill="none" stroke="#8a97a3" stroke-width="16"/><rect class="o" x="110" y="640" width="170" height="90" rx="12" fill="#2b2f3a"/>
       <text class="ui" x="195" y="668" text-anchor="middle" font-size="16" font-weight="800" fill="#8a97a3">SPEED</text><text x="195" y="718" text-anchor="middle" font-size="48" fill="${COL.g}">1</text>`
    + kevin(Object.assign({ x: kx, y: 1044, s: 1.0, t: t * 4, look: -1, expr: off > 0 ? "shock" : "sad", aL: 40 + Math.sin(t * 14) * 40, aR: 40 - Math.sin(t * 14) * 40, tilt: off > 0 ? 25 : 0, flip: true }, K));
}

function sSmell(t) {
  const fog = eo(prog(t, CS(11, 1), 0.6));
  let sweat = "";
  for (let i = 0; i < 5; i++) { const k = (t * 1.5 + i / 5) % 1; sweat += `<path transform="translate(${180 + i * 40},${560 + k * 140})" d="M0,-14 q12,16 0,26 q-12,-10 0,-26Z" fill="#5cc8ff" stroke="#151515" stroke-width="3" opacity="${1 - k}"/>`; }
  let flee = "";
  [["#e2574c", "#f2c94c", 0], ["#2a5fd0", "#151515", 0.25], ["#7be04a", "#8a5a2c", 0.5]].forEach(([top, hair, d], i) => {
    const k = prog(t, CS(10, 1) + d, 1.4); if (k < 1) flee += npc({ x: 420 + i * 70 + k * 600, s: 0.8, top, hair, leg: "#2b2f3a", lookx: -1, scared: k > 0, mouth: k > 0 ? "open" : "", armL: k > 0 ? 160 : 8, armR: k > 0 ? 160 : 10 });
  });
  return gym(t, fog) + flee
    + kevin(Object.assign({ x: 200, y: 1090, s: 1.0, t: t * 2, look: 1, expr: t >= LS(10) ? "sad" : "neutral" }, K, { stink: true })) + sweat
    + sticker(530, 580, "FOGGED", "#fff", pop(t, CS(11, 1)), 6, 46);
}

function sBig(t) {
  const x = lerp(900, 480, eo(prog(t, LS(12), 1.2))), give = t >= CS(14, 2), sprayed = t >= LS(16);
  const can = `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-36" y="-6" width="72" height="96" rx="6" fill="#fff"/><path d="M-36,60 h72 M-36,72 h72" stroke="#5cc8ff" stroke-width="6"/></g>`;
  const say = t >= LS(15) && t < LS(16) ? pop(t, LS(15)) : 0;
  let cloud = "";
  if (false) { const k = eo(prog(t, LS(16), 0.8)); for (let i = 0; i < 9; i++) cloud += `<circle cx="${150 + Math.cos(i) * 160 * k}" cy="${700 + Math.sin(i * 1.7) * 140 * k}" r="${70 + 40 * k}" fill="#dff4ff" opacity="${0.85 * (1 - k * 0.7)}"/>`; }
  let back = "";
  if (false) [["#e2574c", "#f2c94c"], ["#2a5fd0", "#151515"], ["#7be04a", "#8a5a2c"]].forEach(([top, hair], i) => {
    const k = eo(prog(t, CS(17, 1) + i * 0.15, 0.7)); back += npc({ x: 1000 - k * (280 - i * 70), y: 1085, s: 0.75, top, hair, leg: "#2b2f3a", lookx: -1, mouth: "smile" });
  });
  return gym(t, 1) + back
    + npc({ x, s: 1.28, w: 1.75, flip: true, top: "#151515", bare: true, skin: "#b9764a", leg: "#2a5fd0", hair: "#151515", lookx: 1, looky: 0.6,
      mouth: give ? "smile" : "", armR: give && !sprayed ? 80 : 14, heldR: give && !sprayed ? can : "", face: `<path class="o" d="M-40,-486 l30,10 M44,-486 l-30,10" fill="none" stroke-width="7"/>` })
    + kevin(Object.assign({ x: 150, y: 1090, s: 0.85, t: t * (give ? 1 : 5), look: 1, expr: give ? "grin" : "shock", tilt: give ? 0 : Math.sin(t * 30) * 2, aR: sprayed ? 150 : 12, heldR: sprayed ? `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-36" y="-6" width="72" height="96" rx="6" fill="#fff"/></g>` : "" }, K, { stink: true }))
    + sticker(520, 560, "COMPLAINT FILED", COL.r, pop(t, CS(17, 1)), 6, 44, "#fff")
    + cloud
    + (say > 0 ? `<g transform="translate(290,520) scale(${say})"><path class="o" d="M-250,-80 h500 v150 h-130 l40,60 l-100,-60 h-310Z" fill="#fff"/>
        <text text-anchor="middle" y="-18" font-size="40" fill="#151515">FIRST DAY IS THE</text><text text-anchor="middle" y="36" font-size="40" fill="#151515">HARDEST, <tspan fill="#d99a00">KING.</tspan></text></g>` : "");
}

function sPush(t) {
  const n = stepsOf(t, TICKS()), last = n ? TICKS()[n - 1] : LS(18);
  const target = n % 2 ? 0 : 1, prev = 1 - target;
  const up = n === 0 ? 1 : lerp(prev, target, eo(prog(t, last, 0.35)));
  const shake = Math.sin(t * 60) * 3 * (1 - up);
  return gym(t)
    + `<ellipse cx="360" cy="1100" rx="230" ry="20" fill="#5cc8ff" opacity=".5"/>`
    + `<g transform="translate(${shake},0)">${lieKevin(Object.assign({ x: 600, y: 1090 - up * 70, s: 0.95, t, expr: n >= 4 ? "grin" : "sad", aL: 90, aR: 8, flip: false }, K), -84 - up * 6)}</g>`
    + tickFx(t, TICKS(), 300) + sticker(360, 560, "REPS: " + Math.floor(n / 2), COL.g, pop(t, CS(19, 1)), -5, 60);
}

function sReveal(t) {
  let claps = "";
  for (let i = 0; i < 6; i++) { const k = pop(t, LS(21) + i * 0.15, 0.2), x = [90, 630, 160, 560, 250, 470][i], y = [620, 640, 520, 500, 700, 710][i];
    claps += k <= 0 ? "" : `<g transform="translate(${x},${y}) scale(${k * (1 + 0.12 * Math.sin(t * 18 + i))}) rotate(${i % 2 ? 14 : -14})"><path class="o" d="M-24,24 l-6,-40 q6,-12 16,-2 l8,-18 q10,-8 16,4 l10,34 q2,22 -22,24Z" fill="#f2c08a"/><path d="M34,-34 l10,-12 M44,-14 l14,-4 M20,-46 l2,-14" stroke="${COL.y}" stroke-width="5" stroke-linecap="round"/></g>`; }
  return starburst(t) + kevin(Object.assign({ x: 360, y: 1500, s: 2.0, t, expr: "grin" }, K))
    + sparkles(t, [[150, 860], [570, 880], [120, 1000], [600, 1020]]) + claps
    + confettiFx(t, LS(22)) + achieve(t, LS(22), 4, "ONE (1) PUSH-UP", 420);
}

function sCliff(t) {
  let tiles = "";
  for (let i = 0; i < 12; i++) tiles += `<path d="M${i * 60},0 v1280 M0,${i * 110} h720" stroke="#4a5462" stroke-width="3"/>`;
  const sees = t >= CS(30, 1);
  const hairEyes = t >= CS(29, 2) ? `<g transform="translate(0,-478) scale(${pop(t, CS(29, 2))})">
      <circle class="o" cx="-30" cy="0" r="16" fill="#fff"/><circle class="o" cx="30" cy="0" r="16" fill="#fff"/>
      <circle cx="${sees ? -26 : -34}" cy="${sees ? 4 : -2}" r="6" fill="#151515"/><circle cx="${sees ? 34 : 26}" cy="${sees ? 4 : -2}" r="6" fill="#151515"/>
      ${sees ? `<path class="o" d="M-48,-22 l30,10 M48,-22 l-30,10" fill="none" stroke-width="6"/>` : ""}</g>` : "";
  return `<rect width="720" height="1280" fill="#39424f"/>${tiles}<defs><clipPath id="gm"><rect x="70" y="350" width="580" height="700" rx="12"/></clipPath></defs>
    <rect class="o" x="58" y="338" width="604" height="724" rx="18" fill="#8a97a3"/><rect x="70" y="350" width="580" height="700" rx="12" fill="#a9d2e6"/>
    <g clip-path="url(#gm)">${kevin(Object.assign({ x: 360, y: 1640, s: 2.0, t, expr: sees ? "shock" : "neutral", head: hairEyes }, K, { stink: t >= LS(31) }))}</g>
    <rect y="1090" width="720" height="190" fill="#22262d"/>`
    + voteOverlay(t, { t0: LS(32) - 0.25, ta: LS(32), tb: CS(32, 1), a: "DEODORANT", b: "HAIRCUT" })
    + (t >= LS(33) ? `<g transform="translate(360,640) scale(${pop(t, LS(33))})"><rect class="o" x="-300" y="-40" width="600" height="80" rx="40" fill="${COL.p}"/>
        <text text-anchor="middle" y="14" font-size="36" fill="#fff">FOLLOW: DOES HE MAKE THE WEDDING?</text></g>` : "");
}

window.EP = {
  days: 26, pct: [13, 17, 0], pctFn: t => 13 + stepsOf(t, TICKS()),
  punch: [0, CS(6, 2), CS(27, 1), CS(28, 1), CS(1, 1), LS(2), CS(4, 1), CS(8, 1), CS(10, 1), CS(11, 1), CS(12, 1), LS(13), CS(14, 2), CS(15, 2), LS(16), CS(17, 1), ...TICKS(), LS(21), LS(22), LS(25), CS(29, 2), CS(30, 1)],
  CAPY: { hook: 1150, desk: 1180, tread: 1180, smell: 1180, big: 1180, spray: 1180, push: 900, reveal: 1080, phone: 1195, cliff: 1170 },
  overlay: (t, n) => premiseTag(n) + bars(t, n) + (n !== "hook" && n !== "cliff" && n !== "phone" ? voteBadge(t, LS(12), "DEODORANT", "HAIRCUT", 340) : ""),
  SC: {
    hook: sHook, desk: sDesk, tread: sTread, smell: sSmell, big: sBig, spray: sBig, push: sPush, reveal: sReveal, cliff: sCliff,
    phone: t => chat(t, LS(23) - 0.25, [{ lines: ["kevin. my cousin works", "at that gym."], at: LS(24) }, { lines: ["there is a video."], at: LS(25) }, { lines: ["it has music now."], at: LS(26) }, { me: true, lines: ["delete it"], at: CS(27, 1) }, { lines: ["no :)"], at: CS(28, 1) }]),
  },
};
