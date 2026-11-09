"""One-page poster: Fadi + patron saint Al-Khader.

Own images: drop files into poster/images/
  saint.(png|jpg|jpeg|webp)  -> main saint picture (else the drawn icon is used)
  fadi.(png|jpg|jpeg|webp)   -> optional photo of the student
Run:  python3 poster/make.py   (writes poster/poster.html + out/poster-fadi-alkhader.pdf)
"""
import base64, mimetypes, pathlib, subprocess

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent
IMG = HERE / "images"


def find(stem):
    for ext in ("png", "jpg", "jpeg", "webp", "svg"):
        p = IMG / f"{stem}.{ext}"
        if p.exists():
            return p
    return None


def data_uri(p):
    mime = mimetypes.guess_type(p.name)[0] or "image/png"
    return f"data:{mime};base64," + base64.b64encode(p.read_bytes()).decode()


saint = find("saint")
saint_html = (f'<img src="{data_uri(saint)}" alt="القديس الخضر">' if saint
              else (HERE / "saint-drawn.svg").read_text())
fadi = find("fadi")
fadi_html = (f'<img class="fadi-photo" src="{data_uri(fadi)}" alt="فادي">' if fadi else "")

fonts = "".join(
    f"@font-face{{font-family:'{fam}';src:url('fonts/{f}-arabic-{w}-normal.woff2');font-weight:{w}}}"
    for fam, f in (("Cairo", "cairo"), ("Amiri", "amiri"), ("Kufi", "reem-kufi"))
    for w in (400, 700))

STAR = '<svg viewBox="0 0 100 100" class="{c}"><polygon fill="{f}" points="50,4 61,38 97,38 68,59 79,93 50,72 21,93 32,59 3,38 39,38"/></svg>'
HEART = '<svg viewBox="0 0 100 92" class="hsvg"><path fill="{f}" d="M50 90C20 65 0 48 0 26 0 10 12 0 26 0c12 0 20 7 24 15C54 7 62 0 74 0c14 0 26 10 26 26 0 22-20 39-50 64Z"/></svg>'

CSS = """
@page{size:210mm 297mm;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Cairo';color:#1b1b2f;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;padding:11mm 12mm;
 background:radial-gradient(circle at 80% 10%,#fff8e0,#fbecc4 55%,#f3dca6)}
.deco{position:absolute;inset:0;width:100%;height:100%}
.page>*:not(.deco){position:relative}
.top{display:flex;align-items:center;justify-content:space-between;gap:6mm}
.tag{display:inline-block;background:#c0262d;color:#fff;font-weight:700;font-size:12pt;padding:1.5mm 6mm;border-radius:30px}
h1{font-family:'Kufi';font-weight:700;color:#7a1f1f;font-size:40pt;line-height:1.15;margin-top:2mm}
.name{width:40mm;height:40mm;flex:none;border-radius:50%;background:#f2c94c;border:5px solid #fff;box-shadow:0 0 0 5px #c0262d;
 display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;position:relative}
.name small{font-size:10pt;color:#5a3a00}.name b{font-family:'Kufi';font-size:28pt;color:#7a1f1f;line-height:1.1}
.fadi-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.mid{display:flex;gap:7mm;margin-top:6mm;align-items:stretch}
.frame{width:92mm;height:118mm;flex:none;border-radius:46mm 46mm 10px 10px;overflow:hidden;border:5px solid #f2c94c;
 box-shadow:0 0 0 5px #7a1f1f;background:#fff}
.frame svg,.frame img{width:100%;height:100%;display:block;object-fit:cover}
.side{flex:1;display:flex;flex-direction:column;gap:5mm}
.saint{background:#fff;border-radius:14px;padding:4mm 6mm;border-right:8px solid #1f8a5b;display:flex;align-items:center;gap:4mm}
.tri{width:0;height:0;border-left:8mm solid transparent;border-right:8mm solid transparent;border-bottom:14mm solid #1f8a5b;flex:none}
.saint small{display:block;font-size:10pt;color:#555}.saint b{font-size:22pt;color:#1f6b3a;line-height:1.2;display:block}
.saint em{font-style:normal;font-size:10pt;color:#7a1f1f;font-weight:700}
.info{flex:1;background:#fff;border:3px dashed #c0262d;border-radius:16px;padding:4mm 5mm;box-shadow:5px 5px 0 #f2c94c}
.info h3{font-size:14pt;color:#7a1f1f;display:flex;align-items:center;gap:2mm}
.info h3 .st{width:6mm;height:6mm}
.info p{font-family:'Amiri';font-size:12.5pt;line-height:1.75}
.info p b{color:#7a1f1f}
.shapes{display:grid;grid-template-columns:repeat(4,1fr);gap:4mm;margin-top:7mm;align-items:center}
.sh{height:40mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#fff;padding:3mm}
.sh b{font-size:13pt;line-height:1.3}.sh span{font-size:9.5pt;line-height:1.4}
.circ{background:#2b54b8;border-radius:50%;width:40mm;justify-self:center}
.sq{background:#1f8a5b;border-radius:6px;width:38mm;justify-self:center}
.hexa{background:#c0262d;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);padding:3mm 7mm}
.tri2{background:#d4a017;clip-path:polygon(50% 0,100% 100%,0 100%);color:#3a2600;padding:15mm 6mm 2mm;height:44mm}
.tri2 b{font-size:12pt}.tri2 span{font-size:8.5pt}
.hearts{display:flex;justify-content:space-between;margin-top:6mm}
.h{position:relative;width:42mm;height:37mm;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:0 6mm 6mm}
.hsvg{position:absolute;inset:0;width:100%;height:100%}
.h b,.h span{position:relative}.h b{font-size:13pt}.h span{font-size:8.5pt;line-height:1.35}
.prayer{margin-top:6mm;background:#7a1f1f;color:#fff8e1;border-radius:40px;padding:3.5mm 8mm;text-align:center;
 font-family:'Amiri';font-size:13pt;line-height:1.6;border:3px solid #f2c94c}
.prayer b{color:#f2c94c;font-family:'Cairo'}
"""

