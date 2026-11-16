// Day 3: SHOWER, test-batch cut. Long 60 s cut lives in day3long.js.
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

// first second: premise a cold viewer gets instantly
function sHook(t) {
  const brown = t >= LS(2) - 0.2;
  const sec = brown ? Math.min(9, 1 + Math.floor((t - LS(2) + 0.2) * 5)) : 0, shiver = Math.sin(t * 34) * 3;
  const slam = t < 0.25 ? 1.5 - 0.5 * eo(t / 0.25) : 1;
  const stampOut = 1 - prog(t, LS(1) - 0.15, 0.2);
  const v = t >= LS(1) ? pop(t, LS(1)) * (1 - prog(t, LS(2) - 0.3, 0.2)) : 0;
  return stall(t, { water: brown ? "#8a5a2c" : null, web: !brown, behind: kevin(Object.assign({ x: 360 + (brown ? shiver : 0), y: 1085, s: 1.05, t: t * 3, expr: brown ? "shock" : "smug" }, DIRTY)) })
    + curtain() + tub(brown ? "#8a5a2c" : "#fff")
    + (stampOut > 0 ? `<g transform="translate(360,420) rotate(-7) scale(${slam * stampOut})"><rect x="-300" y="-92" width="600" height="184" rx="16" fill="#fff" stroke="${COL.r}" stroke-width="12"/>
        <text text-anchor="middle" y="-18" font-size="54" fill="#151515">LAST SHOWER</text><text text-anchor="middle" y="66" font-size="84" fill="${COL.r}">2019</text></g>` : "")
    + (v > 0 ? `<g transform="translate(360,420) rotate(-3) scale(${v})"><rect class="o" x="-250" y="-70" width="500" height="140" rx="18" fill="#14141c"/>
        <text class="ui" x="-220" y="-26" font-size="20" font-weight="800" fill="#8a8aa0">YOUR VOTE</text><text x="-220" y="40" font-size="60" fill="${COL.b}">SHOWER WON</text>
        <circle class="o" cx="190" cy="6" r="36" fill="${COL.g}"/><path d="M172,6 l14,14 l24,-28" stroke="#151515" stroke-width="9" fill="none" stroke-linecap="round"/></g>` : "")
    + (brown ? `<g transform="translate(170,470) rotate(-6) scale(${0.94 + 0.06 * Math.abs(Math.sin(t * 7.5))})"><rect class="o" x="-90" y="-50" width="180" height="100" rx="14" fill="#151515"/><text text-anchor="middle" y="24" font-size="68" fill="${COL.r}">0:0${sec}</text></g>` : "");
}

function sWash(t) {
  const clr = eo(prog(t, LS(3), 3.5));
  const mix = clr > 0.6 ? "#7fc4ea" : "#8a5a2c";
  let flies = "";
  for (let i = 0; i < 3; i++) { const k = prog(t, LS(3) + i * 0.15, 1.6); if (k < 1) flies += `<g transform="translate(${300 + i * 50 + k * 380},${520 - i * 40 - k * 260})"><circle r="9" fill="#151515"/><ellipse cx="-6" cy="-10" rx="8" ry="5" fill="#cfe6ff"/><rect class="o" x="4" y="6" width="22" height="16" rx="3" fill="#b5653a" stroke-width="3"/></g>`; }
  const dead = t >= LS(5);
  const drain = t < LS(4) ? "" : `<g transform="translate(360,1180) scale(${pop(t, LS(4))})"><circle class="o" r="74" fill="#c9d3da"/><circle r="52" fill="#55606a"/>
    ${dead ? `<path d="M-30,-18 l16,16 m0,-16 l-16,16 M14,-18 l16,16 m0,-16 l-16,16" stroke="#fff" stroke-width="6"/><path d="M-16,24 h32" stroke="#fff" stroke-width="6"/>
      <path class="o" d="M60,-40 v-90" fill="none"/><path class="o" d="M60,-130 h54 v36 h-54Z" fill="#fff"/>`
      : `<circle cx="-20" cy="-10" r="12" fill="#fff"/><circle cx="20" cy="-10" r="12" fill="#fff"/><circle cx="-20" cy="-16" r="5" fill="#111"/><circle cx="20" cy="-16" r="5" fill="#111"/>`}</g>`;
  const plunger = `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-6" y="0" width="12" height="110" fill="#b5653a"/><path class="o" d="M-34,110 q34,-40 68,0Z" fill="#e2574c"/></g>`;
  const pl = (x, k, flip) => k <= 0 ? "" : `<g transform="translate(${x},1085) scale(${k}) translate(${-x},-1085)">${npc({ x, flip, s: 0.95, top: "#2a5fd0", leg: "#1f3f8a", hair: "#e2574c", armR: 150, heldR: plunger, scared: true, mouth: "open", lookx: flip ? -1 : 1 })}</g>`;
  return stall(t, { water: mix, behind: kevin(Object.assign({ x: 360, y: 1085, s: 1.05, t, expr: dead && t < LS(8) ? "shock" : "smug", noFlies: true, stink: false, look: t >= CS(8, 2) ? 1 : 0 }, DIRTY)) })
    + curtain() + tub(mix) + flies + drain + pl(100, pop(t, LS(6)), false) + pl(620, pop(t, CS(6, 2)), true)
    + (t >= CS(7, 2) && t < LS(8) ? `<g transform="translate(520,470) scale(${pop(t, CS(7, 2))})"><path class="o" d="M-110,-56 h220 v100 h-40 l20,44 l-70,-44 h-130Z" fill="#fff"/><text text-anchor="middle" y="14" font-size="46" fill="${COL.r}">MUM??</text></g>` : "")
    + (t >= CS(8, 2) ? `<g transform="translate(476,650) scale(${pop(t, CS(8, 2))}) rotate(-20)"><path class="o" d="M-46,10 q46,-50 92,0 q-46,26 -92,0Z" fill="#d9a15a"/><path d="M-20,2 q20,-14 40,0" stroke="#b5763a" stroke-width="5" fill="none"/>
        ${t >= LS(9) ? [0, 1, 2].map(i => { const k = (t * 0.9 + i / 3) % 1; return `<path d="M${-24 + i * 24},${-24 - k * 50} q10,-10 0,-20 q-10,-10 0,-20" stroke="#fff" stroke-width="5" fill="none" opacity="${Math.sin(k * Math.PI)}"/>`; }).join("") : ""}</g>` : "")
    + sticker(250, 470, "STILL WARM", COL.o, pop(t, LS(9)), -7, 44);
}

