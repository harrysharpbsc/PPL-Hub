"""Rules of the Air: the 14 figures that were hand-written (hub.html DIAG, labs81.js, labs83notes.js), redrawn.

Same facts and geometry as before, in the generator style. Wording follows Harry's note "03 Rules of the Air".
The interception and simulated-instrument-flight figures for this topic are in rules_of_the_air.py.
"""
import math

from pplsvg import ACPATH, B, L, P, T, head, side

TOPIC = "Rules of the Air"
FIGS = []
RED, GRN, WHT = "#e0262b", "#2fa84f", "#ffffff"   # navigation light colours: the same in both themes


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


def acl(x, y, hdg, sc=1.3, col="var(--ink)", lights=True):
    """Plan-view aircraft with navigation lights that turn with it (red left, green right, white tail)."""
    g = (f'<g transform="translate({x} {y}) rotate({hdg}) scale({sc})"><path d="{ACPATH}" fill="{col}" '
         'stroke="var(--surface)" stroke-width=".6" stroke-linejoin="round"/>')
    if lights:
        g += (f'<circle cx="-10.3" cy="-3.3" r="1.9" fill="{RED}" stroke="var(--surface)" stroke-width=".5"/>'
              f'<circle cx="10.3" cy="-3.3" r="1.9" fill="{GRN}" stroke="var(--surface)" stroke-width=".5"/>'
              f'<circle cx="0" cy="10.6" r="1.6" fill="{WHT}" stroke="var(--ink)" stroke-width=".4"/>')
    return g + "</g>"


def pt(cx, cy, r, brg):
    """Point at bearing brg (degrees clockwise from up) and distance r."""
    a = math.radians(brg)
    return cx + r * math.sin(a), cy - r * math.cos(a)


def sector(cx, cy, r, b0, b1, col, op):
    x0, y0 = pt(cx, cy, r, b0); x1, y1 = pt(cx, cy, r, b1)
    large = 1 if (b1 - b0) % 360 > 180 else 0
    return (f'<path d="M{cx} {cy}L{x0:.1f} {y0:.1f}A{r} {r} 0 {large} 1 {x1:.1f} {y1:.1f}Z" fill="{col}" '
            f'opacity="{op}"/>')


def arc_arrow(d, col="var(--accent)", w=1.6, tip=None, ang=0, dash=None):
    """A curved path with an arrowhead at `tip` pointing at `ang` degrees (0 = east, 90 = south)."""
    return L(d, col, w, dash) + (head(tip[0], tip[1], ang, col, 4) if tip else "")


def sock(x, y, a):
    return (f'<g transform="translate({x} {y}) rotate({a})"><path d="M0 0V16" stroke="var(--ink-2)" stroke-width="1.2"/>'
            '<path d="M0 0L18 2.5V5.5L0 8Z" fill="#e8742c"/><path d="M6 1V7M12 2V6" stroke="#fff" stroke-width="1.6"/></g>')


def halo(extra=""):
    return f' style="paint-order:stroke;stroke:var(--ch-land);stroke-width:3px;stroke-linejoin:round{extra}"'


# ================= Right of way ==============================================================
b = "".join([
    L("M92 76H228", "var(--ink-2)", 1, "4 3"), T(160, 70, "collision course", "d2", "middle"),
    acl(70, 76, 90, 1.3, "var(--accent)", False), acl(250, 76, 270, 1.3, "var(--ink)", False),
    arc_arrow("M88 84Q132 84 136 112", tip=(137, 118), ang=88),
    arc_arrow("M232 68Q188 68 184 40", "var(--ink)", tip=(183, 34), ang=-92),
    T(70, 104, "you", "d2", "middle"), T(250, 54, "other", "d2", "middle"),
    T(136, 132, "you turn right", "d2", "middle"), T(184, 24, "it turns right", "d2", "middle"),
    T(160, 156, "Both turn right", "d1", "middle"), T(160, 168, "so each passes with the other on its left", "d2", "middle"),
])
fig("head-on", "Head-on", 320, 178, b,
    "If there is danger of collision, each aircraft turns right, so they pass with the other on their left.",
    "Right of way")

