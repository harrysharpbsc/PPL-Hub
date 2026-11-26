---
name: ppl-diagram
description: Draw, redraw or fix the topic diagrams in Harry's PPL Study Hub (UK PPL(A) revision app) in the approved "style B" - hand-written inline SVG built with the labs80b.js library, labels 11 px or more on a phone, every arrow labelled, colour by role, UK air-law accurate. Use this whenever a task touches a diagram, figure, picture or illustration in a subject's notes (Rules of the Air, Aerodromes, Altimetry, Airspace, ATS, Meteorology, Navigation, Human Performance, Flight Performance, Principles of Flight, Aircraft General, Communications), when converting the remaining topics from the old chart-paper style, when Harry says a diagram is hard to read, wrong, cluttered or too small, or asks for a new diagram for a note section - even if he does not say "diagram" (e.g. "the MATZ picture is unreadable on my tablet", "can you show the circuit joins visually").
---

# PPL Study Hub diagrams (style B)

Harry is a student pilot revising for the UK CAA PPL(A) theory exams, mostly on a Samsung tablet in portrait
and sometimes on a phone. A diagram earns its place when it lets him *see the mechanism* the exam asks about:
who turns which way, which light is visible from where, which height is measured from what. In November 2026
he compared three treatments of the Rules of the Air diagrams side by side and chose **style B**; this skill is
how to draw every other topic the same way, so the app ends up consistent.

Style B in one line: a plain card (no chart-paper grid), short labels at 12 px / 11 px, every arrow says what it
means, comparisons are drawn side by side, the full sentence lives in the caption, and colour always means the
same thing.

Reference implementation: `src/labs84air.js` (14 Rules of the Air figures). Read two or three of its entries
before drawing anything; copying their patterns is faster and more consistent than inventing new ones.

## Where things live

| File | What it is |
|---|---|
| `src/labs80b.js` | The style B library (`dbFig`, `dbT`, `dbL`, `dbAR`, `dbHead`, `dbPlane`, `dbSide`, `dbArc`, `dbSector`, `dbN`). Shared by every topic. |
| `src/labs84air.js` | Rules of the Air, style B. Pattern for new topic files. |
| `src/hub.html` | CSS for `.dgb` (search "style B diagrams"); `DSEC` (figures per note section) and `secFigs`. |
| `src/labs80.js`, `labs81.js`, `labs82.js`, `labs83notes.js` | Old chart-paper diagrams (`dzF`, `dzAdd`, `sec`) still waiting to be converted. |
| `src/labs89place.js` | Moves old `DIAG` figures into note sections by title. Style B figures go straight into `DSEC`, so they need no entry here. |
| `tests/t_dgsize.py` | Labels >= 11 px at 430/800/1100 px, and every figure in a topic listed in `DONE` is style B. |
| `tests/t_dgtext.py` | Labels stay inside the drawing and don't overlap, measured with the real Barlow fonts. |
| `tests/t_secdg.py` | Every figure sits in a real note section and fits its card. |

How a figure reaches the screen: `DSEC[topic]` is a list of `[sectionHeadingPrefix, figureHtml]`. When Harry
opens a note section, `secFigs` shows the figures whose prefix matches the start of that section's heading, in
list order. So the prefix must match a heading in that topic's `NOTES` sections (in `src/data.js` / `caa*.js`).

## Converting a topic (the usual job)

1. **Inventory.** Open the topic in the app (or grep the title in `src/labs8*.js` and `src/hub.html`) and list
   every figure: title, which note section it sits in, which file draws it. Old figures come from three places:
   `dzAdd('Topic',[...])` in labs80–82 (placed by `labs89place.js`), `sec(X,'Section',[...])` in
   `labs83notes.js`, and occasionally the `DIAG` object in `hub.html`.
2. **Decide what each figure must show.** For each one, write one sentence: the claim it makes. Then ask what
   the reader has to *see* for that claim, and draw that (see "Drawing rules"). If a figure says nothing a
   sentence wouldn't, or duplicates a better one, propose dropping it rather than redrawing it.
3. **Check the content** against UK sources before drawing (see "Getting the aviation right"). Redrawing is
   the cheapest moment to fix an error, and Harry relies on these for the exam.