DECO = """<svg class="deco" viewBox="0 0 210 297" preserveAspectRatio="none">
<circle cx="0" cy="0" r="22" fill="#f2c94c"/><polygon points="210,262 210,297 172,297" fill="#c0262d"/>
<polygon points="0,297 0,270 24,297" fill="#2b54b8"/><rect x="196" y="120" width="10" height="10" fill="#1f8a5b" transform="rotate(25 201 125)"/>
<circle cx="5" cy="150" r="3" fill="#c0262d"/><circle cx="205" cy="60" r="3" fill="#2b54b8"/></svg>"""

body = f"""<div class="page">{DECO}
<div class="top">
 <div><span class="tag">بمناسبة عيد جميع القديسين</span><h1>شفيعي بالعماد</h1></div>
 <div class="name">{fadi_html or '<small>اسم الطالب</small><b>فادي</b>'}</div>
</div>
<div class="mid">
 <div class="frame">{saint_html}</div>
 <div class="side">
  <div class="saint"><div class="tri"></div><div><small>اسم الطالب: <b style="display:inline;font-size:11pt;color:#7a1f1f">فادي</b> · شفيعي</small><b>القديس الخضر</b><em>مار جرجس · اللابس الظفر</em></div></div>
  <div class="info"><h3>{STAR.format(c='st', f='#d4a017')}معلومة عن شفيعي</h3>
   <p>القدّيس <b>الخضر</b> هو <b>مار جرجس</b>، وُلد نحو سنة 280م، وأمّه من مدينة <b>اللدّ</b> في فلسطين.
   كان ضابطًا شجاعًا في الجيش الروماني، ورفض اضطهاد المسيحيين وأعلن إيمانه بالمسيح، فعُذِّب واستُشهد نحو سنة 303م.
   يُصوَّر على حصان أبيض يطعن التنّين، رمزًا لانتصار الخير على الشرّ بقوّة الإيمان.</p></div>
 </div>
</div>
<div class="shapes">
 <div class="sh circ"><b>وُلادته</b><span>كبادوكية<br>نحو 280م</span></div>
 <div class="sh sq"><b>جنديّ شجاع</b><span>ضابط في الجيش الروماني</span></div>
 <div class="sh tri2"><b>استشهاده</b><span>نحو 303م</span></div>
 <div class="sh hexa"><b>عيده</b><span>23 نيسان<br>(6 أيار شرقي)</span></div>
</div>
<div class="hearts">
 <div class="h">{HEART.format(f='#c0262d')}<b>الشجاعة</b><span>أقول الحقّ ولا أخاف</span></div>
 <div class="h">{HEART.format(f='#1f8a5b')}<b>الإيمان</b><span>أثبت في محبّة يسوع</span></div>
 <div class="h">{HEART.format(f='#2b54b8')}<b>المحبّة</b><span>أساعد الضعيف</span></div>
 <div class="h">{HEART.format(f='#d4a017')}<b>الأمانة</b><span>أمين في كلّ عمل</span></div>
</div>
<div class="prayer">«أيّها القدّيس الخضر، تشفّع فيَّ لأحيا بشجاعة وإيمان ومحبّة. آمين.» — <b>فادي</b></div>
</div>"""

html = f'<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>شفيعي بالعماد – فادي</title><style>{fonts}{CSS}</style></head><body>{body}</body></html>'
out_html = HERE / "poster.html"
out_html.write_text(html)
(ROOT / "out").mkdir(exist_ok=True)
pdf = ROOT / "out" / "poster-fadi-alkhader.pdf"
subprocess.run(["node", str(HERE / "pdf.js"), str(out_html), str(pdf)], check=True)
print("saint image:", saint or "drawn icon", "| fadi photo:", fadi or "none", "->", pdf)
