// Day 4: SHEETS, template v3 (stamp, vote overlay, gags, reward meter + ticks, achievement, cliffhanger).
const K = { teeth: WHITE, clean: true, stink: false, noFlies: true };
const TICKS = () => [CS(19, 2), CS(20, 0), CS(20, 1), CS(20, 2)];
const YEL = "#d2c05a";

function sHook(t) {
  if (t < LS(2) - 0.15) {
    const pull = Math.sin(t * 30) * 4;
    return bedroom(t, { angry: 1, ax: 520, stink: 1 })
      + `<path class="o" d="M${300 + pull},700 L400,905" fill="none" stroke="#ddd6b3" stroke-width="30"/>`
      + kevin(Object.assign({ x: 200 + pull, y: 1090, s: 1.0, t: t * 2, look: 1, aR: 120, aL: 30, expr: "sad", tilt: -pull }, K))
      + stampFx(t, "SHEETS LAST WASHED", "2019", LS(1)) + voteWon(t, LS(1), LS(2) - 0.4, "SHEETS", COL.y);
  }
  const sh = Math.sin(t * 28) * 6, k = back(prog(t, LS(2) - 0.15, 0.3));
  const sheet = `<g transform="translate(${360 + sh},860) scale(${k}) translate(0,-860)">
    <path class="o" d="M150,1000 q-40,-200 60,-330 q150,-110 300,0 q100,130 60,330 l-60,-40 l-60,40 l-60,-40 l-60,40 l-60,-40 l-60,40Z" fill="#ddd6b3" transform="translate(-360,0)"/>
    <ellipse cx="-70" cy="900" rx="40" ry="16" fill="#b9a24a"/><circle cx="80" cy="860" r="14" fill="#8a5a2c"/>
    <path class="o" d="M-90,720 l60,26 M90,720 l-60,26" fill="none" stroke-width="10"/>
    <circle cx="-52" cy="770" r="14" fill="#151515"/><circle cx="52" cy="770" r="14" fill="#151515"/>
    <path class="o" d="M-50,840 q50,-34 100,0" fill="none" stroke-width="8"/>
    <path class="o" d="M-200,760 q-90,-60 -60,-170" fill="none" stroke="#ddd6b3" stroke-width="44"/><path class="o" d="M200,760 q90,-60 60,-170" fill="none" stroke="#ddd6b3" stroke-width="44"/></g>`;
  return bedroom(t, { sheet: "#7a5236", clean: true })
    + kevin(Object.assign({ x: 360 - sh, y: 1090, s: 1.1, t, expr: "shock", aL: 150 + sh * 3, aR: 150 - sh * 3, tilt: sh }, K)) + sheet
    + sticker(360, 420, "ROUND 3", COL.r, pop(t, CS(2, 1)), -5, 56, "#fff");
}

function sRoom(t) {
  const stuck = t >= LS(4), pull = Math.sin(t * 30) * (stuck ? 5 : 2);
  const it = (x, y, k, body) => k <= 0 ? "" : `<g transform="translate(${x},${y - 60 * (1 - Math.min(k, 1))}) scale(${k})">${body}</g>`;
  return bedroom(t, { angry: 1, ax: 520, stink: 1 })
    + `<path class="o" d="M${300 + pull},700 L400,905" fill="none" stroke="#ddd6b3" stroke-width="30"/>`
    + kevin(Object.assign({ x: 200 + pull, y: 1090, s: 1.0, t: t * 2, look: 1, aR: 120, aL: 30, expr: stuck ? "sad" : "neutral", tilt: -pull }, K))
    + sticker(500, 780, "BONDED", COL.r, pop(t, CS(5, 1)), 8, 44, "#fff")
    + it(360, 560, pop(t, CS(6, 2)), `<path class="o" d="M-60,40 L0,-60 L60,40Z" fill="#f2c94c"/><circle cx="-10" cy="10" r="10" fill="#c23b2b"/><circle cx="18" cy="24" r="8" fill="#c23b2b"/><path d="M-60,40 h120" stroke="#b5653a" stroke-width="14" stroke-linecap="round"/>`)
    + it(500, 560, pop(t, LS(7)), `<rect class="o" x="-26" y="-64" width="52" height="128" rx="10" fill="#2b2f3a"/><circle cx="0" cy="-36" r="9" fill="#e2574c"/><circle cx="-10" cy="0" r="5" fill="#888"/><circle cx="10" cy="0" r="5" fill="#888"/><circle cx="-10" cy="22" r="5" fill="#888"/><circle cx="10" cy="22" r="5" fill="#888"/>`)
    + sheetGhost(590, 470, pop(t, CS(8, 1)) * 0.8, t, "#cfc79a")
    + sheetGhost(130, 520, pop(t, CS(9, 1)) * 0.7, t + 1, "#bdb588")
    + [0, 1, 2, 3].map(i => sheetGhost(250 + i * 90, 400 + (i % 2) * 50, pop(t, CS(10, 1) + i * 0.1) * 0.32, t + i, "#e9e3c8")).join("")
    + sticker(360, 330, "IT'S A FAMILY", COL.r, pop(t, CS(10, 1) + 0.3), -4, 44, "#fff");
}

