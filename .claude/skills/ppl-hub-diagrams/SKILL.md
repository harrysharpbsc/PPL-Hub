---
name: ppl-hub-diagrams
description: Make or change PPL Hub topic diagrams (the figures inside note sections) with the Python generator in tools/diagrams. Use for any new diagram, redraw or diagram fix in the app: circuits and joins, altimeter and pressure, airspace, rules of the air, signals, instruments, navigation. Covers the app's diagram style, UK CAA conventions, how a figure reaches its note section, and the checks to run before pushing.
---

# PPL Hub diagrams

New diagrams are written in Python and generated into the app. Do not hand-write new SVG strings in the
`labs8x.js` files; those older figures stay as they are and can be edited in place for small fixes.

```
tools/diagrams/
  pplsvg.py           helpers that mirror src/labs80.js (T, L, B, P, side, badge, head, lines, paper), app tokens, preview page
  overhead_join.py    one module per topic: TOPIC + FIGS
  rules_of_the_air.py
  altimeter.py
  gen.py              writes src/labs84gen.js and previews in tools/diagrams/out/ (git-ignored)
  check.py            renders the previews light and dark and fails on label clashes
```

## Workflow

1. **Source the facts first.** Wording and numbers come from Harry's note for that topic (`src/data.js`, `NOTES`, the
   section's own text) or the CAA source it cites. Note what the topic already has: list its figures
   (`grep -n "dzAdd\|sec(" src/labs8*.js`, `labs89place.js`) and fill gaps rather than duplicate.
2. **Pick the note section** each figure belongs to. `section` must be the start of exactly one real section title
   of that topic; `tests/t_secdg.py` fails otherwise.
3. **Write or extend a module.** A new topic gets a new module (add it to `MODULES` in `gen.py`):
   ```python
   from pplsvg import B, L, P, T, badge, head, lines, side
   TOPIC = "Altimeter Setting Procedures"          # NOTES topic name, exactly
   FIGS = []
   def fig(slug, title, w, h, body, caption, section):
       FIGS.append((slug, title, body, caption, section, w, h))
   ```
   `body` is the SVG inside the frame; the chart paper and the figure card are added for you (`dzF` in the app).
4. `python3 tools/diagrams/gen.py`, then `python3 tools/diagrams/check.py`.
5. **Look at every screenshot** in `tools/diagrams/out/shots/` (light and dark). The checker cannot see these, and each
   has happened: an aircraft flying backwards, a turn in the wrong direction, a pointer at the wrong angle, a label
   struck through by a line, a label pointing at the wrong part. Name what you checked.
6. Build and test from `src/`: `python3 build.py`, `python3 ../tests/t_secdg.py`, `python3 ../tests/t_dgtext.py`
   (real Barlow metrics), `python3 ../tests/t_smoke.py`. Then commit `tools/diagrams/*`, `src/labs84gen.js`, `docs/`.

## Style (matches the app's existing figures)

- **Frame:** `viewBox` 320 wide by default (360 when a steps column or key is needed), height to fit. Chart paper,
  grid and ticks come from `dzF`/`paper()`.
- **Text classes:** `d1` Barlow 600 10px ink (names, headings in the figure); `d2` Barlow 500 7.8px slate
  (sublabels; the floor is 7.4px); `d3` Barlow Semi Condensed 700 12px (region words such as DEAD SIDE);
  `h` red 8px semibold (heights on a track); `n` white numerals in badges; `mono` for instrument read-outs
  (121.50, 7700, 1013). `lines()` sets "Interceptor: …", "You: …" prefixes in semibold ink.
- **Colour roles:** `--accent` blue for the circuit and your aircraft; `--bad` red for the procedure being taught
  (join track, step badges, warnings); `--mid` amber for pressure levels and lights; `--good` green for terrain and
  "safe" margins; `--warm` magenta only for boundaries that the app already draws that way. Dead side `--ch-l2`
  at 35%, live side accent at 6%. Runway `var(--rwy)`. Every colour must be a token: both themes have to work.
- **Labels:** 13 units between lines of 10px text, 10–11 between `d2` lines. Labels crossing a line get a halo
  (`style="paint-order:stroke;stroke:var(--ch-land);stroke-width:3px"`); the app's general text halo is switched off
  inside `.pdg` so badges and dials stay clean.
- **Numbering** only for a real sequence (steps of a procedure). Thousands separators: "2,000 ft".

## UK CAA conventions

Heights in ft aal (QFE) or ft amsl (QNH), say which; pressure in hPa; speeds kt; distances NM; wind "W/V 270°/10 kt";
runways "Runway 27" / RWY 27; left-hand circuits unless stated; UK terms (circuit, dead side, live side, circuit
height, regional pressure setting). R/T wording from CAP 413 as the app already uses it. Mark sketches "Not to scale".

## Geometry notes

- SVG `y` points down. In an arc, sweep-flag `0` is anticlockwise on screen, which is a **left** turn seen from above.
- `P(x, y, hdg)`: plan-view aircraft, nose up at hdg 0, so 90 = flying east. `side(x, y, sc)` faces **left**; pass
  `flip=True` to fly right.
- Altimeter pointers: one turn is 1,000 ft (long), 10,000 ft (short wide), 100,000 ft (thin with a triangle).
- Compute positions from real values (ft, NM, hPa) with a scale constant rather than by eye, so the picture
  stays true when a number changes.

## Gotchas

- `check.py` flags text over text, over badges, outside boxes and outside the frame. It skips numerals inside their own
  badge and text inside a dial. It does not check text against lines or arrows.
- A figure title must be unique within its topic (`labs89place.js` matches titles by prefix for the older figures).
- Older figures that a generated one replaces must be removed from their `labs8x.js` file in the same commit.
