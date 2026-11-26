"""Crosswind component (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Crosswind component (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Splitting the wind
fig('splitting-the-wind', 'Splitting the wind', 320, 200, "".join([
    '<rect x="148" y="40" width="24" height="150" fill="#555c6b"/>',
    dT(160, 186, 'RWY', 'd2', 'middle', 7, '#fff'),
    dL('M160 50V180', '#fff', 1, '6 5'),
    dA(258, 6, 166, 64, 'var(--accent)', 2.6),
    dT(312, 42, '20 kt, 60° off', 'd1', 'end', None, 'var(--accent)'),
    dA(166, 6, 166, 58, 'var(--good)', 2),
    dT(150, 24, 'headwind', 'd2', 'end'),
    dT(150, 36, '20 × cos 60 = 10 kt', 'd1', 'end', None, 'var(--good)'),
    dA(258, 64, 174, 64, 'var(--bad)', 2),
    dT(230, 84, 'crosswind', 'd2', 'middle'),
    dT(230, 96, '20 × sin 60 ≈ 17 kt', 'd1', 'middle', None, 'var(--bad)'),
    dL('M166 64m0-24a24 24 0 0 1 21 12', 'var(--ink)', 1),
    dT(186, 46, '60°', 'd2'),
]), 'Crosswind = wind speed × sin(angle). Headwind = wind speed × cos(angle). Past 90°, the headwind becomes a tailwind.', 'Finding the components')

# ---- Clock code rule of thumb
fig('clock-code-rule-of-thumb', 'Clock code rule of thumb', 320, 200, "".join([
    '<circle cx="96" cy="116" r="70" fill="var(--surface)" stroke="var(--ink-2)"/>',
    dL('M96 116L131 55', 'var(--accent)', 1.6),
    '<circle cx="131" cy="55" r="4" fill="var(--accent)"/>',
    dT('139', '59', '30°', 'd1'),
    dL('M96 116L145 67', 'var(--accent)', 1.6),
    '<circle cx="145" cy="67" r="4" fill="var(--accent)"/>',
    dT('153', '71', '45°', 'd1'),
    dL('M96 116L157 81', 'var(--accent)', 1.6),
    '<circle cx="157" cy="81" r="4" fill="var(--accent)"/>',
    dT('165', '85', '60°', 'd1'),
    dL('M96 116L166 116', 'var(--accent)', 1.6),
    '<circle cx="166" cy="116" r="4" fill="var(--accent)"/>',
    dT('174', '120', '90°', 'd1'),
    dL('M96 116V46', 'var(--ink)', 2),
    dT(96, 40, 'runway heading', 'd2', 'middle'),
    dB(210, 40, 104, 120, 'var(--surface)', 'var(--accent)'),
    dT(262, 58, 'Crosswind share', 'd1', 'middle'),
    dT(226, 82, '30°', 'd1'),
    dT(256, 82, 'half', 'd2'),
    dT(226, 102, '45°', 'd1'),
    dT(256, 102, '70%', 'd2'),
    dT(226, 122, '60°', 'd1'),
    dT(256, 122, '85%', 'd2'),
    dT(226, 142, '90°', 'd1'),
    dT(256, 142, 'all of it', 'd2'),
]), 'Quick mental maths: 30° off the runway gives half the wind as crosswind, 60° or more gives nearly all of it.', 'Finding the components')