function sStreet(t) {
  const x = lerp(120, 290, prog(t, LS(11) - 0.25, 3.2)), flee = t - CS(12, 1);
  const px = flee > 0 ? 500 + flee * 260 : 500, hop = Math.abs(Math.sin(t * 16)) * (flee > 0 ? 14 : 0);
  const pile = `<g transform="translate(0,150)"><path class="o" d="M-80,30 q-20,-110 80,-110 q100,0 80,110 q-80,40 -160,0Z" fill="#ddd6b3"/><ellipse cx="-20" cy="-10" rx="22" ry="10" fill="#b9a24a"/><circle cx="34" cy="-40" r="10" fill="#8a5a2c"/>
    <path d="M-30,-56 l20,10 M34,-56 l-20,10" stroke="#151515" stroke-width="6"/><circle cx="-18" cy="-34" r="6" fill="#151515"/><circle cx="20" cy="-34" r="6" fill="#151515"/></g>`;
  let st = "";
  for (let i = 0; i < 3; i++) { const k = (t * 0.6 + i / 3) % 1; st += `<path d="M${x + 60 + i * 40},${760 - k * 110} q14,-14 0,-28 q-14,-14 0,-28" stroke="#74b33c" stroke-width="6" fill="none" stroke-linecap="round" opacity="${0.9 * Math.sin(k * Math.PI)}"/>`; }
  return city(t) + kevin(Object.assign({ x, y: 1085, s: 1.0, t: t * 3, look: 1, heldR: pile, aR: 55, expr: "sad" }, K)) + st
    + `<g transform="translate(${px},${1090 - hop})"><path class="o" d="M-40,0 q0,-36 44,-34 q30,2 30,26 q-10,22 -44,20 l-40,10Z" fill="#9aa3b5"/>
        <circle class="o" cx="30" cy="-34" r="18" fill="#9aa3b5"/><circle cx="${flee > 0 ? 36 : 24}" cy="-38" r="5" fill="#151515"/><path class="o" d="M46,-32 l18,4 l-18,6Z" fill="#f08a4b"/>
        <path d="M-6,14 v14 M10,14 v14" stroke="#f08a4b" stroke-width="5"/></g>`
    + (flee > 0.15 ? `<text class="ui" x="${Math.min(px, 620)}" y="990" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" stroke="#151515" stroke-width="6" paint-order="stroke">nope.</text>` : "");
}

function laundroBg() {
  return `<rect width="720" height="1280" fill="#f3e7b8"/><rect y="1040" width="720" height="240" fill="#8fa3a8"/><path d="M0,1040 h720" stroke="#151515" stroke-width="5"/>`;
}

