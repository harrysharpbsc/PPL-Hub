"""Decision making and threat and error management (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Decision making and threat and error management (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- PAVE before you go
fig('pave-before-you-go', 'PAVE before you go', 320, 200, "".join([
    dB(8, 10, 148, 84, 'var(--surface)', 'var(--accent)', 8, 1.6),
    dT(32, 50, 'P', 'd3', 'middle', 22, 'var(--accent)'),
    dT(52, 40, 'Pilot', 'd1'),
    dT(52, 56, 'recency, fitness', 'd2', None, 7),
    dT(52, 68, 'I AM SAFE', 'd2', None, 7),
    dB(162, 10, 148, 84, 'var(--surface)', 'var(--good)', 8, 1.6),
    dT(186, 50, 'A', 'd3', 'middle', 22, 'var(--good)'),
    dT(206, 40, 'Aircraft', 'd1'),
    dT(206, 56, 'airworthiness, limits', 'd2', None, 7),
    dT(206, 68, '', 'd2', None, 7),
    dB(8, 102, 148, 84, 'var(--surface)', 'var(--mid)', 8, 1.6),
    dT(32, 142, 'V', 'd3', 'middle', 22, 'var(--mid)'),
    dT(52, 132, 'EnVironment', 'd1'),
    dT(52, 148, 'weather, aerodrome', 'd2', None, 7),
    dT(52, 160, 'terrain', 'd2', None, 7),
    dB(162, 102, 148, 84, 'var(--surface)', 'var(--bad)', 8, 1.6),
    dT(186, 142, 'E', 'd3', 'middle', 22, 'var(--bad)'),
    dT(206, 132, 'External pressures', 'd1'),
    dT(206, 148, 'time, delays', 'd2', None, 7),
    dT(206, 160, 'passengers', 'd2', None, 7),
]), 'The decision to start the flight is often the most important one. Think about the combined effect of the risks.', 'Pre-flight decisions')

# ---- Threat and error management
fig('threat-and-error-management', 'Threat and error management', 320, 200, "".join([
    dB(8, 30, 90, 120, 'var(--surface)', 'var(--mid)', 8),
    dT(53, 50, 'Threats', 'd1', 'middle'),
    dT(53, 70, 'weather', 'd2', 'middle'),
    dT(53, 84, 'traffic', 'd2', 'middle'),
    dT(53, 98, 'short runway', 'd2', 'middle'),
    dT(53, 112, 'fatigue', 'd2', 'middle'),
    dA(100, 90, 116, 90, 'var(--ink)', 1.4),
    dB(118, 30, 90, 120, 'var(--surface)', 'var(--bad)', 8),
    dT(163, 50, 'Errors', 'd1', 'middle'),
    dT(163, 70, 'handling', 'd2', 'middle'),
    dT(163, 84, 'procedural', 'd2', 'middle'),
    dT(163, 98, 'communication', 'd2', 'middle'),
    dA(210, 90, 226, 90, 'var(--ink)', 1.4),
    dB(228, 30, 86, 120, 'var(--surface)', 'var(--ink)', 8),
    dT(271, 50, 'Undesired', 'd1', 'middle'),
    dT(271, 62, 'aircraft state', 'd1', 'middle'),
    dT(271, 82, 'attitude', 'd2', 'middle'),
    dT(271, 96, 'configuration', 'd2', 'middle'),
    dT(271, 110, 'location', 'd2', 'middle'),
    dT(160, 172, 'Manage at each stage: plan, anticipate, prioritise,', 'd2', 'middle'),
    dT(160, 184, 'remove distractions', 'd2', 'middle'),
]), 'TEM is defensive flying: spot the threats, trap the errors, and recover before an undesired state becomes an accident.', 'Threat and error management')
