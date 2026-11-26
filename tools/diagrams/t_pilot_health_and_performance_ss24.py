"""Pilot health and performance (SS24): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Pilot health and performance (SS24)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- I AM SAFE
fig('i-am-safe', 'I AM SAFE', 320, 200, "".join([
    '<circle cx="160" cy="28" r="21" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('160', '30', 'I', 'd3', 'middle', None, 'var(--accent)'),
    dT('160', '40', 'Illness', 'd2', 'middle', 6.6),
    '<circle cx="216" cy="55" r="21" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('216', '57', 'A', 'd3', 'middle', None, 'var(--accent)'),
    dT('216', '67', 'Attitude', 'd2', 'middle', 6.6),
    '<circle cx="230" cy="116" r="21" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('230', '118', 'M', 'd3', 'middle', None, 'var(--accent)'),
    dT('230', '128', 'Medication', 'd2', 'middle', 6.6),
    '<circle cx="191" cy="165" r="21" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('191', '167', 'S', 'd3', 'middle', None, 'var(--accent)'),
    dT('191', '177', 'Stress', 'd2', 'middle', 6.6),
    '<circle cx="129" cy="165" r="21" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('129', '167', 'A', 'd3', 'middle', None, 'var(--accent)'),
    dT('129', '177', 'Alcohol', 'd2', 'middle', 6.6),
    '<circle cx="90" cy="116" r="21" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('90', '118', 'F', 'd3', 'middle', None, 'var(--accent)'),
    dT('90', '128', 'Fatigue', 'd2', 'middle', 6.6),
    '<circle cx="104" cy="55" r="21" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('104', '57', 'E', 'd3', 'middle', None, 'var(--accent)'),
    dT('104', '67', 'Eating', 'd2', 'middle', 6.6),
    dT(160, 96, 'Check', 'd1', 'middle'),
    dT(160, 108, 'yourself', 'd1', 'middle'),
]), 'Run it before every flight, like a weather or NOTAM check. 8 hours sleep, no alcohol for 8 hours (24 after a lot), and eat.', 'I AM SAFE')

# ---- Altitude and your body
fig('altitude-and-your-body', 'Altitude and your body', 320, 200, "".join([
    dL('M70 190V14', 'var(--ink)', 1.2),
    dL('M66 186h8', 'var(--ink)', 1),
    dT(62, '189', '0', 'd2', 'end', 7.2),
    dL('M66 158h8', 'var(--ink)', 1),
    dT(62, '161', '2,000', 'd2', 'end', 7.2),
    dL('M66 129h8', 'var(--ink)', 1),
    dT(62, '132', '4,000', 'd2', 'end', 7.2),
    dL('M66 101h8', 'var(--ink)', 1),
    dT(62, '104', '6,000', 'd2', 'end', 7.2),
    dL('M66 73h8', 'var(--ink)', 1),
    dT(62, '76', '8,000', 'd2', 'end', 7.2),
    dL('M66 44h8', 'var(--ink)', 1),
    dT(62, '47', '10,000', 'd2', 'end', 7.2),
    dL('M66 16h8', 'var(--ink)', 1),
    dT(62, '19', '12,000 ft', 'd2', 'end', 7.2),
    '<rect x="74" y="16" width="236" height="44" fill="var(--bad)" opacity=".15"/>',
    dT(82, 32, 'Above 10,000 ft: confusion, clumsiness, drowsiness', 'd2', None, 7.6),
    dT(82, 44, 'Use supplementary oxygen (NCO.OP.190)', 'd1', None, 7.6),
    dT(82, 55, 'If hypoxia is suspected, descend', 'd2', None, 7.6),
    '<rect x="74" y="60" width="236" height="29" fill="var(--mid)" opacity=".16"/>',
    dT(82, 78, 'Above 8,000 ft: contrast sensitivity falls', 'd2', None, 7.6),
    dT(82, 120, 'Trapped gas expands as you climb:', 'd1', None, 7.6),
    dT(82, 132, 'ears, sinuses, gut. Do not fly with a cold', 'd2', None, 7.6),
    dT(82, 160, 'Carbon monoxide mimics hypoxia', 'd1', None, 7.6),
    dT(82, 172, '(cabin heater, exhaust)', 'd2', None, 7.6),
]), 'Stay below 10,000 ft without oxygen. Above 8,000 ft vision in low light suffers first.', 'Altitude and gas')

# ---- Alcohol before flying
fig('alcohol-before-flying', 'Alcohol before flying', 320, 200, "".join([
    dL('M30 150H300', 'var(--ink)', 1.2),
    dL('M30 150v5', 'var(--ink)', 1),
    dT(30, 166, '0h', 'd2', 'middle'),
    dL('M75 150v5', 'var(--ink)', 1),
    dT(75, 166, '4h', 'd2', 'middle'),
    dL('M120 150v5', 'var(--ink)', 1),
    dT(120, 166, '8h', 'd2', 'middle'),
    dL('M165 150v5', 'var(--ink)', 1),
    dT(165, 166, '12h', 'd2', 'middle'),
    dL('M210 150v5', 'var(--ink)', 1),
    dT(210, 166, '16h', 'd2', 'middle'),
    dL('M255 150v5', 'var(--ink)', 1),
    dT(255, 166, '20h', 'd2', 'middle'),
    dL('M300 150v5', 'var(--ink)', 1),
    dT(300, 166, '24h', 'd2', 'middle'),
    '<rect x="30" y="100" width="90" height="40" fill="var(--bad)" opacity=".3"/>',
    dT(75, 118, 'No flying', 'd1', 'middle', None, 'var(--bad)'),
    dT(75, 130, 'within 8 hours', 'd2', 'middle'),
    '<rect x="120" y="100" width="180" height="40" fill="var(--mid)" opacity=".2"/>',
    dT(210, 118, 'After a lot: up to 24 hours', 'd1', 'middle'),
    dT(210, 130, 'can still test positive', 'd2', 'middle'),
    dB(60, 30, 200, 40, 'var(--surface)', 'var(--accent)'),
    dT(160, 46, 'UK flying limit', 'd2', 'middle'),
    dT(160, 61, '20 mg per 100 ml of blood', 'd1', 'middle'),
    dT(165, 186, 'hours since your last drink', 'd2', 'middle'),
]), 'The legal limit is stricter than for driving. Allow at least 8 hours, and much longer after heavy drinking.', 'Factors that reduce performance')