function sLaundro(t) {
  const reading = t >= CS(13, 2), locked = t >= CS(14, 0);
  const machine = (x, alive) => `<g transform="translate(${x},820)"><rect class="o" x="-100" y="-170" width="200" height="390" rx="12" fill="#e9eef2"/>
    <rect x="-84" y="-152" width="168" height="44" rx="6" fill="#55606a"/><circle cx="60" cy="-130" r="10" fill="${alive && locked ? COL.r : COL.g}"/>
    <circle class="o" cx="0" cy="40" r="74" fill="#8fd0f5"/><circle cx="0" cy="40" r="54" fill="#5aa9d6"/>
    ${alive ? (locked ? `<path d="M-50,-128 h30 M-10,-128 h30" stroke="#fff" stroke-width="6"/>` : `<circle cx="-34" cy="-130" r="12" fill="#fff"/><circle cx="-2" cy="-130" r="12" fill="#fff"/><circle cx="${-34 - (reading ? 5 : 0)}" cy="-128" r="5" fill="#111"/><circle cx="${-2 - (reading ? 5 : 0)}" cy="-128" r="5" fill="#111"/>`) : ""}
    ${alive && locked ? `<g transform="translate(0,40) scale(${pop(t, CS(14, 0))})"><rect class="o" x="-30" y="-10" width="60" height="50" rx="8" fill="${COL.y}"/><path class="o" d="M-18,-10 v-18 q18,-22 36,0 v18" fill="none"/></g>` : ""}</g>`;
  const bundle = `<g transform="translate(0,150)"><path class="o" d="M-50,20 q-10,-60 50,-60 q60,0 50,60 q-50,26 -100,0Z" fill="#ddd6b3"/><circle cx="-14" cy="-6" r="9" fill="#b9a24a"/><path d="M-20,-22 l14,8 M22,-22 l-14,8" stroke="#151515" stroke-width="5"/></g>`;
  const give = t >= CS(16, 1);
  const lady = t < LS(16) - 0.4 ? "" : npc({ x: lerp(820, 590, eo(prog(t, LS(16) - 0.4, 0.6))), s: 0.9, flip: true, top: "#b06fd8", leg: "#b06fd8", skin: "#e8c4a0", hair: "#d9d9de",
    hairPath: "M-62,-470 q0,-66 62,-66 q62,0 62,66 q-30,-30 -62,-28 q-32,-2 -62,28Z M-20,-560 a22,22 0 1,0 40,0 a22,22 0 1,0 -40,0", lookx: 1, scared: !give,
    armR: give ? 95 : 10, heldR: give ? `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-24" y="0" width="48" height="76" rx="8" fill="#f08a4b"/><rect class="o" x="-12" y="76" width="24" height="16" fill="#fff"/></g>` : "",
    face: `<circle class="o" cx="-22" cy="-458" r="20" fill="none" stroke-width="4"/><circle class="o" cx="26" cy="-458" r="20" fill="none" stroke-width="4"/>` });
  let bottles = "";
  for (let i = 0; i < 4; i++) { const k = pop(t, LS(17) + i * 0.12); if (k > 0) bottles += `<g transform="translate(${250 + i * 60},1050) scale(${k})"><rect class="o" x="-22" y="-70" width="44" height="70" rx="8" fill="${["#f08a4b", "#5cc8ff", "#7be04a", "#ff7ac0"][i]}"/><rect class="o" x="-11" y="-86" width="22" height="16" fill="#fff"/></g>`; }
  return laundroBg() + `<rect class="o" x="190" y="380" width="340" height="64" rx="10" fill="#2a5fd0"/><text x="360" y="428" text-anchor="middle" font-size="42" fill="#fff">SUDS &amp; DUDS</text>
    ${machine(130, false)}${machine(360, true)}${machine(590, false)}
    ${t >= CS(15, 1) && t < LS(16) - 0.4 ? (() => { const k = prog(t, CS(15, 1), 0.6); return `<path d="M690,900 q40,-${60 + k * 200} ${-30 - k * 60},-${120 + k * 260}" stroke="#151515" stroke-width="7" fill="none"/><g transform="translate(${660 - k * 60},${780 - k * 260}) rotate(${k * 200})"><rect class="o" x="-16" y="-12" width="32" height="28" rx="5" fill="#fff"/><path d="M-7,-12 v-14 M7,-12 v-14" stroke="#151515" stroke-width="5"/></g>` + sticker(560, 560, "NOT TODAY", COL.r, pop(t, CS(15, 1)), 6, 40, "#fff"); })() : ""}
    ${kevin(Object.assign({ x: 180, y: 1100, s: 0.95, t, look: 1, heldR: bundle, aR: 60, expr: give ? "shock" : locked ? "sad" : "neutral" }, K))}${lady}${bottles}`;
}

