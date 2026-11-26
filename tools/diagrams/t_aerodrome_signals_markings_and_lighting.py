"""Aerodrome signals, markings and lighting (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Aerodrome signals, markings and lighting (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- The signals square
fig('the-signals-square', 'The signals square', 320, 200, "".join([
    '<rect x="0" y="0" width="320" height="200" fill="#2f6b3a" opacity=".85"/><g transform="translate(40 40)"><path d="M-14-12H14M0-12V14" stroke="#fff" stroke-width="5"/></g>',
    dT(40, 72, 'T: land towards', 'd2', 'middle', 7.2, '#fff'),
    dT(40, 82, 'the cross arm', 'd2', 'middle', 7.2, '#fff'),
    '<g transform="translate(120 40)"><path d="M-16 0H12M4-8L12 0L4 8" stroke="#f4d03f" stroke-width="5" fill="none"/></g>',
    dT(120, 72, 'Right-hand', 'd2', 'middle', 7.2, '#fff'),
    dT(120, 82, 'circuit', 'd2', 'middle', 7.2, '#fff'),
    '<g transform="translate(200 40)"><rect x="-14" y="-12" width="28" height="24" fill="#d22"/><path d="M-14-12L14 12" stroke="#f4d03f" stroke-width="4"/></g>',
    dT(200, 72, 'Special', 'd2', 'middle', 7.2, '#fff'),
    dT(200, 82, 'precautions', 'd2', 'middle', 7.2, '#fff'),
    '<g transform="translate(280 40)"><rect x="-14" y="-12" width="28" height="24" fill="#d22"/><path d="M-14-12L14 12M14-12L-14 12" stroke="#f4d03f" stroke-width="4"/></g>',
    dT(280, 72, 'Landing', 'd2', 'middle', 7.2, '#fff'),
    dT(280, 82, 'prohibited', 'd2', 'middle', 7.2, '#fff'),
    '<g transform="translate(40 136)"><circle cx="-11" r="7" fill="#fff"/><circle cx="11" r="7" fill="#fff"/><rect x="-11" y="-3" width="22" height="6" fill="#fff"/></g>',
    dT(40, 168, 'Paved surfaces', 'd2', 'middle', 7.2, '#fff'),
    dT(40, 178, 'only', 'd2', 'middle', 7.2, '#fff'),
    '<g transform="translate(120 136)"><circle cx="-11" r="7" fill="#fff"/><circle cx="11" r="7" fill="#fff"/><rect x="-11" y="-3" width="22" height="6" fill="#fff"/><path d="M-13-7v14M13-7v14" stroke="#111" stroke-width="2.4"/></g>',
    dT(120, 168, 'Runways only for', 'd2', 'middle', 7.2, '#fff'),
    dT(120, 178, 'take-off, landing', 'd2', 'middle', 7.2, '#fff'),
    '<g transform="translate(200 136)"><path d="M-6-14V14M6-14V14M-14-5H14M-14 5H14" stroke="#fff" stroke-width="3"/></g>',
    dT(200, 168, 'Gliding', 'd2', 'middle', 7.2, '#fff'),
    dT(200, 178, 'in progress', 'd2', 'middle', 7.2, '#fff'),
    '<g transform="translate(280 136)"><rect x="-14" y="-12" width="28" height="24" fill="#f4d03f"/><text y="7" text-anchor="middle" font-size="18" font-weight="700" fill="#111">C</text></g>',
    dT(280, 168, 'Report', 'd2', 'middle', 7.2, '#fff'),
    dT(280, 178, 'here', 'd2', 'middle', 7.2, '#fff'),
]), 'Seen from the air in the signals square. With no signal, circuits are left-hand.', 'Signal square')

# ---- Runway lights and PAPI
fig('runway-lights-and-papi', 'Runway lights and PAPI', 320, 200, "".join([
    '<rect x="0" y="0" width="320" height="200" fill="#1a2233"/><path d="M120 190L150 20H170L200 190Z" fill="#2b3446"/><circle cx="120" cy="190" r="2.4" fill="#fff"/><circle cx="200" cy="190" r="2.4" fill="#fff"/><circle cx="124" cy="166" r="2.4" fill="#fff"/><circle cx="196" cy="166" r="2.4" fill="#fff"/><circle cx="129" cy="141" r="2.4" fill="#fff"/><circle cx="191" cy="141" r="2.4" fill="#fff"/><circle cx="133" cy="117" r="2.4" fill="#fff"/><circle cx="187" cy="117" r="2.4" fill="#fff"/><circle cx="137" cy="93" r="2.4" fill="#fff"/><circle cx="183" cy="93" r="2.4" fill="#fff"/><circle cx="141" cy="69" r="2.4" fill="#fff"/><circle cx="179" cy="69" r="2.4" fill="#fff"/><circle cx="146" cy="44" r="2.4" fill="#fff"/><circle cx="174" cy="44" r="2.4" fill="#fff"/><circle cx="150" cy="20" r="2.4" fill="#fff"/><circle cx="170" cy="20" r="2.4" fill="#fff"/><circle cx="132" cy="186" r="3" fill="#2fd05a"/><circle cx="153" cy="22" r="2.4" fill="#e0262b"/><circle cx="146" cy="186" r="3" fill="#2fd05a"/><circle cx="156.5" cy="22" r="2.4" fill="#e0262b"/><circle cx="160" cy="186" r="3" fill="#2fd05a"/><circle cx="160" cy="22" r="2.4" fill="#e0262b"/><circle cx="174" cy="186" r="3" fill="#2fd05a"/><circle cx="163.5" cy="22" r="2.4" fill="#e0262b"/><circle cx="188" cy="186" r="3" fill="#2fd05a"/><circle cx="167" cy="22" r="2.4" fill="#e0262b"/>',
    dT(214, 186, 'green threshold', 'd2', None, 7.4, '#cfe'),
    dT(214, 100, 'white edge lights', 'd2', None, 7.4, '#eee'),
    dT(184, 18, 'red end', 'd2', None, 7.4, '#fcc'),
    '<circle cx="14" cy="30" r="4.4" fill="#fff"/><circle cx="25" cy="30" r="4.4" fill="#fff"/><circle cx="36" cy="30" r="4.4" fill="#fff"/><circle cx="47" cy="30" r="4.4" fill="#fff"/>',
    dT(14, 44, '4 white: too high', 'd2', None, 7, '#ddd'),
    '<circle cx="14" cy="60" r="4.4" fill="#fff"/><circle cx="25" cy="60" r="4.4" fill="#fff"/><circle cx="36" cy="60" r="4.4" fill="#fff"/><circle cx="47" cy="60" r="4.4" fill="#e0262b"/>',
    dT(14, 74, '3 white 1 red', 'd2', None, 7, '#ddd'),
    '<circle cx="14" cy="90" r="4.4" fill="#fff"/><circle cx="25" cy="90" r="4.4" fill="#fff"/><circle cx="36" cy="90" r="4.4" fill="#e0262b"/><circle cx="47" cy="90" r="4.4" fill="#e0262b"/>',
    dT(14, 104, '2 and 2: on slope', 'd2', None, 7, '#ddd'),
    '<circle cx="14" cy="120" r="4.4" fill="#fff"/><circle cx="25" cy="120" r="4.4" fill="#e0262b"/><circle cx="36" cy="120" r="4.4" fill="#e0262b"/><circle cx="47" cy="120" r="4.4" fill="#e0262b"/>',
    dT(14, 134, '1 white 3 red', 'd2', None, 7, '#ddd'),
    '<circle cx="14" cy="150" r="4.4" fill="#e0262b"/><circle cx="25" cy="150" r="4.4" fill="#e0262b"/><circle cx="36" cy="150" r="4.4" fill="#e0262b"/><circle cx="47" cy="150" r="4.4" fill="#e0262b"/>',
    dT(14, 164, '4 red: too low', 'd2', None, 7, '#ddd'),
]), 'Four-light PAPI shown, normally a 3° to 4° approach. A two-light APAPI shows one white and one red when on slope.', 'Runway lighting')

# ---- Signs and stop bars
fig('signs-and-stop-bars', 'Signs and stop bars', 320, 200, "".join([
    '<rect x="0" y="0" width="320" height="200" fill="#4a505c"/><rect x="14" y="20" width="90" height="34" rx="3" fill="#d22" stroke="#222"/><text x="59" y="44" text-anchor="middle" font-family="var(--f-mono)" font-weight="700" font-size="17" fill="#fff">27-09</text>',
    dT(59, 72, 'Mandatory:', 'd1', 'middle', 8, '#fff'),
    dT(59, 84, 'do not pass without', 'd2', 'middle', 6.8, '#ddd'),
    '<rect x="116" y="20" width="90" height="34" rx="3" fill="#f4d03f" stroke="#222"/><text x="161" y="44" text-anchor="middle" font-family="var(--f-mono)" font-weight="700" font-size="17" fill="#111">B →</text>',
    dT(161, 72, 'Direction:', 'd1', 'middle', 8, '#fff'),
    dT(161, 84, 'taxiway B to the right', 'd2', 'middle', 6.8, '#ddd'),
    '<rect x="218" y="20" width="90" height="34" rx="3" fill="#111" stroke="#222"/><text x="263" y="44" text-anchor="middle" font-family="var(--f-mono)" font-weight="700" font-size="17" fill="#f4d03f">A</text>',
    dT(263, 72, 'Location:', 'd1', 'middle', 8, '#fff'),
    dT(263, 84, 'you are on A', 'd2', 'middle', 6.8, '#ddd'),
    '<rect x="0" y="104" width="320" height="34" fill="#353a44"/><circle cx="66" cy="146" r="3.4" fill="#e0262b"/><circle cx="86" cy="146" r="3.4" fill="#e0262b"/><circle cx="106" cy="146" r="3.4" fill="#e0262b"/><circle cx="126" cy="146" r="3.4" fill="#e0262b"/><circle cx="146" cy="146" r="3.4" fill="#e0262b"/><circle cx="166" cy="146" r="3.4" fill="#e0262b"/><circle cx="186" cy="146" r="3.4" fill="#e0262b"/><circle cx="206" cy="146" r="3.4" fill="#e0262b"/><circle cx="226" cy="146" r="3.4" fill="#e0262b"/><circle cx="246" cy="146" r="3.4" fill="#e0262b"/><circle cx="46" cy="146" r="5" fill="#f4d03f"/><circle cx="274" cy="146" r="5" fill="#f4d03f" opacity=".4"/>',
    dT(160, 124, 'runway', 'd2', 'middle', None, '#ddd'),
    dT(160, 170, 'Red stop bar: never cross it', 'd1', 'middle', None, '#fff'),
    dT(160, 182, 'Flashing yellow guard lights mark the holding point', 'd2', 'middle', 7.2, '#ddd'),
]), 'Red with white is mandatory. Yellow with black gives directions. Black with yellow tells you where you are.', 'Taxiway signs')