b = "".join([
    L("M110 134V24", "var(--accent)", 1, "4 3"), L("M226 70H24", "var(--ink-2)", 1, "4 3"),
    f'<circle cx="110" cy="70" r="7" fill="none" stroke="var(--bad)" stroke-width="1.4"/>',
    T(100, 58, "collision point", "d2", "end", ' style="fill:var(--bad)"'),
    acl(110, 150, 0, 1.3, "var(--accent)", False), acl(244, 70, 270, 1.3, "var(--ink)", False),
    arc_arrow("M118 130Q122 104 150 98", tip=(156, 97), ang=-8),
    T(126, 152, "A: B is on its right,", "d1"), T(126, 164, "so A gives way: turn right", "d2"),
    T(126, 174, "and pass behind B", "d2"),
    T(244, 96, "B: holds its", "d1", "middle"), T(244, 108, "heading and speed", "d2", "middle"),
])
fig("converging", "Converging", 320, 184, b,
    "Same category at about the same level: the aircraft that has the other on its right gives way.", "Right of way")

cx, cy, r = 160, 66, 95
e1, e2 = pt(cx, cy, r, 110), pt(cx, cy, r, 250)
a1, a2 = pt(cx, cy, 30, 110), pt(cx, cy, 30, 250)
m1, m2 = pt(cx, cy, 44, 145), pt(cx, cy, 44, 215)
b = "".join([
    sector(cx, cy, r, 110, 250, "var(--mid)", .22),
    L(f"M{cx} {cy}L{e1[0]:.1f} {e1[1]:.1f}M{cx} {cy}L{e2[0]:.1f} {e2[1]:.1f}", "var(--mid)", 1.2, "4 3"),
    L(f"M{cx} {cy}V{cy+r}", "var(--mid)", .8, "2 3"),
    L(f"M{a1[0]:.1f} {a1[1]:.1f}A30 30 0 0 1 {cx} {cy+30}M{cx} {cy+30}A30 30 0 0 1 {a2[0]:.1f} {a2[1]:.1f}", "var(--mid)", 1),
    T(round(m1[0]), round(m1[1]) + 4, "70°", "d1", "middle", halo(";fill:var(--mid)")),
    T(round(m2[0]), round(m2[1]) + 4, "70°", "d1", "middle", halo(";fill:var(--mid)")),
    P(cx, cy, 0, "var(--ink)", 1.6), P(cx, 150, 0, "var(--accent)", 1.4),
    arc_arrow(f"M{cx+8} 136Q{cx+34} 122 {cx+40} 98", tip=(cx + 41, 92), ang=-80),
    T(12, 22, "Being overtaken:", "d1"), T(12, 34, "has right of way,", "d2"), T(12, 44, "holds heading and speed", "d2"),
    T(308, 168, "Overtaker:", "d1", "end"), T(308, 180, "keeps out of the way", "d2", "end"),
    T(308, 190, "by turning right", "d2", "end"),
    T(cx, 186, "inside 70° of the tail = overtaking", "d2", "middle"),
])
fig("overtaking-70", "Overtaking: the 70° rule", 320, 198, b,
    "Approaching from inside 70° either side of the other aircraft's tail counts as overtaking, climbing, level or "
    "descending.", "Right of way")

rows = [("Balloons", "give way to nobody", "var(--good)"), ("Sailplanes", "give way to balloons", "var(--good)"),
        ("Airships", "give way to sailplanes and balloons", "var(--mid)"),
        ("Aircraft towing", "powered aircraft give way to them", "var(--mid)"),
        ("Powered aircraft", "give way to all of the above", "var(--bad)")]
