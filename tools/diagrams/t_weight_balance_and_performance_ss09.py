"""Weight, balance and performance (SS09): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Weight, balance and performance (SS09)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Datum, arm and moment
fig('datum-arm-and-moment', 'Datum, arm and moment', 320, 200, "".join([
    dSide(170, 70, 3.6, 'var(--accent-soft)'),
    dL('M30 112H310', 'var(--ink)', 1),
    dL('M30 30V118', 'var(--bad)', 1.6, '4 3'),
    dT(34, 28, 'datum', 'd1', None, None, 'var(--bad)'),
    '<circle cx="99" cy="112" r="3.4" fill="var(--accent)"/>',
    dL('M99 112L64 131', 'var(--accent)', 0.9),
    dT(64, 140, 'Front seats, 160 kg', 'd1', 'middle', 7.4),
    dT(64, 149, 'arm 2.05 m', 'd2', 'middle', 6.8),
    '<circle cx="120" cy="112" r="3.4" fill="var(--accent)"/>',
    dL('M120 112L120 163', 'var(--accent)', 0.9),
    dT(120, 172, 'Empty aircraft, 700 kg', 'd1', 'middle', 7.4),
    dT(120, 181, 'arm 2.22 m', 'd2', 'middle', 6.8),
    '<circle cx="144" cy="112" r="3.4" fill="var(--accent)"/>',
    dL('M144 112L150 131', 'var(--accent)', 0.9),
    dT(150, 140, 'Fuel, 100 kg', 'd1', 'middle', 7.4),
    dT(150, 149, 'arm 2.41 m', 'd2', 'middle', 6.8),
    '<circle cx="215" cy="112" r="3.4" fill="var(--accent)"/>',
    dL('M215 112L230 131', 'var(--accent)', 0.9),
    dT(230, 140, 'Rear seats, 70 kg', 'd1', 'middle', 7.4),
    dT(230, 149, 'arm 2.98 m', 'd2', 'middle', 6.8),
    '<circle cx="296" cy="112" r="3.4" fill="var(--accent)"/>',
    dL('M296 112L290 131', 'var(--accent)', 0.9),
    dT(312, 140, 'Baggage, 15 kg', 'd1', 'end', 7.4),
    dT(312, 149, 'arm 3.63 m', 'd2', 'end', 6.8),
    dB(232, 14, 82, 36, 'var(--surface)', 'var(--accent)'),
    dT(273, 29, 'Moment =', 'd2', 'middle'),
    dT(273, 42, 'weight × arm', 'd1', 'middle'),
]), 'Each item sits at an arm measured from the datum. Moments add up, and CG = total moment ÷ total weight. This is the worked example from the leaflet.', 'Balance and the centre')

# ---- Worked CG check
fig('worked-cg-check', 'Worked CG check', 320, 200, "".join([
    dL('M50 170H300M50 170V20', 'var(--ink)', 1),
    dL('M60 170v4', 'var(--ink)', 1),
    dT(60, 183, '2.1 m', 'd2', 'middle'),
    dL('M115 170v4', 'var(--ink)', 1),
    dT(115, 183, '2.2 m', 'd2', 'middle'),
    dL('M170 170v4', 'var(--ink)', 1),
    dT(170, 183, '2.3 m', 'd2', 'middle'),
    dL('M225 170v4', 'var(--ink)', 1),
    dT(225, 183, '2.4 m', 'd2', 'middle'),
    dL('M280 170v4', 'var(--ink)', 1),
    dT(280, 183, '2.5 m', 'd2', 'middle'),
    dL('M46 150h4', 'var(--ink)', 1),
    dT(42, 153, 800, 'd2', 'end'),
    dL('M46 112h4', 'var(--ink)', 1),
    dT(42, 115, 900, 'd2', 'end'),
    dL('M46 74h4', 'var(--ink)', 1),
    dT(42, 77, 1000, 'd2', 'end'),
    dL('M46 36h4', 'var(--ink)', 1),
    dT(42, 39, 1100, 'd2', 'end'),
    '<path d="M86 150L80 74L160 36H240L262 150Z" fill="var(--good)" opacity=".16" stroke="var(--good)" stroke-width="1.4"/>',
    dT(212, 142, 'example envelope', 'd2', 'middle', 7),
    '<circle cx="159" cy="67" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="1.5"/>',
    dL('M159 67V170M50 67H159', 'var(--accent)', 0.8, '3 3'),
    dT(166, 64, '1,045 kg at 2.28 m: inside', 'd1'),
    dB(176, 98, 128, 46, 'var(--surface)', 'var(--ink-2)'),
    dT(240, 114, '2,386.05 ÷ 1,045', 'd2', 'middle'),
    dT(240, 128, '= 2.28 m aft of datum', 'd1', 'middle'),
    dT(175, 196, 'CG (m aft of datum)', 'd2', 'middle'),
]), "Plot weight against CG and make sure the point sits inside your own aircraft's envelope, for take-off and for landing.", 'Worked CG example')

# ---- Declared distances
fig('declared-distances', 'Declared distances', 320, 200, "".join([
    '<path d="M0 150H320V200H0Z" fill="var(--ch-l1)"/><rect x="40" y="128" width="190" height="20" fill="#555c6b"/><rect x="230" y="128" width="30" height="20" fill="#7a8190"/><rect x="260" y="122" width="50" height="32" fill="var(--ch-l2)" opacity=".7"/>',
    dT(245, 141, 'stop', 'd2', 'middle', 7, '#fff'),
    dT(285, 170, 'clearway', 'd2', 'middle', 7),
    dA(40, 106, 230, 106, 'var(--accent)', 1.4),
    dL('M40 101v10', 'var(--accent)', 1.4),
    dT(46, 102, 'TORA', 'd1', None, None, 'var(--accent)'),
    dA(40, 88, 310, 88, 'var(--good)', 1.4),
    dL('M40 83v10', 'var(--good)', 1.4),
    dT(46, 84, 'TODA', 'd1', None, None, 'var(--good)'),
    dA(40, 70, 260, 70, 'var(--mid)', 1.4),
    dL('M40 65v10', 'var(--mid)', 1.4),
    dT(46, 66, 'ASDA', 'd1', None, None, 'var(--mid)'),
    dA(40, 52, 230, 52, 'var(--warm)', 1.4),
    dL('M40 47v10', 'var(--warm)', 1.4),
    dT(46, 48, 'LDA', 'd1', None, None, 'var(--warm)'),
    dT(160, 24, 'TODA = TORA + clearway', 'd2', 'middle'),
    dT(160, 36, 'ASDA = TORA + stopway', 'd2', 'middle'),
]), 'Take-off run, take-off distance, accelerate-stop distance and landing distance available. Unlicensed strips may only quote total length.', 'Performance principles')

# ---- Rule-of-thumb take-off factors
fig('rule-of-thumb-take-off-factors', 'Rule-of-thumb take-off factors', 320, 200, "".join([
    dT(132, 28, '+10% weight', 'd2', 'end', 7.6),
    '<rect x="138" y="18" width="80" height="13" rx="2" fill="var(--accent)" opacity=".75"/>',
    dT(224, 28, '×1.2', 'd1'),
    dT(132, 47, '+1,000 ft elevation', 'd2', 'end', 7.6),
    '<rect x="138" y="37" width="40" height="13" rx="2" fill="var(--accent)" opacity=".75"/>',
    dT(184.00000000000003, 47, '×1.1', 'd1'),
    dT(132, 66, '+10°C', 'd2', 'end', 7.6),
    '<rect x="138" y="56" width="40" height="13" rx="2" fill="var(--accent)" opacity=".75"/>',
    dT(184.00000000000003, 66, '×1.1', 'd1'),
    dT(132, 85, 'Tailwind 10% of lift-off speed', 'd2', 'end', 7.6),
    '<rect x="138" y="75" width="80" height="13" rx="2" fill="var(--accent)" opacity=".75"/>',
    dT(224, 85, '×1.2', 'd1'),
    dT(132, 104, '2% uphill', 'd2', 'end', 7.6),
    '<rect x="138" y="94" width="40" height="13" rx="2" fill="var(--accent)" opacity=".75"/>',
    dT(184.00000000000003, 104, '×1.1', 'd1'),
    dT(132, 123, 'Dry grass', 'd2', 'end', 7.6),
    '<rect x="138" y="113" width="80" height="13" rx="2" fill="var(--mid)" opacity=".75"/>',
    dT(224, 123, '×1.2', 'd1'),
    dT(132, 142, 'Wet grass', 'd2', 'end', 7.6),
    '<rect x="138" y="132" width="120" height="13" rx="2" fill="var(--mid)" opacity=".75"/>',
    dT(264, 142, '×1.3', 'd1'),
    dT(132, 161, 'Soft ground or snow', 'd2', 'end', 7.6),
    '<rect x="138" y="151" width="100" height="13" rx="2" fill="var(--mid)" opacity=".75"/>',
    dT(244, 161, '×1.25', 'd1'),
    dT(132, 180, 'General factor (last)', 'd2', 'end', 7.6),
    '<rect x="138" y="170" width="132" height="13" rx="2" fill="var(--bad)" opacity=".75"/>',
    dT(276, 180, '×1.33', 'd1'),
    dT(160, 196, 'Multiply all the factors that apply together', 'd2', 'middle'),
]), 'Each condition stretches the take-off distance. Multiply the factors together, then apply the general safety factor.', 'Rule-of-thumb multipliers')
