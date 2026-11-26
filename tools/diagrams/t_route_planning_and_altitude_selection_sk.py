"""Route planning and altitude selection (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Route planning and altitude selection (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Maximum Elevation Figure
fig('maximum-elevation-figure', 'Maximum Elevation Figure', 320, 200, "".join([
    '<rect x="20" y="20" width="160" height="160" fill="var(--ch-l1)" stroke="var(--ink-2)"/><path d="M40 150Q80 90 110 120T170 110V180H40Z" fill="var(--ch-l3)" opacity=".7"/><path d="M120 112l4 10h-8z" fill="var(--ink)"/>',
    dT(128, 110, 'mast 1,840', 'd2', None, 7.4),
    '<path d="M70 120l3 6h-6z" fill="var(--ink)"/>',
    dT(76, 118, '1,480', 'd2', None, 7.4),
    '<text x="60" y="80" font-family="var(--f-display)" font-weight="700" font-size="30" fill="var(--accent)">1</text><text x="80" y="70" font-family="var(--f-display)" font-weight="700" font-size="18" fill="var(--accent)">9</text>',
    dB(192, 20, 122, 160, 'var(--surface)', 'var(--accent)'),
    dT(253, 38, 'MEF 1,900 ft means:', 'd1', 'middle'),
    dT(253, 56, 'higher of', 'd2', 'middle'),
    dT(253, 68, 'highest obstacle, or', 'd2', 'middle'),
    dT(253, 80, 'highest terrain + 300 ft,', 'd2', 'middle'),
    dT(253, 92, 'rounded up', 'd2', 'middle'),
    dT(253, 118, 'It has no margin.', 'd1', 'middle', None, 'var(--bad)'),
    dT(253, 134, 'Add 500 or 1,000 ft', 'd2', 'middle'),
    dT(253, 146, 'for your safety altitude', 'd2', 'middle'),
]), 'A made-up quadrangle. The big figure is in thousands and hundreds of feet. Study 5 NM either side of your track.', 'Maximum Elevation Figure')

# ---- Planning the descent
fig('planning-the-descent', 'Planning the descent', 320, 200, "".join([
    '<path d="M0 176H320V200H0Z" fill="var(--ch-l1)"/><rect x="250" y="170" width="50" height="6" fill="#555c6b"/>',
    dL('M20 30L250 170', 'var(--accent)', 2.4),
    dSide(30, 34, 0.9, 'var(--accent)'),
    '<circle cx="20" cy="30" r="3" fill="var(--accent)"/>',
    dT(4, 60, '4,000 ft', 'd2'),
    '<circle cx="97" cy="77" r="3" fill="var(--accent)"/>',
    dT(89, 93, '3,000 ft', 'd2', 'end'),
    '<circle cx="173" cy="123" r="3" fill="var(--accent)"/>',
    dT(165, 139, '2,000 ft', 'd2', 'end'),
    dT(200, 40, '3 NM per 1,000 ft', 'd1', 'middle'),
    dT(200, 54, 'Rate: ground speed × 5', 'd2', 'middle'),
    dT(200, 66, '100 kt ≈ 500 ft/min (3°)', 'd2', 'middle'),
]), 'From 4,000 ft to land, start about 12 NM out. 3° is about 300 ft per NM.', 'Choosing a cruising altitude')

# ---- Take 2 around airspace
fig('take-2-around-airspace', 'Take 2 around airspace', 320, 200, "".join([
    '<rect x="150" y="20" width="160" height="80" fill="color-mix(in srgb,#2457c5 10%,transparent)" stroke="#2457c5" stroke-width="1.8" stroke-dasharray="7 3"/>',
    dT(230, 40, 'CTA base 2,500 ft', 'd1', 'middle', None, '#2457c5'),
    dL('M150 112H310', 'var(--good)', 1.4, '4 3'),
    dA(290, 102, 290, 112, 'var(--good)', 1),
    dT(230, 126, '200 ft below the base', 'd1', 'middle', None, 'var(--good)'),
    dSide(220, 150, 1, 'var(--accent)'),
    dL('M138 20V100', 'var(--good)', 1.4, '4 3'),
    dT(100, 60, '2 NM', 'd1', 'middle', None, 'var(--good)'),
    dA(110, 64, 136, 64, 'var(--good)', 1),
    dT(70, 150, 'Use the QNH for', 'd2', 'middle'),
    dT(70, 162, 'the airspace above', 'd2', 'middle'),
]), 'Stay 2 NM from edges and 200 ft below bases of controlled airspace, danger areas and ATZs, more in turbulence.', 'Avoiding infringements')
