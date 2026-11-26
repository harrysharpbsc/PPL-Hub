"""Weather charts and forecasts (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Weather charts and forecasts (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Reading a METAR group by group
fig('reading-a-metar-group-by-group', 'Reading a METAR group by group', 320, 200, "".join([
    dB(8, 20, 304, 34, '#15181d', '#666'),
    '<text x="16" y="42" font-family="var(--f-mono)" font-size="10.4" fill="#eee">EGXX 261150Z 34008KT 9999 SCT025 12/07 Q1019</text>',
    dL('M69 56V64', 'var(--accent)', 1),
    dT(69, 74, 'place and', 'd1', 'middle', 7.6),
    dT(69, 85, 'time (UTC)', 'd2', 'middle', 7),
    dL('M119 56V110', 'var(--accent)', 1),
    dT(119, 120, '340° at', 'd1', 'middle', 7.6),
    dT(119, 131, '8 knots', 'd2', 'middle', 7),
    dL('M160 56V64', 'var(--accent)', 1),
    dT(160, 74, '10 km', 'd1', 'middle', 7.6),
    dT(160, 85, 'or more', 'd2', 'middle', 7),
    dL('M197 56V110', 'var(--accent)', 1),
    dT(197, 120, '3 to 4 oktas', 'd1', 'middle', 7.6),
    dT(197, 131, 'at 2,500 ft AAL', 'd2', 'middle', 7),
    dL('M237 56V64', 'var(--accent)', 1),
    dT(237, 74, 'temp', 'd1', 'middle', 7.6),
    dT(237, 85, 'dew point', 'd2', 'middle', 7),
    dL('M275 56V110', 'var(--accent)', 1),
    dT(275, 120, 'QNH', 'd1', 'middle', 7.6),
    dT(275, 131, 'hPa', 'd2', 'middle', 7),
    dT(160, 176, 'Cloud heights are above the aerodrome, so compare them with the', 'd2', 'middle', 7.4),
    dT(160, 188, 'terrain on your route. Type is only given for CB and TCU.', 'd2', 'middle', 7.4),
]), 'A made-up example. TAFs are forecasts, METARs are reports, usually every half hour.', 'Reading TAFs')

# ---- Cloud amounts and the ceiling
fig('cloud-amounts-and-the-ceiling', 'Cloud amounts and the ceiling', 320, 200, "".join([
    '<circle cx="40" cy="70" r="24" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/><path d="M40 70V46A24 24 0 0 1 64.0 70.0Z" fill="var(--ink-2)"/>',
    dT(40, 114, 'FEW', 'd3', 'middle'),
    dT(40, 128, '1 to 2 oktas', 'd2', 'middle'),
    '<circle cx="120" cy="70" r="24" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/><path d="M120 70V46A24 24 0 0 1 120.0 94.0Z" fill="var(--ink-2)"/>',
    dT(120, 114, 'SCT', 'd3', 'middle'),
    dT(120, 128, '3 to 4 oktas', 'd2', 'middle'),
    '<circle cx="200" cy="70" r="24" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/><path d="M200 70V46A24 24 0 1 1 176.0 70.0Z" fill="var(--ink-2)"/>',
    dT(200, 114, 'BKN', 'd3', 'middle'),
    dT(200, 128, '5 to 7 oktas', 'd2', 'middle'),
    '<circle cx="280" cy="70" r="24" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/><circle cx="280" cy="70" r="24" fill="var(--ink-2)"/>',
    dT(280, 114, 'OVC', 'd3', 'middle'),
    dT(280, 128, '8 oktas', 'd2', 'middle'),
    '<rect x="160" y="140" width="156" height="22" rx="4" fill="var(--bad)" opacity=".15"/>',
    dT(238, 155, 'ceiling: BKN or OVC', 'd1', 'middle', None, 'var(--bad)'),
    '<rect x="4" y="140" width="156" height="22" rx="4" fill="var(--accent)" opacity=".12"/>',
    dT(82, 155, 'cloud base: any cloud', 'd1', 'middle'),
    dT(160, 186, 'Ceiling is the lowest layer covering more than half the sky', 'd2', 'middle'),
]), 'An okta is an eighth of the sky. FEW and SCT count for the cloud base but not the ceiling.', 'Making the weather decision')

# ---- What the F215 shows
fig('what-the-f215-shows', 'What the F215 shows', 320, 200, "".join([
    '<path d="M90 20Q130 30 150 70Q120 110 160 150Q190 180 150 196H30Q10 120 40 60Q60 20 90 20Z" fill="var(--ch-l1)" stroke="var(--ch-rv)"/><path d="M120 10L140 80L170 130" stroke="#d33" stroke-width="2" fill="none"/><path d="M200 40L170 130L150 196" stroke="#2457c5" stroke-width="2" fill="none"/><path d="M60 40Q100 80 70 130" stroke="var(--ink-2)" stroke-width="1" fill="none" stroke-dasharray="3 3"/>',
    dT(60, 90, 'A', 'd3', 'middle'),
    dT(118, 110, 'B', 'd3', 'middle'),
    dT(180, 80, 'C', 'd3', 'middle'),
    dB(208, 18, 106, 170, 'var(--surface)', 'var(--ink-2)'),
    dT(261, 34, 'Each zone lists', 'd1', 'middle'),
    dT(261, 50, 'cloud amount, type', 'd2', 'middle', 7.2),
    dT(261, 63, 'base and top (AMSL)', 'd2', 'middle', 7.2),
    dT(261, 76, 'visibility, weather', 'd2', 'middle', 7.2),
    dT(261, 89, 'icing, turbulence', 'd2', 'middle', 7.2),
    dT(261, 102, 'freezing level (0°C)', 'd2', 'middle', 7.2),
    dT(261, 115, '', 'd2', 'middle', 7.2),
    dT(261, 128, 'Valid 9 hours,', 'd2', 'middle', 7.2),
    dT(261, 141, 'below 10,000 ft', 'd2', 'middle', 7.2),
    dT(261, 154, 'XXX: tops above', 'd2', 'middle', 7.2),
    dT(261, 167, 'the chart limit', 'd2', 'middle', 7.2),
]), 'The low-level forecast for the British Isles. Use it with METARs and TAFs to build the whole picture.', 'F215')
