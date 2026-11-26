"""Altimeter Setting Procedures (Harry's note 05): six figures for a note that had none.

The Skyway Code topic already draws QFE/QNH/1013, the transition layer and the 27 ft per hPa example.
Numbers and wording follow the note (src/data.js).
"""
import math
import sys
from pathlib import Path

from pplsvg import B, L, P, T, badge, head, lines, page, paper, side  # noqa: E402

TOPIC = 'Altimeter Setting Procedures'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))




def fs(px):
    return f' style="font-size:{px}px"'


def bracket(x, y1, y2, label, col="var(--ink-2)", side_="right"):
    """Vertical dimension line between y1 and y2 with end ticks and a label."""
    d = 4 if side_ == "right" else -4
    return (L(f"M{x} {y1}V{y2}M{x-3} {y1}h6M{x-3} {y2}h6", col, 1)
            + T(x + d + (2 if d > 0 else -2), (y1 + y2) / 2 + 3, label, "d2", "start" if d > 0 else "end",
                f' style="fill:{col}"'))


# ================= 1. Inside the altimeter ===================================================
b = ""
b += B(70, 14, 160, 156, "var(--surface)", "var(--ink-2)", 12, 1.6)                 # sealed case
b += T(78, 162, "sealed case", "d2")
# dial arc with ticks and a pointer
cx, cy, r = 150, 66, 36
for k in range(11):
    a = math.radians(-150 + k * 30)
    x1, y1 = cx + r * math.sin(a + math.pi / 2 * 0), cy
b += L(f"M{cx-34} {cy}A34 34 0 0 1 {cx+34} {cy}", "var(--ink)", 1.4)
for k in range(9):
    a = math.radians(180 + k * 22.5)
    b += L(f"M{cx+34*math.cos(a):.1f} {cy+34*math.sin(a):.1f}L{cx+28*math.cos(a):.1f} {cy+28*math.sin(a):.1f}", "var(--ink)", 1)
b += L(f"M{cx} {cy}L{cx+18} {cy-24}", "var(--ink)", 2.2) + f'<circle cx="{cx}" cy="{cy}" r="3" fill="var(--ink)"/>'
b += B(196, 70, 30, 13, "var(--ink)", "var(--ink)", 2) + T(211, 79.5, "1013", "mono", "middle", ' style="font-size:9px;fill:var(--surface)"')
# linkage: rocking shaft and gear from capsule to pointer
b += L(f"M{cx} 108V90", "var(--ink-2)", 1.6) + L(f"M{cx} 90L{cx+10} 84L{cx} 78", "var(--ink-2)", 1.4)
b += f'<circle cx="{cx}" cy="74" r="5" fill="none" stroke="var(--ink-2)" stroke-width="1.6" stroke-dasharray="2 1.4"/>'
# aneroid capsule: three corrugated chambers on a post
for k, yy in enumerate((112, 124, 136)):
    b += f'<path d="M115 {yy+5}Q150 {yy-6} 185 {yy+5}Q150 {yy+16} 115 {yy+5}Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.3"/>'
b += L("M150 146V170", "var(--ink-2)", 2.4)
b += L("M200 116V100", "var(--accent)", 1.2) + head(200, 98, -90, "var(--accent)", 3) + L("M200 136V152", "var(--accent)", 1.2) + head(200, 154, 90, "var(--accent)", 3)
# subscale knob on the right wall, static pipe from below
b += B(230, 52, 12, 16, "var(--ink-2)", "var(--ink-2)", 2) + L("M233 54v12M236 54v12M239 54v12", "var(--surface)", .6)
b += L("M110 170V200", "var(--ink-2)", 3) + L("M110 170V200", "var(--ch-land)", 1.2)
b += head(110, 176, -90, "var(--accent)", 3)
# labels
b += L("M244 30H170", "var(--ch-tx)", .7) + T(250, 27, "Pointer reads height", "d1", None, fs(8.6)) + T(250, 38, "or altitude", "d2")
b += L("M246 62H243M236 68V76H228", "var(--ch-tx)", .7) + T(250, 58, "Subscale knob sets the", "d1", None, fs(8.6)) + T(250, 69, "datum pressure, shown in", "d2") + T(250, 79, "the pressure window", "d2")
b += L("M246 124H188", "var(--ch-tx)", .7) + T(250, 110, "Aneroid capsule", "d1", None, fs(8.6))
b += lines(250, 121, ["sealed, most air removed,", "a spring stops it collapsing"], dy=10)
b += T(250, 150, "Climb: pressure falls,", "d1", None, fs(8.6)) + T(250, 161, "the capsule expands", "d2")
b += L("M64 82H140", "var(--ch-tx)", .7) + T(8, 78, "Linkage and", "d1", None, fs(8.6)) + T(8, 89, "gearing turn", "d2") + T(8, 99, "the pointers", "d2")
b += T(118, 192, "Static pressure from the static vent fills the case", "d2")
fig("inside-the-altimeter", "Inside the altimeter", 360, 204, b,
    "The altimeter is a barometer with its scale marked in feet. It reads height or altitude above whatever pressure is set on the subscale.",
    "How the altimeter works")