function sReveal(t) {
  const sw = pop(t, CS(10, 2));
  return starburst(t, "#5cc8ff", "#8ad8ff")
    + kevin(Object.assign({ x: 360, y: 1500, s: 2.0, t, expr: "grin" }, CLEAN))
    + sparkles(t, [[150, 520], [570, 560], [120, 880], [600, 900], [360, 380]])
    + (sw > 0 ? `<g transform="translate(360,410) scale(${sw})"><rect class="o" x="-190" y="-50" width="380" height="100" rx="14" fill="#fff"/>
        <rect class="o" x="-170" y="-32" width="64" height="64" fill="#b58a5e"/><text class="ui" x="-94" y="8" font-size="20" font-weight="800" fill="#151515">BEFORE</text>
        <rect class="o" x="10" y="-32" width="64" height="64" fill="${SKIN}"/><text class="ui" x="86" y="8" font-size="20" font-weight="800" fill="#151515">AFTER</text></g>` : "")
    + sticker(150, 540, "0 FLIES", COL.g, pop(t, LS(10) + 0.7), -8, 38) + sticker(570, 540, "0 SMELL", COL.g, pop(t, LS(10) + 1.0), 8, 38)
    + `<rect width="720" height="1280" fill="#fff" opacity="${1 - prog(t, LS(10) - 0.2, 0.5)}"/>`;
}

function sBed(t) {
  const g = pop(t, CS(15, 1));
  return bedroom(t, { angry: g > 0 ? g : 0.0001, stink: 1 })
    + sheetGhost(540, 760, g, t, "#e9e3c8", 2)
    + kevin(Object.assign({ x: 190, y: 1090, s: 1.0, t, look: 1, expr: g > 0 ? "shock" : "grin" }, CLEAN));
}

// vote reminder on screen from the middle of the video
const BT = () => LS(6);
const badge = (t, name) => (name !== "hook" && name !== "vote" && name !== "phone" && t >= BT()) ? `<g transform="translate(360,${290 - 60 * (1 - eo(prog(t, BT(), 0.3)))})" opacity="${prog(t, BT(), 0.3)}">
    <rect class="o" x="-250" y="-34" width="500" height="68" rx="34" fill="#14141c"/>
    <text text-anchor="middle" y="14" font-size="34" fill="#fff">NEXT: <tspan fill="${COL.y}">SHEETS</tspan> OR <tspan fill="${COL.b}">DEODORANT</tspan>?</text></g>` : "";
// who and why, for people who have never seen the series
const premise = (t, name) => name === "vote" ? "" : `<g class="ui"><rect x="474" y="140" width="218" height="78" rx="10" fill="#101014" opacity=".92"/>
    <text class="ui" x="583" y="162" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">KEVIN VS</text><text x="583" y="204" text-anchor="middle" font-size="30" fill="${COL.p}">A WEDDING</text></g>`;

window.EP = {
  days: 28, pct: [4, 9, LS(11)],
  punch: [0, LS(1), CS(2, 2), LS(3), LS(5), CS(6, 2), CS(7, 2), CS(8, 2), LS(9), LS(10), LS(11), CS(13, 1), CS(14, 1), CS(15, 1)],
  CAPY: { vote: 1180, reveal: 1060, wash: 900, hook: 900, phone: 1195 },
  overlay: (t, n) => premise(t, n) + badge(t, n),
  SC: {
    hook: sHook, wash: sWash, reveal: sReveal, bed: sBed,
    phone: t => chat(t, LS(12) - 0.25, [{ lines: ["send a pic. a RECENT one."], at: LS(12) }, { me: true, pic: true, at: CS(13, 1) }, { lines: ["...nice elbow"], at: CS(14, 1) }]),
    vote: t => voteScene(t, {
      a: { label: "SHEETS", col: COL.y, s1: "THIRD TIME", s2: "ASKING.", k: Object.assign({ heldR: HELD.sheet, aR: 150, expr: "sad" }, CLEAN) },
      b: { label: "DEODORANT", col: COL.b, s1: "SMELL NICE.", s2: "ON PURPOSE.", k: Object.assign({ heldR: HELD.spray, aR: 150, expr: "grin" }, CLEAN) },
      ta: LS(16) - 0.2, tb: CS(16, 1), tv: LS(17), tf: LS(17) + 0.3, footer: "DAY 4 STARTS WITH YOUR CHOICE" }),
  },
};
