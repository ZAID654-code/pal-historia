// Day 3: SHOWER. Change VOTE to the real comment split before posting.
const VOTE = { win: 71, lose: 29 };
const DIRTY = { teeth: WHITE }, CLEAN = { teeth: WHITE, clean: true, stink: false, noFlies: true };

function stall(t, o = {}) {
  let tiles = "";
  for (let i = 0; i < 12; i++) tiles += `<path d="M${i * 60},0 v1280 M0,${i * 110} h720" stroke="#a9d6cf" stroke-width="3"/>`;
  let water = "";
  if (o.water) for (let i = 0; i < 9; i++) { const k = (t * 2.2 + i / 9) % 1; water += `<path d="M${500 - i * 26},${430 + k * 420} l-8,46" stroke="${o.water}" stroke-width="7" stroke-linecap="round" opacity="${0.9 - k * 0.5}"/>`; }
  return `<rect width="720" height="1280" fill="#c4e8e2"/>${tiles}
    <path d="M60,330 h600" stroke="#8a97a3" stroke-width="10" stroke-linecap="round"/>
    <path class="o" d="M620,330 v40 h-70" fill="none" stroke="#8a97a3" stroke-width="12"/>
    <g transform="translate(530,380) rotate(-28)"><path class="o" d="M-50,0 h100 l-16,34 h-68Z" fill="#c9d3da"/></g>
    ${o.web ? `<path d="M560,330 l60,70 M580,330 l40,50 M560,360 q30,10 50,-10 M572,384 q20,6 40,-14" stroke="#fff" stroke-width="3" fill="none"/>` : ""}
    ${o.behind || ""}${water}`;
}
const curtain = (y = 752) => {
  let dots = "";
  for (let i = 0; i < 24; i++) dots += `<circle cx="${150 + (i % 6) * 84 + (Math.floor(i / 6) % 2) * 42}" cy="${y + 50 + Math.floor(i / 6) * 70}" r="12" fill="#fff" opacity=".7"/>`;
  return `<path class="o" d="M110,${y} q50,-14 100,0 q50,14 100,0 q50,-14 100,0 q50,14 100,0 q50,-14 100,0 v290 h-500Z" fill="#5cc8ff"/>${dots}`;
};
const tub = (col) => `<path class="o" d="M40,1000 h640 q10,0 6,20 l-20,90 q-4,14 -20,14 h-572 q-16,0 -20,-14 l-20,-90 q-4,-20 6,-20Z" fill="#fff"/>
  <path d="M70,1014 h580" stroke="${col}" stroke-width="16" stroke-linecap="round"/><rect y="1124" width="720" height="156" fill="#e8e6e1"/>`;

function sHook(t) {
  const k = pop(t, CS(1, 2));
  return stall(t, { water: "#8a5a2c", behind: kevin(Object.assign({ x: 360, y: 1085, s: 1.05, t, expr: t > LS(1) ? "sad" : "neutral" }, DIRTY)) })
    + curtain() + tub("#8a5a2c")
    + (k > 0 ? `<g transform="translate(170,470) rotate(-6) scale(${k})"><rect class="o" x="-90" y="-50" width="180" height="100" rx="14" fill="#151515"/><text text-anchor="middle" y="24" font-size="68" fill="${COL.r}">0:09</text></g>` : "");
}

function sBefore(t) {
  let puff = "";
  if (t >= LS(9)) for (let i = 0; i < 5; i++) { const k = prog(t, LS(9) + i * 0.08, 0.9); if (k > 0 && k < 1) puff += `<circle cx="${500 - k * (60 + i * 30)}" cy="${420 + k * (40 + i * 22)}" r="${18 + k * 30}" fill="#9a8a6a" opacity="${0.8 * (1 - k)}"/>`; }
  const soap = pop(t, LS(11));
  return stall(t, { web: true }) + tub("#fff") + puff
    + kevin(Object.assign({ x: 240, y: 1090, s: 1.05, t, look: 1, aR: t > LS(8) ? 95 : 12, expr: t > LS(9) ? "shock" : "neutral" }, DIRTY))
    + sticker(360, 560, "LAST USED: WORLD CUP", "#fff", pop(t, CS(10, 2)), -5, 34)
    + (soap > 0 ? `<g transform="translate(560,760) scale(${soap})"><rect class="o" x="-90" y="-50" width="180" height="100" rx="14" fill="#ff7ac0"/><text text-anchor="middle" y="14" font-size="40" fill="#fff">SOAP</text>
        <g transform="translate(70,-56) rotate(14)"><rect class="o" x="-44" y="-20" width="88" height="40" rx="6" fill="${COL.y}"/><text text-anchor="middle" y="12" font-size="26" fill="#151515">NEW</text></g></g>` : "");
}

