"""Rules of the Air: interception and simulated instrument flight (sections with no figure before).

Wording follows Harry's note (src/data.js, topic "Rules of the Air").
"""
import sys
from pathlib import Path

from pplsvg import B, L, P, T, badge, head, lines, page, paper, rock, side  # noqa: E402


TOPIC = 'Rules of the Air'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))




# ================= 1. If you are intercepted =================================================
b = ""
rows = [
    ("Follow the interceptor's signals", "precisely, and stay calm"),
    ("Tell the ATS unit you are working", "if you can"),
    ("Call on 121.50 MHz", "your callsign and the nature of your flight"),
    ("Squawk 7700", "unless the ATS unit tells you otherwise"),
]
for i, (a, s) in enumerate(rows):
    cy = 26 + i * 42
    b += badge(20, cy, i + 1)
    b += B(38, cy - 15, 56, 30, "var(--surface)", "var(--line)", 6)
    b += T(104, cy - 1, a, "d1") + T(104, cy + 10, s, "d2")
# icons
b += P(52, 31, 90, "var(--accent)", .85) + P(79, 20, 90, "var(--bad)", .85) + rock(79, 20, "var(--bad)")
b += (L("M66 81V60M60 81H72M61 64l5-4 5 4", "var(--ink)", 1.4)
      + L("M74 62q4 4 0 8M78 59q7 7 0 14", "var(--accent)", 1.1))
b += T(66, 114, "121.50", "mono", "middle")
b += B(44, 144, 44, 14, "var(--ink)", "var(--ink)", 3) + T(66, 154.5, "7700", "mono", "middle",
                                                          ' style="fill:var(--surface);font-size:10px"')
b += B(10, 182, 300, 30, "var(--surface)", "var(--bad)", 6, 1.4)
b += T(160, 195, "Conflicting instructions from ATC? Ask at once,", "d1", "middle", ' style="font-size:8.6px"')
b += T(160, 206, "but obey the interceptor's visual signals.", "d1", "middle", ' style="font-size:8.6px"')
fig("intercepted-what-to-do", "If you are intercepted", 320, 222, b,
    "Do all four straight away. Avoid hand signals: they are easily misread. Report any interception abroad to the CAA.",
    "Interception: what to do (AIP ENR 1.12)")

# ================= 2. Interceptor's signals to you ===========================================
b = ""
RH = 82
for i in range(1, 3):
    b += L(f"M8 {8 + i*RH}H312", "var(--ch-tx)", .8, extra=' opacity=".45"')
# row 1: follow me
y = 8
b += L(f"M22 {y+52}H60", "var(--accent)", 1, "3 2") + P(66, y + 52, 90, "var(--accent)", .95)
b += P(98, y + 32, 90, "var(--bad)", .95) + rock(98, y + 32, "var(--bad)")
b += L(f"M110 {y+32}Q132 {y+32} 132 {y+10}", "var(--bad)", 1.4, "4 2") + head(132, y + 8, -90, "var(--bad)", 3.5)
b += T(98, y + 70, "you", "d2", "middle", ' style="fill:var(--accent)"') if False else ""
b += T(66, y + 72, "you", "d2", "middle") + T(98, y + 14, "interceptor", "d2", "middle")
b += T(150, y + 14, "“Follow me”", "d1")
b += lines(150, y + 27, ["Interceptor: rocks its wings from slightly above",
                         "and ahead (normally on your left), then makes",
                         "a slow level turn, normally to the left.",
                         "You: rock your wings and follow. At night also",
                         "flash your nav lights at irregular intervals."], dy=10)
# row 2: you may proceed
y = 8 + RH
b += L(f"M22 {y+52}H140", "var(--accent)", 1, "3 2") + P(50, y + 52, 90, "var(--accent)", .95)
b += T(132, y + 64, "your line of flight", "d2", "end")
b += P(84, y + 34, 90, "var(--bad)", .95)
b += L(f"M96 {y+34}Q120 {y+34} 122 {y+12}", "var(--bad)", 1.6) + head(122, y + 9, -90, "var(--bad)", 3.5)
b += T(128, y + 24, "climbing turn", "d2") + T(128, y + 34, "of 90° or more", "d2")
b += T(150, y + 14, "“You may proceed”", "d1") if False else ""
b += T(150, y + 50, "“You may proceed”", "d1") if False else ""
# text column for row 2 sits right of the sketch labels
b += T(196, y + 14, "“You may proceed”", "d1")
b += lines(196, y + 27, ["Interceptor: abrupt break-away,",
                         "a climbing turn of 90° or more",
                         "without crossing your line",
                         "of flight.",
                         "You: rock your wings."], dy=10)
