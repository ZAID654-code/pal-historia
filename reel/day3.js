// Day 3: SHOWER (template v2: no results card, so no vote numbers to maintain).
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
  const sec = Math.min(9, 1 + Math.floor(t * 2.4)), shiver = Math.sin(t * 34) * 3;
  const v = t >= LS(2) ? pop(t, LS(2)) * (1 - prog(t, LE(3) + 0.3, 0.25)) : 0;
  return stall(t, { water: "#8a5a2c", behind: kevin(Object.assign({ x: 360 + shiver, y: 1085, s: 1.05, t: t * 3, expr: t > LS(1) ? "sad" : "shock" }, DIRTY)) })
    + curtain() + tub("#8a5a2c")
    + `<g transform="translate(170,470) rotate(-6) scale(${0.9 + 0.1 * back(prog(t, 0, 0.2)) + 0.06 * Math.abs(Math.sin(t * 7.5))})"><rect class="o" x="-90" y="-50" width="180" height="100" rx="14" fill="#151515"/><text text-anchor="middle" y="24" font-size="68" fill="${COL.r}">0:0${sec}</text></g>`
    + (v > 0 ? `<g transform="translate(400,330) rotate(-3) scale(${v * 0.9})"><rect class="o" x="-250" y="-70" width="500" height="140" rx="18" fill="#14141c"/>
        <text class="ui" x="-220" y="-26" font-size="20" font-weight="800" fill="#8a8aa0">DAY 2 VOTE</text><text x="-220" y="40" font-size="60" fill="${COL.b}">SHOWER WON</text>
        <circle class="o" cx="190" cy="6" r="36" fill="${COL.g}"/><path d="M172,6 l14,14 l24,-28" stroke="#151515" stroke-width="9" fill="none" stroke-linecap="round"/></g>` : "");
}

function sBefore(t) {
  let puff = "";
  if (t >= CS(4, 2)) for (let i = 0; i < 5; i++) { const k = prog(t, CS(4, 2) + i * 0.08, 0.9); if (k > 0 && k < 1) puff += `<circle cx="${500 - k * (60 + i * 30)}" cy="${420 + k * (40 + i * 22)}" r="${18 + k * 30}" fill="#9a8a6a" opacity="${0.8 * (1 - k)}"/>`; }
  const soap = pop(t, LS(6));
  return stall(t, { web: true }) + tub("#fff") + puff
    + kevin(Object.assign({ x: 240, y: 1090, s: 1.05, t, look: 1, aR: 95, expr: t > CS(4, 2) ? "shock" : "neutral" }, DIRTY))
    + sticker(360, 560, "LAST USED: WORLD CUP", "#fff", pop(t, LS(5)), -5, 34)
    + (soap > 0 ? `<g transform="translate(560,760) scale(${soap})"><rect class="o" x="-90" y="-50" width="180" height="100" rx="14" fill="#ff7ac0"/><text text-anchor="middle" y="14" font-size="40" fill="#fff">SOAP</text>
        <g transform="translate(70,-56) rotate(14)"><rect class="o" x="-44" y="-20" width="88" height="40" rx="6" fill="${COL.y}"/><text text-anchor="middle" y="12" font-size="26" fill="#151515">NEW</text></g></g>` : "")
    + (t >= LS(7) ? `<g transform="translate(560,600) scale(${pop(t, LS(7))}) rotate(${Math.sin(t * 6) * 4})"><rect class="o" x="-44" y="-70" width="88" height="140" rx="16" fill="#7be04a"/><rect class="o" x="-20" y="-96" width="40" height="28" fill="#fff"/>
        <text text-anchor="middle" y="-10" font-size="24" fill="#151515">SHAMPOO</text>
        <g transform="scale(${pop(t, CS(7, 1))})"><rect class="o" x="-58" y="14" width="116" height="40" rx="6" fill="${COL.r}"/><text text-anchor="middle" y="44" font-size="26" fill="#fff">EXP 2020</text></g></g>` : "");
}

