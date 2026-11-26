"""Aerodrome operations and circuits (Skyway Code): live and dead side, the holding point.

Redrawn from the hand-written figures that were in src/labs82.js (same content, generator style).
The overhead join for this topic is in overhead_join.py.
"""
from pplsvg import B, L, P, T, head

TOPIC = "Aerodrome operations and circuits (Skyway Code)"
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ================= Live side and dead side ===================================================
# RWY 27 (take off westbound), left-hand circuit to the south.
RX0, RX1, RY = 110, 210, 100           # runway ends, centreline
XW, XB, YD, R = 60, 260, 160, 14       # crosswind x, base x, downwind y, turn radius
b = "".join([
    f'<rect x="0" y="0" width="320" height="{RY}" fill="var(--ch-l2)" opacity=".35"/>',
    f'<rect x="0" y="{RY}" width="320" height="{200-RY}" fill="var(--accent)" opacity=".06"/>',
    T(160, 38, "DEAD SIDE", "d3", "middle", ' style="fill:var(--ink-2)"'),
    T(160, 51, "no circuit traffic: descend here after an overhead join", "d2", "middle"),
    T(160, 128, "LIVE SIDE", "d3", "middle", ' style="fill:var(--ink-2)"'),
    T(160, 140, "circuit traffic", "d2", "middle"),
    f'<rect x="{RX0}" y="{RY-4}" width="{RX1-RX0}" height="8" fill="var(--rwy)"/>',
    L(f"M{RX0} {RY}H{XW+R}A{R} {R} 0 0 0 {XW} {RY+R}V{YD-R}A{R} {R} 0 0 0 {XW+R} {YD}"
      f"H{XB-R}A{R} {R} 0 0 0 {XB} {YD-R}V{RY+R}A{R} {R} 0 0 0 {XB-R} {RY}H{RX1+2}", "var(--accent)", 1.8, "6 3"),
    head(86, RY, 180, "var(--accent)", 4), head(XW, 134, 90, "var(--accent)", 4), head(144, YD, 0, "var(--accent)", 4),
    head(XB, 126, -90, "var(--accent)", 4), head(RX1 + 8, RY, 180, "var(--accent)", 4),
    P(184, YD, 90, "var(--accent)", .9),
    L(f"M{RX0} {YD-5}V{YD+5}", "var(--ink)", 1.2),
    T(160, 91, "Runway 27", "d2", "middle"), T(86, 91, "upwind", "d2", "middle"),
    T(236, 79, "final", "d2", "middle"), T(236, 90, "“final” call", "d2", "middle"),
    T(52, 133, "crosswind", "d2", "end"), T(268, 133, "base", "d2"),
    T(RX0, 177, "“downwind” call", "d2", "middle"), T(214, 177, "downwind", "d2", "middle"),
    L("M16 36V18", "var(--ink)", 1.2), head(16, 14, -90, "var(--ink)", 3.5), T(16, 46, "N", "d1", "middle"),
    T(312, 194, "Not to scale", "d2", "end"),
])
fig("live-dead-side", "Live side and dead side", 320, 200, b,
    "Left-hand circuit shown. Calls on downwind (abeam the upwind end) and final, plus base or late downwind if it "
    "helps others picture you.", "The circuit")

# ================= At the holding point ======================================================
YEL = "#f2c94c"                         # taxiway markings are yellow in both themes
b = "".join([
    T(10, 22, "Runway", "d1"),
    '<rect x="0" y="30" width="320" height="40" fill="var(--rwy)"/>', L("M0 50H320", "#fff", 1.5, "10 8"),
    '<rect x="120" y="70" width="60" height="130" fill="#6a7180"/>',
    L("M120 78H180M120 82H180", YEL, 2, "5 4"),          # dashed pair: runway side
    L("M120 88H180M120 94H180", YEL, 2),                  # solid pair: your side
    B(76, 86, 36, 16, "#d22", "#d22", 2), T(94, 98, "A1", "mono", "middle", ' style="fill:#fff;font-size:10px"'),
    P(150, 148, 315, "var(--accent)", 1.4),
    L("M184 80H196", "var(--ch-tx)", .7), T(200, 83, "Two dashed lines: runway side", "d2"),
    L("M184 91H196", "var(--ch-tx)", .7), T(200, 94, "Two solid lines: your side", "d2"),
    T(70, 98, "holding", "d2", "end"), T(70, 108, "point sign", "d2", "end"),
    T(112, 140, "Stop at an angle", "d1", "end", ' style="font-size:9px"'),
    T(112, 151, "to see the approach", "d2", "end"),
    T(190, 140, "Checks complete, then", "d2"), T(190, 152, "“ready for departure”", "d1", None, ' style="font-size:9px"'),
    B(190, 166, 122, 26, "var(--surface)", "var(--bad)", 6, 1.2),
    T(198, 177, "ATC aerodrome: never cross", "d2"), T(198, 187, "without a clearance", "d2"),
])
fig("holding-point", "At the holding point", 320, 200, b,
    "At an ATC aerodrome never cross onto the runway without a clearance. At A/G or AFIS aerodromes check the "
    "approach is clear yourself.", "Departure procedures")
