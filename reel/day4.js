// Day 4: SHEETS. Change VOTE to the real comment split before posting.
const VOTE = { win: 58, lose: 42 };
const K = { teeth: WHITE, clean: true, stink: false, noFlies: true };

function sHook(t) {
  const sh = Math.sin(t * 28) * 6;
  const sheet = `<g transform="translate(${360 + sh},0)">
    <path class="o" d="M150,1000 q-40,-200 60,-330 q150,-110 300,0 q100,130 60,330 l-60,-40 l-60,40 l-60,-40 l-60,40 l-60,-40 l-60,40Z" fill="#ddd6b3" transform="translate(-360,0)"/>
    <ellipse cx="-70" cy="900" rx="40" ry="16" fill="#b9a24a"/><circle cx="80" cy="860" r="14" fill="#8a5a2c"/>
    <path class="o" d="M-90,720 l60,26 M90,720 l-60,26" fill="none" stroke-width="10"/>
    <circle cx="-52" cy="770" r="14" fill="#151515"/><circle cx="52" cy="770" r="14" fill="#151515"/>
    <path class="o" d="M-50,840 q50,-34 100,0" fill="none" stroke-width="8"/>
    <path class="o" d="M-200,760 q-90,-60 -60,-170" fill="none" stroke="#ddd6b3" stroke-width="44"/><path class="o" d="M200,760 q90,-60 60,-170" fill="none" stroke="#ddd6b3" stroke-width="44"/></g>`;
  return bedroom(t, { sheet: "#7a5236", clean: true })
    + kevin(Object.assign({ x: 360 - sh, y: 1090, s: 1.1, t, expr: "shock", aL: 150 + sh * 3, aR: 150 - sh * 3, tilt: sh }, K)) + sheet
    + sticker(360, 330, "ROUND 3", COL.r, pop(t, LS(1)), -5, 56, "#fff");
}

function sRoom(t) {
  const pull = t >= LS(9) ? Math.sin(t * 30) * 4 : 0;
  const it = (x, y, k, body) => k <= 0 ? "" : `<g transform="translate(${x},${y - 60 * (1 - Math.min(k, 1))}) scale(${k})">${body}</g>`;
  return bedroom(t, { angry: 1, ax: 520, stink: 1 })
    + `<path class="o" d="M${300 + pull},700 L400,905" fill="none" stroke="#ddd6b3" stroke-width="30"/>`
    + kevin(Object.assign({ x: 200 + pull, y: 1090, s: 1.0, t, look: 1, aR: 120, aL: 30, expr: t >= LS(9) ? "sad" : "neutral", tilt: -pull }, K))
    + sticker(500, 780, "BONDED", COL.r, pop(t, CS(10, 1)), 8, 44, "#fff")
    + it(360, 560, pop(t, CS(11, 2)), `<path class="o" d="M-60,40 L0,-60 L60,40Z" fill="#f2c94c"/><circle cx="-10" cy="10" r="10" fill="#c23b2b"/><circle cx="18" cy="24" r="8" fill="#c23b2b"/><path d="M-60,40 h120" stroke="#b5653a" stroke-width="14" stroke-linecap="round"/>`)
    + it(500, 560, pop(t, LS(12)), `<rect class="o" x="-26" y="-64" width="52" height="128" rx="10" fill="#2b2f3a"/><circle cx="0" cy="-36" r="9" fill="#e2574c"/><circle cx="-10" cy="0" r="5" fill="#888"/><circle cx="10" cy="0" r="5" fill="#888"/><circle cx="-10" cy="22" r="5" fill="#888"/><circle cx="10" cy="22" r="5" fill="#888"/>`)
    + sheetGhost(590, 420, pop(t, CS(13, 1)) * 0.8, t, "#cfc79a");
}

