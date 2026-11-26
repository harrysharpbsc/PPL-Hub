"""Airspace infringements and FMCs (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Airspace infringements and FMCs (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Using a Frequency Monitoring Code
fig('using-a-frequency-monitoring-code', 'Using a Frequency Monitoring Code', 320, 200, "".join([
    '<circle cx="22" cy="18" r="11" fill="var(--accent)"/>',
    dT(22, 22, 1, 'd1', 'middle', None, '#fff'),
    dT(40, 16, 'Select the frequency', 'd1'),
    dT(40, 27, 'check volume and reception', 'd2'),
    '<circle cx="22" cy="55" r="11" fill="var(--accent)"/>',
    dT(22, 59, 2, 'd1', 'middle', None, '#fff'),
    dT(40, 53, 'Set the FMC with ALT', 'd1'),
    dT(40, 64, '(Mode C)', 'd2'),
    '<circle cx="22" cy="92" r="11" fill="var(--accent)"/>',
    dT(22, 96, 3, 'd1', 'middle', None, '#fff'),
    dT(40, 90, 'Listen', 'd1'),
    dT(40, 101, 'for your callsign or position', 'd2'),
    '<circle cx="22" cy="129" r="11" fill="var(--accent)"/>',
    dT(22, 133, 4, 'd1', 'middle', None, '#fff'),
    dT(40, 127, 'Stay within range', 'd1'),
    dT(40, 138, 'of the unit', 'd2'),
    '<circle cx="22" cy="166" r="11" fill="var(--accent)"/>',
    dT(22, 170, 5, 'd1', 'middle', None, '#fff'),
    dT(40, 164, 'Back to 7000', 'd1'),
    dT(40, 175, 'when you stop monitoring', 'd2'),
    dB(232, 40, 82, 100, '#15181d', '#666', 6),
    '<text x="273" y="80" text-anchor="middle" font-family="var(--f-mono)" font-size="20" fill="#7cf29a">FMC</text>',
    dT(273, 104, 'ATC may warn', 'd2', 'middle', 7.4, '#ddd'),
    dT(273, 116, 'you, but it is', 'd2', 'middle', 7.4, '#ddd'),
    dT(273, 128, 'not guaranteed', 'd2', 'middle', 7.4, '#ddd'),
]), 'An FMC shows ATC you are listening without having called. Each code has a published frequency and area.', 'Frequency Monitoring Codes')

# ---- Where the base changes
fig('where-the-base-changes', 'Where the base changes', 320, 200, "".join([
    '<path d="M0 180H320V200H0Z" fill="var(--ch-l1)"/><path d="M0 60H120V100H200V130H320V20H0Z" fill="color-mix(in srgb,#2457c5 10%,transparent)" stroke="#2457c5" stroke-width="1.6" stroke-dasharray="6 3"/>',
    dT(60, 80, 'base FL55', 'd1', 'middle', None, '#2457c5'),
    dT(160, 120, 'base 3,500 ft', 'd1', 'middle', None, '#2457c5'),
    dT(260, 150, 'base 2,500 ft', 'd1', 'middle', None, '#2457c5'),
    dL('M0 70H120M120 110H200M200 140H320', 'var(--good)', 1.4, '4 3'),
    dSide(80, 150, 0.9, 'var(--accent)'),
    dT(160, 194, 'Below altitude bases use the QNH. Below a flight level, think in 1013.', 'd2', 'middle', 7.2),
]), 'Bases can step down quickly and switch between altitudes and flight levels. Stay 200 ft below and 2 NM clear.', 'Prevention')