# ================= 2. Reading the three pointers =============================================
b = ""
cx, cy, R = 96, 100, 84
b += f'<circle cx="{cx}" cy="{cy}" r="{R+4}" fill="var(--ink-2)"/><circle cx="{cx}" cy="{cy}" r="{R}" fill="#1b1f27"/>'
for k in range(50):
    a = math.radians(k * 7.2 - 90)
    rr = R - (9 if k % 5 == 0 else 5)
    b += L(f"M{cx+(R-2)*math.cos(a):.1f} {cy+(R-2)*math.sin(a):.1f}L{cx+rr*math.cos(a):.1f} {cy+rr*math.sin(a):.1f}", "#f2f2ee", 1.4 if k % 5 == 0 else .8)
for n in range(10):
    a = math.radians(n * 36 - 90)
    b += T(round(cx + (R - 20) * math.cos(a), 1), round(cy + (R - 20) * math.sin(a) + 5, 1), n, "d3", "middle", ' style="fill:#f2f2ee;font-size:14px"')
# striped low-altitude sector and pressure window
b += '<defs><pattern id="alt-stripe" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" fill="#f2f2ee"/><rect width="2.5" height="5" fill="#1b1f27"/></pattern></defs>'
b += f'<rect x="{cx-12}" y="{cy-50}" width="24" height="9" fill="url(#alt-stripe)" stroke="#f2f2ee" stroke-width=".6"/>'
b += B(cx - 56, cy - 7, 30, 13, "#f2f2ee", "#f2f2ee", 1.5) + T(cx - 41, cy + 2.5, "1018", "mono", "middle", ' style="font-size:9px;fill:#1b1f27"')
b += T(cx, cy + 26, "FEET", "d2", "middle", ' style="fill:#f2f2ee;font-size:6.5px;letter-spacing:.12em"')
# pointers for 2,350 ft
def ptr(deg, length, width, tri=False):
    a = math.radians(deg - 90); ex, ey = cx + length * math.cos(a), cy + length * math.sin(a)
    out = f'<path d="M{cx} {cy}L{ex:.1f} {ey:.1f}" stroke="#f2f2ee" stroke-width="{width}" stroke-linecap="round"/>'
    if tri:
        px, py = -math.sin(a), math.cos(a)
        out += f'<path d="M{ex+5*math.cos(a):.1f} {ey+5*math.sin(a):.1f}L{ex+4*px:.1f} {ey+4*py:.1f}L{ex-4*px:.1f} {ey-4*py:.1f}Z" fill="#f2f2ee"/>'
    return out
b += ptr(2350 / 100000 * 360, R - 18, 1.2, tri=True)       # 10,000 ft: one turn = 100,000 ft
b += ptr(2350 / 10000 * 360, 44, 5.5)                      # 1,000 ft: one turn = 10,000 ft
b += ptr(2350 % 1000 / 1000 * 360, R - 10, 2)             # 100 ft: one turn = 1,000 ft
b += f'<circle cx="{cx}" cy="{cy}" r="4.5" fill="#888c94"/>'
# key
rows = [("100 ft pointer", "long: 3.5 → 350 ft", 2), ("1,000 ft pointer", "short, wide: 2 → 2,000 ft", 5.5),
        ("10,000 ft pointer", "thin, triangle tip: just past 0", 1)]
yy = 22
for nm_, sub, wd in rows:
    b += L(f"M196 {yy-3}h16", "var(--ink)", wd) + T(220, yy, nm_, "d1", None, fs(9)) + T(220, yy + 11, sub, "d2")
    yy += 30
