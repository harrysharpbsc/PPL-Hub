"""Airspace, ATZ, MATZ and transponders (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Airspace, ATZ, MATZ and transponders (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- An ATZ is a cylinder
fig('an-atz-is-a-cylinder', 'An ATZ is a cylinder', 320, 200, "".join([
    '<path d="M0 170H320V200H0Z" fill="var(--ch-l1)"/><ellipse cx="160" cy="168" rx="110" ry="16" fill="var(--ch-l2)" stroke="#c0243a" stroke-width="1.4"/><path d="M50 168V60M270 168V60" stroke="#c0243a" stroke-width="1.4"/><ellipse cx="160" cy="60" rx="110" ry="16" fill="color-mix(in srgb,#c0243a 8%,transparent)" stroke="#c0243a" stroke-width="1.4"/><rect x="130" y="164" width="60" height="6" fill="#555c6b"/>',
    dA(276, 166, 276, 62, 'var(--ink)', 1),
    dT(280, 112, '2,000 ft', 'd1', None, 8),
    dT(280, 123, 'above the', 'd2', None, 7),
    dT(280, 133, 'aerodrome', 'd2', None, 7),
    dA(160, 186, 270, 186, 'var(--ink)', 1),
    dT(214, 197, '2 NM (2.5 NM if runway over 1,850 m)', 'd2', 'middle', 7),
    dT(160, 30, 'Permission (ATC) or information (AFIS, A/G) before entering', 'd1', 'middle', 7.6),
]), 'Radius depends on the longest runway. Many busy aerodromes have no ATZ, so watch for them anyway.', 'ATZ and aerodromes')

# ---- A typical MATZ
fig('a-typical-matz', 'A typical MATZ', 320, 200, "".join([
    '<circle cx="120" cy="100" r="66" fill="color-mix(in srgb,#b0237a 7%,transparent)" stroke="#b0237a" stroke-width="1.6" stroke-dasharray="4 2"/><rect x="186" y="80" width="64" height="40" fill="color-mix(in srgb,#b0237a 7%,transparent)" stroke="#b0237a" stroke-width="1.6" stroke-dasharray="4 2"/><rect x="-10" y="80" width="64" height="40" fill="none"/><circle cx="120" cy="100" r="26" fill="color-mix(in srgb,#c0243a 10%,transparent)" stroke="#c0243a" stroke-width="1.4"/><rect x="104" y="98" width="32" height="4" fill="#555c6b"/>',
    dT(120, 82, 'ATZ', 'd1', 'middle', None, '#c0243a'),
    dT(218, 74, 'stub', 'd2', 'middle'),
    dT(120, 24, 'MATZ: 5 NM radius,', 'd1', 'middle', None, '#b0237a'),
    dT(120, 36, '3,000 ft above the airfield', 'd2', 'middle'),
    dB(254, 20, 62, 160, 'var(--surface)', 'var(--ink-2)'),
    dT(285, 38, 'Call', 'd1', 'middle'),
    dT(285, 50, '10 min', 'd2', 'middle'),
    dT(285, 61, 'ahead', 'd2', 'middle'),
    dT(285, 84, 'Not CAS', 'd1', 'middle'),
    dT(285, 96, 'for civil', 'd2', 'middle'),
    dT(285, 108, 'aircraft', 'd2', 'middle'),
    dT(285, 132, 'Never', 'd1', 'middle', None, 'var(--bad)'),
    dT(285, 144, 'enter the', 'd2', 'middle'),
    dT(285, 156, 'ATZ without', 'd2', 'middle'),
    dT(285, 168, 'clearance', 'd2', 'middle'),
]), 'Ask for a MATZ penetration service about 10 minutes ahead. Two calls with no reply: you may enter with caution.', 'MATZ')

# ---- Control zone and control area
fig('control-zone-and-control-area', 'Control zone and control area', 320, 200, "".join([
    '<path d="M0 176H320V200H0Z" fill="var(--ch-l1)"/><rect x="120" y="96" width="80" height="80" fill="color-mix(in srgb,#2457c5 12%,transparent)" stroke="#2457c5" stroke-width="1.6"/><rect x="40" y="40" width="240" height="56" fill="color-mix(in srgb,#2457c5 7%,transparent)" stroke="#2457c5" stroke-width="1.6" stroke-dasharray="6 3"/><rect x="150" y="170" width="20" height="6" fill="#555c6b"/>',
    dT(160, 140, 'CTR', 'd3', 'middle', None, '#2457c5'),
    dT(160, 154, 'from the surface', 'd2', 'middle'),
    dT(160, 70, 'CTA', 'd3', 'middle', None, '#2457c5'),
    dT(160, 84, 'base about 1,500 ft', 'd2', 'middle'),
    dSide(70, 152, 0.9, 'var(--accent)'),
    dT(70, 112, 'under the CTA', 'd2', 'middle'),
    dT(70, 124, 'without clearance', 'd2', 'middle'),
    dT(290, 30, 'Class D: clearance needed', 'd1', 'end', None, '#2457c5'),
]), 'A CTR starts at the surface around the airport. CTAs sit above and around it with higher bases you can fly beneath.', 'Airspace structure')