function sWash(t) {
  const clr = eo(prog(t, LS(8), 3.5));
  const mix = clr > 0.6 ? "#7fc4ea" : "#8a5a2c";
  let flies = "";
  if (t >= LS(9)) for (let i = 0; i < 3; i++) { const k = prog(t, LS(9) + i * 0.15, 1.6); if (k < 1) flies += `<g transform="translate(${300 + i * 50 + k * 380},${520 - i * 40 - k * 260})"><circle r="9" fill="#151515"/><ellipse cx="-6" cy="-10" rx="8" ry="5" fill="#cfe6ff"/><rect class="o" x="4" y="6" width="22" height="16" rx="3" fill="#b5653a" stroke-width="3"/></g>`; }
  const dead = t >= LS(11);
  const drain = t < LS(10) ? "" : `<g transform="translate(360,1180) scale(${pop(t, LS(10))})"><circle class="o" r="74" fill="#c9d3da"/><circle r="52" fill="#55606a"/>
    ${dead ? `<path d="M-30,-18 l16,16 m0,-16 l-16,16 M14,-18 l16,16 m0,-16 l-16,16" stroke="#fff" stroke-width="6"/><path d="M-16,24 h32" stroke="#fff" stroke-width="6"/>
      <path class="o" d="M60,-40 v-90" fill="none"/><path class="o" d="M60,-130 h54 v36 h-54Z" fill="#fff"/>`
      : `<circle cx="-20" cy="-10" r="12" fill="#fff"/><circle cx="20" cy="-10" r="12" fill="#fff"/><circle cx="-20" cy="-16" r="5" fill="#111"/><circle cx="20" cy="-16" r="5" fill="#111"/>`}</g>`;
  const plunger = `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-6" y="0" width="12" height="110" fill="#b5653a"/><path class="o" d="M-34,110 q34,-40 68,0Z" fill="#e2574c"/></g>`;
  const pl = (x, k, flip) => k <= 0 ? "" : `<g transform="translate(${x},1085) scale(${k}) translate(${-x},-1085)">${npc({ x, flip, s: 0.95, top: "#2a5fd0", leg: "#1f3f8a", hair: "#e2574c", armR: 150, heldR: plunger, scared: true, mouth: "open", lookx: flip ? -1 : 1 })}</g>`;
  return stall(t, { water: mix, behind: kevin(Object.assign({ x: 360, y: 1085, s: 1.05, t, expr: dead ? "shock" : "smug", noFlies: t > LS(9), stink: t < LS(9) }, DIRTY)) })
    + curtain() + tub(mix) + flies + drain + pl(100, pop(t, LS(12)), false) + pl(620, pop(t, CS(12, 2)), true)
    + (t >= CS(13, 2) && t < LS(14) ? `<g transform="translate(520,470) scale(${pop(t, CS(13, 2))})"><path class="o" d="M-110,-56 h220 v100 h-40 l20,44 l-70,-44 h-130Z" fill="#fff"/><text text-anchor="middle" y="14" font-size="46" fill="${COL.r}">MUM??</text></g>` : "")
    + (t >= CS(14, 2) ? `<g transform="translate(476,650) scale(${pop(t, CS(14, 2))}) rotate(-20)"><path class="o" d="M-46,10 q46,-50 92,0 q-46,26 -92,0Z" fill="#d9a15a"/><path d="M-20,2 q20,-14 40,0" stroke="#b5763a" stroke-width="5" fill="none"/>
        ${t >= LS(15) ? [0, 1, 2].map(i => { const k = (t * 0.9 + i / 3) % 1; return `<path d="M${-24 + i * 24},${-24 - k * 50} q10,-10 0,-20 q-10,-10 0,-20" stroke="#fff" stroke-width="5" fill="none" opacity="${Math.sin(k * Math.PI)}"/>`; }).join("") : ""}</g>` : "")
    + sticker(250, 470, "STILL WARM", COL.o, pop(t, LS(15)) * (t < LS(16) ? 1 : 0), -7, 44)
    + (t >= CS(16, 1) ? `<g transform="translate(250,${520 + Math.sin(t * 5) * 8}) scale(${pop(t, CS(16, 1))}) rotate(${Math.sin(t * 3) * 12})"><path class="o" d="M0,-56 q56,10 44,50 q-20,40 -44,60 q-24,-20 -44,-60 q-12,-40 44,-50Z" fill="${COL.r}"/><text text-anchor="middle" y="14" font-size="22" fill="#fff">ROCK</text></g>` : "")
    + (t >= LS(17) ? `<text x="250" y="660" text-anchor="middle" font-size="60" fill="#fff" stroke="#151515" stroke-width="10" paint-order="stroke" transform="scale(1)" opacity="${prog(t, LS(17), 0.15)}">???</text>` : "");
}

function sReveal(t) {
  const sw = pop(t, CS(18, 2));
  return starburst(t, "#5cc8ff", "#8ad8ff")
    + kevin(Object.assign({ x: 360, y: 1500, s: 2.0, t, expr: "grin" }, CLEAN))
    + sparkles(t, [[150, 520], [570, 560], [120, 880], [600, 900], [360, 380]])
    + (sw > 0 ? `<g transform="translate(360,410) scale(${sw})"><rect class="o" x="-190" y="-50" width="380" height="100" rx="14" fill="#fff"/>
        <rect class="o" x="-170" y="-32" width="64" height="64" fill="#b58a5e"/><text class="ui" x="-94" y="8" font-size="20" font-weight="800" fill="#151515">BEFORE</text>
        <rect class="o" x="10" y="-32" width="64" height="64" fill="${SKIN}"/><text class="ui" x="86" y="8" font-size="20" font-weight="800" fill="#151515">AFTER</text></g>` : "")
    + sticker(150, 540, "0 FLIES", COL.g, pop(t, LS(19)), -8, 38) + sticker(570, 540, "0 SMELL", COL.g, pop(t, LS(20)), 8, 38)
    + `<rect width="720" height="1280" fill="#fff" opacity="${1 - prog(t, LS(18) - 0.2, 0.5)}"/>`;
}