b = ""
for i, (name, rule, col) in enumerate(rows):
    y = 12 + i * 32
    b += (f'<rect x="10" y="{y}" width="{300 - i*0}" height="26" rx="5" fill="{col}" opacity=".14"/>'
          + f'<circle cx="26" cy="{y+13}" r="9" fill="{col}"/>' + T(26, y + 16.2, i + 1, "n", "middle")
          + T(42, y + 17, name, "d1") + T(140, y + 17, rule, "d2"))
b += T(160, 186, "Same kind? The one with the other on its right gives way.", "d1", "middle", ' style="font-size:9px"')
fig("give-way-order", "Who gives way when converging", 320, 196, b,
    "Less manoeuvrable aircraft have priority: 1 has the most. Between two of the same kind, the one with the other on "
    "its right gives way.", "Right of way")

# ================= Lights on aircraft =========================================================
cx, cy, r = 160, 100, 80
b = "".join([
    sector(cx, cy, r, 0, 110, GRN, .35), sector(cx, cy, r, 250, 360, RED, .35), sector(cx, cy, r, 110, 250, "#c9cbd1", .5),
    P(cx, cy, 0, "var(--ink)", 2.6),
    f'<circle cx="{cx+27}" cy="{cy-9}" r="3.6" fill="{GRN}" stroke="var(--surface)"/>',
    f'<circle cx="{cx-27}" cy="{cy-9}" r="3.6" fill="{RED}" stroke="var(--surface)"/>',
    f'<circle cx="{cx}" cy="{cy+28}" r="3.4" fill="{WHT}" stroke="var(--ink)"/>',
    T(258, 58, "Green: right wing", "d1", "middle"), T(258, 70, "110° from dead ahead", "d2", "middle"),
    T(62, 58, "Red: left wing", "d1", "middle"), T(62, 70, "110° from dead ahead", "d2", "middle"),
    T(cx, 196, "White: tail, 70° each side of dead astern", "d1", "middle"),
    T(cx, 14, "dead ahead", "d2", "middle"),
])
fig("nav-light-sectors", "Navigation light sectors (seen from above)", 320, 204, b,
    "Red left, green right, white behind. Seeing both red and green means the other aircraft is coming straight at you.",
    "Lights on aircraft")

b = "".join([
    L("M170 200V48M170 200L62 132M170 200L278 132M170 200L74 52M170 200L266 52", "var(--line)", 1, "2 3"),
    acl(170, 212, 0, 1.5, "var(--accent)"), T(146, 228, "You", "d1", "end"),
    acl(170, 36, 180, 1.4), T(170, 64, "Red and green: head-on", "d1", "middle", ' style="fill:var(--bad)"'),
    T(170, 76, "both turn right", "d2", "middle"),
    acl(62, 128, 90, 1.4), T(62, 104, "Green on your left", "d1", "middle", ' style="fill:var(--good)"'),
    T(62, 154, "it gives way to you;", "d2", "middle"), T(62, 164, "hold heading and speed", "d2", "middle"),
    acl(278, 128, -90, 1.4), T(278, 104, "Red on your right", "d1", "middle", ' style="fill:var(--bad)"'),
    T(278, 154, "it is on your right:", "d2", "middle"), T(278, 164, "you give way", "d2", "middle"),
    acl(56, 40, 200, 1.3), T(56, 16, "Red to red: safe", "d1", "middle", ' style="fill:var(--good)"'),
    acl(284, 40, 160, 1.3), T(284, 16, "Green to green: safe", "d1", "middle", ' style="fill:var(--good)"'),
    T(276, 208, "White only: it is", "d2", "middle"), T(276, 218, "flying away from you", "d2", "middle"),
])
fig("lights-at-night", "Reading another aircraft's lights at night", 340, 240, b,
    "Your red is on your left, your green on your right. Matching colours on the same side mean the paths will not "
    "cross; red facing green means risk. Check the bearing as well.", "Lights on aircraft")

