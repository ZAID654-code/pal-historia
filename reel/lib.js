const TL = window.TL, LN = TL.lines;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const eo = k => 1 - Math.pow(1 - clamp(k), 3);
const back = k => { k = clamp(k); const c = 2.2; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
const prog = (t, t0, d) => clamp((t - t0) / d);
const pop = (t, t0, d = 0.28) => t < t0 ? 0 : back(prog(t, t0, d));
const LS = i => LN[i].start, LE = i => LN[i].end, CS = (i, k) => LN[i].chunks[k].start;
const rnd = (() => { const a = []; let s = 7; for (let i = 0; i < 400; i++) { s = (s * 16807) % 2147483647; a.push(s / 2147483647); } return i => a[i % 400]; })();
const SKIN = "#f0b78c", HOOD = "#9d93b8", HAIR = "#3b2a22";
const COL = { y: "#ffd23c", g: "#7be04a", p: "#ff7ac0", b: "#5cc8ff", r: "#ff4a4a", o: "#ff9a2e" };

/* ---------- character ---------- */
function kevin(o) {
  const t = o.t || 0, e = o.expr || "neutral";
  const bob = Math.sin(t * 2.2) * 3;
  const aL = o.aL ?? 12, aR = o.aR ?? 12;
  const look = o.look || 0;
  const arm = (side, ang, held) => `
    <g transform="translate(${side * 112},${-292 + bob}) rotate(${-side * ang})">
      <rect class="o" x="-24" y="-8" width="48" height="92" rx="24" fill="${o.suit ? "#2c3344" : HOOD}"/>
      <rect class="o" x="-20" y="70" width="40" height="70" rx="20" fill="#f3a45a"/>
      <circle class="o" cx="0" cy="146" r="25" fill="#f39a45"/>
      <circle cx="-8" cy="118" r="5" fill="#d9641c"/><circle cx="9" cy="100" r="4" fill="#d9641c"/>
      ${held || ""}
    </g>`;
  const eyes = () => {
    const wide = e === "shock" ? 25 : 20, lid = e === "sad" || e === "dead" ? 1 : 0;
    const p = e === "shock" ? 5 : 8;
    return [-1, 1].map(s => `
      <circle class="o" cx="${s * 32}" cy="-398" r="${wide}" fill="#fff"/>
      <circle cx="${s * 32 + look * 8}" cy="${-396 + (e === "sad" ? 5 : 0)}" r="${p}" fill="#151515"/>
      ${lid ? `<path class="o" d="M${s * 32 - 20},-402 Q${s * 32},-418 ${s * 32 + 20},-402" fill="${SKIN}"/>` : ""}
      <path d="M${s * 32 - 16},-370 q16,10 32,0" stroke="#c98a63" stroke-width="4" fill="none"/>`).join("");
  };
  const mouth = {
    neutral: `<path class="o" d="M-22,-338 q22,10 44,0" fill="none"/>`,
    sad: `<path class="o" d="M-24,-330 q24,-16 48,0" fill="none"/>`,
    smug: `<path class="o" d="M-20,-340 q26,18 46,-6" fill="none"/>`,
    dead: `<path class="o" d="M-18,-334 h36" fill="none"/>`,
    shock: `<ellipse class="o" cx="0" cy="-332" rx="17" ry="22" fill="#5a1a1a"/>`,
    grin: `<path class="o" d="M-42,-352 q42,-8 84,0 q-4,40 -42,40 q-38,0 -42,-40Z" fill="${o.teeth || "#e2c94b"}"/>
           <path d="M-21,-354 v36 M0,-355 v42 M21,-354 v36 M-40,-336 h80" stroke="#151515" stroke-width="2.5"/>`,
    teeth: `<path class="o" d="M-36,-350 q36,-8 72,0 q-4,40 -36,40 q-32,0 -36,-40Z" fill="#5a1a1a"/>
            <path class="o" d="M-28,-348 h56 v13 h-56Z" fill="#e2c94b"/>
            <path d="M-14,-348 v13 M0,-348 v13 M14,-348 v13" stroke="#151515" stroke-width="3"/>
            <rect x="2" y="-347" width="10" height="11" fill="#7c8a2c"/>`,
  }[e];
  let stub = "";
  for (let i = 0; i < 46; i++) {
    const a = Math.PI * (0.08 + 0.84 * rnd(i)), r = 52 + rnd(i + 50) * 30;
    stub += `<path d="M${Math.cos(a) * r},${-378 + Math.sin(a) * r} l${rnd(i + 9) * 8 - 4},7" stroke="${HAIR}" stroke-width="3" stroke-linecap="round"/>`;
  }
  let flies = "";
  for (let i = 0; i < 3; i++) {
    const a = t * (2.4 + i * 0.7) + i * 2.1;
    flies += `<circle cx="${Math.cos(a) * (120 + i * 22)}" cy="${-330 - i * 60 + Math.sin(a * 1.7) * 28}" r="5" fill="#151515"/>`;
  }
  let stink = "";
  if (o.stink !== false) for (let i = 0; i < 3; i++) {
    const k = (t * 0.45 + i / 3) % 1, x = [-165, 168, -150][i], y = -210 - i * 55 - k * 90;
    stink += `<path d="M${x},${y} q14,-14 0,-28 q-14,-14 0,-28" stroke="#74b33c" stroke-width="6" fill="none" stroke-linecap="round" opacity="${0.8 * Math.sin(k * Math.PI)}"/>`;
  }
  const suit = o.suit ? `
    <path class="o" d="M-104,-306 Q-150,-240 -140,-178 L-52,-170 L-18,-296Z" fill="#2c3344"/>
    <path class="o" d="M104,-306 Q150,-240 140,-178 L52,-170 L18,-296Z" fill="#2c3344"/>
    <path class="o" d="M-10,-300 h20 l8,62 l-18,18 l-18,-18Z" fill="#b8323a"/>` : "";
  return `<g transform="translate(${o.x},${o.y}) scale(${(o.flip ? -1 : 1) * (o.s || 1)},${o.s || 1})" ${o.op != null ? `opacity="${o.op}"` : ""}>
    ${stink}
    <ellipse cx="0" cy="4" rx="150" ry="18" fill="#000" opacity=".22"/>
    <rect class="o" x="-80" y="-140" width="66" height="130" rx="14" fill="#6c7482"/>
    <rect class="o" x="14" y="-140" width="66" height="130" rx="14" fill="#6c7482"/>
    <circle cx="-52" cy="-70" r="7" fill="#c9b458"/><circle cx="50" cy="-40" r="6" fill="#8a5a2c"/>
    <ellipse class="o" cx="-50" cy="-8" rx="44" ry="16" fill="#efe7d2"/>
    <ellipse class="o" cx="50" cy="-8" rx="44" ry="16" fill="#efe7d2"/>
    <g transform="translate(0,${bob})">
      <ellipse class="o" cx="0" cy="-172" rx="128" ry="78" fill="${SKIN}"/>
      <circle cx="0" cy="-140" r="6" fill="#b9805c"/>
      <path d="M-40,-128 l4,8 M-20,-120 l3,8 M22,-122 l-3,8 M44,-130 l-4,8 M-60,-140 l3,8 M62,-142 l-3,8" stroke="${HAIR}" stroke-width="3" stroke-linecap="round"/>
      <path class="o" d="M-102,-306 Q-154,-240 -140,-182 Q0,-150 140,-182 Q154,-240 102,-306 Q0,-330 -102,-306Z" fill="${HOOD}"/>
      <circle cx="-50" cy="-240" r="15" fill="#e88a2a"/><circle cx="36" cy="-262" r="10" fill="#c23b2b"/>
      <ellipse cx="62" cy="-212" rx="20" ry="11" fill="#e88a2a"/><circle cx="-12" cy="-208" r="9" fill="#7a5a2e"/>
      <circle cx="-84" cy="-206" r="8" fill="#c23b2b"/>
      ${suit}
      ${o.extra || ""}
    </g>
    ${arm(-1, aL, o.heldL)}${arm(1, aR, o.heldR)}
    <g transform="translate(0,${bob * 1.3}) rotate(${o.tilt || 0},0,-320)">
      <circle class="o" cx="-86" cy="-382" r="17" fill="${SKIN}"/><circle class="o" cx="86" cy="-382" r="17" fill="${SKIN}"/>
      <circle class="o" cx="0" cy="-385" r="88" fill="${SKIN}"/>
      <path d="M-70,-352 Q-60,-300 0,-296 Q60,-300 70,-352 Q40,-318 0,-318 Q-40,-318 -70,-352Z" fill="${HAIR}" opacity=".28"/>
      ${stub}
      <path class="o" d="M-90,-410 L-112,-452 L-80,-446 L-88,-492 L-52,-466 L-40,-512 L-12,-474 L14,-520 L30,-474 L62,-506 L64,-462 L104,-474 L86,-434 L116,-420 L88,-404 Q60,-450 0,-452 Q-60,-450 -90,-410Z" fill="${HAIR}"/>
      ${eyes()}
      <path class="o" d="M-56,-${e === "shock" ? 440 : 428} q28,${e === "sad" ? -14 : 10} 56,4 q28,6 56,-4" fill="none" stroke-width="9" stroke="${HAIR}"/>
      <path class="o" d="M-6,-384 q-10,24 8,26" fill="none"/>
      ${mouth}
      <circle cx="-58" cy="-362" r="${6 + (o.zit || 0)}" fill="#e0483c"/><circle cx="54" cy="-350" r="${5 + (o.zit || 0)}" fill="#e0483c"/>
      <circle cx="-34" cy="-440" r="${4 + (o.zit || 0)}" fill="#e0483c"/><circle cx="66" cy="-372" r="${4 + (o.zit || 0)}" fill="#e0483c"/>
      <circle cx="20" cy="-436" r="${3 + (o.zit || 0)}" fill="#e0483c"/>
      ${o.head || ""}
    </g>
    ${o.noFlies ? "" : flies}
  </g>`;
}

const controller = `<g transform="translate(0,150) rotate(90)"><rect class="o" x="-40" y="-22" width="80" height="44" rx="20" fill="#2b2f3a"/>
  <circle cx="-18" cy="0" r="8" fill="#5cc8ff"/><circle cx="16" cy="-6" r="5" fill="#ff4a4a"/><circle cx="24" cy="6" r="5" fill="#7be04a"/></g>`;
const phoneHeld = `<g transform="translate(0,150)"><rect class="o" x="-22" y="-40" width="44" height="76" rx="8" fill="#fff"/><rect x="-16" y="-30" width="32" height="50" fill="#cfe6ff"/></g>`;

/* ---------- shared bits ---------- */
function hud(days = 30, pct = 0) {
  return `<g class="ui">
    <rect x="28" y="140" width="96" height="78" rx="10" fill="#101014" opacity=".92"/>
    <text class="ui" x="76" y="162" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">DAYS LEFT</text>
    <text x="76" y="208" text-anchor="middle" font-size="42" fill="${COL.y}">${days}</text>
    <rect x="134" y="140" width="330" height="78" rx="10" fill="#101014" opacity=".92"/>
    <text class="ui" x="299" y="162" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">GLOW-UP</text>
    <text x="299" y="204" text-anchor="middle" font-size="36" fill="${COL.g}">${Math.round(pct)}%</text>
    <rect x="150" y="208" width="298" height="5" rx="2" fill="#333"/><rect x="150" y="208" width="${298 * pct / 100}" height="5" rx="2" fill="${COL.g}"/>
  </g>`;
}
function caption(t, y, size = 62) {
  let cur = null;
  for (const l of LN) for (let k = 0; k < l.chunks.length; k++) {
    const c = l.chunks[k], end = k + 1 < l.chunks.length ? l.chunks[k + 1].start : l.end + 0.45;
    if (t >= c.start && t < end) cur = c;
  }
  if (!cur) return "";
  const s = 0.82 + 0.18 * back(prog(t, cur.start, 0.14));
  const spans = cur.text.replace(/&/g, "&amp;").split(/(\[\w:[^\]]+\])/).filter(Boolean).map(p => {
    const m = p.match(/^\[(\w):([^\]]+)\]$/);
    return m ? `<tspan fill="${COL[m[1]]}">${m[2]}</tspan>` : `<tspan fill="#fff">${p}</tspan>`;
  }).join("");
  return `<g transform="translate(360,${y}) scale(${s})"><text xml:space="preserve" text-anchor="middle" font-size="${size}" stroke="#0a0a0a" stroke-width="14" stroke-linejoin="round" paint-order="stroke" letter-spacing="1">${spans}</text></g>`;
}
const sticker = (x, y, txt, bg, k, rot = -6, fs = 40, fg = "#151515") => k <= 0 ? "" :
  `<g transform="translate(${x},${y}) rotate(${rot}) scale(${k})"><rect class="o" x="${-txt.length * fs * 0.27 - 22}" y="${-fs * 0.75}" width="${txt.length * fs * 0.54 + 44}" height="${fs * 1.45}" rx="8" fill="${bg}"/>
   <text text-anchor="middle" y="${fs * 0.36}" font-size="${fs}" fill="${fg}">${txt}</text></g>`;