# row 3: land at this aerodrome
y = 8 + 2 * RH
b += f'<rect x="36" y="{y+40}" width="80" height="8" fill="var(--rwy)"/>'
b += L(f"M122 {y+44}Q128 {y+14} 76 {y+14}Q24 {y+14} 24 {y+44}Q24 {y+70} 60 {y+70}H92", "var(--bad)", 1.3, "4 2")
b += head(98, y + 70, 0, "var(--bad)", 3.5)
b += P(90, y + 44, 90, "var(--bad)", .95)
b += T(76, y + 32, "gear down, along the runway", "d2", "middle") if False else ""
b += T(76, y + 82, "overflies in the landing direction", "d2", "middle") if False else ""
b += T(150, y + 14, "“Land at this aerodrome”", "d1")
b += lines(150, y + 27, ["Interceptor: circles, lowers its gear and",
                         "overflies the runway in the landing direction",
                         "(steady landing lights at night).",
                         "You: lower gear if you can, follow, and land if,",
                         "after overflying the runway, it looks safe."], dy=10)
fig("interceptor-signals", "The interceptor's signals to you", 320, 8 + 3 * RH + 4, b,
    "Too slow to keep up? The interceptor flies racetracks and rocks its wings each time it passes you.",
    "Interception signals")

# ================= 3. Your signals to the interceptor ========================================
b = ""
# side view: pass over the runway between 1,000 and 2,000 ft aal, gear up
b += f'<rect x="10" y="30" width="170" height="40" fill="var(--mid)" opacity=".12"/>'
b += L("M10 30H180M10 70H180", "var(--mid)", .9, "4 3")
b += T(14, 26, "2,000 ft aal", "d2") + T(14, 80, "1,000 ft aal", "d2")
b += f'<rect x="40" y="104" width="110" height="5" fill="var(--rwy)"/>' + L("M10 109H180", "var(--ink-2)", 1)
b += side(96, 52, .9, flip=True) + L("M62 50H40", "var(--accent)", 1, "3 2")
b += L("M136 50h14", "var(--accent)", 1.2) + head(154, 50, 0, "var(--accent)", 3.5)
b += T(174, 98, "keep", "d2", "end", ' style="font-size:0"') if False else ""
b += T(190, 18, "“Aerodrome inadequate”", "d1")
b += lines(190, 31, ["Raise gear if possible while", "passing over the runway between",
                     "1,000 and 2,000 ft above", "aerodrome level, and keep circling."], dy=10)
b += L("M8 122H312", "var(--ch-tx)", .8, extra=' opacity=".45"')


def pulses(x0, y, on_off, h=12):
    out, x = "", x0
    for k, (on, off) in enumerate(on_off):
        out += f'<rect x="{x}" y="{y-h}" width="{on}" height="{h}" rx="1.5" fill="var(--mid)"/>'
        x += on + off
    return out + L(f"M{x0-4} {y+1}H{x0+186}", "var(--ink-2)", .8)


b += T(10, 142, "“I cannot comply”", "d1") + T(10, 153, "all lights on and off,", "d2") + T(10, 163, "regular intervals", "d2")
b += pulses(122, 158, [(10, 10)] * 9)
b += T(10, 184, "“I am in distress”", "d1") + T(10, 195, "all lights on and off,", "d2") + T(10, 205, "irregular intervals", "d2")
b += pulses(122, 200, [(4, 6), (14, 4), (4, 18), (8, 5), (3, 4), (16, 12), (5, 8), (9, 3), (4, 0)])
b += T(122, 214, "time", "d2") + head(306, 201, 0, "var(--ink-2)", 3)
b += B(10, 222, 300, 22, "var(--surface)", "var(--line)", 6)
b += T(160, 236, "The interceptor answers both with a break-away climbing turn: “understood”.", "d2", "middle")
fig("your-signals", "Your signals to the interceptor", 320, 252, b,
    "“Cannot comply” must look different from ordinary flashing lights, so switch every light fully on and off.",
    "Interception signals")

