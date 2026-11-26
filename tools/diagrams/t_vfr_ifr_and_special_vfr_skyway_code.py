"""VFR, IFR and Special VFR (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'VFR, IFR and Special VFR (Skyway Code)'
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
]), 'Visibility and distance from cloud depend on height, class and speed. These are legal minima, not targets.', 'VMC minima')

# ---- Special VFR in a control zone
fig('special-vfr-in-a-control-zone', 'Special VFR in a control zone', 320, 200, "".join([
    '<circle cx="110" cy="100" r="80" fill="color-mix(in srgb,#2457c5 8%,transparent)" stroke="#2457c5" stroke-width="1.8" stroke-dasharray="7 3"/>',
    dT(110, 32, 'CTR', 'd1', 'middle', None, '#2457c5'),
    '<path d="M60 88q-15.6 0 -10.4 -13q0 -15.6 15.6 -13q15 -18.2 40 -7.8q30 -10.4 45 6.5q15.6 2.6 10.4 14.3q0 13 -13 13Z" fill="#c7ced6" stroke="#9aa6b3" stroke-width=".8"/>',
    dSide(110, 120, 1.1, 'var(--accent)'),
    dB(204, 14, 110, 90, 'var(--surface)', 'var(--accent)'),
    dT(259, 30, 'To accept SVFR', 'd1', 'middle'),
    dT(259, 44, 'clear of cloud', 'd2', 'middle'),
    dT(259, 56, 'surface in sight', 'd2', 'middle'),
    dT(259, 68, 'flight visibility', 'd2', 'middle'),
    dT(259, 79, '1,500 m or more', 'd2', 'middle'),
    dT(259, 91, '140 kt or less', 'd2', 'middle'),
    dB(204, 112, 110, 76, 'var(--surface)', 'var(--mid)'),
    dT(259, 128, 'Take-off or landing', 'd1', 'middle'),
    dT(259, 142, 'ground visibility', 'd2', 'middle'),
    dT(259, 153, '1,500 m, or a', 'd2', 'middle'),
    dT(259, 164, 'cloud ceiling', 'd2', 'middle'),
    dT(259, 175, 'of 600 ft', 'd2', 'middle'),
]), 'SVFR lets you fly in a control zone below VMC without IFR, with ATC separating you from IFR and other SVFR traffic.', 'Special VFR')

# ---- When VFR is not enough in a CTR
fig('when-vfr-is-not-enough-in-a-ctr', 'When VFR is not enough in a CTR', 320, 200, "".join([
    '<path d="M0 170H320V200H0Z" fill="var(--ch-l1)"/><rect x="0" y="80" width="320" height="22" fill="#c7ced6" opacity=".9"/>',
    dL('M0 102H320', 'var(--bad)', 1.2, '4 3'),
    dT(8, 96, 'ceiling below 1,500 ft', 'd1', None, None, 'var(--bad)'),
    '<rect x="0" y="102" width="320" height="68" fill="#e7ebee" opacity=".5"/>',
    dT(160, 130, 'or ground visibility under 5 km', 'd1', 'middle', None, 'var(--bad)'),
    '<rect x="120" y="164" width="80" height="6" fill="#555c6b"/>',
    dT(160, 186, 'No VFR take-off, landing, ATZ or circuit', 'd2', 'middle'),
    dT(160, 30, 'Ask for Special VFR instead', 'd1', 'middle', None, 'var(--good)'),
    dT(160, 46, 'VFR is never allowed in Class A', 'd2', 'middle'),
]), 'In a control zone, VFR stops below a 1,500 ft ceiling or 5 km ground visibility. Ask ATC for Special VFR.', 'Other VFR requirements')