b += B(196, yy - 8, 116, 24, "var(--surface)", "var(--accent)", 6, 1.2) + T(254, yy + 8, "Reading: 2,350 ft", "d1", "middle")
yy += 34
b += f'<rect x="196" y="{yy-8}" width="16" height="8" fill="url(#alt-stripe)" stroke="var(--ink-2)" stroke-width=".6"/>'
b += T(220, yy, "Striped sector shows", "d2") + T(220, yy + 10, "when below 10,000 ft", "d2")
yy += 28
b += B(196, yy - 9, 16, 10, "var(--surface)", "var(--ink-2)", 1.5) + T(220, yy, "Pressure window: QNH 1018", "d2") + T(220, yy + 10, "set, so it reads altitude amsl", "d2")
fig("three-pointers", "Reading the three pointers", 320, 200, b,
    "Read the 10,000 ft pointer first, then the 1,000 ft, then the 100 ft. Below 5,000 ft, 1 hPa on the subscale is roughly 30 ft.",
    "How the altimeter works")

# ================= 3. High to low, beware below ==============================================
b = ""
k = .1                    # units per foot
SL = 172                  # sea level y
b += f'<rect x="0" y="{SL}" width="360" height="{200-SL}" fill="var(--accent)" opacity=".10"/>'
b += L(f"M10 {SL}H350", "var(--accent)", 1.2) + T(44, SL + 12, "mean sea level", "d2")
b += L(f"M40 {SL}L320 {SL+30}", "var(--mid)", 1.4, "5 3") + T(130, SL + 30, "the 1020 hPa level", "d2", "middle", ' style="fill:var(--mid)"')
b += L(f"M40 {SL-100}L320 {SL-70}", "var(--accent)", 1.3, "4 3")
b += side(60, SL - 103, .7, flip=True) + side(300, SL - 73, .7, flip=True)
for x, y, t1 in [(40, SL - 100, "reads 1,000 ft"), (300, SL - 70, "still reads 1,000 ft")]:
    b += B(x - 2 if x < 100 else x - 52, y - 44, 82 if x < 100 else 92, 15, "var(--surface)", "var(--line)", 4) + \
        T(x + 39 if x < 100 else x - 6, y - 33.5, t1, "d2", "middle")
b += bracket(30, SL - 100, SL, "1,000 ft amsl", "var(--ink)", "right")
b += bracket(330, SL - 70, SL, "about 700 ft", "var(--bad)", "left")
b += bracket(342, SL, SL + 30, "300 ft", "var(--mid)", "left")
b += T(70, 16, "QNH 1020", "d3", "middle") + T(280, 16, "QNH 1010", "d3", "middle")
b += L("M120 12H230", "var(--ink-2)", 1.2) + head(234, 12, 0, "var(--ink-2)", 3.5) + T(176, 24, "flying into lower pressure", "d2", "middle")
b += T(180, 132, "Subscale left on 1020: you descend", "d1", "middle", fs(9)) + T(180, 143, "while the altimeter shows the same figure", "d2", "middle")
fig("high-to-low", "High to low, beware below", 360, 216, b,
    "Over 10 hPa at about 30 ft each, the 1020 level is 300 ft below sea level, so 1,000 ft indicated is really about 700 ft. Cold air does the same: up to about 10% lower than indicated. Keep updating the RPS.",
    "En route: high to low, beware below")

# ================= 4. Low QNH: choosing a flight level =======================================
b = ""
s = .04                   # units per foot
SL = 200
y = lambda ft: SL - ft * s  # noqa: E731
b += f'<rect x="0" y="{SL}" width="360" height="{232-SL}" fill="var(--accent)" opacity=".10"/>'
b += L(f"M8 {SL}H352", "var(--accent)", 1.2) + T(352, SL + 11, "mean sea level", "d2", "end")
b += L(f"M8 {y(-500)}H352", "var(--mid)", 1.4, "5 3") + T(352, y(-500) + 10, "1013 hPa level (QNH 996: about 500 ft below)", "d2", "end", ' style="fill:var(--mid)"')
# two rulers
b += L(f"M60 {y(0)}V{y(4500)}", "var(--ink)", 1.2) + L(f"M120 {y(-500)}V{y(4500)}", "var(--mid)", 1.2)
for ft in range(0, 4501, 500):
    b += L(f"M56 {y(ft)}h4", "var(--ink)", 1) + T(52, y(ft) + 3, f"{ft:,}", "d2", "end", ' style="paint-order:stroke;stroke:var(--ch-land);stroke-width:3px;stroke-linejoin:round"')