/* ---------- scenes ---------- */
function roomBg(t) {
  let trash = "";
  for (let i = 0; i < 26; i++) trash += `<rect x="${rnd(i) * 700}" y="${1075 + rnd(i + 30) * 190}" width="${8 + rnd(i + 3) * 14}" height="6" fill="${["#e8c34a", "#d9534a", "#7be04a", "#fff"][i % 4]}" transform="rotate(${rnd(i + 5) * 60 - 30},${rnd(i) * 700},1100)"/>`;
  let stars = "";
  for (let i = 0; i < 30; i++) stars += `<circle cx="${262 + rnd(i + 80) * 190}" cy="${262 + rnd(i + 120) * 150}" r="2" fill="#fff" opacity="${0.4 + 0.6 * rnd(i)}"/>`;
  const plant = (x) => `<g transform="translate(${x},770)"><path class="o" d="M-26,0 h52 l-8,54 h-36Z" fill="#b5653a"/>
    <path d="M0,0 q-34,-30 -46,24 M0,0 q30,-40 48,18 M0,0 q-6,-46 -22,-14" stroke="#7a6a2e" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  return `<rect width="720" height="1280" fill="#1c2452"/>
    <rect class="o" x="60" y="250" width="110" height="150" fill="#2a5fd0"/><circle cx="115" cy="310" r="28" fill="#ffd23c"/>
    <rect class="o" x="252" y="250" width="210" height="170" fill="#0b0f24"/>${stars}
    <rect class="o" x="545" y="250" width="110" height="150" fill="#b8323a"/><path d="M600,285 l34,62 h-68Z" fill="#ffd23c"/>
    <rect y="1020" width="720" height="260" fill="#4a3528"/>
    <rect class="o" x="-10" y="800" width="190" height="230" rx="14" fill="#565c9a"/><rect class="o" x="-10" y="770" width="120" height="60" rx="20" fill="#e6e6ee"/>
    <rect class="o" x="470" y="822" width="270" height="20" fill="#7a5236"/><rect class="o" x="500" y="842" width="18" height="190" fill="#7a5236"/>
    <rect class="o" x="560" y="690" width="170" height="112" rx="6" fill="#18a36a"/><path d="M572,790 l40,-50 l30,30 l40,-56 l36,76Z" fill="#0d6f47"/>
    <rect class="o" x="634" y="802" width="20" height="20" fill="#333"/>
    ${plant(210)}${plant(505)}
    <g transform="translate(120,1130) rotate(-8)"><rect class="o" x="-70" y="-10" width="140" height="26" fill="#d8b98a"/><text x="0" y="12" text-anchor="middle" font-size="18" fill="#b8323a">PIZZA</text></g>
    <rect class="o" x="560" y="1100" width="34" height="56" rx="6" fill="#d9534a"/><rect class="o" x="610" y="1140" width="56" height="30" rx="6" fill="#5cc8ff" transform="rotate(20,638,1155)"/>
    ${trash}`;
}

function sRoom(t) {
  const zoom = t > LS(2) && t < LS(4) ? 1 + 0.14 * eo(prog(t, LS(2), 0.3)) : 1 + 0.14 * (1 - eo(prog(t, LS(4), 0.3))) * (t >= LS(4) ? 1 : 0);
  let o = { x: 360, y: 1075, s: 1.12, t, heldR: controller, aL: 12, aR: 12 };
  if (t > LS(3) && t < LS(4)) { o.expr = "dead"; o.tilt = Math.sin(t * 9) * 3; }
  if (t > LS(4) && t < LS(5)) { o.aL = 95 + Math.sin(t * 24) * 6; o.aR = 95 - Math.sin(t * 24) * 6; o.expr = "smug"; }
  if (t > LS(5) && t < LS(6)) { o.aL = 150 * eo(prog(t, LS(5), 0.25)); o.expr = "smug"; }
  if (t > LS(6)) o.expr = "sad";
  const banner = t < LS(2) ? `<g transform="translate(360,258) scale(${pop(t, 0.05)})">
      <path class="o" d="M-250,-34 h500 l-22,34 l22,34 h-500 l22,-34Z" fill="${COL.y}"/>
      <text text-anchor="middle" y="15" font-size="42" fill="#151515">30 DAYS TO THE WEDDING</text></g>` : "";
  const drip = t > LS(5) && t < LS(6) ? [0, 1, 2].map(i => { const k = ((t - LS(5)) * 1.3 + i / 3) % 1; return `<ellipse cx="${205 - i * 16}" cy="${640 + k * 150}" rx="6" ry="10" fill="#f39a45" opacity="${1 - k}"/>`; }).join("") : "";
  const rip = sticker(210, 690, "R.I.P.", "#e6e6ee", pop(t, CS(6, 1)), -8, 30) + sticker(505, 690, "R.I.P.", "#e6e6ee", pop(t, CS(6, 1) + 0.15), 8, 30);
  return `<g transform="translate(360,640) scale(${zoom}) translate(-360,-640)">${roomBg(t)}${kevin(o)}${drip}${rip}</g>${banner}`;
}

function sRoom2(t) {
  const sh = t < LS(13);
  const o = { x: 360, y: 1075, s: 1.12, t, expr: sh ? "shock" : "sad", heldR: phoneHeld,
    aL: sh ? 20 : 70 * eo(prog(t, LS(13), 0.25)), aR: sh ? 60 : 70 * eo(prog(t, LS(13), 0.25)),
    tilt: sh ? Math.sin(t * 30) * 2 : 0 };
  return roomBg(t) + kevin(o);
}

function phone(t, inner, t0) {
  const y = lerp(260, 0, eo(prog(t, t0, 0.35)));
  return `<defs><radialGradient id="pg"><stop offset="0" stop-color="#4a1d6e"/><stop offset="1" stop-color="#160b26"/></radialGradient>
    <clipPath id="scr"><rect x="150" y="270" width="420" height="800" rx="44"/></clipPath></defs>
    <rect width="720" height="1280" fill="#160b26"/><ellipse cx="360" cy="670" rx="420" ry="560" fill="url(#pg)"/>
    <g transform="translate(0,${y})">
      <rect x="138" y="258" width="444" height="824" rx="56" fill="#111"/>
      <rect x="150" y="270" width="420" height="800" rx="44" fill="#fff"/>
      <g clip-path="url(#scr)" class="ui">
        <rect x="150" y="270" width="420" height="120" fill="#f3f3f6"/>
        <rect x="300" y="282" width="120" height="26" rx="13" fill="#111"/>
        <circle cx="200" cy="350" r="24" fill="#ff5fa8"/><text class="ui" x="200" y="359" text-anchor="middle" font-size="24" font-weight="800" fill="#fff">E</text>
        <text class="ui" x="236" y="${t > (window.SUBT ?? LS(10)) ? 346 : 358}" font-size="24" font-weight="800" fill="#111">EMILY</text>
        ${t > (window.SUBT ?? LS(10)) ? `<text class="ui" x="236" y="372" font-size="17" font-weight="800" fill="#ff5fa8">${window.SUBTXT || "Bridesmaid · the wedding"}</text>` : ""}
        <text class="ui" x="360" y="420" text-anchor="middle" font-size="14" fill="#9a9aa5">Today 9:41 PM</text>
        ${inner}
      </g>
    </g>`;
}
const bubbleIn = k => k <= 0 ? "" : `<g transform="translate(172,440) scale(${k})"><rect width="300" height="112" rx="24" fill="#e9e9ee"/>
  <text class="ui" font-size="20" fill="#111"><tspan x="20" y="36">omg kevin!! heard you're</tspan><tspan x="20" y="64">coming to the wedding.</tspan><tspan x="20" y="92">save me a dance :)</tspan></text></g>`;

function sPhone1(t) {
  let prints = "";
  [[250, 700, -20], [420, 800, 15], [300, 900, 30], [450, 640, -35]].forEach(([x, y, r], i) => {
    const k = pop(t, CS(11, 2) + i * 0.28, 0.2);
    if (k > 0) prints += `<g transform="translate(${x},${y}) rotate(${r}) scale(${k})"><ellipse rx="34" ry="46" fill="#f39a45" opacity=".85"/>
      <path d="M-20,-12 q20,-22 40,0 M-22,6 q22,-22 44,0 M-18,24 q18,-18 36,0" stroke="#d9641c" stroke-width="4" fill="none"/></g>`;
  });
  return phone(t, bubbleIn(pop(t, LS(7) + 0.5)) + prints, LS(7) - 0.25);
}

function sPhone2(t) {
  const full = "hey emily!! so honestly i have been meaning to";
  let typed = "";
  if (t >= LS(44) && t < LS(45)) typed = full.slice(0, Math.floor(prog(t, LS(44), 1.0) * full.length));
  else if (t >= LS(45) && t < LS(46)) typed = full.slice(0, Math.floor((1 - prog(t, LS(45), 0.5)) * full.length));
  else if (t >= LS(46) && t < LS(48) - 0.25) typed = "hey so".slice(0, Math.floor(prog(t, LS(46), 0.55) * 6));
  const shown = typed.length > 30 ? "…" + typed.slice(-29) : typed;
  const cursor = Math.floor(t * 2.5) % 2 ? "|" : "";
  const sent = pop(t, LS(48) - 0.25), rep = pop(t, LE(48) + 0.55);
  const thumb = sent <= 0 ? "" : `<g transform="translate(540,620) scale(${sent})"><rect x="-96" y="-44" width="96" height="88" rx="24" fill="#1d8bff"/>
    <g transform="translate(-48,2)" fill="#ffd23c" stroke="#151515" stroke-width="3" stroke-linejoin="round">
      <rect x="-24" y="-4" width="14" height="28" rx="3"/><path d="M-8,-4 l10,-22 q10,0 8,12 l-2,8 h16 q8,2 6,10 l-6,18 q-2,4 -8,4 h-24Z"/></g></g>`;
  const reply = rep <= 0 ? "" : `<g transform="translate(172,690) scale(${rep})"><rect width="130" height="54" rx="24" fill="#e9e9ee"/><text class="ui" x="22" y="35" font-size="20" fill="#111">haha ok</text></g>`;
  const input = `<rect x="170" y="990" width="380" height="52" rx="26" fill="#fff" stroke="#c9c9d2" stroke-width="2"/>
    <text class="ui" x="192" y="1023" font-size="19" fill="${typed ? "#111" : "#b0b0bb"}">${typed ? shown + cursor : "iMessage"}</text>
    <circle cx="522" cy="1016" r="18" fill="${typed ? "#1d8bff" : "#c9c9d2"}"/><path d="M522,1024 v-16 m-7,7 l7,-7 l7,7" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return phone(t, bubbleIn(1) + thumb + reply + input, LS(42) - 0.25);
}

function sMirror(t) {
  const close = t >= LS(16) - 0.15;
  let tiles = "";
  for (let i = 0; i < 12; i++) tiles += `<path d="M${i * 60},0 v1280 M0,${i * 110} h720" stroke="#a9d6cf" stroke-width="3"/>`;
  const wall = `<rect width="720" height="1280" fill="#c4e8e2"/>${tiles}`;
  if (!close) {
    return `${wall}<rect y="1040" width="720" height="240" fill="#e8e6e1"/>
      <rect class="o" x="210" y="330" width="300" height="330" rx="10" fill="#e9f7fb"/><path d="M240,370 l60,-20 M250,410 l90,-30" stroke="#fff" stroke-width="8"/>
      <rect class="o" x="180" y="720" width="360" height="40" rx="8" fill="#fff"/><rect class="o" x="210" y="760" width="300" height="290" fill="#d9c7a6"/>
      <rect class="o" x="348" y="680" width="24" height="42" rx="6" fill="#aab"/>
      ${kevin({ x: 360, y: 1085, s: 1.05, t, expr: "neutral", aR: t > LS(15) ? 150 * eo(prog(t, LS(15), 0.25)) : 12, aL: 12 })}`;
  }
  let o = { x: 360, y: 1530, s: 2.0, t, expr: "neutral", stink: false };
  let extra = "";
  if (t >= LS(16) && t < LS(17)) o.expr = "teeth";
  if (t >= LS(17) && t < LS(18)) o.zit = 3 + Math.sin(t * 14) * 2.5;
  if (t >= LS(18) && t < LS(19)) {
    const k = eo(prog(t, CS(18, 1), 0.3));
    [[-150, -60, 205], [150, -60, -25], [0, 120, 90]].forEach(([dx, dy, r], i) =>
      extra += `<g transform="translate(${360 + dx * (0.7 + 0.3 * k)},${880 + dy * (0.7 + 0.3 * k)}) rotate(${r}) scale(${pop(t, CS(18, 1) + i * 0.12)})"><path class="o" d="M-40,-12 h50 v-16 l36,28 l-36,28 v-16 h-50Z" fill="${COL.b}"/></g>`);
  }
  if (t >= LS(19)) { o.expr = t >= LS(20) ? "sad" : "shock"; }
  let cracks = "";
  if (t >= CS(19, 1)) {
    const k = eo(prog(t, CS(19, 1), 0.35));
    const paths = ["M380,520 L300,410 L330,330 L250,240", "M380,520 L470,430 L450,330 L560,260", "M380,520 L250,580 L180,560 L110,640", "M380,520 L500,610 L590,590 L640,700", "M380,520 L360,680 L420,760", "M300,410 L210,400", "M470,430 L560,440"];
    cracks = paths.map(p => `<path d="${p}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - k}" stroke="#fff" stroke-width="7" fill="none" stroke-linejoin="bevel"/><path d="${p}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - k}" stroke="#35505a" stroke-width="2.5" fill="none"/>`).join("");
    const sh = (1 - k) * 8;
    cracks = `<g transform="translate(${Math.sin(t * 90) * sh},0)">${cracks}</g>`;
  }
  return `${wall}<defs><clipPath id="mc"><rect x="70" y="250" width="580" height="800" rx="12"/></clipPath></defs>
    <rect class="o" x="58" y="238" width="604" height="824" rx="18" fill="#8fa3a8"/>
    <rect x="70" y="250" width="580" height="800" rx="12" fill="#e2f4f8"/>
    <g clip-path="url(#mc)">${kevin(o)}${cracks}</g>${extra}
    <rect y="1090" width="720" height="190" fill="#d9c7a6"/><rect class="o" x="-10" y="1070" width="740" height="30" fill="#fff"/>`;
}

function sCloset(t) {
  const worn = t >= LS(24) - 0.1;
  const hang = x => `<path d="M${x},400 v22 l-40,30 h80 l-40,-30" stroke="#777" stroke-width="5" fill="none"/>`;
  const glow = t > LS(23) && !worn ? `<circle cx="520" cy="560" r="${120 + Math.sin(t * 10) * 10}" fill="#ffd23c" opacity=".28"/>` : "";
  const suitHang = worn ? "" : `<g transform="translate(520,452)"><path class="o" d="M-56,0 l56,-16 l56,16 l10,190 h-132Z" fill="#2c3344"/><path class="o" d="M-8,-10 h16 l6,50 l-14,14 l-14,-14Z" fill="#b8323a"/></g>`;
  const bt = t - (LS(26) + 0.15);
  const strain = worn && bt < 0 && t > LS(25) ? [-1, 1].map(s => `<path d="M${s * 16},-208 l${s * (14 + Math.sin(t * 40) * 5)},-6 M${s * 16},-196 l${s * (14 + Math.sin(t * 40 + 1) * 5)},6" stroke="#fff" stroke-width="4"/>`).join("") : "";
  const btn = worn && bt < 0 ? `<circle class="o" cx="${Math.sin(t * 50) * (t > LS(25) ? 3 : 0)}" cy="-202" r="12" fill="#d9a441"/>${strain}` : "";
  const fly = bt >= 0 ? `<g transform="translate(${360 + bt * 330},${858 - bt * 900 + bt * bt * 900}) rotate(${bt * 900})"><circle class="o" r="15" fill="#d9a441"/><circle cx="-4" r="2.5" fill="#151515"/><circle cx="4" r="2.5" fill="#151515"/></g>` : "";
  const o = { x: worn ? 330 : 250, y: 1085, s: 1.1, t, suit: worn, extra: btn,
    expr: bt >= 0 ? "shock" : worn ? "smug" : "neutral", look: worn ? 0 : 1, aR: worn ? 12 : 40, aL: 12 };
  const sc = worn ? 0.9 + 0.1 * back(prog(t, LS(24) - 0.1, 0.25)) : 1;
  return `<rect width="720" height="1280" fill="#e9dcc0"/><rect y="1040" width="720" height="240" fill="#a07a55"/>
    <rect class="o" x="380" y="330" width="300" height="730" fill="#7a5236"/><rect x="396" y="346" width="268" height="698" fill="#3d2a1c"/>
    <path d="M396,400 h268" stroke="#999" stroke-width="6"/>${hang(450)}${hang(600)}${worn ? hang(520) : ""}${glow}${suitHang}
    <rect class="o" x="664" y="330" width="60" height="730" fill="#8f623f"/><rect class="o" x="330" y="330" width="52" height="730" fill="#8f623f"/>
    <g transform="translate(${o.x},1085) scale(${sc}) translate(${-o.x},-1085)">${kevin(o)}</g>
    ${sticker(560, 520, "EST. 2014", "#fff", worn ? pop(t, LS(24)) : 0, 8, 34)}
    ${fly}${sticker(540, 420, "I QUIT.", COL.y, pop(t, LS(26) + 0.3), 7, 64)}`;
}

function city(t, sky = "#6fc3f7") {
  let b = "";
  const cols = ["#b06fd8", "#f2c94c", "#e2574c", "#4fb7a5", "#f08a4b", "#7d8bd8"];
  for (let i = 0; i < 7; i++) {
    const x = i * 108 - 20, h = 260 + rnd(i + 200) * 200;
    b += `<rect class="o" x="${x}" y="${900 - h}" width="104" height="${h}" fill="${cols[i % 6]}"/>`;
    for (let r = 0; r < Math.floor(h / 60) - 1; r++) for (let c = 0; c < 3; c++) b += `<rect x="${x + 14 + c * 28}" y="${900 - h + 20 + r * 56}" width="18" height="30" fill="#fff" opacity=".85"/>`;
  }
  return `<rect width="720" height="1280" fill="${sky}"/>${b}
    <rect y="900" width="720" height="110" fill="#b8b8b8"/><rect y="1010" width="720" height="270" fill="#55585e"/>
    <path d="M0,1170 h720" stroke="#ffd23c" stroke-width="8" stroke-dasharray="70 50"/>`;
}

function sStreet(t) {
  const hide = eo(prog(t, LS(29), 0.7));
  const sunE = t > LS(28);
  const sun = `<g transform="translate(590,320)"><circle class="o" r="62" fill="#ffd23c"/>
    <circle cx="-22" cy="-10" r="${sunE ? 13 : 7}" fill="#fff" class="o"/><circle cx="22" cy="-10" r="${sunE ? 13 : 7}" fill="#fff" class="o"/>
    <circle cx="-24" cy="-6" r="5" fill="#151515"/><circle cx="20" cy="-6" r="5" fill="#151515"/>
    ${sunE ? `<ellipse class="o" cx="0" cy="28" rx="12" ry="15" fill="#7a3a1a"/>` : `<path class="o" d="M-22,20 q22,20 44,0" fill="none"/>`}</g>`;
  const cloud = `<g transform="translate(${lerp(900, 590, hide)},330)"><path class="o" d="M-130,40 q-40,-60 30,-70 q30,-70 100,-30 q70,-20 70,50 q30,50 -40,50 h-200 q-40,0 -30,-50Z" fill="#fff"/></g>`;
  const pk = eo(prog(t, LS(30), 0.55)), landed = t > LS(30) + 0.55;
  const px = lerp(-80, 360, pk), py = lerp(300, 505, pk) - Math.sin(pk * Math.PI) * 80;
  const flap = landed ? 0 : Math.sin(t * 40) * 30;
  const pigeon = t < LS(30) ? "" : `<g transform="translate(${px},${py})"><path class="o" d="M-40,0 q0,-36 44,-34 q30,2 30,26 q-10,22 -44,20 l-40,10Z" fill="#9aa3b5"/>
    <path class="o" d="M-10,-20 q-20,${-40 - flap} -50,${-20 - flap} q20,20 50,20Z" fill="#7b8498"/>
    <circle class="o" cx="30" cy="-34" r="18" fill="#9aa3b5"/><circle cx="36" cy="-38" r="4" fill="#151515"/><path class="o" d="M46,-32 l18,4 l-18,6Z" fill="#f08a4b"/>
    <path d="M-6,14 v14 M10,14 v14" stroke="#f08a4b" stroke-width="5"/></g>`;
  const statue = t > LS(31);
  const o = { x: 360, y: 1085, s: 1.1, t: statue ? 0 : t, expr: statue ? "dead" : t > LS(29) ? "sad" : "neutral", noFlies: statue };
  const plaque = sticker(360, 1128, "STATUE (PROBABLY)", "#c9b458", pop(t, CS(31, 1)), 0, 26);
  const splat = t > LS(33) ? `<g transform="translate(455,770) scale(${pop(t, LS(33), 0.15)})"><path class="o" d="M-26,-8 q10,-24 30,-10 q26,-4 20,18 q4,26 -22,18 q-30,6 -28,-26Z" fill="#fff"/></g>` : "";
  const rk = pop(t, LS(32) + 0.2);
  const review = rk <= 0 ? "" : `<g transform="translate(360,350) rotate(-4) scale(${rk})"><rect class="o" x="-230" y="-80" width="460" height="160" rx="18" fill="#fff"/>
    <text class="ui" x="-205" y="-38" font-size="22" font-weight="800" fill="#555">pigeon_1 left a review</text>
    ${[0, 1, 2, 3, 4].map(i => `<path transform="translate(${-170 + i * 62},18) scale(1.5)" d="M0,-18 l5,12 l13,1 l-10,9 l3,13 l-11,-7 l-11,7 l3,-13 l-10,-9 l13,-1Z" fill="${i === 0 ? "#ffb400" : "#ddd"}" stroke="#151515" stroke-width="2"/>`).join("")}
    <text class="ui" x="160" y="30" font-size="22" font-weight="600" fill="#555" text-anchor="middle">"smells."</text></g>`;
  return `${city(t, hide > 0.5 ? "#8fb4cc" : "#6fc3f7")}${sun}${cloud}
    <g ${statue ? 'style="filter:saturate(.35)"' : ""}>${kevin(o)}</g>${pigeon}${splat}${plaque}${review}`;
}

function barberMan(t, mode) {
  const armR = mode === "scissors" ? 150 : mode === "call" ? 160 : 10;
  const ex = mode === "hair" ? 1 : mode === "scissors" ? -0.2 : 0, ey = mode === "hair" ? -1 : mode === "scissors" ? -1 : 0;
  const held = mode === "scissors" ? `<g transform="translate(0,150) rotate(180)"><path d="M-6,0 l-8,-44 M6,0 l8,-44" stroke="#c9ced6" stroke-width="7" stroke-linecap="round"/><circle cx="-8" cy="8" r="9" fill="none" stroke="#151515" stroke-width="5"/><circle cx="8" cy="8" r="9" fill="none" stroke="#151515" stroke-width="5"/></g>`
    : mode === "call" ? `<g transform="translate(0,150)"><rect class="o" x="-16" y="-34" width="32" height="60" rx="6" fill="#222"/></g>` : "";
  return `<g transform="translate(180,1085) scale(1.1)">
    <ellipse cx="0" cy="4" rx="100" ry="14" fill="#000" opacity=".2"/>
    <rect class="o" x="-50" y="-190" width="42" height="184" rx="10" fill="#2b2f3a"/><rect class="o" x="8" y="-190" width="42" height="184" rx="10" fill="#2b2f3a"/>
    <ellipse class="o" cx="-30" cy="-6" rx="34" ry="13" fill="#111"/><ellipse class="o" cx="30" cy="-6" rx="34" ry="13" fill="#111"/>
    <path class="o" d="M-70,-390 q-14,120 -4,210 h148 q10,-90 -4,-210 q-70,-20 -140,0Z" fill="#fff"/>
    <path d="M0,-396 v214" stroke="#151515" stroke-width="4"/><rect class="o" x="18" y="-330" width="34" height="30" fill="#5cc8ff"/>
    <g transform="translate(-74,-374) rotate(8)"><rect class="o" x="-18" y="0" width="36" height="150" rx="18" fill="#fff"/><circle class="o" cx="0" cy="156" r="19" fill="#d9a27a"/></g>
    <g transform="translate(74,-374) rotate(${-armR})"><rect class="o" x="-18" y="0" width="36" height="150" rx="18" fill="#fff"/><circle class="o" cx="0" cy="156" r="19" fill="#d9a27a"/>${held}</g>
    <circle class="o" cx="0" cy="-455" r="64" fill="#d9a27a"/>
    <path class="o" d="M-62,-470 q0,-66 62,-66 q62,0 62,66 q-30,-30 -62,-28 q-32,-2 -62,28Z" fill="#222"/>
    <circle class="o" cx="-22" cy="-458" r="14" fill="#fff"/><circle class="o" cx="26" cy="-458" r="14" fill="#fff"/>
    <circle cx="${-22 + ex * 6}" cy="${-458 + ey * 6}" r="5" fill="#151515"/><circle cx="${26 + ex * 6}" cy="${-458 + ey * 6}" r="5" fill="#151515"/>
    <path class="o" d="M-34,-428 q34,-20 68,0 q-34,14 -68,0Z" fill="#222"/>
    ${mode === "call" ? `<ellipse class="o" cx="2" cy="-408" rx="10" ry="8" fill="#5a1a1a"/>` : `<path class="o" d="M-12,-410 h26" fill="none"/>`}
  </g>`;
}

function sBarber(t) {
  let stripes = "";
  for (let i = 0; i < 9; i++) stripes += `<rect x="${i * 80}" y="0" width="40" height="1040" fill="#e6f1ef"/>`;
  const mode = t >= LS(38) ? "call" : t >= LS(37) ? "scissors" : t >= LS(36) ? "hair" : "idle";
  const pole = `<g transform="translate(650,430)"><rect class="o" x="-22" y="-110" width="44" height="220" rx="10" fill="#fff"/>
    ${[0, 1, 2, 3, 4].map(i => { const y = -110 + ((i * 50 + t * 60) % 220); return `<path d="M-20,${y} l40,-22 v16 l-40,22Z" fill="${i % 2 ? "#e2574c" : "#2a5fd0"}" opacity="${y > -100 && y < 96 ? 1 : 0}"/>`; }).join("")}
    <circle class="o" cy="-122" r="20" fill="#c9ced6"/><circle class="o" cy="122" r="20" fill="#c9ced6"/></g>`;
  const siren = mode === "call" ? `<circle cx="360" cy="340" r="${150 + Math.sin(t * 16) * 40}" fill="#ff4a4a" opacity="${0.18 + 0.14 * Math.sin(t * 16)}"/>
    <g transform="translate(360,340)"><path class="o" d="M-38,30 v-30 q0,-40 38,-40 q38,0 38,40 v30Z" fill="#ff4a4a"/><rect class="o" x="-50" y="30" width="100" height="18" fill="#333"/></g>` : "";
  const o = { x: 480, y: 1085, s: 1.1, t, expr: mode === "idle" ? "smug" : mode === "call" ? "shock" : "neutral", look: -1,
    head: mode === "hair" ? `<g transform="translate(0,-520)"><path d="M-60,0 q-10,-30 10,-40 M0,-8 q0,-34 16,-40 M60,0 q14,-26 -4,-42" stroke="#74b33c" stroke-width="6" fill="none" stroke-linecap="round" opacity="${0.5 + 0.5 * Math.sin(t * 8)}"/></g>` : "" };
  const bubble = pop(t, CS(38, 1));
  const call = bubble <= 0 ? "" : `<g transform="translate(250,470) scale(${bubble})"><path class="o" d="M-150,-60 h300 v110 h-190 l-50,40 l10,-40 h-70Z" fill="#fff"/>
    <text text-anchor="middle" y="14" font-size="44" fill="#e2574c">SEND EVERYONE.</text></g>`;
  return `<rect width="720" height="1280" fill="#cfe5e1"/>${stripes}<rect y="1040" width="720" height="240" fill="#3a3f4a"/>
    <path d="M0,1040 h720" stroke="#151515" stroke-width="5"/>
    <rect class="o" x="250" y="250" width="220" height="60" rx="10" fill="#151515"/><text x="360" y="295" text-anchor="middle" font-size="40" fill="#fff">SHARP CUTS</text>
    ${siren}${pole}${barberMan(t, mode)}${kevin(o)}${call}`;
}

function sWindow(t) {
  const away = t - LS(41);
  const rx = away > 0.35 ? 470 + (away - 0.35) * 420 : 470;
  const turned = away > 0;
  const refl = kevin({ x: rx, y: 1050, s: 0.92, t: t + 1, flip: !turned, expr: turned ? "dead" : "neutral", stink: false, noFlies: true, look: turned ? 0 : 1 });
  const o = { x: 205, y: 1105, s: 1.05, t, look: 1, expr: away > 0.5 ? "sad" : t > LS(40) ? "smug" : "neutral" };
  return `<rect width="720" height="1280" fill="#e58c5a"/>
    <rect class="o" x="-10" y="230" width="740" height="110" fill="#b8323a"/><text x="360" y="308" text-anchor="middle" font-size="58" fill="#fff">MENSWEAR</text>
    <defs><clipPath id="wc"><rect x="300" y="390" width="400" height="660"/></clipPath>
    <linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe9f7"/><stop offset="1" stop-color="#7fb6cf"/></linearGradient></defs>
    <rect class="o" x="288" y="378" width="424" height="684" fill="#5a3a26"/><rect x="300" y="390" width="400" height="660" fill="url(#gl)"/>
    <g clip-path="url(#wc)"><g opacity=".55">${refl}</g>
      <path d="M330,390 l-80,660 M420,390 l-60,660" stroke="#fff" stroke-width="26" opacity=".25"/></g>
    ${sticker(600, 450, "SALE", COL.y, 1, 8, 34)}
    <rect y="1060" width="720" height="220" fill="#b8b8b8"/><path d="M0,1060 h720" stroke="#151515" stroke-width="5"/>
    ${kevin(o)}
    ${away > 0.5 ? `<text class="ui" x="${Math.min(rx, 600)}" y="560" text-anchor="middle" font-size="34" font-weight="800" fill="#fff" stroke="#151515" stroke-width="6" paint-order="stroke">nope.</text>` : ""}`;
}

function sVote(t) {
  const dumbbell = `<g transform="translate(0,150)"><rect class="o" x="-50" y="-7" width="100" height="14" fill="#888"/><rect class="o" x="-64" y="-26" width="22" height="52" rx="5" fill="#333"/><rect class="o" x="42" y="-26" width="22" height="52" rx="5" fill="#333"/></g>`;
  const comb = `<g transform="translate(0,150) rotate(180)"><rect class="o" x="-10" y="0" width="20" height="80" rx="4" fill="#5cc8ff"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M10,${12 + i * 11} h16" stroke="#151515" stroke-width="4"/>`).join("")}</g>`;
  const g = pop(t, LS(52)), h = pop(t, LS(53)), v = pop(t, LS(56) - 0.1);
  const lift = Math.sin(t * 5) * 25;
  const title = (x, k, txt, col, a, b) => k <= 0 ? "" : `<g transform="translate(${x},400) scale(${k})"><text text-anchor="middle" font-size="76" fill="${col}" stroke="#0a0a0a" stroke-width="10" paint-order="stroke">${txt}</text>
    <text class="ui" text-anchor="middle" y="36" font-size="17" font-weight="800" fill="#fff">${a}</text><text class="ui" text-anchor="middle" y="58" font-size="17" font-weight="800" fill="#fff">${b}</text></g>`;
  return `<rect width="360" height="1280" fill="#4a1414"/><rect x="360" width="360" height="1280" fill="#123d22"/>
    <path d="M360,0 v1280" stroke="${COL.y}" stroke-width="4"/>
    <text x="360" y="300" text-anchor="middle" font-size="44" fill="${COL.y}" stroke="#0a0a0a" stroke-width="8" paint-order="stroke">COMMENT ONE WORD</text>
    ${title(180, g, "GYM", COL.y, "LIFT SOMETHING.", "ANYTHING.")}${title(540, h, "HAIRCUT", COL.b, "FIRST ONE", "SINCE 2019.")}
    ${kevin({ x: 180, y: 980, s: 0.72, t, heldR: dumbbell, aR: 120 + lift, expr: "sad" })}
    ${kevin({ x: 540, y: 980, s: 0.72, t: t + 2, heldR: comb, aR: 158, expr: "smug" })}
    ${v <= 0 ? "" : `<g transform="translate(360,1030) scale(${v * (1 + 0.05 * Math.sin(t * 9))})"><rect class="o" x="-130" y="-34" width="260" height="68" rx="14" fill="${COL.y}"/><text text-anchor="middle" y="16" font-size="42" fill="#151515">VOTE NOW</text></g>`}
    ${t > LS(57) ? `<text class="ui" x="360" y="1238" text-anchor="middle" font-size="20" font-weight="800" fill="#fff" opacity="${prog(t, LS(57), 0.3)}">DAY 2 STARTS WITH YOUR CHOICE →</text>` : ""}`;
}

