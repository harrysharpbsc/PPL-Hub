"""Stalls, spins and loss of control (SS30): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Stalls, spins and loss of control (SS30)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Lift and angle of attack
fig('lift-and-angle-of-attack', 'Lift and angle of attack', 320, 200, "".join([
    dL('M40 170H300M40 170V20', 'var(--ink)', 1.2),
    dT(170, 192, 'Angle of attack', 'd2', 'middle'),
    '<g transform="translate(16 95) rotate(-90)">',
    dT(0, 0, 'Lift coefficient', 'd2', 'middle'),
    '</g>',
    dL('M40 160L200 46Q220 36 232 52Q250 80 290 120', 'var(--accent)', 2.4),
    dL('M226 40V170', 'var(--bad)', 1, '4 3'),
    dT(222, 22, 'critical angle', 'd1', 'end', None, 'var(--bad)'),
    dT(222, 33, 'typically about 15°', 'd2', 'end', 7.4),
    dT(110, 96, 'more angle, more lift', 'd2', 'middle'),
    dT(268, 96, 'stalled:', 'd1', 'middle'),
    dT(268, 108, 'lift falls away', 'd2', 'middle'),
    '<g transform="translate(150 148) rotate(-10)"><path d="M-30 0C-20-10 20-10 34-2L36 0L34 2C10 6-20 6-30 0Z" fill="var(--surface)" stroke="var(--ink)"/></g>',
    dA(96, 150, 116, 150, '#5aa0d8', 1.2),
]), 'A wing stalls at its critical angle of attack, whatever the speed or attitude. Speed only matters because it changes the angle needed.', 'What a stall is')

# ---- Stall speed in a level turn
fig('stall-speed-in-a-level-turn', 'Stall speed in a level turn', 320, 200, "".join([
    dL('M40 170H300M40 170V20', 'var(--ink)', 1.2),
    dL('M40 170v4', 'var(--ink)', 1),
    dT(40, 183, '0°', 'd2', 'middle'),
    dL('M91 170v4', 'var(--ink)', 1),
    dT(91, 183, '15°', 'd2', 'middle'),
    dL('M142 170v4', 'var(--ink)', 1),
    dT(142, 183, '30°', 'd2', 'middle'),
    dL('M193 170v4', 'var(--ink)', 1),
    dT(193, 183, '45°', 'd2', 'middle'),
    dL('M244 170v4', 'var(--ink)', 1),
    dT(244, 183, '60°', 'd2', 'middle'),
    dL('M295 170v4', 'var(--ink)', 1),
    dT(295, 183, '75°', 'd2', 'middle'),
    dL('M36 157h4', 'var(--ink)', 1),
    dT(32, '160', 50, 'd2', 'end'),
    dL('M36 131h4', 'var(--ink)', 1),
    dT(32, '134', 60, 'd2', 'end'),
    dL('M36 105h4', 'var(--ink)', 1),
    dT(32, '108', 70, 'd2', 'end'),
    dL('M36 79h4', 'var(--ink)', 1),
    dT(32, '82', 80, 'd2', 'end'),
    dL('M36 53h4', 'var(--ink)', 1),
    dT(32, '56', 90, 'd2', 'end'),
    dL('M36 27h4', 'var(--ink)', 1),
    dT(32, '30', 100, 'd2', 'end'),
    '<path d="M40.0 157.0L50.2 156.9L60.4 156.6L70.6 156.2L80.8 155.6L91.0 154.7L101.2 153.7L111.4 152.5L121.6 151.0L131.8 149.3L142.0 147.3L152.2 145.0L162.4 142.5L172.6 139.5L182.8 136.2L193.0 132.4L203.2 128.1L213.4 123.1L223.6 117.4L233.8 110.8L244.0 103.2L254.2 94.1L264.4 83.2L274.6 69.8L284.8 53.1L295.0 31.5" stroke="var(--bad)" stroke-width="2.4" fill="none"/><circle cx="244" cy="103" r="4" fill="var(--bad)"/>',
    dL('M244 103V170', 'var(--bad)', 0.8, '3 3'),
    dT(236, 96, '60° bank = 2 g', 'd1', 'end'),
    dT(236, 108, '50 kt becomes about 70 kt', 'd2', 'end'),
    dT(170, 196, 'Bank angle', 'd2', 'middle'),
]), 'Stall speed rises with the square root of load factor. At 60° of bank you pull 2 g and stall about 1.4 times faster.', 'Load factor')

# ---- Stall recovery, in order
fig('stall-recovery-in-order', 'Stall recovery, in order', 320, 200, "".join([
    '<circle cx="34" cy="28" r="13" fill="var(--accent)"/>',
    dT(34, 33, '1', 'd3', 'middle', None, '#fff'),
    dT(56, 26, 'Control column centrally forward', 'd1'),
    dT(56, 38, 'reduce the angle of attack', 'd2'),
    dA(34, 42, 34, 50, 'var(--ink-2)', 1),
    '<circle cx="34" cy="64" r="13" fill="var(--accent)"/>',
    dT(34, 69, '2', 'd3', 'middle', None, '#fff'),
    dT(56, 62, 'Level the wings with aileron', 'd1'),
    dT(56, 74, 'only once AoA is reduced', 'd2'),
    dA(34, 78, 34, 86, 'var(--ink-2)', 1),
    '<circle cx="34" cy="100" r="13" fill="var(--accent)"/>',
    dT(34, 105, '3', 'd3', 'middle', None, '#fff'),
    dT(56, 98, 'Full power if available', 'd1'),
    dT(56, 110, 'and counter any pitch-up', 'd2'),
    dA(34, 114, 34, 122, 'var(--ink-2)', 1),
    '<circle cx="34" cy="136" r="13" fill="var(--accent)"/>',
    dT(34, 141, '4', 'd3', 'middle', None, '#fff'),
    dT(56, 134, 'Accelerate, retract flap', 'd1'),
    dT(56, 146, 'and gear as needed', 'd2'),
    dA(34, 150, 34, 158, 'var(--ink-2)', 1),
    '<circle cx="34" cy="172" r="13" fill="var(--accent)"/>',
    dT(34, 177, '5', 'd3', 'middle', None, '#fff'),
    dT(56, 170, 'Balance with rudder', 'd1'),
    dT(56, 182, '', 'd2'),
    dB(226, 40, 86, 100, 'var(--surface)', 'var(--bad)'),
    dT(269, 60, 'Always follow', 'd1', 'middle'),
    dT(269, 72, 'your AFM', 'd1', 'middle'),
    dT(269, 96, 'Act at the first', 'd2', 'middle'),
    dT(269, 108, 'warning and you', 'd2', 'middle'),
    dT(269, 120, 'lose little height', 'd2', 'middle'),
]), 'Unload first. Rolling with aileron while the wing is still stalled can drop a wing further or start a spin.', 'Recovery')