// reward scene: the wash. Yellow meter drains, water clears, glow-up ticks 9 -> 13.
function sSpin(t) {
  const c = tickProg(t, TICKS()), n = stepsOf(t, TICKS()), last = n ? TICKS()[n - 1] : -9;
  const sh = (t - last < 0.2 ? Math.sin(t * 90) * 6 : 0) + Math.sin(t * 40) * 2;
  const going = t >= CS(18, 2);
  let bub = "";
  for (let i = 0; i < 14; i++) { const a = t * (2 + rnd(i)) + i, r = 40 + rnd(i + 5) * 120; bub += `<circle cx="${Math.cos(a) * r}" cy="${Math.sin(a) * r}" r="${8 + rnd(i + 9) * 16}" fill="#fff" opacity="${going ? 0.8 : 0}"/>`; }
  let foam = "";
  if (n >= 3) for (let i = 0; i < 9; i++) foam += `<circle cx="${130 + i * 46}" cy="${1040 - 18 * Math.abs(Math.sin(t * 3 + i))}" r="${26 + rnd(i) * 18}" fill="#fff" stroke="#cfe6ff" stroke-width="3"/>`;
  const rot = going ? t * 320 : 0;
  return laundroBg() + `<g transform="translate(${sh},0)">
      <rect class="o" x="50" y="380" width="500" height="670" rx="18" fill="#e9eef2"/>
      <rect x="76" y="404" width="448" height="74" rx="8" fill="#55606a"/><circle cx="480" cy="441" r="16" fill="${going ? COL.g : COL.r}"/>
      ${going ? `<path d="M120,446 q22,-22 44,0 M196,446 q22,-22 44,0" stroke="#fff" stroke-width="7" fill="none"/>` : `<path d="M120,440 h44 M196,440 h44" stroke="#fff" stroke-width="7"/>`}
      <circle class="o" cx="300" cy="750" r="216" fill="#c9d3da"/>
      <circle cx="300" cy="750" r="186" fill="${mixCol("#8a6a2c", "#8fd0f5", c)}"/>
      <g transform="translate(300,750)"><g transform="rotate(${rot})"><path class="o" d="M-110,-40 q60,-110 150,-50 q90,70 10,140 q-90,60 -150,-10 q-40,-40 -10,-80Z" fill="${mixCol(YEL, "#ffffff", c)}"/>
        <path d="M-40,-20 q40,-30 70,10" stroke="#151515" stroke-width="4" fill="none" opacity=".4"/></g>${bub}</g>
      <circle cx="300" cy="750" r="186" fill="none" stroke="#151515" stroke-width="5"/><path d="M190,640 q50,-60 120,-66" stroke="#fff" stroke-width="12" fill="none" opacity=".5" stroke-linecap="round"/>
    </g>${foam}`
    + meterFx(636, 720, "YELLOW", c, "#c9a800") + tickFx(t, TICKS(), 280);
}

function sReveal(t) {
  const open = eo(prog(t, LS(22) - 0.15, 0.7)), ach = pop(t, LS(24));
  const cape = `<g transform="translate(360,${680 + Math.sin(t * 3) * 6})"><path class="o" d="M-250,-150 q250,-50 500,0 l-20,470 l-60,-36 l-60,36 l-60,-36 l-60,36 l-60,-36 l-60,36 l-60,-36 l-60,36Z" fill="#fff"/>
    <path d="M-180,-60 q20,160 0,300 M0,-80 q20,180 0,330 M180,-60 q-20,160 0,300" stroke="#e3edf5" stroke-width="8" fill="none"/></g>`;
  return starburst(t) + cape
    + kevin(Object.assign({ x: 360, y: 1280, s: 1.25, t, expr: "grin", aL: 165, aR: 165 }, K))
    + sparkles(t, [[150, 600], [570, 640], [200, 940], [540, 920], [360, 500]])
    + (ach <= 0 ? sticker(360, 420, "ORIGINAL COLOUR: FOUND", "#fff", pop(t, CS(23, 3)), -4, 34) : "")
    + steamFx(open, 760) + confettiFx(t, LS(24)) + achieve(t, LS(24), 3, "CLEAN BED");
}