for fl in range(0, 50, 5):
    yy = y(fl * 100 - 500)
    b += L(f"M120 {yy}h4", "var(--mid)", 1) + T(128, yy + 3, f"FL{fl}" if fl else "FL0", "d2", None, ' style="paint-order:stroke;stroke:var(--ch-land);stroke-width:3px;stroke-linejoin:round;fill:var(--mid)"')
b += T(56, 12, "altitude amsl", "d1", "end", fs(8.6)) + T(122, 12, "flight levels", "d1", None, fs(8.6) .replace('"', '"') )
b += T(122, 12, "", "d2")
# you at FL40, traffic at 3,000 ft, hill to 2,800 ft
b += L(f"M150 {y(3500)}H352", "var(--bad)", 1, "3 2") + side(176, y(3500) - 2, .62, "var(--bad)", flip=True)
b += T(352, y(3500) - 5, "you at FL40 ≈ 3,500 ft", "d1", "end", ' style="font-size:8.6px;fill:var(--bad)"')
b += side(206, y(3000) - 1, .5, "var(--ink-2)") + T(206, y(3000) + 13, "traffic 3,000 ft", "d2", "middle")
b += f'<path d="M214 {SL}L268 {y(2800)}L300 {y(2400)}L340 {SL}Z" fill="var(--good)" opacity=".28"/>' + L(f"M214 {SL}L268 {y(2800)}L300 {y(2400)}L340 {SL}", "var(--good)", 1.1)
b += T(282, y(1200), "hill 2,800 ft", "d2", "middle")
b += bracket(222, y(3500), y(3000), "500 ft", "var(--ink)", "left") if False else ""
b += bracket(234, y(3500), y(3000), "500 ft", "var(--ink-2)", "right")
b += bracket(268, y(3500) + 4, y(2800), "700 ft", "var(--ink-2)", "right")
b += L(f"M150 {y(4000)}H352", "var(--good)", 1.2, "6 3") + T(352, y(4000) - 5, "FL45 ≈ 4,000 ft: 1,000 ft above 3,000 ft", "d1", "end", ' style="font-size:8.6px;fill:var(--good)"')
b += B(8, 240, 344, 24, "var(--surface)", "var(--line)", 6)
b += T(180, 255, "altitude ≈ FL × 100 + (QNH − 1013) × 30 ft  ·  FL40: 4,000 + (996 − 1013) × 30 ≈ 3,500 ft", "d2", "middle", fs(7.6))
fig("low-qnh-flight-level", "When the QNH is low, a flight level is lower than it looks", 360, 272, b,
    "With QNH below 1013, the 1013 hPa datum is below sea level, so every flight level sits closer to the ground and to traffic on QNH.",
    "Choosing a flight level when the QNH is low")

# ================= 5. The semicircular rule ==================================================
b = ""
cx, cy, R = 92, 104, 72
b += f'<path d="M{cx} {cy-R}A{R} {R} 0 0 1 {cx} {cy+R}Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>'
b += f'<path d="M{cx} {cy-R}A{R} {R} 0 0 0 {cx} {cy+R}Z" fill="var(--surface-2)" stroke="var(--mid)" stroke-width="1.4"/>'
b += L(f"M{cx} {cy-R-6}V{cy+R+6}", "var(--ink)", 1.4)
for deg in range(0, 360, 30):
    a = math.radians(deg - 90)
    b += L(f"M{cx+R*math.cos(a):.1f} {cy+R*math.sin(a):.1f}L{cx+(R-6)*math.cos(a):.1f} {cy+(R-6)*math.sin(a):.1f}", "var(--ink-2)", 1)