# ================= Collision avoidance =======================================================
b = L("M250 204V40", "var(--accent)", 1.2, "3 3") + L("M70 40H250", "var(--ink-2)", 1.2, "3 3")
b += f'<circle cx="250" cy="40" r="6" fill="var(--bad)" opacity=".85"/>' + T(262, 36, "collision", "d1", None, ' style="fill:var(--bad)"')
for i, (yy, xx) in enumerate([(190, 100), (140, 150), (90, 200)]):
    b += L(f"M250 {yy-12}L{xx+10} 50", "var(--good)", 1.2)
    b += P(250, yy, 0, "var(--accent)", 1.2) + P(xx, 40, 90, "var(--ink)", 1.2)
    b += T(xx, 24, f"t{i+1}", "d2", "middle") + T(266, yy + 4, f"t{i+1}", "d2")
    b += f'<path d="M250 {yy-30}A18 18 0 0 0 {250-12.7:.1f} {yy-12-12.7:.1f}" fill="none" stroke="var(--mid)" stroke-width="1.4"/>'
b += T(214, 122, "same angle", "d1", "end", halo(";fill:var(--mid)")) + T(214, 134, "every time", "d2", "end", halo())
# windscreen inset: the other aircraft does not move, it only grows
b += ('<g transform="translate(14 118)"><path d="M0 6Q60-6 120 6L114 74H6Z" fill="var(--ch-wt)" stroke="var(--ink)" stroke-width="1.4"/>'
      '<path d="M6 52H114L114 74H6Z" fill="var(--ch-l1)"/><path d="M3 50H117" stroke="var(--good)" stroke-width="1.4"/>'
      '<path d="M60 2V74" stroke="var(--ink)" stroke-width="2.2"/>'
      '<g transform="translate(34 36)"><path d="M-9 0H7L10-3L12-1L9 2H-9Z" fill="var(--ink)"/><path d="M-4 0L-1-6H2L1 0Z" fill="var(--ink)"/></g>'
      '<circle cx="34" cy="36" r="13" fill="none" stroke="var(--bad)" stroke-width="1.2" stroke-dasharray="3 2"/></g>')
b += T(74, 108, "Your view at t1, t2 and t3", "d2", "middle") + T(74, 206, "It stays still in your windscreen", "d1", "middle", ' style="font-size:9px"')
fig("constant-bearing", "Constant bearing means a collision course", 320, 214, b,
    "If another aircraft keeps the same relative bearing while its range closes, you will collide. In the windscreen "
    "it does not move, it just grows. Change heading or height to break it.", "Collision avoidance")

# ================= Flights near an aerodrome =================================================
b = "".join([
    '<rect x="70" y="142" width="180" height="16" fill="var(--rwy)"/>', L("M86 150H234", "#fff", 1, "8 6"),
    T(78, 154, "09", "mono", "middle", ' style="fill:#fff;font-size:8px"'), T(242, 154, "27", "mono", "middle", ' style="fill:#fff;font-size:8px"'),
    L("M250 150H282Q296 150 296 136V62Q296 48 282 48H38Q24 48 24 62V136Q24 150 38 150H70", "var(--accent)", 1.8, "6 3"),
    head(276, 150, 0, "var(--accent)", 4), head(296, 98, -90, "var(--accent)", 4), head(156, 48, 180, "var(--accent)", 4),
    head(24, 104, 90, "var(--accent)", 4), head(56, 150, 0, "var(--accent)", 4),
    P(160, 150, 90, "var(--accent)", 1.0),
    T(268, 172, "upwind", "d2", "middle"), T(288, 100, "crosswind", "d2", "end"), T(160, 40, "downwind", "d2", "middle"),
    T(32, 100, "base", "d2"), T(40, 172, "final", "d2", "middle"),
    sock(150, 80, 180), T(140, 104, "windsock", "d2", "middle"),
    L("M240 90H202", "var(--ink-2)", 1.6) + head(198, 90, 180, "var(--ink-2)", 4), T(220, 82, "wind", "d2", "middle"),
    T(160, 128, "Left-hand unless signals say otherwise", "d1", "middle", ' style="font-size:9px"'),
    T(160, 194, "Straight in: long final 8 to 4 NM, final within 4 NM", "d2", "middle"),
])
fig("join-the-pattern", "Join the pattern: all turns to the left", 320, 204, b,
    "Conform to the circuit other traffic is flying, or keep clear of it. Take off and land into wind. On a "
    "straight-in approach report long final at 8 NM and final at 4 NM.", "Flights near an aerodrome")

