"""The standard overhead join, for the circuits topic (Skyway Code).

RWY 27, left-hand circuit to the south, as in the app's "Live side and dead side" figure.
Replaces the older overhead join figure that was in src/labs82.js.
"""
import math
from pplsvg import ACPATH, L, T

TOPIC = "Aerodrome operations and circuits (Skyway Code)"
W, H = 360, 250


def chevron(x, y, dx, dy, col, s=4.2):
    n = math.hypot(dx, dy); dx, dy = dx / n, dy / n; px, py = -dy, dx
    pts = [(x + dx * s, y + dy * s), (x - dx * s + px * s * .8, y - dy * s + py * s * .8),
           (x - dx * s - px * s * .8, y - dy * s - py * s * .8)]
    return f'<polygon points="{" ".join(f"{a:.1f},{b:.1f}" for a, b in pts)}" fill="{col}"/>'


def badge(x, y, n, r=8):
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="var(--bad)" stroke="var(--ch-land)" stroke-width="1.5"/>'
            + T(x, y + 3.2, n, "n", "middle"))


# geometry: 56 units ≈ 1 NM, north up
RX0, RX1, RY = 91, 169, 110          # runway ends and centreline
XW, XB, YD, R = 60, 200, 166, 14      # crosswind x, base x, downwind y, turn radius
OC, OR = (95, 82), 35                 # dead-side descent: centre and radius (exits on the crosswind line)
circuit = (f"M{RX0} {RY}H{XW+R}A{R} {R} 0 0 0 {XW} {RY+R}V{YD-R}A{R} {R} 0 0 0 {XW+R} {YD}"
           f"H{XB-R}A{R} {R} 0 0 0 {XB} {YD-R}V{RY+R}A{R} {R} 0 0 0 {XB-R} {RY}H{RX1+2}")
join = f"M130 240V{OC[1]}A{OR} {OR} 0 0 0 {XW} {OC[1]}V114"
arc_pt = (OC[0] + OR * math.cos(math.radians(45)), OC[1] - OR * math.sin(math.radians(45)))

b = "".join([
    f'<rect x="0" y="0" width="226" height="{RY}" fill="var(--ch-l2)" opacity=".35"/>',
    f'<rect x="0" y="{RY}" width="226" height="{H-RY}" fill="var(--accent)" opacity=".06"/>',
    T(186, 62, "DEAD SIDE", "d3", "middle", ' style="fill:var(--ink-2);font-size:11px"'),
    T(186, 74, "no circuit traffic", "d2", "middle"),
    T(170, 206, "LIVE SIDE", "d3", "middle", ' style="fill:var(--ink-2);font-size:11px"'),
    T(170, 218, "circuit traffic", "d2", "middle"),
    f'<rect x="{RX0}" y="{RY-4}" width="{RX1-RX0}" height="8" fill="var(--rwy)"/>',
    L(circuit, "var(--accent)", 1.8, "6 3"),
    chevron(124, YD, 1, 0, "var(--accent)"), chevron(XB, 138, 0, -1, "var(--accent)"),
    chevron(RX1 + 5, RY, -1, 0, "var(--accent)"),
    f'<g transform="translate(152 {YD}) rotate(90) scale(.85)"><path d="{ACPATH}" fill="var(--accent)" '
    'stroke="var(--surface)" stroke-width=".6" stroke-linejoin="round"/></g>',
    L(f"M{RX0} {YD-5}V{YD+5}", "var(--ink)", 1.2),
    L(f"M130 {YD-10}V{YD+10}", "var(--ch-land)", 7),          # halo: the join passes 1,000 ft over downwind
    L(join, "var(--bad)", 2.2),
    chevron(XW, 119, 0, 1, "var(--bad)", 4.8), chevron(130, 196, 0, -1, "var(--bad)", 4.8),
    chevron(*arc_pt, -1, -1, "var(--bad)", 4.8),
    badge(130, RY, 1), badge(OC[0], OC[1] - OR, 2), badge(XW, RY, 3), badge(XW, 140, 4),
    T(106, 127, "Runway 27", "d2", "middle"), T(139, 127, "2,000 ft QFE", "h"),
    T(95, 31, "descend to 1,000 ft", "h", "middle"), T(49, 107, "1,000 ft", "h", "end"),
    T(48, 143, "crosswind", "d2", "end"), T(84, 102, "upwind", "d2", "middle"),
    T(178, 181, "downwind", "d2", "middle"), T(XB + 6, 140, "base", "d2"),
    T(190, 91, "final", "d2", "middle"), T(190, 101, "“final” call", "d2", "middle"),
    T(RX0, 181, "“downwind” call", "d2", "middle"), T(136, 240, "arrive from any direction", "d2"),
    L("M16 36V18", "var(--ink)", 1.2), chevron(16, 16, 0, -1, "var(--ink)", 4), T(16, 46, "N", "d1", "middle"),
    L("M12 226H40", "var(--ink)", 1.2), chevron(42, 226, 1, 0, "var(--ink)", 4), T(10, 240, "W/V 270°/10 kt", "d2"),
])
steps = [("Overhead at 2,000 ft QFE", "1,000 ft above the circuit"), ("Descend on the dead side", "turning left, to 1,000 ft"),
         ("Cross the upwind end", "at circuit height"), ("Join crosswind", "then fly the circuit")]
for i, (a, s) in enumerate(steps):
    y = 12 + i * 46
    b += (f'<circle cx="244" cy="{y+10}" r="9" fill="var(--bad)"/>' + T(244, y + 13.5, i + 1, "n", "middle")
          + T(258, y + 8, a, "d1", None, ' style="font-size:8.4px"') + T(258, y + 19, s, "d2"))
b += (L("M236 204H252", "var(--bad)", 2.2) + T(258, 207, "overhead join", "d2")
      + L("M236 218H252", "var(--accent)", 1.8, "6 3") + T(258, 221, "left-hand circuit", "d2")
      + T(236, 240, "Not to scale", "d2"))

CAP = ("A joining aircraft gives way to traffic already in the circuit. Calls: “overhead”, “deadside descending”, "
       "then “downwind” abeam the upwind end and “final”. Check the UK AIP (AD 2) for local procedures.")
FIGS = [("overhead-join", "The overhead join", b, CAP, "The circuit", W, H)]
