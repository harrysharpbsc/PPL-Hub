"""Rules of the Air essentials (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Rules of the Air essentials (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Right of way on the ground
fig('right-of-way-on-the-ground', 'Right of way on the ground', 320, 200, "".join([
    dB(4, 8, 100, 170, 'var(--surface)', 'var(--ink-2)', 6),
    dT(54, 24, 'Head-on', 'd1', 'middle'),
    dP(40, 140, 0, 'var(--accent)', 1.2),
    dP(68, 56, 180, 'var(--ink)', 1.2),
    dA(40, 124, 52, 96, 'var(--accent)', 1),
    dA(68, 72, 56, 104, 'var(--ink)', 1),
    dT(54, 170, 'both stop, turn right', 'd2', 'middle', 7),
    dB(110, 8, 100, 170, 'var(--surface)', 'var(--ink-2)', 6),
    dT(160, 24, 'Converging', 'd1', 'middle'),
    dP(140, 140, 0, 'var(--accent)', 1.2),
    dP(190, 90, 270, 'var(--ink)', 1.2),
    dT(160, 164, 'other on your right:', 'd2', 'middle', 7),
    dT(160, 174, 'you give way', 'd2', 'middle', 7),
    dB(216, 8, 100, 170, 'var(--surface)', 'var(--ink-2)', 6),
    dT(266, 24, 'Overtaking', 'd1', 'middle'),
    dP(266, 60, 0, 'var(--ink)', 1.2),
    dP(266, 140, 0, 'var(--accent)', 1.2),
    dA(260, 124, 240, 84, 'var(--accent)', 1),
    dA(272, 124, 292, 84, 'var(--accent)', 1),
    dT(266, 170, 'pass left or right', 'd2', 'middle', 7),
    dT(160, 193, 'Give way to aircraft taking off. Emergency vehicles first.', 'd2', 'middle', 7),
]), 'On the ground the rules match the air, except an overtaker may pass on either side.', 'Right of way on the ground')

# ---- The pilot in command
fig('the-pilot-in-command', 'The pilot in command', 320, 200, "".join([
    '<circle cx="80" cy="96" r="56" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT(80, 90, 'Final', 'd3', 'middle'),
    dT(80, 108, 'authority', 'd3', 'middle'),
    dA(140, 96, 166, 36, 'var(--ink-2)', 1),
    dB(168, 22, 144, 28, 'var(--surface)', 'var(--ink-2)'),
    dT(240, 34, 'Responsible for compliance,', 'd2', 'middle', 7.4),
    dT(240, 45, 'even off the controls', 'd2', 'middle', 7.4),
    dA(140, 96, 166, 74, 'var(--ink-2)', 1),
    dB(168, 60, 144, 28, 'var(--surface)', 'var(--ink-2)'),
    dT(240, 72, 'Departs from the rules only', 'd2', 'middle', 7.4),
    dT(240, 83, 'if needed for safety', 'd2', 'middle', 7.4),
    dA(140, 96, 166, 112, 'var(--ink-2)', 1),
    dB(168, 98, 144, 28, 'var(--surface)', 'var(--ink-2)'),
    dT(240, 110, 'Studies weather, fuel', 'd2', 'middle', 7.4),
    dT(240, 121, 'and alternatives', 'd2', 'middle', 7.4),
    dA(140, 96, 166, 150, 'var(--ink-2)', 1),
    dB(168, 136, 144, 28, 'var(--surface)', 'var(--ink-2)'),
    dT(240, 148, 'Never flies under a', 'd2', 'middle', 7.4),
    dT(240, 159, 'psychoactive substance', 'd2', 'middle', 7.4),
]), 'The PIC carries the final responsibility for the flight, whoever is handling the controls.', 'Pilot in command')