# ================= Order of landing ==========================================================
b = "".join([
    '<rect x="30" y="26" width="260" height="142" rx="4" fill="var(--ch-l1)" stroke="var(--ch-tx)" stroke-width=".8"/>',
    T(40, 40, "grass landing area", "d2"), sock(262, 8, 0), T(256, 18, "wind from the west", "d2", "end"),
    L("M300 72H202", "var(--accent)", 1.2), L("M174 72H156", "var(--accent)", 1.6, "5 3") + head(150, 72, 180, "var(--accent)", 4),
    acl(186, 72, -90, 1.3, "var(--accent)", False), T(196, 58, "Landing: leaves it on its left", "d1", "middle", ' style="fill:var(--accent)"'),
    L("M300 128H132", "var(--ink-2)", 1.2), L("M106 128Q84 128 84 150", "var(--ink-2)", 1.6, "5 3") + head(84, 156, 90, "var(--ink-2)", 4),
    acl(118, 128, -90, 1.3, "var(--ink)", False),
    T(200, 118, "Already landed: turns left", "d1", "middle"), T(200, 146, "once sure it will not get in the way", "d2", "middle"),
    T(160, 186, "Taking off: leave earlier departures on your left too", "d1", "middle", ' style="font-size:9px"'),
    T(160, 198, "After landing, clear the landing area as soon as possible", "d2", "middle"),
])
fig("no-runway", "No runway: keep earlier traffic on your left", 320, 206, b,
    "Where take-offs and landings are not confined to a runway, newer traffic stays to the right of older traffic, "
    "and turns on the landing area are to the left.", "Order of landing")

# ================= Radio in the ATZ: right-hand traffic rule =================================
ticks = "".join(f"M{12+i*10} {112-i*0.8-4:.1f}V{112-i*0.8+4:.1f}" for i in range(31))
b = "".join([
    L("M10 112L310 88", "var(--ink-2)", 3), L(ticks, "var(--ink-2)", 1.2), T(16, 130, "railway, road, canal or coast", "d2"),
    L("M20 152H96", "var(--accent)", 1.2, "4 3"), acl(110, 150, 90, 1.4, "var(--accent)", False),
    L("M126 150L164 149", "var(--accent)", 1.6) + head(170, 149, -1, "var(--accent)", 4),
    L("M300 52H222", "var(--accent)", 1.2, "4 3"), acl(208, 52, -90, 1.4, "var(--accent)", False),
    L("M192 52L156 53", "var(--accent)", 1.6) + head(150, 53, 179, "var(--accent)", 4),
    T(60, 176, "Heading east: line on the left", "d1"), T(262, 30, "Heading west: line on the left", "d1", "end"),
    T(160, 196, "Both keep to the right, so they pass apart", "d2", "middle"),
])
fig("line-feature", "Following a line feature: keep it on your left", 320, 204, b,
    "No longer a legal requirement under SERA, but the CAA strongly recommends it. In controlled airspace follow ATC "
    "instead.", "Radio in the ATZ")