b += T(cx, cy - R - 10, "000°", "d1", "middle", fs(8.6)) + T(cx, cy + R + 17, "180°", "d1", "middle", fs(8.6))
b += T(cx + R + 4, cy + 3, "090°", "d2") + T(cx - R - 4, cy + 3, "270°", "d2", "end")
b += T(cx + 36, cy - 14, "ODD", "d3", "middle", ' style="font-size:15px;fill:var(--accent)"') + T(cx + 36, cy - 3, "000°–179°", "d2", "middle")
b += T(cx - 36, cy - 14, "EVEN", "d3", "middle", ' style="font-size:15px;fill:var(--mid)"') + T(cx - 36, cy - 3, "180°–359°", "d2", "middle")
b += P(cx + 36, cy + 30, 90, "var(--accent)", .9) + P(cx - 36, cy + 30, 270, "var(--mid)", .9)
# table
x0 = 196
b += T(x0, 22, "Magnetic track 000°–179°", "d1", None, fs(9)) + T(x0, 34, "odd thousands", "d2")
b += T(x0, 50, "IFR  FL30, FL50, FL70", "d1", None, ' style="font-size:8.6px;fill:var(--accent)"')
b += T(x0, 62, "VFR  FL35, FL55, FL75", "d1", None, ' style="font-size:8.6px;fill:var(--accent)"')
b += T(x0, 88, "Magnetic track 180°–359°", "d1", None, fs(9)) + T(x0, 100, "even thousands", "d2")
b += T(x0, 116, "IFR  FL40, FL60, FL80", "d1", None, ' style="font-size:8.6px;fill:var(--mid)"')
b += T(x0, 128, "VFR  FL45, FL65, FL85", "d1", None, ' style="font-size:8.6px;fill:var(--mid)"')
b += B(x0 - 4, 148, 124, 40, "var(--surface)", "var(--line)", 6)
b += T(x0 + 4, 162, "East is odd, west is even;", "d1", None, fs(8.6)) + T(x0 + 4, 174, "VFR adds 500", "d1", None, fs(8.6))
b += T(x0 + 4, 184, "Track, not heading", "d2")
fig("semicircular-rule", "The semicircular rule", 320, 200, b,
    "Required for IFR, strongly recommended for VFR. If an exam question gives only a heading and no wind, treat the heading as the track.",
    "The semicircular rule")

# ================= 6. Which setting on a cross-country =======================================
b = ""
G = 104
b += L(f"M8 {G}H352", "var(--ink-2)", 1.2)
b += f'<rect x="22" y="{G-4}" width="30" height="4" fill="var(--rwy)"/><rect x="314" y="{G-4}" width="30" height="4" fill="var(--rwy)"/>'
b += L(f"M112 10V{G}", "var(--warm)", 1.2, "5 3") + T(108, 18, "region", "d2", "end") + T(108, 28, "boundary", "d2", "end")
b += f'<rect x="150" y="12" width="78" height="22" fill="var(--accent)" opacity=".16"/>' + L("M150 34H228", "var(--accent)", 1.4) + T(189, 26, "TMA above", "d1", "middle", ' style="font-size:8.6px;fill:var(--accent)"')
b += f'<rect x="246" y="50" width="48" height="{G-50}" rx="3" fill="var(--good)" opacity=".14"/>' + B(246, 50, 48, G - 50, "none", "var(--good)", 3, 1.2) + T(270, G - 6, "MATZ", "d1", "middle", ' style="font-size:8.6px;fill:var(--good)"')
track = f"M52 {G-4}Q70 {G-4} 86 64H300Q316 64 324 {G-6}"
b += L(track, "var(--bad)", 1.8) + head(196, 64, 0, "var(--bad)", 3.5)
b += T(156, 84, "at or below 3,000 ft", "d2", "middle")
for n, (x, yb) in enumerate([(37, G - 16), (88, 64), (124, 64), (189, 64), (270, 64), (329, G - 18)], 1):
    b += badge(x, yb, n, r=8)
rows = [("QFE or aerodrome QNH", "In the circuit: height aal or altitude"),
        ("Regional pressure setting", "En route at or below 3,000 ft: altitude amsl"),
        ("The new region's RPS", "Change it when you enter another region"),
        ("QNH of an aerodrome under it", "What traffic above uses; keeps you out of it"),
        ("Aerodrome QFE (clutch QFE)", "Penetrating a MATZ; sometimes QNH is given"),
        ("Aerodrome QNH, then QFE", "Arriving; QFE in the circuit if you wish")]
for i, (a, c) in enumerate(rows):
    yy = 128 + i * 22
    b += badge(18, yy - 3, i + 1, r=8) + T(32, yy, a, "d1", None, fs(8.6)) + T(170, yy, c, "d2")
fig("cross-country-settings", "Which setting, where: a typical cross-country", 360, 252, b,
    "Most PPL cross-countries stay outside controlled airspace and below 3,000 ft amsl. Above the transition altitude in controlled airspace it is flight levels on 1013.",
    "A typical cross-country")
