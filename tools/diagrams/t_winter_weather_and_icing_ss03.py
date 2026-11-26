"""Winter weather and icing (SS03): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Winter weather and icing (SS03)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- How radiation fog forms
fig('how-radiation-fog-forms', 'How radiation fog forms', 320, 200, "".join([
    '<path d="M0 150H320V200H0Z" fill="var(--ch-l1)"/><circle cx="40" cy="30" r="10" fill="#d9d9d9"/><path d="M60 18l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#f2d16b"/><path d="M110 28l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#f2d16b"/><path d="M170 18l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#f2d16b"/><path d="M230 28l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#f2d16b"/><path d="M280 18l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#f2d16b"/>',
    dA(160, 60, 160, 130, 'var(--accent)', 1.2, '3 3'),
    dT(166, 96, 'heat radiates away', 'd2'),
    dT(166, 107, 'on a clear night', 'd2'),
    '<path d="M0 150C40 130 80 138 120 132S220 128 320 136V150H0Z" fill="#cfd6dc" opacity=".85"/>',
    dT(60, 145, 'fog', 'd1'),
    dB(208, 14, 104, 60, 'var(--surface)', 'var(--ink-2)'),
    dT(260, 30, 'Needs', 'd1', 'middle'),
    dT(260, 42, 'clear sky', 'd2', 'middle'),
    dT(260, 53, 'light wind', 'd2', 'middle'),
    dT(260, 64, 'moist air', 'd2', 'middle'),
    dL('M20 186H140', 'var(--bad)', 1.6),
    dL('M20 196C60 192 100 188 140 186', '#5aa0d8', 1.6),
    dT(146, 186, 'temperature', 'd2', None, 7.5),
    dT(146, 197, 'dew point: they meet', 'd2', None, 7.5),
]), 'Fog forms when the ground cools under clear skies and the air cools to its dew point. It clears slowly the next morning.', 'Radiation fog')

# ---- A depression passing over you
fig('a-depression-passing-over-you', 'A depression passing over you', 320, 200, "".join([
    '<path d="M0 166H320V200H0Z" fill="var(--ch-l1)"/><path d="M70 166L40 60" stroke="#2457c5" stroke-width="2.2"/><path d="M64 145l8 3-6 6z" fill="#2457c5"/><path d="M55 112l8 3-6 6z" fill="#2457c5"/><path d="M47 84l8 3-6 6z" fill="#2457c5"/><path d="M200 166L310 52" stroke="#d33" stroke-width="2.2"/><path d="M222 143a6 6 0 0 1 9 -2" fill="#d33"/><path d="M250 114a6 6 0 0 1 9 -2" fill="#d33"/><path d="M278 85a6 6 0 0 1 9 -2" fill="#d33"/><path d="M40 166V96Q44 50 66 56Q92 46 98 82Q104 120 96 166Z" fill="#8f9aa8" opacity=".75"/>',
    dT(70, 100, 'Cb', 'd1', 'middle', None, '#fff'),
    '<path d="M206 158L300 64H316V80L220 166Z" fill="#b7c0ca" opacity=".7"/><path d="M250 112L316 44V36L240 114Z" fill="#d7dde3" opacity=".8"/>',
    dT(276, 128, 'Ns', 'd1', 'middle'),
    dT(298, 60, 'As', 'd2', 'middle'),
    dL('M214 150l-5 14', '#5aa0d8', 1.2),
    dL('M224 150l-5 14', '#5aa0d8', 1.2),
    dL('M234 150l-5 14', '#5aa0d8', 1.2),
    dL('M244 150l-5 14', '#5aa0d8', 1.2),
    dL('M56 140l-5 18', '#5aa0d8', 1.6),
    dL('M66 140l-5 18', '#5aa0d8', 1.6),
    dL('M76 140l-5 18', '#5aa0d8', 1.6),
    dL('M86 140l-5 18', '#5aa0d8', 1.6),
    dT(150, 120, 'warm sector', 'd2', 'middle'),
    dT(150, 132, 'low cloud, drizzle', 'd2', 'middle', 7.4),
    dT(250, 24, 'Warm front: comes first', 'd1', 'middle', None, '#d33'),
    dT(250, 36, 'cloud lowers, rain, falling pressure', 'd2', 'middle', 7.2),
    dT(70, 24, 'Cold front: second', 'd1', 'middle', None, '#2457c5'),
    dT(70, 36, 'showers, gusts, then clearer', 'd2', 'middle', 7.2),
    dA(110, 186, 230, 186, 'var(--ink-2)', 1.2),
    dT(170, 197, 'the system moves this way', 'd2', 'middle', 7.2),
]), 'You meet the warm front first: lowering cloud and rain. Then the warm sector, then the cold front with showers and gusts, often followed by good flying in clear air.', 'Fronts and depressions')

# ---- Frost on the wing
fig('frost-on-the-wing', 'Frost on the wing', 320, 200, "".join([
    '<path d="M30 110C60 70 170 60 290 104L292 108L290 112C200 126 80 134 30 110Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/><path d="M40 96C80 72 170 66 270 96" stroke="#bfe3ff" stroke-width="6" fill="none" stroke-dasharray="2 2"/>',
    dB(50, 146, 100, 22, 'var(--surface)', 'var(--bad)'),
    '<rect x="50" y="146" width="30" height="22" fill="var(--bad)" opacity=".3"/>',
    dT(100, 161, 'lift -30%', 'd1', 'middle', None, 'var(--bad)'),
    dB(170, 146, 100, 22, 'var(--surface)', 'var(--bad)'),
    '<rect x="170" y="146" width="40" height="22" fill="var(--bad)" opacity=".3"/>',
    dT(220, 161, 'drag +40%', 'd1', 'middle', None, 'var(--bad)'),
    dT(160, 138, 'Even light frost can cost up to:', 'd1', 'middle'),
    dT(160, 186, 'Remove all frost, ice and snow before flight. Use Type I fluid.', 'd2', 'middle', 7.5),
]), 'A thin layer of frost roughens the upper surface. Brush it off without scratching, or use Type I fluid.', 'Frost, snow')

# ---- Airframe ice: where and when
fig('airframe-ice-where-and-when', 'Airframe ice: where and when', 320, 200, "".join([
    dL('M60 20V180', 'var(--ink)', 1),
    dL('M56 30h8', 'var(--ink)', 1),
    dT(50, 33, '+5°C', 'd2', 'end'),
    dL('M56 60h8', 'var(--ink)', 1),
    dT(50, 63, '0°C', 'd2', 'end'),
    dL('M56 100h8', 'var(--ink)', 1),
    dT(50, 103, '-5°C', 'd2', 'end'),
    dL('M56 140h8', 'var(--ink)', 1),
    dT(50, 143, '-10°C', 'd2', 'end'),
    dL('M56 175h8', 'var(--ink)', 1),
    dT(50, 178, '-15°C', 'd2', 'end'),
    '<rect x="64" y="60" width="240" height="80" fill="#5aa0d8" opacity=".18"/>',
    dT(184, 74, 'Most airframe ice: 0 to -10°C', 'd1', 'middle'),
    '<path d="M90 100h70v30h-70z" fill="#bfe3ff" stroke="#5aa0d8"/>',
    dT(125, 112, 'Clear ice', 'd1', 'middle'),
    dT(125, 124, 'large drops', 'd2', 'middle', 7.5),
    '<path d="M190 100h80v30h-80z" fill="#eef4f8" stroke="#9aa6b3"/>',
    dT(230, 112, 'Rime ice', 'd1', 'middle'),
    dT(230, 124, 'milky, stable cloud', 'd2', 'middle', 7.5),
    dT(184, 160, 'Freezing rain: can be extremely severe', 'd1', 'middle', None, 'var(--bad)'),
    dT(184, 172, 'Needs visible moisture at or below 0°C', 'd2', 'middle'),
]), 'Ice needs visible moisture and temperatures at or below 0°C. Clear ice builds fast in towering cloud, rime in stable cloud.', 'Carb ice and airframe ice')