# ================= Low flying ================================================================
b = "".join([
    '<path d="M0 170H320V200H0Z" fill="var(--ch-l1)"/>',
    '<path d="M10 170V150h12v20M28 170V140h10v30M44 170V156h16v14" fill="var(--ch-tn)" stroke="var(--ch-tnl)"/>',
    '<g fill="var(--ch-tn)" stroke="var(--ch-tnl)"><path d="M180 170V146h14v24M200 170V132h10v38M214 170V150h20v20M240 170V138h12v32M258 170V152h18v18M282 170V128h8v42"/></g>',
    side(70, 108, 1.0, flip=True), f'<circle cx="70" cy="108" r="54" fill="none" stroke="var(--accent)" stroke-dasharray="4 3"/>',
    L("M70 116V156", "var(--accent)", 1.2) + head(70, 161, 90, "var(--accent)", 3.5), T(76, 142, "500 ft", "d1", None, halo()),
    T(70, 22, "Anywhere (UK, day):", "d1", "middle"), T(70, 34, "500 ft from any person,", "d2", "middle"),
    T(70, 44, "vehicle, vessel or structure", "d2", "middle"),
    side(236, 72, 1.0, flip=True), L("M168 128H306", "var(--bad)", 1, "3 3"),
    L("M240 82V120", "var(--bad)", 1.2) + head(240, 126, 90, "var(--bad)", 3.5), T(246, 106, "1,000 ft", "d1", None, ' style="fill:var(--bad)"'),
    L("M176 186H304", "var(--ink-2)", 1), L("M176 182V190M304 182V190", "var(--ink-2)", 1),
    T(240, 197, "highest obstacle within 600 m", "d2", "middle"),
    T(240, 22, "Congested area:", "d1", "middle"), T(240, 34, "1,000 ft above the highest obstacle", "d2", "middle"),
    T(240, 44, "and able to land clear", "d2", "middle"),
])
fig("low-flying-minima", "Low flying minima (UK, day)", 320, 202, b,
    "Except for take-off and landing, keep 500 ft from people and things. Over towns and assemblies, 1,000 ft above "
    "the highest obstacle within 600 m.", "Low flying prohibitions")


def skyline(x0, y0, blocks):
    d = f"M{x0} {y0}"
    for bx, bh, bw in blocks:
        d += f"H{bx}V{y0-bh}H{bx+bw}V{y0}"
    return f'<path d="{d}Z" fill="var(--ch-tn)" stroke="var(--ch-tnl)" stroke-width=".8"/>'


b = "".join([
    '<path d="M0 182H320V212H0Z" fill="var(--ch-l1)"/>',
    skyline(70, 182, [(74, 6, 30), (106, 14, 14), (122, 22, 20), (146, 40, 18), (166, 58, 16), (184, 34, 22), (208, 20, 18), (228, 12, 26), (256, 6, 20)]),
    L("M173 124V108", "var(--ch-tnl)", 1.6), T(20, 200, "open fields", "d2"), T(300, 200, "fields", "d2", "end"),
    side(174, 30, 1.0, flip=True), L("M150 108H200", "var(--bad)", 1, "3 3"),
    L("M174 40V100", "var(--bad)", 1.4) + head(174, 106, 90, "var(--bad)", 3.5), T(180, 78, "1,000 ft", "d1", None, halo(";fill:var(--bad)")),
    L("M174 40L100 182M174 40L248 182", "var(--accent)", 1, "2 3"),
    L("M100 194H248M100 190V198M248 190V198", "var(--accent)", 1), T(174, 207, "highest obstacle within 600 m", "d2", "middle"),
    L("M168 40L40 176", "var(--good)", 1.4, "6 4"), T(16, 140, "glide range", "d1", None, halo(";fill:var(--good)")),
    T(16, 151, "reaches open ground", "d2", None, halo()),
])
fig("congested-area", "Congested area: 1,000 ft and able to land clear", 320, 214, b,
    "Over a city, town or settlement fly at least 1,000 ft above the highest obstacle within 600 m, and high enough "
    "to glide clear if the engine stops. Landing clear is the pilot's job, not ATC's.", "Low flying prohibitions")