function sLaundro(t) {
  const locked = t >= CS(16, 0);
  const machine = (x, alive) => `<g transform="translate(${x},820)"><rect class="o" x="-100" y="-170" width="200" height="390" rx="12" fill="#e9eef2"/>
    <rect x="-84" y="-152" width="168" height="44" rx="6" fill="#55606a"/><circle cx="60" cy="-130" r="10" fill="${alive && locked ? COL.r : COL.g}"/>
    <circle class="o" cx="0" cy="40" r="74" fill="#8fd0f5"/><circle cx="0" cy="40" r="54" fill="#5aa9d6"/>
    ${alive ? (locked ? `<path d="M-50,-128 h30 M-10,-128 h30" stroke="#fff" stroke-width="6"/>` : `<circle cx="-34" cy="-130" r="12" fill="#fff"/><circle cx="-2" cy="-130" r="12" fill="#fff"/><circle cx="${-34 - (t >= LS(15) ? 5 : 0)}" cy="-128" r="5" fill="#111"/><circle cx="${-2 - (t >= LS(15) ? 5 : 0)}" cy="-128" r="5" fill="#111"/>`) : ""}
    ${alive && locked ? `<g transform="translate(0,40) scale(${pop(t, CS(16, 0))})"><rect class="o" x="-30" y="-10" width="60" height="50" rx="8" fill="${COL.y}"/><path class="o" d="M-18,-10 v-18 q18,-22 36,0 v18" fill="none"/></g>` : ""}</g>`;
  const bundle = `<g transform="translate(0,150)"><path class="o" d="M-50,20 q-10,-60 50,-60 q60,0 50,60 q-50,26 -100,0Z" fill="#ddd6b3"/><circle cx="-14" cy="-6" r="9" fill="#b9a24a"/><path d="M-20,-22 l14,8 M22,-22 l-14,8" stroke="#151515" stroke-width="5"/></g>`;
  const lady = t < LS(17) ? "" : npc({ x: lerp(820, 590, eo(prog(t, LS(17), 0.6))), s: 0.9, flip: true, top: "#b06fd8", leg: "#b06fd8", skin: "#e8c4a0", hair: "#d9d9de",
    hairPath: "M-62,-470 q0,-66 62,-66 q62,0 62,66 q-30,-30 -62,-28 q-32,-2 -62,28Z M-20,-560 a22,22 0 1,0 40,0 a22,22 0 1,0 -40,0", lookx: 1, scared: t < LS(18),
    armR: t >= LS(18) ? 95 : 10, heldR: t >= LS(18) ? `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-24" y="0" width="48" height="76" rx="8" fill="#f08a4b"/><rect class="o" x="-12" y="76" width="24" height="16" fill="#fff"/></g>` : "",
    face: `<circle class="o" cx="-22" cy="-458" r="20" fill="none" stroke-width="4"/><circle class="o" cx="26" cy="-458" r="20" fill="none" stroke-width="4"/>` });
  let bottles = "";
  for (let i = 0; i < 4; i++) { const k = pop(t, LS(19) + i * 0.12); if (k > 0) bottles += `<g transform="translate(${250 + i * 60},1050) scale(${k})"><rect class="o" x="-22" y="-70" width="44" height="70" rx="8" fill="${["#f08a4b", "#5cc8ff", "#7be04a", "#ff7ac0"][i]}"/><rect class="o" x="-11" y="-86" width="22" height="16" fill="#fff"/></g>`; }
  return `<rect width="720" height="1280" fill="#f3e7b8"/><rect y="1040" width="720" height="240" fill="#8fa3a8"/><path d="M0,1040 h720" stroke="#151515" stroke-width="5"/>
    <rect class="o" x="190" y="250" width="340" height="64" rx="10" fill="#2a5fd0"/><text x="360" y="298" text-anchor="middle" font-size="42" fill="#fff">SUDS &amp; DUDS</text>
    ${machine(130, false)}${machine(360, true)}${machine(590, false)}
    ${kevin(Object.assign({ x: 180, y: 1100, s: 0.95, t, look: 1, heldR: bundle, aR: 60, expr: locked && t < LS(17) ? "sad" : t >= LS(18) ? "shock" : "neutral" }, K))}${lady}${bottles}`;
}