4. **Write `src/labs84<short>.js`** (e.g. `labs84ad.js` for Aerodromes; the `labs84` prefix keeps it after
   `labs83notes.js` and before `labs89place.js` in the build order). Same shape as `labs84air.js`:
   ```js
   (function(){
   var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN;
   var F=[
   ['Title', 320, 200, /* drawing */ T(160,190,'label','t2','middle')+..., 'Caption sentence(s).'],
   ...
   ];
   var SEC=['Section heading prefix', ...];   // one per figure, same order
   DSEC['Topic']=F.map(function(f,i){return[SEC[i],dbFig(f[0],f[1],f[2],f[3],f[4])]});
   })();
   ```
   Assigning `DSEC['Topic']=` replaces the topic's old section figures; keep the order Harry is used to unless
   there is a reason to change it.
5. **Remove the old versions** so nothing is drawn twice: the topic's `dzAdd` block(s), its `sec(...)` block in
   `labs83notes.js`, its `DIAG` entry, and its line in `labs89place.js`. Delete helpers only if nothing else
   uses them (grep first).
6. **Add the topic to `DONE`** in `tests/t_dgsize.py`.
7. **Build and test** (below), then look at every figure yourself at 430 px in light *and* dark mode.
8. **Review before shipping.** Commit to the working branch, not `main` (pushing to `main` ships to Harry's
   tablet). Give him a side-by-side page (live vs new, at phone width, light and dark, a one-line "what
   changed" under each pair, accuracy fixes called out separately) and wait for his go-ahead.

For a single new figure, the same rules apply: add an entry to the topic's style B file if it has one; if the
topic is still old-style, say so and suggest converting the topic so the styles don't mix within one topic.

## Drawing rules

These come from what made Harry pick style B. The reason matters more than the rule, so apply the reason
when a case isn't covered.

- **Canvas 320 wide.** A phone card shows the SVG at about 338 px, so a 320-unit viewBox keeps 11-unit text at
  about 11.6 px. Wider canvases shrink the text (a 340-wide figure dropped labels to 10.9 px). Choose the height
  for the content (170-330). `dbFig` caps the drawing at 460 px on the tablet so a lone figure doesn't balloon.
- **Two text sizes only.** `t1` (12 px, bold, ink) names things: aircraft, legs, zones, the headline of a
  panel. `t2` (11 px, ink-2) is the short qualifier underneath or beside it. Never set a smaller size;
  `t_dgsize` fails below 11 px.
- **Labels are a few words.** At 12 px Barlow a character is roughly 6.3 units wide (11 px: about 5.4), so a
  label of n characters needs about n x 6.3 units. A sentence won't fit, and shouldn't: put the full rule in
  the caption, where it wraps and stays readable. Wording on the drawing points at things; the caption explains.
- **Label every arrow with what it means**: "turns right", "gives way to", "alters heading right to pass",
  "glide clear". An unlabelled arrow reads as "related somehow". Put the label next to the arrow in the
  arrow's colour.
- **Colour = role, always the same.** Accent blue (`a`) = you, or the aircraft that has to act. Ink (`k`) =
  the other aircraft. Bad red (`r`) = a limit, danger or "too low/too close". Good green (`g`) = the safe
  outcome or the gap that keeps you clear. Mid amber (`m`) = zones and angles (the 70° overtaking zone).
  Quiet guide lines use `s2`. Navigation lights use their real colours (built into `dbPlane`). Don't add
  other hues; the meaning only works if it's consistent across the app.
- **Comparisons side by side, with the difference drawn.** "EASA vs UK" is the same field drawn twice with the
  forbidden zone shaded: a band under EASA, a bubble in the UK. Two boxes of text side by side is not a
  comparison. A dotted divider (`s2`, dash `2 3`) separates the halves; each half gets a `t1` heading and
  `t2` qualifier at the top.
- **Several cases? Use small panels.** When one scene would need many aircraft and many labels (night lights),
  split it into 2x2 panels (`<rect class="panel">`), each showing one case: headline at top, the scene, the
  action at the bottom. Show only what the viewer would actually see (only the lights visible from your seat).
- **Draw to scale where scale is the point.** 70° must look like 70°; 1,000 ft above an obstacle must sit
  higher than 500 ft. Use `dbArc`/`dbSector` for angles. Show measured distances with an end-ticked dimension
  line (`M x1 y H x2 M x1 y-5 V y+5 M x2 y-5 V y+5`) and say what's measured ("600 m either side").
- **Keep text off lines and other text.** Labels get a halo in the card colour automatically, but don't rely
  on it: leave about 14 units between stacked baselines, start text clear of aircraft wings (plane span is
  about 13 x scale each side), and keep everything 4+ units inside the canvas. `t_dgtext` measures this with
  the real fonts and will catch what eyeballing misses.
- **Aircraft**: `dbPlane(x,y,heading,colourLetter,scale,lights)` for plan view (heading in degrees, 0 = up/north,
  90 = east); scale 1.1-1.6. `dbSide(x,y,scale,colourLetter,flip)` for side view, about 0.7-1.1. Use the
  same aircraft colour for "you" throughout a figure.
- **Ground and buildings**: `class="gnd"` for ground/grass strips, `class="bld"` for buildings and obstacles.
  Both follow dark mode through the chart tokens.
- **Literal colours**: only nav lights. Everything else goes through the classes or `var(--token)` so dark
  mode works. If you need a soft fill, use `var(--surface-2)`, `var(--accent-soft)` or a role colour at low
  opacity.

### Library cheat sheet (`src/labs80b.js`)

```js
dbT(x,y,'text','t1'|'t2'[+' ta|tr|tg|tm'],'middle'|'end')   // label
dbL('M10 20H200','sk'|'sa'|'sr'|'sg'|'sm'|'s2',width,'4 3')   // line/path (dash optional)
dbAR('M20 50Q60 50 70 90',66,82,70,92,'a',1.8,'5 3')        // arrow: path, then last direction for the head
dbHead(xp,yp,x2,y2,'k')                                     // arrowhead only (e.g. on a circuit leg)
dbPlane(160,100,0,'a',1.3,'rgw')                            // plan-view aircraft, optional lights
dbSide(70,96,.9,'a',false)                                  // side-view aircraft
dbArc(cx,cy,r,deg0,deg1) / dbSector(cx,cy,r,deg0,deg1,fill,opacity)  // degrees clockwise from north
dbFig(title,320,h,drawing,caption)                          // the figure (aria-label = title + caption)
```

## Captions

The caption is where the rule is stated properly, so write it as the sentence Harry would want to remember:
plain British English, the exact numbers with units ("1,000 ft above the highest obstacle within 600 m"), and
any caveat the exam likes to test ("in the air, alter heading to the right"). One to three sentences. The title
is the claim in a few words ("Overtaking: the 70° rule").

## Getting the aviation right

The redraw is the best moment to catch errors, and two were caught in Rules of the Air:
- the old "Who gives way" ladder put aircraft towing between airships and powered aircraft, implying an order
  SERA doesn't state (SERA.3210 only says power-driven heavier-than-air aircraft give way to aircraft seen
  towing);
