"""VFR flight planning and VMC minima (SS05): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'VFR flight planning and VMC minima (SS05)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- UK VMC minima at a glance
fig('uk-vmc-minima-at-a-glance', 'UK VMC minima at a glance', 320, 200, "".join([
    '<path d="M0 182H320V200H0Z" fill="var(--ch-l1)"/>',
    dL('M0 34H320', 'var(--ink)', 1, '5 3'),
    dT(4, 30, 'FL100', 'd1'),
    dL('M0 108H320', 'var(--ink)', 1, '5 3'),
    dT(4, 92, '3,000 ft AMSL, or', 'd2', None, 7.2),
    dT(4, 103, '1,000 ft AGL if higher', 'd2', None, 7.2),
    dB(126, 40, 188, 62, 'var(--surface)', 'var(--accent)'),
    dT(220, 56, 'Below FL100 and above 3,000 ft', 'd1', 'middle', 8.2),
    dT(220, 70, '5 km visibility', 'd2', 'middle'),
    dT(220, 82, '1,500 m horizontal and', 'd2', 'middle'),
    dT(220, 94, '1,000 ft vertical from cloud', 'd2', 'middle'),
    dT(220, 24, 'FL100 and above: 8 km, same cloud distances', 'd2', 'middle', 7),
    dB(8, 116, 146, 58, 'var(--surface)', 'var(--ink-2)'),
    dT(81, 130, 'Classes A to E', 'd1', 'middle'),
    dT(81, 143, '5 km, 1,500 m and', 'd2', 'middle'),
    dT(81, 155, '1,000 ft from cloud', 'd2', 'middle'),
    dB(164, 116, 148, 58, 'var(--surface)', 'var(--good)'),
    dT(238, 130, 'Class F and G', 'd1', 'middle'),
    dT(238, 143, '5 km, clear of cloud,', 'd2', 'middle'),
    dT(238, 155, 'surface in sight', 'd2', 'middle'),
    dT(238, 167, '(1,500 m at 140 kt or less, day)', 'd2', 'middle', 6.8),
    dT(160, 190, 'UK Class D exemption (day, 140 kt or less, 3,000 ft or below):', 'd2', 'middle', 6.6),
    dT(160, 198, 'clear of cloud with the surface in sight', 'd2', 'middle', 6.6),
]), 'Visibility and distance from cloud depend on height, class and speed. These are legal minima, not targets.', 'VMC minima in the UK')

# ---- Final fuel reserve minima (Part-21 aeroplanes)
fig('final-fuel-reserve-minima-part-21-aeroplanes', 'Final fuel reserve minima (Part-21 aeroplanes)', 320, 200, "".join([
    dT(20, 26, 'Day, staying in sight of the aerodrome', 'd1'),
    '<rect x="20" y="30" width="50" height="22" rx="4" fill="var(--mid)" opacity=".75"/>',
    dT(78, 45, '10 min', 'd3'),
    dT(20, 74, 'Day, any other flight', 'd1'),
    '<rect x="20" y="78" width="150" height="22" rx="4" fill="var(--accent)" opacity=".75"/>',
    dT(178, 93, '30 min', 'd3'),
    dT(20, 122, 'Night', 'd1'),
    '<rect x="20" y="126" width="225" height="22" rx="4" fill="var(--ink)" opacity=".75"/>',
    dT(253, 141, '45 min', 'd3'),
    dT(160, 190, 'These are minima: plan to land with more', 'd2', 'middle'),
]), 'Helicopters need 20 minutes. Measure fuel with a dipstick and plan for the worst case.', 'Fuel reserves')

# ---- FREDA every 10 minutes
fig('freda-every-10-minutes', 'FREDA every 10 minutes', 320, 200, "".join([
    dB(10, 40, 56, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(38, 74, 'F', 'd3', 'middle', None, 'var(--accent)'),
    dT(38, 98, 'Fuel', 'd1', 'middle', 8.4),
    dT(38, 118, 'quantity', 'd2', 'middle', 6.8),
    dT(38, 129, 'selector', 'd2', 'middle', 6.8),
    dB(71, 40, 56, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(99, 74, 'R', 'd3', 'middle', None, 'var(--accent)'),
    dT(99, 98, 'Radio', 'd1', 'middle', 8.4),
    dT(99, 118, 'frequency', 'd2', 'middle', 6.8),
    dT(99, 129, 'squawk', 'd2', 'middle', 6.8),
    dB(132, 40, 56, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(160, 74, 'E', 'd3', 'middle', None, 'var(--accent)'),
    dT(160, 98, 'Engine', 'd1', 'middle', 8.4),
    dT(160, 118, 'Ts and Ps', 'd2', 'middle', 6.8),
    dT(160, 129, 'carb heat', 'd2', 'middle', 6.8),
    dB(193, 40, 56, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(221, 74, 'D', 'd3', 'middle', None, 'var(--accent)'),
    dT(221, 98, 'Direction', 'd1', 'middle', 8.4),
    dT(221, 118, 'compass', 'd2', 'middle', 6.8),
    dT(221, 129, 'DI aligned', 'd2', 'middle', 6.8),
    dB(254, 40, 56, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(282, 74, 'A', 'd3', 'middle', None, 'var(--accent)'),
    dT(282, 98, 'Altimeter', 'd1', 'middle', 8.4),
    dT(282, 118, 'setting', 'd2', 'middle', 6.8),
    dT(282, 129, 'height', 'd2', 'middle', 6.8),
    dT(160, 24, 'Look outside about 80% of the time', 'd1', 'middle'),
    dT(160, 176, 'Take 2: keep 2 NM or 200 ft clear of controlled airspace', 'd2', 'middle'),
]), 'A short routine check that catches fuel, radio and navigation slips before they grow.', 'In-flight monitoring')
