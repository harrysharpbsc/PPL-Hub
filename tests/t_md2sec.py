"""md2sec.py (Obsidian note -> app sections) on synthetic notes in both of Harry's styles. Run from src/."""
import sys, os
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(here, '..', '.claude', 'skills', 'ppl-scans', 'scripts'))
from md2sec import conv
F = os.path.join(here, 'fixtures', 'notes')

figs = []
s = conv(os.path.join(F, '90 Old Style.md'), figs)
assert [x[0] for x in s] == ['Lights on aircraft', 'Low flying'], s
a, b = s[0][1], s[1][1]
assert a[0] == 'The <b>Green</b> light is on the right wing', a
assert a[1] == 'The red light shows through <code>110°</code>', a
assert a[2] == '– nested with one space', a
assert a[3] == '<b>A bold paragraph that is not a bullet</b>', 'plain paragraphs are kept: %r' % a
assert '<b>Exceptions</b>' in b and 'Captive balloons and kites' in b, '#### content kept: %r' % b
assert '<b>Glider hill-soaring</b>' in b and 'A glider is exempt if hill-soaring' in b, b
tab = [x for x in b if 'Follow me' in x]
assert tab and tab[0] == '<b>"Follow me"; rocks its wings</b>: Rock your wings; follow', tab
assert not any('Something from the book' in x or 'Answers' in x for x in a + b), 'practice questions are cut'
assert figs == [('embed', 'Pasted image 20261014163327.jpg', 'Lights on aircraft')], figs

figs = []
s = conv(os.path.join(F, '91 New Style.md'), figs)
assert len(s) == 1, s
it = s[0][1]
assert it[0] == '<code>Term</code>: a definition, see Visual Flight Rules and the airspace note', it
assert it[1] == 'A list:' and it[2] == '– first, tab-nested', it
assert it[3] == "<b>Exam trap</b> The exam's favourite confusion.", it
assert len(it) == 4, it
assert figs == [('figure', 'Figure 8-1 General IFR requirements (p. 131)', 'Visual flight rules')], figs
print('PASS md2sec')
