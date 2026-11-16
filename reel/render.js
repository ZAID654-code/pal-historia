// Renders index.html frame by frame with Playwright and pipes frames to ffmpeg.
// usage: node render.js            -> out/reel.mp4
//        node render.js sheet      -> build/sheet.jpg (contact sheet for review)
const { chromium } = require("playwright");
const { spawn, execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const dir = __dirname, FPS = 30, EP = process.env.EP || "day1";
const B = EP === "day1" ? "build" : "build/" + EP, HTML = EP === "day1" ? "index.html" : fs.existsSync(path.join(__dirname, EP + ".html")) ? EP + ".html" : "ep.html?ep=" + EP;
const tl = JSON.parse(fs.readFileSync(path.join(dir, B + "/timeline.json")));
fs.writeFileSync(path.join(dir, B + "/timeline.js"), "window.TL=" + JSON.stringify(tl) + ";");
fs.mkdirSync(path.join(dir, "out"), { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 720, height: 1280 }, deviceScaleFactor: 1 });
  await page.goto("file://" + path.join(dir, HTML));
  await page.evaluate(() => document.fonts.load("40px Anton").then(() => document.fonts.load("800 20px Inter")).then(() => document.fonts.ready));

  if (process.argv[2] === "sheet") {
    const times = process.argv.slice(3).map(Number);
    const tmp = path.join(dir, "build/sheet");
    fs.rmSync(tmp, { recursive: true, force: true }); fs.mkdirSync(tmp, { recursive: true });
    for (let i = 0; i < times.length; i++) {
      await page.evaluate(t => window.renderAt(t), times[i]);
      await page.screenshot({ path: path.join(tmp, String(i).padStart(3, "0") + ".jpg"), quality: 85 });
    }
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", path.join(tmp, "%03d.jpg"), "-vf", `scale=360:-1,tile=${Math.min(6, times.length)}x${Math.ceil(times.length / 6)}`, "-frames:v", "1", path.join(dir, "build/sheet.jpg")]);
    await browser.close();
    return;
  }

  const n = Math.round(tl.total * FPS);
  const out = path.join(dir, EP === "day1" ? "out/reel.mp4" : "out/" + EP + ".mp4");
  const ff = spawn("ffmpeg", ["-v", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-i", path.join(dir, B + "/audio.wav"), "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
  for (let i = 0; i < n; i++) {
    await page.evaluate(t => window.renderAt(t), i / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once("drain", r));
    if (i % 300 === 0) console.log(`frame ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on("close", r));
  await browser.close();
  console.log("wrote", out);
})();