# ================= 4. Warning from the ground ================================================
b = ""
b += f'<rect x="214" y="22" width="98" height="118" fill="var(--bad)" opacity=".10"/>'
b += L("M214 22V140", "var(--bad)", 1.6, "6 3")
b += T(263, 36, "Restricted,", "d1", "middle", ' style="fill:var(--bad)"')
b += T(263, 49, "prohibited or", "d1", "middle", ' style="fill:var(--bad)"')
b += T(263, 62, "danger area", "d1", "middle", ' style="fill:var(--bad)"')
b += L("M8 140H312", "var(--ink-2)", 1.2)
b += f'<rect x="180" y="132" width="14" height="8" fill="var(--ink-2)"/>'


def burst(cx, cy, r=7):
    import math
    out = ""
    for k in range(8):
        a = math.radians(k * 45)
        col = "var(--burst-r)" if k % 2 == 0 else "var(--burst-g)"
        out += f'<circle cx="{cx + r*math.cos(a):.1f}" cy="{cy + r*math.sin(a):.1f}" r="2.1" fill="{col}"/>'
    return out


for (bx, by) in [(158, 30), (182, 48), (203, 24)]:
    b += L(f"M187 132L{bx} {by+8}", "var(--ink-2)", .7, "1.5 2") + burst(bx, by)
b += side(62, 62, .8, flip=True) + L("M92 58q24-2 28-22q2-14-14-16", "var(--accent)", 1.3, "4 2") + head(100, 20, 190, "var(--accent)", 3.5)
b += T(12, 100, "Red and green stars,", "d1") + T(12, 113, "fired every 10 s, day or night", "d1")
b += T(12, 127, "Take remedial action: turn away", "d2")
fig("ground-warning", "Warning signal from the ground", 320, 152, b,
    "You are in, or about to enter, a restricted, prohibited or danger area.",
    "Interception radio phrases and ground signals")

# ================= 5. Simulated instrument flight ============================================
b = ""
fus = "M86 10C104 10 118 30 122 52L130 196H42L50 52C54 30 68 10 86 10Z"
b += f'<path d="M86 10L54 -2H118Z" fill="var(--accent)" opacity="0"/>'
b += L("M70 46L36 6M102 46L136 6", "var(--good)", .8, "3 2") + f'<path d="M102 46L136 6H86Z" fill="var(--good)" opacity=".12"/>'
b += f'<path d="{fus}" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="1.4"/>'
b += L("M54 54H118", "var(--ink-2)", 2.4)                       # instrument panel
b += L("M56 60H82", "var(--bad)", 3)                            # screens limit handling pilot's view
for sx in (58, 92):
    b += L(f"M{sx+4} 70h14M{sx+11} 70v8", "var(--ink)", 1.6)     # dual controls
    b += B(sx, 84, 22, 30, "var(--surface-2)", "var(--ink-2)", 5)
b += B(58, 136, 22, 30, "var(--surface-2)", "var(--ink-2)", 5, 1, "3 2") + B(92, 136, 22, 30, "var(--surface-2)", "var(--ink-2)", 5)
b += T(69, 103, "H", "d1", "middle") + T(103, 103, "S", "d1", "middle") + T(69, 155, "O", "d1", "middle")
b += T(86, 186, "plan view", "d2", "middle")
key = [("H", "Handling pilot", ["view limited by screens or a hood"]),
       ("S", "Safety pilot", ["qualified pilot in the other", "control seat, not a student"]),
       ("O", "Observer, if needed", ["for an adequate lookout"])]
yy = 22
for k, (letter, name, sub) in enumerate(key):
    b += B(152, yy - 10, 14, 14, "var(--surface-2)", "var(--ink-2)", 3) + T(159, yy + 1, letter, "d1", "middle", ' style="font-size:8.6px"')
    b += T(172, yy, name, "d1", "middle" if False else None, ' style="font-size:9px"')
    b += lines(172, yy + 11, sub, dy=10)
    yy += 22 + 10 * len(sub)
b += L(f"M152 {yy-2}h14M159 {yy-2}v8", "var(--ink)", 1.6) + T(172, yy + 1, "Dual controls, fully working", "d1", None, ' style="font-size:9px"')
b += L(f"M152 {yy+14}H166", "var(--bad)", 3) + T(172, yy + 17, "Screens: handling pilot only", "d2")
b += B(144, 160, 168, 32, "var(--surface)", "var(--accent)", 6, 1.2)
b += T(152, 173, "Practice approaches in VMC:", "d1", None, ' style="font-size:8.6px"')
b += T(152, 184, "inform ATC, carry a competent observer", "d2")
fig("simulated-instrument-flight", "Simulated instrument flight", 320, 202, b,
    "SERA.3220. The green wedge is the safety pilot's lookout through the windscreen.",
    "Other rules: hazards, aerobatics and instrument practice")
