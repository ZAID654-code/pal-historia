// Day 5: GYM. Change VOTE to the real comment split before posting.
const VOTE = { win: 66, lose: 34 };
const K = { teeth: WHITE, clean: true, fresh: true, stink: false, noFlies: true };

function gym(t) {
  let rack = "";
  for (let i = 0; i < 5; i++) rack += `<g transform="translate(${70 + i * 60},700)"><rect class="o" x="-22" y="-6" width="44" height="12" fill="#888"/><rect class="o" x="-28" y="-18" width="12" height="36" rx="3" fill="#333"/><rect class="o" x="16" y="-18" width="12" height="36" rx="3" fill="#333"/></g>`;
  return `<rect width="720" height="1280" fill="#39424f"/><rect y="1040" width="720" height="240" fill="#22262d"/><path d="M0,1040 h720" stroke="#151515" stroke-width="5"/>
    <rect class="o" x="380" y="330" width="300" height="420" fill="#a9d2e6"/><path d="M410,360 l60,-20 M420,410 l100,-36" stroke="#fff" stroke-width="8"/>
    <rect class="o" x="40" y="270" width="260" height="70" rx="10" fill="${COL.r}"/><text x="170" y="322" text-anchor="middle" font-size="46" fill="#fff">IRON DEN</text>
    <rect class="o" x="30" y="720" width="320" height="16" fill="#555"/>${rack}`;
}

function sHook(t) {
  const wob = Math.sin(t * 10) * 2;
  const k = pop(t, CS(0, 2)), z = pop(t, CS(1, 1));
  return gym(t)
    + npc({ x: 640, s: 0.95, top: "#151515", leg: "#151515", skin: "#c98d63", looky: 1, lookx: -1, body: `<text x="0" y="-290" text-anchor="middle" font-size="30" fill="#fff">STAFF</text>` })
    + `<rect class="o" x="110" y="960" width="520" height="34" rx="10" fill="#b8323a"/><rect class="o" x="170" y="994" width="24" height="90" fill="#555"/><rect class="o" x="540" y="994" width="24" height="90" fill="#555"/>
       <rect class="o" x="180" y="640" width="16" height="330" fill="#777"/><rect class="o" x="560" y="640" width="16" height="330" fill="#777"/>`
    + lieKevin(Object.assign({ x: 560, y: 955, s: 0.95, t, expr: "sad", aL: 175 + wob, aR: 175 - wob }, K), -90)
    + `<g transform="translate(0,${wob})"><rect class="o" x="60" y="772" width="600" height="18" rx="9" fill="#c9d3da"/>
       <rect class="o" x="60" y="762" width="26" height="38" rx="4" fill="#8a97a3"/><rect class="o" x="634" y="762" width="26" height="38" rx="4" fill="#8a97a3"/></g>`
    + (k > 0 ? `<g transform="translate(200,470) rotate(-5) scale(${k})"><rect class="o" x="-100" y="-50" width="200" height="100" rx="14" fill="#151515"/><text text-anchor="middle" y="24" font-size="64" fill="${COL.r}">11:00</text></g>` : "")
    + sticker(360, 690, "0 KG", COL.y, z, -6, 60);
}

