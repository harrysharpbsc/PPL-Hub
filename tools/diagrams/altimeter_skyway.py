"""Altimeter settings (Skyway Code): QFE/QNH/1013, the transition layer, the 27 ft per hPa worked example.

Redrawn from the hand-written figures that were in src/labs82.js (same content, generator style).
"""
from pplsvg import B, L, T, badge, head, side

TOPIC = "Altimeter settings (Skyway Code)"
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


def arrow_down(x, y1, y2, col):
    return L(f"M{x} {y1}V{y2-7}", col, 1.6) + head(x, y2, 90, col, 4)


# ================= QFE, QNH and 1013 (high-pressure day) =====================================
SEA, P1013, AD = 186, 170, 150          # mean sea level, 1013 hPa level (above MSL: QNH > 1013), aerodrome
b = "".join([
    T(10, 22, "High-pressure day: QNH above 1013", "d1", None, ' style="font-size:9px"'),
    f'<rect x="0" y="{SEA}" width="320" height="{200-SEA}" fill="var(--ch-wt)"/>',
    T(314, 196, "mean sea level", "d2", "end"),
    f'<path d="M0 {AD}Q60 {AD-10} 124 {AD}V{SEA}H0Z" fill="var(--ch-l2)"/>',
    f'<rect x="40" y="{AD-6}" width="60" height="6" fill="var(--rwy)"/>', T(70, AD - 12, "aerodrome 300 ft", "d2", "middle"),
    L(f"M0 {AD}H320", "var(--ink-2)", .7, "2 3"),
    L(f"M0 {P1013}H320", "var(--mid)", 1, "4 3"), T(130, P1013 - 4, "1013 hPa level", "d2", None, ' style="fill:var(--mid)"'),
    side(212, 58, 1.0, flip=True),
    arrow_down(196, 68, AD, "var(--good)"), arrow_down(212, 68, SEA, "var(--accent)"), arrow_down(228, 68, P1013, "var(--mid)"),
    T(188, 104, "QFE: height", "d1", "end", ' style="fill:var(--good)"'), T(188, 115, "above the aerodrome", "d2", "end"),
    T(238, 96, "QNH: altitude", "d1", None, ' style="fill:var(--accent)"'), T(238, 107, "above sea level", "d2"),
    T(238, 132, "1013: flight level", "d1", None, ' style="fill:var(--mid)"'), T(238, 143, "above the 1013 level", "d2"),
])
fig("qfe-qnh-1013", "QFE, QNH and 1013", 320, 200, b,
    "On the ground QFE reads zero and QNH reads the aerodrome elevation. Above the transition altitude, set 1013 for "
    "flight levels. On a high-pressure day the 1013 hPa level is above sea level, so the flight level is less than "
    "the altitude.", "Four pressure settings")

# ================= Transition altitude and level =============================================
TL, TA = 100, 150
b = "".join([
    T(160, 26, "Flight levels on 1013", "d3", "middle"),
    f'<rect x="0" y="{TL}" width="320" height="{TA-TL}" fill="var(--mid)" opacity=".15"/>',
    L(f"M0 {TL}H320", "var(--ink)", 1), L(f"M0 {TA}H320", "var(--ink)", 1),
    T(160, TL + 13, "transition level (TL): lowest flight level above the TA", "d2", "middle"),
    T(160, TL + 28, "transition layer", "d1", "middle"),
    T(160, TA - 6, "transition altitude (TA): 3,000 ft over most of the UK", "d2", "middle"),
    T(160, 186, "Altitudes on QNH", "d3", "middle"),
    L("M40 178V50", "var(--accent)", 1.6) + head(40, 44, -90, "var(--accent)", 4),
    L("M280 44V172", "var(--accent)", 1.6) + head(280, 178, 90, "var(--accent)", 4),
    T(50, 58, "Climbing: set 1013", "d1"), T(50, 69, "as you pass the TA", "d2"),
    T(270, 80, "Descending: set QNH", "d1", "end"), T(270, 91, "as you pass the TL", "d2", "end"),
])
fig("transition", "Transition altitude and level", 320, 200, b,
    "In the UK outside controlled airspace the transition altitude is usually 3,000 ft. Changing to flight levels "
    "is optional for VFR.", "Transition altitude")

# ================= Worked example: 27 ft per hPa ============================================
b = "".join([
    badge(24, 30, 1), T(42, 28, "QNH 1000, flying at 3,000 ft. Now set 1013.", "d1"),
    T(42, 40, "1013 − 1000 = 13 hPa", "d2"),
    badge(24, 78, 2), T(42, 76, "13 × 27 ft ≈ 351 ft", "d1"), T(42, 88, "the reading goes up", "d2"),
    badge(24, 126, 3), T(42, 124, "The altimeter now reads", "d1"),
    B(42, 132, 112, 30, "var(--surface)", "var(--accent)", 6, 1.4),
    T(98, 154, "3,351 ft", "mono", "middle", ' style="font-size:20px;fill:var(--accent)"'),
    B(176, 98, 132, 64, "var(--surface)", "var(--line)", 6),
    T(184, 114, "Lower pressure than 1013:", "d1", None, ' style="font-size:8.6px"'),
    T(184, 126, "on 1013 the altimeter reads", "d2"), T(184, 136, "higher than your true altitude.", "d2"),
    T(184, 152, "“High to low, look out below.”", "d2"),
])
fig("worked-27ft", "Worked example: 27 ft per hPa", 320, 176, b,
    "Lower pressure than standard means the altimeter on 1013 reads higher than your true altitude.", "Transition altitude")