function sReveal(t) {
  const cape = `<g transform="translate(360,${640 + Math.sin(t * 3) * 6})"><path class="o" d="M-250,-150 q250,-50 500,0 l-20,470 l-60,-36 l-60,36 l-60,-36 l-60,36 l-60,-36 l-60,36 l-60,-36 l-60,36Z" fill="#fff"/>
    <path d="M-180,-60 q20,160 0,300 M0,-80 q20,180 0,330 M180,-60 q-20,160 0,300" stroke="#e3edf5" stroke-width="8" fill="none"/></g>`;
  return starburst(t) + cape
    + kevin(Object.assign({ x: 360, y: 1240, s: 1.25, t, expr: "grin", aL: 165, aR: 165 }, K))
    + sparkles(t, [[150, 560], [570, 600], [200, 900], [540, 880], [360, 470]])
    + sticker(360, 330, "ORIGINAL COLOUR: FOUND", COL.g, pop(t, CS(22, 2)), -4, 36)
    + `<rect width="720" height="1280" fill="#fff" opacity="${1 - prog(t, LS(21) - 0.2, 0.5)}"/>`;
}

function sPant(t) {
  let sweat = "";
  for (let i = 0; i < 4; i++) { const k = (t * 1.5 + i / 4) % 1; sweat += `<path transform="translate(${250 + i * 70},${520 + k * 120})" d="M0,-14 q12,16 0,26 q-12,-10 0,-26Z" fill="#5cc8ff" stroke="#151515" stroke-width="3" opacity="${1 - k}"/>`; }
  const beat = 1 + 0.08 * Math.abs(Math.sin(t * 9));
  return bedroom(t, { sheet: "#ffffff", clean: true })
    + kevin(Object.assign({ x: 360, y: 1090, s: 1.1, t: t * 3, expr: "shock", heldR: HELD.phone, aR: 60, aL: 40 }, K)) + sweat
    + `<g transform="translate(560,470) scale(${pop(t, LS(27)) * beat})"><rect class="o" x="-100" y="-56" width="200" height="112" rx="14" fill="#151515"/>
        <text class="ui" x="0" y="-22" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">HEART RATE</text><text x="0" y="38" text-anchor="middle" font-size="56" fill="${COL.r}">180</text></g>`;
}

window.EP = {
  days: 27, pct: [9, 13, LS(23)],
  punch: [LS(0), LS(2), LS(9), CS(13, 1), CS(16, 0), LS(19), LS(21), LS(23), LS(26), LS(27)],
  CAPY: { phone: 1195, vote: 1180, card: 1150, reveal: 1130, hook: 1130 },
  hideCap: (n) => n === "early" || n === "later",
  SC: {
    hook: sHook,
    card: t => resultCard(t, { title: "DAY 3 RESULTS", win: { label: "SHEETS", pct: VOTE.win, col: COL.y }, lose: { label: "DEODORANT", pct: VOTE.lose, col: COL.b },
      tBars: LS(3), tWin: LS(4), tLose: LS(5), extra: sticker(360, 960, "NOTED.", "#fff", pop(t, LS(6)), -4, 60) }),
    early: t => titleCard(t, LS(7), "TWENTY MINUTES", "EARLIER"),
    room: sRoom, laundro: sLaundro,
    later: t => titleCard(t, LS(20), "THREE WASHES", "LATER"),
    reveal: sReveal,
    phone: t => chat(t, LS(24) - 0.25, [{ lines: ["btw the wedding has a", "dance floor"], at: LS(24) + 0.4 }, { lines: ["saving you a slow one :)"], at: LS(26) }]),
    pant: sPant,
    vote: t => voteScene(t, {
      a: { label: "GYM", col: COL.y, s1: "LIFT SOMETHING.", s2: "ANYTHING.", k: Object.assign({ heldR: HELD.dumbbell, aR: 120 + Math.sin(t * 5) * 25, expr: "sad" }, K) },
      b: { label: "HAIRCUT", col: COL.b, s1: "FIRST ONE", s2: "SINCE 2019.", k: Object.assign({ heldR: HELD.comb, aR: 158, expr: "grin" }, K) },
      ta: LS(29), tb: LS(30), tv: LS(31), tf: LS(32), footer: "DAY 5 STARTS WITH YOUR CHOICE" }),
  },
};
