"""GA radiotelephony practice (SS22): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'GA radiotelephony practice (SS22)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Squawk codes to know
fig('squawk-codes-to-know', 'Squawk codes to know', 320, 200, "".join([
    dB(10, 12, 146, 50, '#15181d', '#666', 6),
    '<text x="22" y="45" font-family="var(--f-mono)" font-size="22" fill="#7cf29a">7000</text>',
    dT(92, 34, 'VFR', 'd1', None, 8.6, '#eee'),
    dT(92, 47, 'conspicuity', 'd2', None, 7.6, '#bbb'),
    '<rect x="146" y="20" width="4" height="34" rx="2" fill="var(--good)"/>',
    dB(164, 12, 146, 50, '#15181d', '#666', 6),
    '<text x="176" y="45" font-family="var(--f-mono)" font-size="22" fill="#7cf29a">2000</text>',
    dT(246, 34, 'IFR', 'd1', None, 8.6, '#eee'),
    dT(246, 47, 'conspicuity', 'd2', None, 7.6, '#bbb'),
    '<rect x="300" y="20" width="4" height="34" rx="2" fill="var(--good)"/>',
    dB(10, 72, 146, 50, '#15181d', '#666', 6),
    '<text x="22" y="105" font-family="var(--f-mono)" font-size="22" fill="#7cf29a">0030</text>',
    dT(92, 94, 'Lost', 'd1', None, 8.6, '#eee'),
    dT(92, 107, '(UK)', 'd2', None, 7.6, '#bbb'),
    '<rect x="146" y="80" width="4" height="34" rx="2" fill="var(--mid)"/>',
    dB(164, 72, 146, 50, '#15181d', '#666', 6),
    '<text x="176" y="105" font-family="var(--f-mono)" font-size="22" fill="#7cf29a">7600</text>',
    dT(246, 94, 'Radio', 'd1', None, 8.6, '#eee'),
    dT(246, 107, 'failure', 'd2', None, 7.6, '#bbb'),
    '<rect x="300" y="80" width="4" height="34" rx="2" fill="var(--mid)"/>',
    dB(10, 132, 146, 50, '#15181d', '#666', 6),
    '<text x="22" y="165" font-family="var(--f-mono)" font-size="22" fill="#7cf29a">7700</text>',
    dT(92, 154, 'Emergency', 'd1', None, 8.6, '#eee'),
    dT(92, 167, '', 'd2', None, 7.6, '#bbb'),
    '<rect x="146" y="140" width="4" height="34" rx="2" fill="var(--bad)"/>',
    dB(164, 132, 146, 50, '#15181d', '#666', 6),
    '<text x="176" y="165" font-family="var(--f-mono)" font-size="22" fill="#7cf29a">7500</text>',
    dT(246, 154, 'Unlawful', 'd1', None, 8.6, '#eee'),
    dT(246, 167, 'interference', 'd2', None, 7.6, '#bbb'),
    '<rect x="300" y="140" width="4" height="34" rx="2" fill="var(--bad)"/>',
    dT(160, 196, 'Select ALT (Mode C). Press IDENT only when asked.', 'd2', 'middle'),
]), 'The three 7s are for trouble. 0030 is the UK lost code, used while you call for help.', 'Squawk codes')

# ---- Where to make your aerodrome calls
fig('where-to-make-your-aerodrome-calls', 'Where to make your aerodrome calls', 320, 200, "".join([
    dL('M10 120H310', 'var(--ink-2)', 1, '2 3'),
    '<rect x="20" y="114" width="60" height="12" fill="#555c6b"/>',
    dT(50, 142, 'runway', 'd2', 'middle'),
    dL('M80 104V136', 'var(--ink)', 1),
    dT(80, 100, 'threshold', 'd2', 'middle'),
    dL('M150 104V136', 'var(--ink)', 1),
    dT(150, 100, '4 NM', 'd2', 'middle'),
    dL('M220 104V136', 'var(--ink)', 1),
    dT(220, 100, '8 NM', 'd2', 'middle'),
    '<rect x="80" y="112" width="70" height="16" fill="var(--good)" opacity=".2"/>',
    dT(115, 124, 'final', 'd1', 'middle'),
    '<rect x="150" y="112" width="70" height="16" fill="var(--mid)" opacity=".2"/>',
    dT(185, 124, 'long final', 'd1', 'middle'),
    dP(300, 120, 270, 'var(--accent)', 1.2),
    dT(160, 60, 'No such call as "short final": give the distance', 'd2', 'middle'),
    dB(20, 154, 280, 36, 'var(--surface)', 'var(--accent)'),
    dT(160, 168, 'At ATC aerodromes call 15 NM or 5 minutes', 'd1', 'middle'),
    dT(160, 181, 'from the ATZ, whichever is greater', 'd2', 'middle'),
    dT(160, 24, 'Circuit calls: downwind and final.', 'd1', 'middle'),
    dT(160, 36, 'Overhead join: overhead, then descending deadside', 'd2', 'middle'),
]), 'Final runs from 4 NM to the threshold, long final from 4 to 8 NM.', 'Circuit and aerodrome calls')

# ---- The distress or urgency message
fig('the-distress-or-urgency-message', 'The distress or urgency message', 320, 200, "".join([
    '<rect x="40" y="6" width="240" height="18" rx="9" fill="var(--bad)" stroke="var(--ink-2)"/>',
    dT(54, 19, '1. MAYDAY ×3 or PAN PAN ×3', 'd1', None, 8.4, '#fff'),
    '<rect x="40" y="28" width="240" height="18" rx="9" fill="var(--surface)" stroke="var(--ink-2)"/>',
    dT(54, 41, '2. Station called', 'd1', None, 8.4),
    '<rect x="40" y="50" width="240" height="18" rx="9" fill="var(--surface)" stroke="var(--ink-2)"/>',
    dT(54, 63, '3. Your callsign and type', 'd1', None, 8.4),
    '<rect x="40" y="72" width="240" height="18" rx="9" fill="var(--surface)" stroke="var(--ink-2)"/>',
    dT(54, 85, '4. Nature of the problem', 'd1', None, 8.4),
    '<rect x="40" y="94" width="240" height="18" rx="9" fill="var(--surface)" stroke="var(--ink-2)"/>',
    dT(54, 107, '5. Intentions', 'd1', None, 8.4),
    '<rect x="40" y="116" width="240" height="18" rx="9" fill="var(--surface)" stroke="var(--ink-2)"/>',
    dT(54, 129, '6. Position, height, heading', 'd1', None, 8.4),
    '<rect x="40" y="138" width="240" height="18" rx="9" fill="var(--surface)" stroke="var(--ink-2)"/>',
    dT(54, 151, '7. Pilot qualification', 'd1', None, 8.4),
    dT(272, 151, '(helps UK controllers)', 'd2', 'end', 7),
    '<rect x="40" y="160" width="240" height="18" rx="9" fill="var(--surface)" stroke="var(--ink-2)"/>',
    dT(54, 173, '8. Other: persons on board, endurance', 'd1', None, 8.4),
    dT(160, 196, 'Then squawk 7700. Use 121.5 MHz if not with a unit.', 'd2', 'middle'),
]), 'MAYDAY is grave and imminent danger. PAN PAN is a concern without immediate danger, and is worth making early.', 'MAYDAY and PAN PAN')
