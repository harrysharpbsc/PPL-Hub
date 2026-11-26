"""Operations of Aircraft: figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Operations of Aircraft'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Three ways EASA classifies an operation
fig('three-ways-easa-classifies-an-operation', 'Three ways EASA classifies an operation', 320, 200, "".join([
    dB(110, 10, 100, 26, 'var(--accent-soft)', 'var(--accent)'),
    dT(160, 27, 'Civil aviation activity', 'd1', 'middle'),
    dA(160, 36, 56, 62, 'var(--ink-2)', 1.2),
    dB(8, 64, 96, 24),
    dT(56, 80, 'Remuneration?', 'd1', 'middle'),
    dA(56, 88, 30, 118, 'var(--ink-2)', 1),
    dA(56, 88, 82, 118, 'var(--ink-2)', 1),
    dB(8, 120, 46, 40, 'var(--surface-2)'),
    dB(58, 120, 46, 40, 'var(--surface-2)'),
    dT(31, 142, 'Commercial', 'd2', 'middle', 7),
    dT(31, 147, '', 'd2', 'middle', 7),
    dT(81, 136, 'Non-', 'd2', 'middle', 7),
    dT(81, 147, 'commercial', 'd2', 'middle', 7),
    dA(160, 36, 160, 62, 'var(--ink-2)', 1.2),
    dB(112, 64, 96, 24),
    dT(160, 80, 'Activity?', 'd1', 'middle'),
    dA(160, 88, 134, 118, 'var(--ink-2)', 1),
    dA(160, 88, 186, 118, 'var(--ink-2)', 1),
    dB(112, 120, 46, 40, 'var(--surface-2)'),
    dB(162, 120, 46, 40, 'var(--surface-2)'),
    dT(135, 136, 'Air', 'd2', 'middle', 7),
    dT(135, 147, 'transport', 'd2', 'middle', 7),
    dT(185, 136, 'Specialised', 'd2', 'middle', 7),
    dT(185, 147, 'operation', 'd2', 'middle', 7),
    dA(160, 36, 264, 62, 'var(--ink-2)', 1.2),
    dB(216, 64, 96, 24),
    dT(264, 80, 'Aircraft?', 'd1', 'middle'),
    dA(264, 88, 238, 118, 'var(--ink-2)', 1),
    dA(264, 88, 290, 118, 'var(--ink-2)', 1),
    dB(216, 120, 46, 40, 'var(--surface-2)'),
    dB(266, 120, 46, 40, 'var(--surface-2)'),
    dT(239, 142, 'Complex', 'd2', 'middle', 7),
    dT(239, 147, '', 'd2', 'middle', 7),
    dT(289, 136, 'Other than', 'd2', 'middle', 7),
    dT(289, 147, 'complex', 'd2', 'middle', 7),
    dT(160, 185, 'Every operation is classified all three ways at once', 'd2', 'middle'),
]), 'Commercial or not depends on payment, air transport or specialised on the activity, complex or not on the aircraft.', 'EASA classifies')

# ---- What makes an aeroplane complex
fig('what-makes-an-aeroplane-complex', 'What makes an aeroplane complex', 320, 200, "".join([
    dB(10, 30, 70, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(45, 52, 'MTOM over', 'd2', 'middle'),
    dT(45, 128, '5,700 kg', 'd1', 'middle'),
    dB(86, 30, 70, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(121, 52, 'Passenger seats', 'd2', 'middle'),
    dT(121, 128, 'more than 19', 'd1', 'middle'),
    dB(162, 30, 70, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(197, 52, 'Minimum crew', 'd2', 'middle'),
    dT(197, 128, '2 pilots', 'd1', 'middle'),
    dB(238, 30, 70, 110, 'var(--surface)', 'var(--accent)', 6),
    dT(273, 52, 'Engines', 'd2', 'middle'),
    dT(273, 124, '1+ turbojet', 'd1', 'middle', 7.5),
    dT(273, 135, 'or 2+ turboprop', 'd1', 'middle', 7.5),
    '<g transform="translate(45 92)"><path d="M-18 10H18L14-6H-14Z" fill="var(--ink-2)"/><text y="6" text-anchor="middle" class="d1" style="fill:var(--surface);stroke:none">kg</text></g><g transform="translate(121 92)"><rect x="-17" y="-14" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-10" y="-14" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-3" y="-14" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="4" y="-14" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="11" y="-14" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-17" y="-7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-10" y="-7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-3" y="-7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="4" y="-7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="11" y="-7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-17" y="0" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-10" y="0" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-3" y="0" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="4" y="0" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="11" y="0" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-17" y="7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-10" y="7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="-3" y="7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="4" y="7" width="5" height="5" rx="1" fill="var(--ink-2)"/><rect x="11" y="7" width="5" height="5" rx="1" fill="var(--ink-2)"/></g><g transform="translate(197 92)"><circle cx="-8" cy="-6" r="5" fill="var(--ink-2)"/><circle cx="8" cy="-6" r="5" fill="var(--ink-2)"/><path d="M-16 12C-16 2-12 0-8 0S0 2 0 12ZM0 12C0 2 4 0 8 0S16 2 16 12Z" fill="var(--ink-2)"/></g><g transform="translate(264 70) scale(.9)"><path d="M-22-7.5H8L18-4.5H22V4.5H18L8 7.5H-22Z" fill="var(--ink-2)"/><path d="M-12-7.5V7.5M0-7.5V7.5" stroke="var(--surface)" stroke-width=".8" opacity=".6"/><ellipse cx="-22" cy="0" rx="3.2" ry="8" fill="var(--ink)"/><ellipse cx="-22.4" cy="0" rx="1.8" ry="6" fill="var(--surface-2)"/><path d="M-22.4-5.5V5.5M-24-3.5L-21 3.5M-24 3.5L-21-3.5" stroke="var(--ink-2)" stroke-width=".7"/><path d="M22-3L28 0L22 3Z" fill="var(--ink)"/><path d="M30-2.5q3-2 6 0t6 0M30 2.5q3 2 6 0t6 0" fill="none" stroke="var(--mid)" stroke-width="1.2"/></g>',
    dT(273, 87, 'or', 'd2', 'middle', 7),
    '<g transform="translate(255 102) scale(1.12)"><path d="M-7-3.5H8L13-2V2L8 3.5H-7Z" fill="var(--ink-2)"/><path d="M-7-3Q-11.5 0-7 3Z" fill="var(--ink)"/><ellipse cx="-9.5" cy="0" rx="2" ry="11" fill="none" stroke="var(--ink-2)" stroke-width=".5" stroke-dasharray="1.5 1.5"/><path d="M-9.5-1L-10.6-10.5Q-9.5-11.5-8.4-10.5ZM-9.5 1L-10.6 10.5Q-9.5 11.5-8.4 10.5Z" fill="var(--ink)"/><path d="M8 3.5l3 2.5" stroke="var(--ink)" stroke-width="1.2"/></g><g transform="translate(289 102) scale(1.12)"><path d="M-7-3.5H8L13-2V2L8 3.5H-7Z" fill="var(--ink-2)"/><path d="M-7-3Q-11.5 0-7 3Z" fill="var(--ink)"/><ellipse cx="-9.5" cy="0" rx="2" ry="11" fill="none" stroke="var(--ink-2)" stroke-width=".5" stroke-dasharray="1.5 1.5"/><path d="M-9.5-1L-10.6-10.5Q-9.5-11.5-8.4-10.5ZM-9.5 1L-10.6 10.5Q-9.5 11.5-8.4 10.5Z" fill="var(--ink)"/><path d="M8 3.5l3 2.5" stroke="var(--ink)" stroke-width="1.2"/></g>',
    dT(160, 172, 'Any one of these makes it complex', 'd1', 'middle', None, 'var(--bad)'),
    dT(160, 188, 'A typical PPL single meets none of them', 'd2', 'middle'),
]), 'MTOM over 5,700 kg, more than 19 passenger seats, at least 2 pilots, or at least one turbojet or more than one turboprop.', 'Definition of complex')

# ---- Which rules for a G-registered aeroplane?
fig('which-rules-for-a-g-registered-aeroplane', 'Which rules for a G-registered aeroplane?', 320, 200, "".join([
    dB(10, 10, 300, 24, 'var(--accent-soft)', 'var(--accent)'),
    dT(160, 26, 'UK SERA rules of the air: every aircraft in UK airspace', 'd1', 'middle'),
    dB(10, 46, 145, 26, 'var(--surface)', 'var(--good)'),
    dT(82, 63, 'Part-21 aircraft', 'd1', 'middle'),
    dB(165, 46, 145, 26, 'var(--surface)', 'var(--mid)'),
    dT(237, 63, 'Non-Part-21 aircraft', 'd1', 'middle'),
    dT(82, 86, 'modern factory-built', 'd2', 'middle'),
    dT(237, 86, 'vintage, ex-military, amateur-built,', 'd2', 'middle'),
    dT(237, 97, 'microlights, gyroplanes', 'd2', 'middle'),
    dB(10, 108, 68, 44, 'var(--surface-2)'),
    dT(44, 126, 'Licensing', 'd2', 'middle'),
    dT(44, 141, 'Part-FCL', 'd1', 'middle'),
    dB(87, 108, 68, 44, 'var(--surface-2)'),
    dT(121, 126, 'Operations', 'd2', 'middle'),
    dT(121, 141, 'Part-NCO', 'd1', 'middle'),
    dB(165, 108, 68, 44, 'var(--surface-2)'),
    dT(199, 126, 'Licensing', 'd2', 'middle'),
    dT(199, 141, 'ANO Pt 6, Sch 8', 'd1', 'middle', 7.2),
    dB(242, 108, 68, 44, 'var(--surface-2)'),
    dT(276, 126, 'Operations', 'd2', 'middle'),
    dT(276, 141, 'ANO Pt 5, Sch 5', 'd1', 'middle', 7.2),
    dB(10, 164, 300, 26, 'var(--surface)', 'var(--ink-2)'),
    dT(160, 181, 'ANO 2016: safety rules for all aircraft and people in UK airspace', 'd2', 'middle'),
]), 'The rules of the air apply to everyone. Licensing and operating rules depend on whether the aircraft is Part-21 or not.', 'Documents for a UK pilot')
