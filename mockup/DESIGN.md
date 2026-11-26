# Design mock-up: "Plotted route"

A proposal only. It does not touch the live app (`src/`, `docs/`, `main`).
Open `mockup/index.html` (built by `python3 mockup/build.py`).

## Brief
- **Subject:** UK CAA PPL(A) theory revision: notes, quizzes, mock exams, radio and flight labs.
- **Audience:** Harry, a student pilot, on a phone or a tablet held in portrait, in short daily sessions.
- **Main job:** get straight into today's revision, and show what's due and what's weak against the 75% pass mark.

## Tokens
| Name | Light | Dark | Use |
|---|---|---|---|
| Chart paper | `#F5F7F3` | `#0E1A2E` | page |
| Panel | `#FFFFFF` | `#15233B` | grouped lists |
| Ink (logo navy) | `#16284A` | `#E8EDF6` | text |
| Airspace blue | `#1E5FA6` | `#82B4F0` | actions, links, selected |
| Route magenta | `#A2186F` | `#F07ABF` | today's route only, plus the 75% pass mark |
| Terrain tint | `#E4EBD6` | `#1C2C34` | the hero's ground, quiet fills |

Type: **Barlow Semi Condensed** (600/700) for headings, numbers and buttons, and **Barlow** (400/500) for reading text.
Barlow is drawn from road and runway signage, so it suits the subject without being a costume. Scale ×1.25:
13 / 15 / 17 / 21 / 27 / 34 px. Left-aligned throughout, and line length stays under about 70 characters.

## Layout
- Phone: one column and a bottom tab bar. Tablet (≥ 700 px): the same tab bar, with lists and subjects in two columns.
- Lists are grouped rows inside one panel with hairline dividers, not a separate card per item.
  Radii follow the hierarchy: panel 16, buttons 12, chips fully round.
- Progress bars always carry the **75% pass mark** as a magenta tick, so every bar answers the same question: "am I exam-ready?"

## The one bold thing
**Today's route.** The day's session is plotted as a magenta track with ICAO-style reporting-point triangles,
the way you'd draw a route on the 1:500,000 chart. An open triangle is still to do, a filled one is done, and the
next leg carries the main button. The track draws itself once when the page opens; that's the only automatic motion,
and it's off when the device asks for reduced motion.

## Changed from my first plan, after checking against "generic" defaults
- The current app is warm cream with a serif display face, which is the most common generated look. It's now cool chart paper with a signage sans.
- The first plan had a big "10 cards" number in a coloured block (the stock hero). That's replaced by the route, which shows the order of the day.
- The first plan used a separate card for every topic, quiz and lab. That's now grouped rows.
- Removed the monospace "not tried" labels and "·" separated meta lines; status is a word or a small mark.
