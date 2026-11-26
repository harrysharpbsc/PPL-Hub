"""Airspace: figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Airspace'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- FIRs and UIRs (not to scale)
fig('firs-and-uirs-not-to-scale', 'FIRs and UIRs (not to scale)', 320, 206, "".join([
    '<path d="M60 150H300V196H60Z" fill="var(--accent-soft)"/><path d="M60 40H300V150H60Z" fill="var(--surface-2)"/>',
    dL('M60 150H300', 'var(--accent)', 1.4),
    dL('M60 40H300', 'var(--ink)', 1.4),
    '<path d="M60 196H300V204H60Z" fill="var(--ch-wt)"/><path d="M60 196q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0" stroke="var(--ch-rv)" stroke-width="1" fill="none"/>',
    dT(180, 178, 'London FIR / Scottish FIR', 'd1', 'middle'),
    dT(180, 190, 'surface to FL245', 'd2', 'middle'),
    dT(180, 96, 'London UIR / Scottish UIR', 'd1', 'middle'),
    dT(180, 108, 'FL245 to FL660 (upper airspace)', 'd2', 'middle'),
    dT(54, 154, 'FL245', 'd1', 'end'),
    dT(54, 44, 'FL660', 'd1', 'end'),
    dT(54, 196, 'SFC', 'd1', 'end'),
    dL('M60 124H300', 'var(--mid)', 1, '5 3'),
    dT(296, 120, 'in Europe the UIR starts at FL195', 'd2', 'end', None, 'var(--mid)'),
]), 'Two UK FIRs, London and Scottish, from the surface to FL245. Upper airspace above them forms the London and Scottish UIRs, FL245 to FL660.', 'Flight Information Regions')

# ---- CTR, TMA, airway and ATZ (side view, not to scale)
fig('ctr-tma-airway-and-atz-side-view-not-to-scale', 'CTR, TMA, airway and ATZ (side view, not to scale)', 320, 196, "".join([
    '<path d="M10 186H310V194H10Z" fill="var(--ch-wt)"/><path d="M10 186q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0q2 -2 4 0t4 0" stroke="var(--ch-rv)" stroke-width="1" fill="none"/><path d="M10 186V180H310V186Z" fill="var(--ch-l1)"/><path d="M120 180V96H200V180Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>',
    dT(160, 122, 'CTR', 'd1', 'middle'),
    dT(160, 134, 'from the surface', 'd2', 'middle'),
    '<path d="M70 96V60H250V96Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>',
    dT(160, 74, 'TMA (a CTA)', 'd1', 'middle'),
    dT(160, 86, 'from a base altitude', 'd2', 'middle'),
    '<path d="M10 60V30H310V60H260V48H60V60Z" fill="var(--surface-2)" stroke="var(--ink-2)" stroke-width="1.2"/>',
    dT(160, 42, 'airway: 5 nm each side of centreline', 'd2', 'middle'),
    dT(14, 74, 'airway base', 'd2'),
    dT(14, 84, 'stepped down', 'd2'),
    dT(14, 94, 'near aerodromes', 'd2'),
    '<path d="M140 180V146H180V180" fill="none" stroke="var(--bad)" stroke-width="1.2" stroke-dasharray="3 2"/>',
    dT(160, 164, 'ATZ', 'd2', 'middle', None, 'var(--bad)'),
    '<path d="M152 180H168V176H152Z" fill="var(--ink-2)"/>',
]), 'A Control Zone starts at the surface; a Control Area (including a TMA) and an airway start at a base. An ATZ sits inside the CTR.', 'Control Zones, TMAs')

# ---- Special VFR minima (inside a Control Zone)
fig('special-vfr-minima-inside-a-control-zone', 'Special VFR minima (inside a Control Zone)', 320, 196, "".join([
    dB(8, 8, 304, 150, 'var(--accent-soft)', 'var(--accent)', 6, 1.4),
    dT(16, 24, 'Control Zone only', 'd1', None, None, 'var(--accent)'),
    '<path d="M150 30Q164 18 180 26Q196 14 214 26Q236 22 236 38Q236 50 214 48H160Q144 48 150 30Z" fill="#fff" stroke="var(--ink-2)"/>',
    dT(250, 36, 'clear of cloud', 'd2'),
    dSide(120, 72, 0.42, 'var(--accent)', True),
    dT(150, 72, '≤ 140 kt', 'd1'),
    dT(150, 84, 'flight visibility ≥ 1,500 m', 'd2'),
    '<path d="M8 150H312" stroke="var(--ch-tx)" stroke-width="1"/><path d="M8 150V140Q60 130 120 140T312 136V150Z" fill="var(--ch-l1)"/>',
    dT(16, 132, 'in sight of the surface', 'd2'),
    dT(16, 176, 'No take-off, landing or ATZ entry if the aerodrome reports:', 'd2'),
    dT(16, 188, 'ground visibility below 1,500 m, or cloud ceiling below 600 ft.', 'd1'),
]), 'An ATC authorisation: no flight plan needed but ATC approval is. ATC separate SVFR from other SVFR and IFR traffic.', 'Special VFR')

# ---- Crossing the base of an airway
fig('crossing-the-base-of-an-airway', 'Crossing the base of an airway', 320, 210, "".join([
    dT(8, 14, 'plan view', 'd1'),
    '<path d="M8 40H312V100H8Z" fill="var(--surface-2)" stroke="var(--ink-2)"/>',
    dL('M8 70H312', 'var(--ink-2)', 1, '8 5'),
    dT(306, 64, 'B1: Class A, FL75+', 'd2', 'end'),
    dL('M160 20V120', 'var(--good)', 1.6),
    dA(160, 110, 160, 24, 'var(--good)', 1.6),
    dT(166, 118, 'at right angles', 'd2', None, None, 'var(--good)'),
    dA(30, 40, 30, 70, 'var(--ink)', 1),
    dA(30, 100, 30, 70, 'var(--ink)', 1),
    dT(36, 56, '5 nm', 'd2'),
    dT(36, 92, '5 nm', 'd2'),
    dT(8, 140, 'side view', 'd1'),
    '<path d="M8 150H312V172H8Z" fill="var(--surface-2)" stroke="var(--ink-2)"/>',
    dT(160, 165, 'airway (do not enter)', 'd2', 'middle'),
    dL('M8 172H312', 'var(--bad)', 1.4),
    dT(306, 186, 'base FL75', 'd2', 'end', None, 'var(--bad)'),
    dSide(150, 194, 0.38, 'var(--accent)', True),
    dT(176, 198, 'below FL75, in VMC', 'd2'),
]), 'Without an instrument rating you may pass under an airway whose base is a flight level, at right angles, in VMC, but never inside it. To cross through it you need an IR, a flight plan and a crossing clearance requested 10 minutes ahead.', 'Crossing an airway')

# ---- ATZ dimensions (plan to scale)
fig('atz-dimensions-plan-to-scale', 'ATZ dimensions (plan to scale)', 320, 196, "".join([
    '<circle cx="84" cy="96" r="56" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/><path d="M72.63066954643628 100.11231101511879L95.36933045356372 91.88768898488121" stroke="var(--ink-2)" stroke-width="4"/><circle cx="84" cy="96" r="2" fill="var(--bad)"/>',
    dA(84, 96, 84, 151, 'var(--ink)', 1.1),
    dT(88, 132, '2 nm', 'd1'),
    dT(84, 32, 'longest runway 1,850 m or less', 'd2', 'middle'),
    '<circle cx="236" cy="96" r="70" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/><path d="M218.94600431965443 102.16846652267819L253.05399568034557 89.83153347732181" stroke="var(--ink-2)" stroke-width="4"/><circle cx="236" cy="96" r="2" fill="var(--bad)"/>',
    dA(236, 96, 236, 165, 'var(--ink)', 1.1),
    dT(240, 139, '2.5 nm', 'd1'),
    dT(236, 18, 'longest runway over 1,850 m', 'd2', 'middle'),
    dT(160, 186, 'surface to 2,000 ft aal, centred on the mid-point of the longest runway', 'd2', 'middle'),
]), 'Radius 2 nm if the longest runway is 1,850 m or less, 2.5 nm if longer (some 2 nm ATZs are enlarged to give 1.5 nm beyond every runway end). Runways drawn to the same scale: 1,600 m and 2,400 m.', 'Aerodrome Traffic Zones')

# ---- MATZ dimensions (to scale)
fig('matz-dimensions-to-scale', 'MATZ dimensions (to scale)', 320, 254, "".join([
    dT(8, 16, 'plan', 'd1'),
    '<path d="M140.99090833947008 60H206V108H140.99090833947008" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/><circle cx="86" cy="84" r="60" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/><circle cx="86" cy="84" r="30" fill="none" stroke="var(--bad)" stroke-dasharray="3 2"/><path d="M72 84H100" stroke="var(--ink-2)" stroke-width="4"/>',
    dA(86, 84, 27, 84, 'var(--ink)', 1),
    dT(56, 80, '5 nm', 'd2', 'middle'),
    dA(176, 118, 146, 118, 'var(--ink)', 1),
    dA(176, 118, 206, 118, 'var(--ink)', 1),
    dT(176, 130, '5 nm', 'd2', 'middle'),
    dA(214, 84, 214, 60, 'var(--ink)', 1),
    dA(214, 84, 214, 108, 'var(--ink)', 1),
    dT(218, 88, '4 nm wide', 'd2'),
    dT(86, 158, 'ATZ inside (dashed)', 'd2', 'middle', None, 'var(--bad)'),
    dT(8, 172, 'side', 'd1'),
    '<path d="M26 246V180H206V224H146V246Z" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/>',
    dL('M10 246H312', 'var(--ink-2)', 1.2),
    '<path d="M56 246V202H116V246" fill="none" stroke="var(--bad)" stroke-dasharray="3 2"/>',
    dT(30, 176, '3,000 ft aal', 'd2'),
    dT(210, 228, '1,000', 'd2'),
    dT(210, 184, '3,000', 'd2'),
]), 'MATZ: surface to 3,000 ft aal, radius 5 nm. Stubs along the final approach: 4 nm wide, 5 nm beyond the circle, from 1,000 to 3,000 ft aal. The ATZ inside always applies. Distances to scale; heights to their own scale.', 'Military Aerodrome')

# ---- UK airspace classes at a glance
fig('uk-airspace-classes-at-a-glance', 'UK airspace classes at a glance', 320, 184, "".join([
    '<rect x="8" y="8" width="304" height="22" fill="var(--surface-2)"/>',
    dT(12, 24, 'Class', 'd1'),
    dT(48, 24, 'VFR?', 'd1'),
    dT(108, 24, 'UK use', 'd1'),
    dT(12, 46, 'A', 'd1', None, None, 'var(--bad)'),
    dT(48, 46, 'no', 'd2'),
    dT(108, 46, 'airways, London and Manchester TMAs, some CTAs', 'd2'),
    '<rect x="8" y="52" width="304" height="22" fill="var(--surface-2)" opacity=".5"/>',
    dT(12, 68, 'B', 'd1'),
    dT(48, 68, '-', 'd2'),
    dT(108, 68, 'not allocated in the UK', 'd2'),
    dT(12, 90, 'C', 'd1', None, None, 'var(--accent)'),
    dT(48, 90, 'clearance', 'd2'),
    dT(108, 90, 'everything above FL195, some CTAs below', 'd2'),
    '<rect x="8" y="96" width="304" height="22" fill="var(--surface-2)" opacity=".5"/>',
    dT(12, 112, 'D', 'd1', None, None, 'var(--accent)'),
    dT(48, 112, 'clearance', 'd2'),
    dT(108, 112, 'most CTRs and CTAs, Scottish TMA', 'd2'),
    dT(12, 134, 'E', 'd1'),
    dT(48, 134, 'yes', 'd2'),
    dT(108, 134, 'parts of Scottish TMA, some CTAs and airways', 'd2'),
    '<rect x="8" y="140" width="304" height="22" fill="var(--surface-2)" opacity=".5"/>',
    dT(12, 156, 'F', 'd1'),
    dT(48, 156, '-', 'd2'),
    dT(108, 156, 'not allocated in the UK', 'd2'),
    dT(12, 178, 'G', 'd1', None, None, 'var(--good)'),
    dT(48, 178, 'yes', 'd2'),
    dT(108, 178, 'the Open-FIR: everything else, incl. MATZs', 'd2'),
    dL('M8 30H312', 'var(--line)', 1),
]), 'Controlled airspace is A to E; uncontrolled is F and G. VFR in C and D needs flight notification and an ATC clearance.', 'UK airspace classes')

# ---- Reading a Danger Area
fig('reading-a-danger-area', 'Reading a Danger Area', 320, 212, "".join([
    '<circle cx="62" cy="62" r="40" fill="none" stroke="#d8312c" stroke-width="2.4"/>',
    dT(62, 58, 'D129/1.75', 'd1', 'middle'),
    dT(62, 118, 'solid red:', 'd2', 'middle'),
    dT(62, 129, 'active in published hours', 'd2', 'middle'),
    '<circle cx="190" cy="62" r="40" fill="none" stroke="#d8312c" stroke-width="2.4" stroke-dasharray="7 5"/>',
    dT(190, 58, 'D044/3.2', 'd1', 'middle'),
    dT(190, 118, 'pecked red: inactive', 'd2', 'middle'),
    dT(190, 129, 'unless notified by NOTAM', 'd2', 'middle'),
    dT(286, 46, '*D141', 'd1', 'middle'),
    dT(286, 62, '* = by-laws:', 'd2', 'middle'),
    dT(286, 74, 'no entry', 'd2', 'middle'),
    dT(286, 86, 'when active', 'd2', 'middle'),
    dB(8, 146, 304, 60, 'var(--surface-2)', 'var(--line)'),
    dT(16, 162, 'D 1 29 / 1.75', 'd3'),
    dT(130, 160, 'D: Danger (P Prohibited, R Restricted)', 'd2'),
    dT(130, 172, '1: latitude band 51°N to 52°N', 'd2'),
    dT(130, 184, '29: area number', 'd2'),
    dT(130, 196, '1.75: top 1,750 ft amsl', 'd2'),
]), '"1-2.5" after the slash would mean 1,000 to 2,500 ft amsl. Check the chart legend: other charts may draw areas differently.', 'Prohibited, Restricted and Danger')

# ---- Low-level hazards (heights agl, to scale)
fig('low-level-hazards-heights-agl-to-scale', 'Low-level hazards (heights agl, to scale)', 320, 206, "".join([
    dL('M40 196H312', 'var(--ink-2)', 1.2),
    dL('M40 196H312', 'var(--line)', 0.6),
    dT(36, 199, '0', 'd2', 'end'),
    dL('M40 153.5H312', 'var(--line)', 0.6),
    dT(36, 156.5, '500', 'd2', 'end'),
    dL('M40 111H312', 'var(--line)', 0.6),
    dT(36, 114, '1,000', 'd2', 'end'),
    dL('M40 68.49999999999999H312', 'var(--line)', 0.6),
    dT(36, 71.49999999999999, '1,500', 'd2', 'end'),
    dL('M40 26H312', 'var(--line)', 0.6),
    dT(36, 29, '2,000', 'd2', 'end'),
    '<rect x="46" y="153.5" width="44" height="21.25" fill="var(--bad)" opacity=".55"/><rect x="46" y="26" width="44" height="127.50000000000001" fill="var(--bad)" opacity=".15"/>',
    dT(68, 22, 'military', 'd2', 'middle'),
    dT(68, 186.75, 'low flying', 'd2', 'middle'),
    '<path d="M114 196V26" stroke="var(--ink)" stroke-width="1.4" stroke-dasharray="2 2"/>',
    dT(118, 36, 'winch cable', 'd2'),
    dT(118, 46, '2,000 ft', 'd2'),
    '<path d="M180 196V111" stroke="var(--ink-2)"/><circle cx="180" cy="111" r="6" fill="var(--mid)"/>',
    dT(190, 115, 'para balloon', 'd2'),
    dT(190, 125, '1,000 ft', 'd2'),
    dL('M250 68.49999999999999H312', 'var(--accent)', 1.4),
    dT(310, 64.49999999999999, 'birds: 1,500 ft', 'd2', 'end', None, 'var(--accent)'),
    '<rect x="250" y="153.5" width="60" height="42.5" fill="var(--mid)" opacity=".25"/>',
    dT(280, 165.5, 'small arms', 'd2', 'middle'),
    dT(280, 175.5, '500 ft', 'd2', 'middle'),
]), 'Military low flying is busiest at 250 to 500 ft agl (dark band). Higher up: parachuting to FL150 within 1.5 nm of a drop zone, and target towing to 10,000 ft.', 'Other hazards')
