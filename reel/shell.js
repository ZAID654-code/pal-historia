// Runs an episode described by window.EP = { days, pct:[from,to,atTime], SC, CAPY, punch:[times], hideCap(name,t) }
window.renderAt = function (t) {
  const E = window.EP;
  const sc = TL.scenes.find(s => t >= s.start && t < s.end) || TL.scenes[TL.scenes.length - 1];
  const punch = Math.max(0, ...(E.punch || []).map(p => t >= p ? 0.08 * (1 - eo(prog(t, p, 0.4))) : 0));
  const k = 1.05 - 0.05 * eo(prog(t, sc.start, 0.2)) + punch;
  const pct = lerp(E.pct[0], E.pct[1], eo(prog(t, E.pct[2], 0.6)));
  const cap = E.hideCap && E.hideCap(sc.name, t) ? "" : caption(t, (E.CAPY || {})[sc.name] || 950);
  document.getElementById("s").innerHTML =
    `<g transform="translate(360,640) scale(${k}) translate(-360,-640)">${E.SC[sc.name](t)}</g>` +
    (sc.name === "vote" ? "" : hud(E.days, pct)) + cap;
};
const q_ = new URLSearchParams(location.search);
if (q_.has("t")) renderAt(+q_.get("t"));
