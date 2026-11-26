"""Emergencies (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Emergencies (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Choosing a field: the six S
fig('choosing-a-field-the-six-s', 'Choosing a field: the six S', 320, 200, "".join([
    dB(8, 10, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(57, 76, 'Wind', 'd1', 'middle'),
    dT(57, 88, 'into wind', 'd2', 'middle', 7.2),
    dA(28, 46, 86, 46, '#5aa0d8', 2),
    dB(112, 10, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(161, 76, 'Size', 'd1', 'middle'),
    dT(161, 88, 'bigger is better', 'd2', 'middle', 7.2),
    '<rect x="136" y="24" width="50" height="40" fill="var(--ch-l1)" stroke="var(--good)"/>',
    dB(216, 10, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(265, 76, 'Surroundings', 'd1', 'middle'),
    dT(265, 88, 'power lines, trees', 'd2', 'middle', 7.2),
    dL('M228 30Q265 46 302 30', 'var(--ink)', 1),
    '<path d="M228 24v40M302 24v40" stroke="var(--ink)" stroke-width="2"/>',
    dB(8, 102, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(57, 168, 'Shape', 'd1', 'middle'),
    dT(57, 180, 'square beats narrow', 'd2', 'middle', 7.2),
    '<rect x="38" y="116" width="38" height="38" fill="var(--ch-l1)" stroke="var(--good)"/>',
    dB(112, 102, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(161, 168, 'Surface', 'd1', 'middle'),
    dT(161, 180, 'grass over crops', 'd2', 'middle', 7.2),
    '<rect x="130" y="120" width="30" height="30" fill="var(--ch-l1)"/><rect x="162" y="120" width="30" height="30" fill="#c9a46a"/>',
    dL('M164 126h26M164 134h26M164 142h26', '#8a6a3a', 1),
    dB(216, 102, 98, 84, 'var(--surface)', 'var(--ink-2)', 6),
    dT(265, 168, 'Slope', 'd1', 'middle'),
    dT(265, 180, 'avoid it', 'd2', 'middle', 7.2),
    dL('M230 152L300 124', 'var(--good)', 3),
]), 'Wind, size, surroundings, shape, surface and slope. Shortly after take-off, land ahead rather than turning back.', 'Engine failure')

# ---- The constant aspect approach
fig('the-constant-aspect-approach', 'The constant aspect approach', 320, 200, "".join([
    '<rect x="150" y="110" width="70" height="44" fill="var(--ch-l1)" stroke="var(--good)" stroke-width="1.6"/>',
    dT(185, 136, 'field', 'd1', 'middle'),
    '<path d="M60 40Q30 120 90 170Q160 196 200 160" stroke="var(--bad)" stroke-width="2" fill="none" stroke-dasharray="6 3"/>',
    dP(60, 40, 190, 'var(--accent)', 1.3),
    dL('M60 40L160 120', 'var(--ink-2)', 1, '3 3'),
    dT(118, 70, 'about 45°', 'd1'),
    dT(250, 40, 'Keep the angle', 'd1', 'middle'),
    dT(250, 52, 'to the field constant', 'd2', 'middle'),
    dT(250, 74, 'too high: widen or', 'd2', 'middle'),
    dT(250, 85, 'sideslip, S-turn', 'd2', 'middle'),
    dT(250, 100, 'too low: tighten', 'd2', 'middle'),
]), "Watch the field's angle below you and adjust the turn to keep it steady. Aim further in if you will use full flap.", 'Engine failure')

# ---- Before you change anything
fig('before-you-change-anything', 'Before you change anything', 320, 200, "".join([
    '<circle cx="22" cy="24" r="11" fill="var(--bad)"/>',
    dT(22, 28, 1, 'd1', 'middle', None, '#fff'),
    dT(40, 22, 'Fly the aircraft', 'd1'),
    dT(40, 33, 'keep a safe flying speed', 'd2'),
    '<circle cx="22" cy="68" r="11" fill="var(--bad)"/>',
    dT(22, 72, 2, 'd1', 'middle', None, '#fff'),
    dT(40, 66, 'Assess before acting', 'd1'),
    dT(40, 77, 'do not jump to conclusions', 'd2'),
    '<circle cx="22" cy="112" r="11" fill="var(--bad)"/>',
    dT(22, 116, 3, 'd1', 'middle', None, '#fff'),
    dT(40, 110, 'Declare early', 'd1'),
    dT(40, 121, 'easier to cancel than to start late', 'd2'),
    '<circle cx="22" cy="156" r="11" fill="var(--bad)"/>',
    dT(22, 160, 4, 'd1', 'middle', None, '#fff'),
    dT(40, 154, 'Squawk 7700', 'd1'),
    dT(40, 165, '121.5 MHz if not with a unit', 'd2'),
    dB(232, 30, 82, 120, 'var(--surface)', 'var(--ink-2)'),
    dT(273, 48, 'Lost?', 'd1', 'middle'),
    dT(273, 62, 'squawk 0030', 'd2', 'middle'),
    dT(273, 74, 'call D&amp;D 121.5', 'd2', 'middle'),
    dT(273, 98, 'Radio dead?', 'd1', 'middle'),
    dT(273, 112, 'squawk 7600', 'd2', 'middle'),
    dT(273, 124, 'stay VMC, watch', 'd2', 'middle'),
    dT(273, 136, 'for light signals', 'd2', 'middle'),
]), 'Many accidents start when a survivable problem distracts the pilot from flying.', 'Key principles')
