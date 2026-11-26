"""Fuel, flight plans and aerodrome planning (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Fuel, flight plans and aerodrome planning (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Fuel by volume and by mass
fig('fuel-by-volume-and-by-mass', 'Fuel by volume and by mass', 320, 200, "".join([
    '<path d="M40 40h60l10 14v90a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8v-90z" fill="var(--surface)" stroke="var(--ink-2)"/><rect x="36" y="90" width="68" height="58" fill="#5aa0d8" opacity=".55"/>',
    dT(70, 72, 'AVGAS', 'd1', 'middle'),
    dT(70, 172, '0.72 kg per litre', 'd2', 'middle'),
    '<path d="M190 40h60l10 14v90a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8v-90z" fill="var(--surface)" stroke="var(--ink-2)"/><rect x="186" y="90" width="68" height="58" fill="#c9a46a" opacity=".55"/>',
    dT(220, 72, 'Jet A-1', 'd1', 'middle'),
    dT(220, 172, 'about 0.8 kg per litre', 'd2', 'middle'),
    dT(160, 24, '1 US gal = 3.785 L    1 Imp gal = 4.546 L', 'd1', 'middle'),
    dT(160, 192, 'For W&B assume fuel high, for planning assume low', 'd2', 'middle'),
]), 'Mixed units have caused accidents. Match the density to the volume unit and check every figure.', 'Fuel management')

# ---- When you need a flight plan
fig('when-you-need-a-flight-plan', 'When you need a flight plan', 320, 200, "".join([
    dB(14, 14, 292, 24, 'var(--surface)', 'var(--accent)'),
    '<rect x="14" y="14" width="8" height="24" rx="2" fill="var(--accent)"/>',
    dT(30, 30, 'Crossing an international border', 'd2', None, 7.6),
    dT(298, 30, 'required', 'd1', 'end', 7.4, 'var(--accent)'),
    dB(14, 43, 292, 24, 'var(--surface)', 'var(--accent)'),
    '<rect x="14" y="43" width="8" height="24" rx="2" fill="var(--accent)"/>',
    dT(30, 59, 'Under an ATC service (into CAS, or from a controlled aerodrome)', 'd2', None, 7.6),
    dT(298, 59, 'required', 'd1', 'end', 7.4, 'var(--accent)'),
    dB(14, 72, 292, 24, 'var(--surface)', 'var(--accent)'),
    '<rect x="14" y="72" width="8" height="24" rx="2" fill="var(--accent)"/>',
    dT(30, 88, 'Leaving the aerodrome vicinity at night', 'd2', None, 7.6),
    dT(298, 88, 'required', 'd1', 'end', 7.4, 'var(--accent)'),
    dB(14, 101, 292, 24, 'var(--surface)', 'var(--ink-2)'),
    '<rect x="14" y="101" width="8" height="24" rx="2" fill="var(--mid)"/>',
    dT(30, 117, 'Over water more than 10 NM from the UK coast', 'd2', None, 7.6),
    dT(298, 117, 'recommended', 'd1', 'end', 7.4, 'var(--mid)'),
    dB(14, 130, 292, 24, 'var(--surface)', 'var(--ink-2)'),
    '<rect x="14" y="130" width="8" height="24" rx="2" fill="var(--mid)"/>',
    dT(30, 146, 'To the Scottish Highlands and Islands', 'd2', None, 7.6),
    dT(298, 146, 'recommended', 'd1', 'end', 7.4, 'var(--mid)'),
    dB(14, 159, 292, 24, 'var(--surface)', 'var(--ink-2)'),
    '<rect x="14" y="159" width="8" height="24" rx="2" fill="var(--mid)"/>',
    dT(30, 175, 'Over sparsely populated areas', 'd2', None, 7.6),
    dT(298, 175, 'recommended', 'd1', 'end', 7.4, 'var(--mid)'),
]), 'Booking out can count as the abbreviated plan at night if the unit can receive it. Abbreviated plans are not passed on to other units.', 'Flight plans')

# ---- Questions for an unfamiliar aerodrome
fig('questions-for-an-unfamiliar-aerodrome', 'Questions for an unfamiliar aerodrome', 320, 200, "".join([
    dB(12, 16, 146, 36, 'var(--surface)', 'var(--ink-2)', 8),
    '<circle cx="28" cy="34" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M24 34l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>',
    dT(42, 38, 'PPR?', 'd1', None, 7.8),
    dB(166, 16, 146, 36, 'var(--surface)', 'var(--ink-2)', 8),
    '<circle cx="182" cy="34" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M178 34l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>',
    dT(196, 38, 'Usable length', 'd1', None, 7.8),
    dB(12, 60, 146, 36, 'var(--surface)', 'var(--ink-2)', 8),
    '<circle cx="28" cy="78" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M24 78l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>',
    dT(42, 82, 'Surface: long, wet, soft grass', 'd1', None, 7.8),
    dB(166, 60, 146, 36, 'var(--surface)', 'var(--ink-2)', 8),
    '<circle cx="182" cy="78" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M178 78l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>',
    dT(196, 82, 'Obstacles', 'd1', None, 7.8),
    dB(12, 104, 146, 36, 'var(--surface)', 'var(--ink-2)', 8),
    '<circle cx="28" cy="122" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M24 122l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>',
    dT(42, 126, 'Local procedures', 'd1', None, 7.8),
    dB(166, 104, 146, 36, 'var(--surface)', 'var(--ink-2)', 8),
    '<circle cx="182" cy="122" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M178 122l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>',
    dT(196, 126, 'Wind effects', 'd1', None, 7.8),
    dB(12, 148, 146, 36, 'var(--surface)', 'var(--ink-2)', 8),
    '<circle cx="28" cy="166" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M24 166l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>',
    dT(42, 170, 'Noise abatement', 'd1', None, 7.8),
    dB(166, 148, 146, 36, 'var(--surface)', 'var(--bad)', 8),
    '<circle cx="182" cy="166" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M178 166l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>',
    dT(196, 170, 'And for the alternate too', 'd1', None, 7.8),
]), 'The AIP only covers licensed aerodromes. Phone ahead, and treat information about unlicensed strips as unverified.', 'Unfamiliar aerodromes')
