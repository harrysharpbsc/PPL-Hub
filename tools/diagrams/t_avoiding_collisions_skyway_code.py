"""Avoiding collisions (Skyway Code): figures ported from the hand-written labs8x.js code (same geometry and wording).

Ported automatically from src/labs80-83notes.js (output checked identical), then restyled by the shared .pdg CSS.
Edit this file: the old JS is gone."""
from pplsvg import dA, dB, dL, dP, dSide, dT  # noqa: F401

TOPIC = 'Avoiding collisions (Skyway Code)'
FIGS = []


def fig(slug, title, w, h, body, caption, section):
    FIGS.append((slug, title, body, caption, section, w, h))


# ---- Constant bearing means collision
fig('constant-bearing-means-collision', 'Constant bearing means collision', 320, 200, "".join([
    '<g opacity="0.35">',
    dP(40, 170, 70, 'var(--accent)', 1),
    dP(280, 40, 225, 'var(--ink)', 1),
    dL('M40 170L280 40', 'var(--bad)', 0.8, '3 3'),
    '</g><g opacity="0.55">',
    dP(80, 160, 70, 'var(--accent)', 1),
    dP(252, 68, 225, 'var(--ink)', 1),
    dL('M80 160L252 68', 'var(--bad)', 0.8, '3 3'),
    '</g><g opacity="0.75">',
    dP(120, 150, 70, 'var(--accent)', 1),
    dP(224, 96, 225, 'var(--ink)', 1),
    dL('M120 150L224 96', 'var(--bad)', 0.8, '3 3'),
    '</g><g opacity="0.9500000000000001">',
    dP(160, 140, 70, 'var(--accent)', 1),
    dP(196, 124, 225, 'var(--ink)', 1),
    dL('M160 140L196 124', 'var(--bad)', 0.8, '3 3'),
    '</g><circle cx="188" cy="128" r="10" fill="none" stroke="var(--bad)" stroke-width="2"/>',
    dT(196, 150, 'collision point', 'd2'),
    dB(10, 10, 150, 52, 'var(--surface)', 'var(--bad)'),
    dT(85, 28, 'Same spot on your', 'd1', 'middle'),
    dT(85, 40, 'windscreen and getting', 'd1', 'middle'),
    dT(85, 52, 'bigger? Act now', 'd1', 'middle', None, 'var(--bad)'),
]), 'A threat that does not move across your windscreen is the one on a collision course. It hardly seems to move until late.', 'The risk')

# ---- Two ways to scan
fig('two-ways-to-scan', 'Two ways to scan', 320, 200, "".join([
    '<path d="M20 150Q160 40 300 150" fill="none" stroke="var(--ink-2)" stroke-width="1"/><circle cx="42" cy="134" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('42', '137', 1, 'd2', 'middle', 7),
    '<circle cx="56" cy="105" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('56', '108', 2, 'd2', 'middle', 7),
    '<circle cx="83" cy="81" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('83', '84', 3, 'd2', 'middle', 7),
    '<circle cx="119" cy="65" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('119', '68', 4, 'd2', 'middle', 7),
    '<circle cx="160" cy="60" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('160', '63', 5, 'd2', 'middle', 7),
    '<circle cx="201" cy="65" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('201', '68', 6, 'd2', 'middle', 7),
    '<circle cx="237" cy="81" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('237', '84', 7, 'd2', 'middle', 7),
    '<circle cx="264" cy="105" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('264', '108', 8, 'd2', 'middle', 7),
    '<circle cx="278" cy="134" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>',
    dT('278', '137', 9, 'd2', 'middle', 7),
    dT(160, 24, 'Side to side: far left, step right in blocks of about 10°', 'd2', 'middle', 7.4),
    dT(160, 176, 'Pause at least 1 second in each block, then check inside', 'd2', 'middle', 7.4),
    dT(160, 190, 'Front to side: centre, left, back to centre, then right', 'd2', 'middle', 7.4),
]), 'Your eyes only spot movement when they are still. Spend no more than 25% of your time looking inside.', 'The visual scan')
