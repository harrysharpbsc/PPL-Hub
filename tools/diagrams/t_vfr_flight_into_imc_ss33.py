"""VFR flight into IMC (SS33): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'VFR flight into IMC (SS33)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- The 180° turn out of cloud
fig('the-180-turn-out-of-cloud', 'The 180° turn out of cloud', 320, 200, "".join([
    '<path d="M160 170V110A50 50 0 0 1 260 110V170" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-dasharray="6 4"/>',
    dA(260, 140, 260, 176, 'var(--accent)', 2.4),
    dP(160, 160, 0, 'var(--ink)', 1.5),
    '<path d="M30 80q-36 0 -24 -30q0 -36 36 -30q16.5 -42 44 -18q33 -24 49.5 15q36 6 24 33q0 30 -30 30Z" fill="#c7ced6" stroke="#9aa6b3" stroke-width=".8"/>',
    dT(85, 62, 'cloud ahead', 'd1', 'middle'),
    dB(210, 14, 104, 74, 'var(--surface)', 'var(--accent)'),
    dT(262, 30, 'Rate 1 turn', 'd1', 'middle'),
    dT(262, 43, 'bank no more than 20°', 'd2', 'middle', 7.4),
    dT(262, 56, '180° takes 1 minute', 'd2', 'middle', 7.4),
    dT(262, 69, 'back pressure to', 'd2', 'middle', 7.4),
    dT(262, 80, 'hold height', 'd2', 'middle', 7.4),
    dT(110, 140, 'note the target', 'd2', 'end'),
    dT(110, 151, 'heading first', 'd2', 'end'),
    dT(272, 190, 'roll out, hold it', 'd2', 'middle'),
]), 'Trust the instruments, keep the wings level, then make a gentle rate 1 turn. Without a heading indicator, time it: 1 minute for 180°.', 'The 180')

# ---- Tricks your balance can play
fig('tricks-your-balance-can-play', 'Tricks your balance can play', 320, 200, "".join([
    dB(8, 10, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(57, 28, 'The leans', 'd1', 'middle'),
    dT(57, 68, 'you feel level', 'd2', 'middle', 7),
    dT(57, 79, 'but are banked', 'd2', 'middle', 7),
    '<g transform="translate(57 46) rotate(-15)"><path d="M-22 0H22M-3 0V-6" stroke="var(--accent)" stroke-width="3"/></g>',
    dB(112, 10, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(161, 28, 'Somatogravic', 'd1', 'middle'),
    dT(161, 68, 'speeding up feels', 'd2', 'middle', 7),
    dT(161, 79, 'like pitching up', 'd2', 'middle', 7),
    '<g transform="translate(161 46) rotate(-12)"><path d="M-20 0H18L22-4" stroke="var(--accent)" stroke-width="3" fill="none"/></g>',
    dA(132, 54, 188, 54, 'var(--bad)', 1),
    dB(216, 10, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(265, 28, 'Coriolis', 'd1', 'middle'),
    dT(265, 68, 'head moves in a turn:', 'd2', 'middle', 7),
    dT(265, 79, 'false rotation', 'd2', 'middle', 7),
    '<path d="M246 46a18 10 0 1 0 36 0" stroke="var(--accent)" stroke-width="2" fill="none"/>',
    dB(8, 104, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(57, 122, 'Inversion', 'd1', 'middle'),
    dT(57, 162, 'abrupt level-off', 'd2', 'middle', 7),
    dT(57, 173, 'feels like tumbling', 'd2', 'middle', 7),
    '<path d="M42 136h30M57 128v18" stroke="var(--accent)" stroke-width="2.4"/>',
    dB(112, 104, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(161, 122, 'False horizon', 'd1', 'middle'),
    dT(161, 162, 'sloping cloud tops', 'd2', 'middle', 7),
    dT(161, 173, 'look level', 'd2', 'middle', 7),
    '<path d="M130 150L192 134" stroke="#9aa6b3" stroke-width="6"/>',
    dB(216, 104, 98, 84, 'var(--bad)', 'var(--bad)', 6).replace('fill="var(--bad)"', 'fill="var(--bad)" fill-opacity=".1"', 1),
    dT(265, 130, 'If you enter cloud:', 'd1', 'middle', None, 'var(--bad)'),
    dT(265, 148, 'aviate, navigate,', 'd2', 'middle', 7.4),
    dT(265, 160, 'communicate', 'd2', 'middle', 7.4),
]), 'Spatial disorientation is the killer in VFR into IMC. Your inner ear is wrong; the attitude indicator is right.', 'Spatial disorientation types')

# ---- VFR on top and the 3,000 ft rule
fig('vfr-on-top-and-the-3-000-ft-rule', 'VFR on top and the 3,000 ft rule', 320, 200, "".join([
    '<path d="M0 170H320V200H0Z" fill="var(--ch-l1)"/><path d="M0 170L40 160L80 166L120 150L160 162L200 156L240 166L280 154L320 164V170Z" fill="var(--ch-l2)"/><path d="M0 108Q60 96 120 108T240 106T320 104V128H0Z" fill="#d7dde3" stroke="#9aa6b3"/>',
    dL('M0 92H320', 'var(--bad)', 1.2, '5 3'),
    dT(316, 88, '3,000 ft AMSL', 'd1', 'end', None, 'var(--bad)'),
    dSide(90, 60, 1.1, 'var(--accent)'),
    dT(90, 24, 'Above 3,000 ft: 5 km,', 'd2', 'middle', 7.4),
    dT(90, 35, '1,500 m and 1,000 ft from cloud', 'd2', 'middle', 7.4),
    dT(230, 60, 'No hole at the', 'd1', 'middle'),
    dT(230, 72, 'destination?', 'd1', 'middle'),
    dT(230, 142, 'Below 3,000 ft in Class G:', 'd2', 'middle', 7.4),
    dT(230, 152, 'stay in sight of the surface', 'd2', 'middle', 7.4),
]), 'Flying above cloud is legal above 3,000 ft with the right cloud separation, but you may have no way down at the other end.', 'VFR on top')