- "White light only" said "flying away from you" without the overtaking caveat (if you're closing on it, you
  are the overtaker and must keep clear).

Check content against UK sources: air law against the UK ANO, (UK) SERA and the Rules of the Air Regulations;
radio against CAP 413; operational advice against the CAA Skyway Code and Safety Sense leaflets; aerodrome
signs and markings against CAP 637/CAP 168 as relevant. Harry's own notes (Google Drive, folder `PPL`) are
what the topic is built from, so keep to their scope. When you fix or change a rule, tell Harry what changed
and cite the source; don't silently alter what he's learned.

## Build and test

From `src/`:
```
python3 build.py
python3 ../tests/t_dgsize.py    # labels >= 11 px; DONE topics fully style B
python3 ../tests/t_dgtext.py    # no overlaps/overflow with real Barlow fonts
python3 ../tests/t_secdg.py     # each figure in a real section, fits its card
python3 ../tests/t_dark.py
python3 ../tests/t_smoke.py     # errors about cdn.jsdelivr.net are the blocked voice models, not you
```
If Python can't import playwright, install the version matching Node's (`node -e "console.log(require('playwright/package.json').version)"`,
then `pip install playwright==<that>`) and run with `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

Then look: screenshot every figure of the topic at 430 px wide in light and dark (open `hub_test.html`, go to
the topic, press "expand all" `[data-a="xa"]`, screenshot `.acc-fig figure svg`). Tests catch sizes and
overlaps; only looking catches a label that points at the wrong thing or a scene that's hard to read.

## What not to do

- Don't mix styles within a topic: convert all its figures, or leave the topic alone.
- Don't use generated images, Mermaid/GraphViz or other auto-layout tools for these. They can't hold exact
  angles and heights, don't follow dark mode, and their text shrinks below 11 px on a phone. (A GraphViz
  version of "Who gives way" was tried as version C and lost for exactly these reasons.)
- Don't push to `main` without Harry's go-ahead, and don't edit `docs/index.html` by hand (the build writes it).
- Don't put real brand names or logos (Piper, Cessna) in drawings.
