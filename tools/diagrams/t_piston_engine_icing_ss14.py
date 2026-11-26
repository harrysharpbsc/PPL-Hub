"""Piston engine icing (SS14): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Piston engine icing (SS14)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Where carburettor ice forms
fig('where-carburettor-ice-forms', 'Where carburettor ice forms', 320, 200, "".join([
    '<path d="M60 20H130V60C112 70 112 100 130 110V180H60V110C78 100 78 70 60 60Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>',
    dA(95, 8, 95, 40, '#5aa0d8', 1.6),
    dT(102, 18, 'air in', 'd2'),
    '<path d="M95 86V112" stroke="var(--ink)" stroke-width="1.4"/><path d="M95 86l-6 6h12z" fill="var(--ink)"/>',
    dT(140, 104, 'fuel nozzle', 'd2'),
    '<path d="M70 132L120 124" stroke="var(--ink)" stroke-width="3"/><circle cx="95" cy="128" r="2.6" fill="var(--ink)"/>',
    dT(140, 130, 'throttle valve', 'd2'),
    '<g fill="#bfe3ff" stroke="#5aa0d8"><path d="M72 70q6 4 4 10t4 8l-4 2q-8-8-4-20Z"/><path d="M118 70q-6 4-4 10t-4 8l4 2q8-8 4-20Z"/><path d="M70 126q6-6 10-3l-2 5q-4 0-8-2Z"/><path d="M120 120q-6-2-9 2l3 4q3-2 6-6Z"/></g>',
    dT(140, 72, 'ice in the venturi', 'd1', None, None, '#3a86c5'),
    dT(140, 82, 'up to 35°C colder', 'd2'),
    dA(95, 180, 95, 196, 'var(--ink-2)', 1.4),
    dT(102, 194, 'to engine', 'd2'),
    dB(204, 140, 112, 46, 'var(--surface-2)', 'var(--ink-2)'),
    dT(260, 158, 'Carb heat:', 'd1', 'middle'),
    dT(260, 170, 'warm air from the', 'd2', 'middle', 7.2),
    dT(260, 180, 'exhaust heat exchanger', 'd2', 'middle', 7.2),
]), 'Fuel evaporating in the venturi chills the air by up to 35°C, so water vapour freezes on the venturi and throttle valve.', 'Three types')

# ---- When to expect carb ice
fig('when-to-expect-carb-ice', 'When to expect carb ice', 320, 200, "".join([
    dL('M40 170H300M40 170V20', 'var(--ink)', 1.2),
    dT(170, 197, 'Air temperature °C', 'd2', 'middle'),
    '<g transform="translate(14 95) rotate(-90)">',
    dT(0, 0, 'Relative humidity', 'd2', 'middle'),
    '</g>',
    dL('M40 170v4', 'var(--ink)', 1),
    dT(40, 183, -10, 'd2', 'middle'),
    dL('M105 170v4', 'var(--ink)', 1),
    dT(105, 183, 0, 'd2', 'middle'),
    dL('M170 170v4', 'var(--ink)', 1),
    dT(170, 183, 10, 'd2', 'middle'),
    dL('M235 170v4', 'var(--ink)', 1),
    dT(235, 183, 20, 'd2', 'middle'),
    dL('M300 170v4', 'var(--ink)', 1),
    dT(300, 183, 30, 'd2', 'middle'),
    '<path d="M105 30H170V170H105Z" fill="var(--bad)" opacity=".26"/><path d="M70 70Q160 40 280 80V170H70Z" fill="var(--mid)" opacity=".2"/>',
    dT(137, 46, 'Worst band', 'd1', 'middle', None, 'var(--bad)'),
    dT(137, 58, '0 to 10°C,', 'd2', 'middle'),
    dT(137, 69, 'high humidity', 'd2', 'middle'),
    '<circle cx="248" cy="132" r="4" fill="var(--bad)"/>',
    dT(244, 118, 'Serious ice seen at', 'd2', 'end', 7.2),
    dT(244, 128, 'descent power: 25°C,', 'd2', 'end', 7.2),
    dT(244, 138, '30% humidity', 'd2', 'end', 7.2),
    dT(296, 30, 'Highest risk at', 'd1', 'end'),
    dT(296, 41, 'low (descent) power', 'd2', 'end'),
]), 'Schematic only, not the CAA chart. Carb ice is a warm-weather risk too. Temperature and dew point close together, rain, fog or low cloud all point to high humidity.', 'When it happens')

# ---- The carb heat check
fig('the-carb-heat-check', 'The carb heat check', 320, 200, "".join([
    dL('M30 160H300M30 160V20', 'var(--ink)', 1.1),
    dT(165, 192, 'time', 'd2', 'middle'),
    '<g transform="translate(16 92) rotate(-90)">',
    dT(0, 0, 'RPM', 'd2', 'middle'),
    '</g>',
    dL('M30 60H90L96 96H170L176 50H300', 'var(--accent)', 2.4),
    dL('M90 60H300', 'var(--ink-2)', 1, '4 3'),
    dA(120, 62, 120, 94, 'var(--bad)', 1.2),
    dT(126, 82, 'normal drop 75 to 100 RPM', 'd2'),
    dT(126, 108, 'heat on for at least 15 s', 'd2'),
    dT(184, 26, 'RPM rises above the', 'd1', None, None, 'var(--good)'),
    dT(184, 37, 'earlier figure: ice was there', 'd2'),
    dT(32, 56, 'heat cold', 'd2'),
    dT(214, 140, 'repeat until no rise', 'd2'),
]), 'With heat on, power drops a little. If RPM comes back higher than before when heat goes off, there was ice: repeat until clear.', 'Using carb heat')