function sStairs(t) {
  let steps = "";
  for (let i = 0; i < 8; i++) steps += `<path class="o" d="M${-40 + i * 100},${1180 - i * 70} h100 v70 h620 v200 h-720Z" fill="${i % 2 ? "#b9a88a" : "#c7b89c"}"/>`;
  let sweat = "";
  for (let i = 0; i < 4; i++) { const k = (t * 1.5 + i / 4) % 1; sweat += `<path transform="translate(${200 + i * 70},${470 + k * 120})" d="M0,-14 q12,16 0,26 q-12,-10 0,-26Z" fill="#5cc8ff" stroke="#151515" stroke-width="3" opacity="${1 - k}"/>`; }
  const bundle = `<g transform="translate(0,150)"><path class="o" d="M-60,24 q-12,-72 60,-72 q72,0 60,72 q-60,30 -120,0Z" fill="#fff"/><path d="M-30,-10 q30,-20 60,0" stroke="#dbe6ee" stroke-width="6" fill="none"/></g>`;
  const rest = t >= LS(26);
  return `<rect width="720" height="1280" fill="#e6dfcf"/><rect class="o" x="60" y="300" width="150" height="200" fill="#bcd9ea"/><path d="M135,300 v200 M60,400 h150" stroke="#151515" stroke-width="5"/>
    ${steps}<path class="o" d="M0,620 L720,116" fill="none" stroke="#7a5236" stroke-width="16"/>
    ${kevin(Object.assign({ x: 330, y: 970, s: 1.0, t: t * (rest ? 4 : 2), look: 1, expr: rest ? "shock" : "sad", heldR: bundle, aR: 50, aL: rest ? 60 : 12, tilt: rest ? 8 : 0 }, K))}${rest ? sweat : ""}
    ${sticker(540, 560, "BREAK 1", "#fff", pop(t, LS(26)) * (t < LS(27) ? 1 : 0), 6, 50)}${sticker(540, 560, "BREAK 2", COL.r, pop(t, LS(27)), -6, 60, "#fff")}
    <g transform="translate(160,640) scale(${pop(t, LS(26)) * (1 + 0.08 * Math.abs(Math.sin(t * 9)))})"><rect class="o" x="-100" y="-56" width="200" height="112" rx="14" fill="#151515"/>
      <text class="ui" x="0" y="-22" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">HEART RATE</text><text x="0" y="38" text-anchor="middle" font-size="56" fill="${COL.r}">180</text></g>`;
}

function sBed(t) {
  const bad = t >= LS(29), k = pop(t, LS(29));
  return bedroom(t, { sheet: "#ffffff", clean: true, angry: bad ? k : 0, ax: 520 })
    + (bad ? "" : sparkles(t, [[200, 880], [380, 860], [560, 890], [640, 940]]))
    + kevin(Object.assign({ x: 210, y: 1090, s: 1.0, t, look: 1, expr: bad ? "shock" : "grin", tilt: bad ? Math.sin(t * 22) * 2 : 0 }, K, bad ? { stink: true } : {}))
    + sticker(520, 760, t >= LS(31) ? "CHOOSE." : "DON'T.", t >= LS(31) ? COL.y : "#fff", t >= LS(31) ? pop(t, LS(31)) : k, 6, 64)
    + voteOverlay(t, { t0: LS(30) - 0.25, ta: LS(30), tb: CS(30, 1), a: "DEODORANT", b: "GYM" })
    + (bad ? `<g transform="translate(210,${850 + Math.sin(t * 6) * 6}) scale(${k})"><path d="M-70,0 h140 M0,-70 v140" stroke="${COL.r}" stroke-width="0"/><circle r="150" fill="none" stroke="${COL.r}" stroke-width="10" stroke-dasharray="26 18" transform="rotate(${t * 60})"/></g>` : "");
}

window.EP = {
  days: 27, pct: [9, 13, 0], pctFn: t => 9 + stepsOf(t, TICKS()),
  punch: [0, LS(1), LS(2), LS(4), CS(5, 1), CS(6, 2), LS(7), CS(8, 1), CS(9, 1), CS(10, 1), CS(12, 1), CS(14, 0), CS(15, 1), CS(16, 2), LS(17), CS(18, 2), ...TICKS(), LS(22), LS(24), LS(26), LS(27), LS(28), LS(29)],
  CAPY: { vote: 1180, hook: 1150, room: 1150, street: 1190, spin: 1150, reveal: 1130, stairs: 1150, bed: 1150 },
  overlay: (t, n) => premiseTag(n) + (n !== "hook" && n !== "room" && n !== "street" && t < LS(30) - 0.3 ? voteBadge(t, LS(13) + 0.4, "DEODORANT", "GYM") : ""),
  SC: {
    hook: sHook, room: sRoom, street: sStreet, laundro: sLaundro, spin: sSpin, reveal: sReveal, stairs: sStairs, bed: sBed,
    vote: t => voteScene(t, {
      a: { label: "DEODORANT", col: COL.y, s1: "SMELL NICE.", s2: "ON PURPOSE.", k: Object.assign({ heldR: HELD.spray, aR: 150, expr: "grin" }, K) },
      b: { label: "GYM", col: COL.b, s1: "LIFT SOMETHING.", s2: "ANYTHING.", k: Object.assign({ heldR: HELD.dumbbell, aR: 120 + Math.sin(t * 5) * 25, expr: "sad" }, K) },
      ta: LS(30) - 0.2, tb: CS(30, 1), tv: LS(31), tf: LS(31) + 0.3, footer: "DAY 5 STARTS WITH YOUR CHOICE" }),
  },
};