function sDesk(t) {
  const form = t >= LS(8);
  const base = gym(t) + npc({ x: 520, s: 1.0, flip: true, top: "#e2574c", skin: "#e8c4a0", hair: "#f2c94c", mouth: "smile", lookx: 1 })
    + `<rect class="o" x="300" y="820" width="430" height="270" fill="#7a5236"/><rect class="o" x="280" y="800" width="460" height="34" rx="8" fill="#a07a55"/>
       <rect class="o" x="400" y="880" width="230" height="64" rx="8" fill="${COL.y}"/><text x="515" y="926" text-anchor="middle" font-size="38" fill="#151515">FREE TRIAL</text>`
    + kevin(Object.assign({ x: 170, y: 1090, s: 1.0, t, look: 1, expr: "grin", aR: 80 }, K));
  if (!form) return base;
  const k = pop(t, LS(8)), w = prog(t, CS(8, 2), 0.5);
  return base + `<rect width="720" height="1280" fill="#000" opacity=".55"/><g transform="translate(360,640) rotate(-3) scale(${k})">
      <rect class="o" x="-250" y="-270" width="500" height="540" rx="10" fill="#fff"/><rect class="o" x="-70" y="-300" width="140" height="50" rx="10" fill="#8a97a3"/>
      <text x="0" y="-190" text-anchor="middle" font-size="44" fill="#151515">NEW MEMBER</text>
      <text class="ui" x="-210" y="-110" font-size="24" font-weight="800" fill="#666">NAME</text><text class="ui" x="-210" y="-66" font-size="38" font-style="italic" fill="#1d4fd0">Kevin</text><path d="M-210,-50 h420" stroke="#bbb" stroke-width="3"/>
      <text class="ui" x="-210" y="10" font-size="24" font-weight="800" fill="#666">GOAL</text><text class="ui" x="-210" y="54" font-size="38" font-style="italic" fill="#1d4fd0">a wedding</text><path d="M-210,70 h420" stroke="#bbb" stroke-width="3"/>
      <text class="ui" x="-210" y="130" font-size="24" font-weight="800" fill="#666">OCCUPATION</text><text class="ui" x="-210" y="180" font-size="44" font-style="italic" font-weight="800" fill="#1d4fd0">${"goblin".slice(0, Math.ceil(w * 6))}</text><path d="M-210,196 h420" stroke="#bbb" stroke-width="3"/></g>`;
}

function sTread(t) {
  const off = t - LE(11);
  const kx = off > 0 ? 330 + off * 700 : 330 + Math.sin(t * 3) * 14;
  const belt = (t * 300) % 60;
  let lines = "";
  for (let i = 0; i < 8; i++) lines += `<path d="M${150 + i * 60 - belt},1062 h26" stroke="#555" stroke-width="6"/>`;
  return gym(t)
    + `<rect class="o" x="120" y="1040" width="470" height="46" rx="20" fill="#151515"/>${lines}
       <path class="o" d="M150,1040 L190,700" fill="none" stroke="#8a97a3" stroke-width="16"/><rect class="o" x="110" y="640" width="170" height="90" rx="12" fill="#2b2f3a"/>
       <text class="ui" x="195" y="668" text-anchor="middle" font-size="16" font-weight="800" fill="#8a97a3">SPEED</text><text x="195" y="718" text-anchor="middle" font-size="48" fill="${COL.g}">1</text>`
    + kevin(Object.assign({ x: kx, y: 1044, s: 1.0, t: t * 4, look: -1, expr: off > 0 ? "shock" : t > LS(11) ? "sad" : "neutral", aL: 40 + Math.sin(t * 14) * 40, aR: 40 - Math.sin(t * 14) * 40, tilt: off > 0 ? 20 : 0, flip: true }, K))
    + sticker(500, 520, "PB: 90 SEC", COL.y, pop(t, LS(12)), 6, 50);
}

function sBig(t) {
  const x = lerp(900, 480, eo(prog(t, LS(13), 1.2)));
  const give = t >= LS(15);
  const towel = `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-36" y="-6" width="72" height="96" rx="6" fill="#fff"/><path d="M-36,60 h72 M-36,72 h72" stroke="#5cc8ff" stroke-width="6"/></g>`;
  const say = pop(t, LS(16));
  return gym(t)
    + npc({ x, s: 1.28, w: 1.75, flip: true, top: "#151515", bare: true, skin: "#b9764a", leg: "#2a5fd0", hair: "#151515", lookx: 1, looky: 0.6,
      mouth: give ? "smile" : "", armR: give ? 80 : 14, heldR: give ? towel : "", face: `<path class="o" d="M-40,-486 l30,10 M44,-486 l-30,10" fill="none" stroke-width="7"/>` })
    + kevin(Object.assign({ x: 150, y: 1090, s: 0.85, t: t * (give ? 1 : 5), look: 1, expr: give ? "grin" : "shock", tilt: give ? 0 : Math.sin(t * 30) * 2 }, K))
    + (say > 0 ? `<g transform="translate(290,360) scale(${say})"><path class="o" d="M-250,-80 h500 v150 h-130 l40,60 l-100,-60 h-310Z" fill="#fff"/>
        <text text-anchor="middle" y="-18" font-size="40" fill="#151515">FIRST DAY IS THE</text><text text-anchor="middle" y="36" font-size="40" fill="#151515">HARDEST, <tspan fill="#d99a00">KING.</tspan></text></g>` : "");
}