function sMirror(t) {
  let tiles = "";
  for (let i = 0; i < 12; i++) tiles += `<path d="M${i * 60},0 v1280 M0,${i * 110} h720" stroke="#a9d6cf" stroke-width="3"/>`;
  const wink = t >= LS(23);
  const eye = (x, shut) => shut ? `<path class="o" d="M${x - 22},354 q22,18 44,0" fill="none" stroke-width="7"/>` : `<circle class="o" cx="${x}" cy="354" r="22" fill="#fff"/><circle cx="${x}" cy="358" r="9" fill="#151515"/>`;
  return `<rect width="720" height="1280" fill="#c4e8e2"/>${tiles}<defs><clipPath id="mc"><rect x="70" y="350" width="580" height="700" rx="12"/></clipPath></defs>
    <rect class="o" x="58" y="338" width="604" height="724" rx="18" fill="#8fa3a8"/><rect x="70" y="350" width="580" height="700" rx="12" fill="#e2f4f8"/>
    <g clip-path="url(#mc)">${kevin(Object.assign({ x: 360, y: 1560, s: 2.0, t, expr: "grin" }, CLEAN))}</g>
    <g transform="translate(0,${Math.sin(t * 4) * 3})">${eye(300, false)}${eye(420, wink)}</g>
    ${wink ? sparkles(t, [[480, 380]]) : ""}
    ${sticker(520, 470, "0 CRACKS", COL.g, pop(t, CS(22, 1)), 8, 40)}
    <rect y="1090" width="720" height="190" fill="#d9c7a6"/><rect class="o" x="-10" y="1070" width="740" height="30" fill="#fff"/>`;
}

function sBed(t) {
  const x = lerp(100, 190, eo(prog(t, LS(29), 1.2)));
  return bedroom(t, { angry: t >= LS(30) ? pop(t, LS(30)) : 0.0001, stink: 1 })
    + sheetGhost(540, 760, pop(t, LS(30)), t, "#e9e3c8", 2)
    + kevin(Object.assign({ x, y: 1090, s: 1.0, t, look: 1, expr: t >= LS(30) ? "shock" : "grin" }, CLEAN));
}

// small vote reminder, on screen from the reveal onwards so early leavers still see the question
const badge = (t, name) => (name === "reveal" || name === "mirror" || name === "bed") ? `<g transform="translate(360,${290 - 60 * (1 - eo(prog(t, LS(18) + 0.6, 0.3)))})" opacity="${prog(t, LS(18) + 0.6, 0.3)}">
    <rect class="o" x="-250" y="-34" width="500" height="68" rx="34" fill="#14141c"/>
    <text text-anchor="middle" y="14" font-size="34" fill="#fff">NEXT: <tspan fill="${COL.y}">SHEETS</tspan> OR <tspan fill="${COL.b}">DEODORANT</tspan>?</text></g>` : "";

window.EP = {
  days: 28, pct: [4, 9, LS(21)],
  punch: [0, CS(0, 2), LS(2), CS(4, 2), CS(7, 1), LS(9), LS(11), CS(12, 2), CS(13, 2), CS(14, 2), LS(15), LS(18), LS(17), LS(21), CS(22, 1), LS(23), LS(25), CS(27, 1), CS(28, 1), LS(30)],
  CAPY: { vote: 1180, reveal: 1060, wash: 900, hook: 900, phone: 1195, mirror: 1000 },
  overlay: badge,
  SC: {
    hook: sHook, before: sBefore, wash: sWash, reveal: sReveal, mirror: sMirror, bed: sBed,
    phone: t => chat(t, LS(24) - 0.25, [{ lines: ["ok i need proof you are", "actually alive"], at: LS(24) + 0.3 }, { lines: ["send a pic. a RECENT one."], at: LS(25) },
      { me: true, pic: true, at: CS(27, 1) }, { lines: ["...nice elbow"], at: CS(28, 1) }]),
    vote: t => voteScene(t, {
      a: { label: "SHEETS", col: COL.y, s1: "THIRD TIME", s2: "ASKING.", k: Object.assign({ heldR: HELD.sheet, aR: 150, expr: "sad" }, CLEAN) },
      b: { label: "DEODORANT", col: COL.b, s1: "SMELL NICE.", s2: "ON PURPOSE.", k: Object.assign({ heldR: HELD.spray, aR: 150, expr: "grin" }, CLEAN) },
      ta: LS(31) - 0.2, tb: CS(31, 1), tv: LS(32), tf: LS(32) + 0.4, footer: "DAY 4 STARTS WITH YOUR CHOICE" }),
  },
};