b = "".join([
    '<path d="M0 172H320V200H0Z" fill="var(--ch-l1)"/>', L("M160 14V196", "var(--line)", 1),
    T(80, 22, "EASA, and UK at night", "d1", "middle"), T(80, 34, "500 ft above the ground or the", "d2", "middle"),
    T(80, 44, "highest obstacle within 150 m", "d2", "middle"),
    '<path d="M116 172V140h8v32Z" fill="var(--ch-tn)" stroke="var(--ch-tnl)"/>', L("M28 84H152", "var(--bad)", 1, "3 3"),
    side(70, 70, .9, flip=True), L("M120 86V132", "var(--bad)", 1.2) + head(120, 138, 90, "var(--bad)", 3.5),
    T(126, 114, "500 ft", "d1", None, ' style="fill:var(--bad)"'),
    L("M70 160H114M70 156V164M114 156V164", "var(--ink-2)", 1), L("M70 80V154", "var(--ink-2)", .8, "2 3"),
    T(92, 154, "150 m", "d2", "middle"),
    T(240, 22, "UK by day", "d1", "middle"), T(240, 34, "500 ft from any person,", "d2", "middle"),
    T(240, 44, "vehicle, vessel or structure", "d2", "middle"),
    '<path d="M250 168l14 0l-3 4h-10Z" fill="var(--ink)"/><path d="M257 166V146l8 18Z" fill="var(--ink)"/>',
    '<path d="M200 172A57 57 0 0 1 314 172" fill="var(--bad)" opacity=".12" stroke="var(--bad)" stroke-dasharray="4 3"/>',
    side(200, 100, .9, flip=True), L("M216 108L236 122", "var(--bad)", 1.2) + head(240, 125, 36, "var(--bad)", 3.5),
    T(268, 100, "500 ft bubble", "d1", "middle", ' style="fill:var(--bad)"'),
    T(240, 190, "lower over open ground is allowed", "d2", "middle"),
])
fig("500ft-rule", "The 500 ft rule: EASA and UK compared", 320, 200, b,
    "EASA sets a height above the surface. The UK day rule is a 500 ft bubble around people and things instead. "
    "Take-off and landing are exempt from both.", "Low flying prohibitions")

# ================= Open-air assemblies =======================================================
b = "".join([
    '<ellipse cx="110" cy="160" rx="96" ry="30" fill="none" stroke="var(--mid)" stroke-dasharray="5 4"/>',
    '<ellipse cx="110" cy="158" rx="40" ry="13" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.4"/>',
    '<ellipse cx="110" cy="156" rx="26" ry="7" fill="var(--ch-l1)" stroke="var(--ink-2)"/>',
    '<path d="M70 158V164A40 13 0 0 0 150 164V158" fill="none" stroke="var(--ink)" stroke-width="1.4"/>',
    T(110, 186, "over 1,000 people", "d2", "middle"),
    side(110, 28, .9, flip=True), L("M110 40V134", "var(--bad)", 1.4) + head(110, 140, 90, "var(--bad)", 3.5),
    T(116, 76, "1,000 ft above the", "d1", None, ' style="fill:var(--bad)"'), T(116, 88, "highest obstacle", "d2"),
    T(116, 98, "within 600 m, or", "d2"), T(116, 108, "enough to land clear", "d2"), T(116, 118, "if that is higher", "d2"),
    side(282, 100, .8), L("M262 110L214 148", "var(--mid)", 1.4, "5 3") + head(209, 152, 141, "var(--mid)", 3.5),
    T(276, 134, "No take-off or", "d1", "middle", ' style="fill:var(--mid)"'),
    T(276, 147, "landing within", "d1", "middle", ' style="fill:var(--mid)"'),
    T(276, 160, "1,000 m", "d1", "middle", ' style="fill:var(--mid)"'),
    T(266, 178, "unless at an aerodrome", "d2", "middle"), T(266, 190, "or with permission", "d2", "middle"),
])
fig("open-air-assemblies", "Open-air assemblies of more than 1,000 people", 320, 200, b,
    "UK: written CAA permission is needed to fly lower. The 1,000 m take-off and landing ban has exceptions at "
    "aerodromes (CAA procedures) and at other sites with the organiser's permission.", "Open-air assemblies")