function sPush(t) {
  const up = t >= LS(17) ? Math.sin(Math.min(1, prog(t, LS(17), 1.4)) * Math.PI) : 0;
  let claps = "";
  if (t >= LS(19)) for (let i = 0; i < 6; i++) { const k = pop(t, LS(19) + i * 0.16, 0.2), x = [90, 630, 160, 560, 250, 470][i], y = [520, 540, 420, 400, 600, 610][i];
    claps += k <= 0 ? "" : `<g transform="translate(${x},${y}) scale(${k * (1 + 0.12 * Math.sin(t * 18 + i))}) rotate(${i % 2 ? 14 : -14})"><path class="o" d="M-24,24 l-6,-40 q6,-12 16,-2 l8,-18 q10,-8 16,4 l10,34 q2,22 -22,24Z" fill="#f2c08a"/><path d="M34,-34 l10,-12 M44,-14 l14,-4 M20,-46 l2,-14" stroke="${COL.y}" stroke-width="5" stroke-linecap="round"/></g>`; }
  return gym(t)
    + `<ellipse cx="360" cy="1100" rx="230" ry="20" fill="#5cc8ff" opacity=".5"/>`
    + lieKevin(Object.assign({ x: 600, y: 1090 - up * 60, s: 0.95, t, expr: t >= LS(19) ? "grin" : "sad", aL: 90, aR: 8, flip: false }, K), -84 - up * 6)
    + claps + sticker(360, 380, "REPS: 1", COL.g, pop(t, LS(18)), -5, 60);
}

window.EP = {
  days: 26, pct: [13, 18, LS(20)],
  punch: [CS(0, 2), CS(1, 1), LS(2), CS(8, 2), LE(11), CS(13, 1), LS(14), CS(15, 2), LS(17), LS(20), LS(23)],
  CAPY: { phone: 1195, vote: 1180, card: 1150, hook: 1150, push: 800, desk: 1150 },
  hideCap: (n) => n === "early",
  SC: {
    hook: sHook,
    card: t => resultCard(t, { title: "DAY 4 RESULTS", win: { label: "GYM", pct: VOTE.win, col: COL.y }, lose: { label: "HAIRCUT", pct: VOTE.lose, col: COL.b },
      tBars: LS(3), tWin: LS(3) + 0.6, tLose: LS(4), extra: pop(t, LS(5)) > 0 ? `<g transform="translate(360,1000) scale(${pop(t, LS(5))})">${kevin(Object.assign({ x: 0, y: 330, s: 0.9, t, expr: "sad", head: `<path d="M-60,-520 l-10,-40 M0,-530 v-44 M60,-520 l10,-40" stroke="${COL.r}" stroke-width="8" stroke-linecap="round"/>` }, K))}</g>` : "" }),
    early: t => titleCard(t, LS(6), "THIRTY MINUTES", "EARLIER"),
    desk: sDesk, tread: sTread, big: sBig, push: sPush,
    phone: t => chat(t, LS(21) - 0.25, [{ lines: ["kevin. my cousin works", "at that gym."], at: LS(21) + 0.4 }, { lines: ["there is a video.", "it has music now."], at: LS(23) }]),
    vote: t => voteScene(t, {
      a: { label: "HAIRCUT", col: COL.y, s1: "THE BARBER", s2: "IS READY NOW.", k: Object.assign({ heldR: HELD.comb, aR: 158, expr: "grin" }, K) },
      b: { label: "BEARD", col: COL.b, s1: "THREE DIRECTIONS.", s2: "PICK ZERO.", k: Object.assign({ heldR: HELD.razor, aR: 150, expr: "sad" }, K) },
      ta: LS(25), tb: LS(26), tv: LS(28), tf: LS(29), footer: "DAY 6 STARTS WITH YOUR CHOICE" }),
  },
};