function sWash(t) {
  const clr = eo(prog(t, LS(12), 4));
  const mix = clr > 0.6 ? "#7fc4ea" : "#8a5a2c";
  let flies = "";
  if (t >= LS(13)) for (let i = 0; i < 3; i++) { const k = prog(t, LS(13) + i * 0.15, 1.6); if (k < 1) flies += `<g transform="translate(${300 + i * 50 + k * 380},${520 - i * 40 - k * 260})"><circle r="9" fill="#151515"/><ellipse cx="-6" cy="-10" rx="8" ry="5" fill="#cfe6ff"/><rect class="o" x="4" y="6" width="22" height="16" rx="3" fill="#b5653a" stroke-width="3"/></g>`; }
  const dead = t >= LS(15);
  const drain = t < LS(14) ? "" : `<g transform="translate(360,1180) scale(${pop(t, LS(14))})"><circle class="o" r="74" fill="#c9d3da"/><circle r="52" fill="#55606a"/>
    ${dead ? `<path d="M-30,-18 l16,16 m0,-16 l-16,16 M14,-18 l16,16 m0,-16 l-16,16" stroke="#fff" stroke-width="6"/><path d="M-16,24 h32" stroke="#fff" stroke-width="6"/>
      <path class="o" d="M60,-40 v-90" fill="none"/><path class="o" d="M60,-130 h54 v36 h-54Z" fill="#fff"/>`
      : `<circle cx="-20" cy="-10" r="12" fill="#fff"/><circle cx="20" cy="-10" r="12" fill="#fff"/><circle cx="-20" cy="-16" r="5" fill="#111"/><circle cx="20" cy="-16" r="5" fill="#111"/>`}</g>`;
  const plunger = `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-6" y="0" width="12" height="110" fill="#b5653a"/><path class="o" d="M-34,110 q34,-40 68,0Z" fill="#e2574c"/></g>`;
  const pl = (x, k, flip) => k <= 0 ? "" : `<g transform="translate(${x},1085) scale(${k}) translate(${-x},-1085)">${npc({ x, flip, s: 0.95, top: "#2a5fd0", leg: "#1f3f8a", hair: "#e2574c", armR: 150, heldR: plunger, scared: true, mouth: "open", lookx: flip ? -1 : 1 })}</g>`;
  return stall(t, { water: mix, behind: kevin(Object.assign({ x: 360, y: 1085, s: 1.05, t, expr: dead ? "shock" : "smug", noFlies: t > LS(13), stink: t < LS(13) }, DIRTY)) })
    + curtain() + tub(mix) + flies + drain + pl(100, pop(t, LS(16)), false) + pl(620, pop(t, CS(17, 2)), true);
}

function sReveal(t) {
  const sw = pop(t, CS(20, 1));
  return starburst(t, "#5cc8ff", "#8ad8ff")
    + kevin(Object.assign({ x: 360, y: 1500, s: 2.0, t, expr: "grin" }, CLEAN))
    + sparkles(t, [[150, 520], [570, 560], [120, 880], [600, 900], [360, 380]])
    + (sw > 0 ? `<g transform="translate(360,330) scale(${sw})"><rect class="o" x="-190" y="-50" width="380" height="100" rx="14" fill="#fff"/>
        <rect class="o" x="-170" y="-32" width="64" height="64" fill="#b58a5e"/><text class="ui" x="-94" y="8" font-size="20" font-weight="800" fill="#151515">BEFORE</text>
        <rect class="o" x="10" y="-32" width="64" height="64" fill="${SKIN}"/><text class="ui" x="86" y="8" font-size="20" font-weight="800" fill="#151515">AFTER</text></g>` : "")
    + sticker(160, 470, "0 FLIES", COL.g, pop(t, LS(21)), -8, 38) + sticker(560, 470, "0 SMELL", COL.g, pop(t, LS(22)), 8, 38)
    + `<rect width="720" height="1280" fill="#fff" opacity="${1 - prog(t, LS(19) - 0.2, 0.5)}"/>`;
}

function sBed(t) {
  const x = lerp(100, 190, eo(prog(t, LS(27), 1.4)));
  return bedroom(t, { angry: t >= LS(28) ? pop(t, LS(28)) : 0.0001, stink: 1 })
    + sheetGhost(540, 760, pop(t, LS(28)), t, "#e9e3c8", 2)
    + kevin(Object.assign({ x, y: 1090, s: 1.0, t, look: 1, expr: t >= LS(28) ? "shock" : "grin" }, CLEAN));
}

window.EP = {
  days: 28, pct: [4, 9, LS(23)],
  punch: [CS(0, 2), LS(2), LS(9), LS(15), CS(17, 2), LS(19), LS(23), LS(25), LS(28)],
  CAPY: { phone: 1195, vote: 1180, card: 1150, reveal: 1060, wash: 900, hook: 900 },
  hideCap: (n) => n === "early" || n === "later",
  SC: {
    hook: sHook,
    card: t => resultCard(t, { title: "DAY 2 RESULTS", win: { label: "SHOWER", pct: VOTE.win, col: COL.b }, lose: { label: "SHEETS", pct: VOTE.lose, col: COL.y },
      tBars: LS(3), tWin: LS(4), tLose: LS(5), extra: sheetGhost(360, 960, pop(t, LS(6)), t, "#e9e3c8", 2) }),
    early: t => titleCard(t, LS(7), "TEN MINUTES", "EARLIER"),
    before: sBefore, wash: sWash,
    later: t => titleCard(t, LS(18), "FORTY MINUTES", "LATER"),
    reveal: sReveal,
    phone: t => chat(t, LS(24) - 0.25, [{ lines: ["ok i need proof you are", "actually alive"], at: LS(24) + 0.4 }, { lines: ["send a pic. a RECENT one."], at: LS(25) }]),
    bed: sBed,
    vote: t => voteScene(t, {
      a: { label: "SHEETS", col: COL.y, s1: "THIRD TIME", s2: "ASKING.", k: Object.assign({ heldR: HELD.sheet, aR: 150, expr: "sad" }, CLEAN) },
      b: { label: "DEODORANT", col: COL.b, s1: "SMELL NICE.", s2: "ON PURPOSE.", k: Object.assign({ heldR: HELD.spray, aR: 150, expr: "grin" }, CLEAN) },
      ta: LS(30), tb: LS(31), tv: LS(32), tf: LS(33), footer: "DAY 4 STARTS WITH YOUR CHOICE" }),
  },
};
