---
name: ppl-scans
description: Process Harry's new textbook scans for his PPL Study Hub - find the PDFs in his Google Drive "PPL book scans" folder that have no Obsidian note yet, read them, write an Obsidian note per chapter in his format into the right subject folder, add each chapter to the app as a topic (sections, one-line summaries, flashcards, original quiz questions), draw style B diagrams for it, and run his review-then-ship loop. Use whenever Harry says he has added, uploaded or scanned new chapters or pages, asks to "check the scans", "process the new scans", "make notes from the PDFs", "generate Obsidian notes", or asks for notes or diagrams from a book chapter - even if he doesn't name this skill.
---

# New scans → Obsidian notes → app topics → diagrams

Harry scans chapters of his PPL textbooks to PDF and drops them in Google Drive. Each batch becomes:
1. an **Obsidian note** per chapter in his vault (Drive), in his own format;
2. a **topic** in the app (`src/data.js`): sections, summaries, flashcards, quiz;
3. **style B diagrams** for that topic (follow the `ppl-diagram` skill, which this skill relies on);
4. a **review page** he ticks, then fixes, then "ship it" → `main`.

The first run of this process (Air Law chapters 08-16, 27 Nov 2026) took one pass and he approved 28 of 29
diagrams first time. Follow the same order. Work in British English, plain language.

## 0. Tell Harry what you found, then work

Keep him posted in a line or two at each stage (scans found, notes uploaded, app topics added, review link).
He often comes back later, so a short status line beats silence.

## 1. Find the new scans

Drive layout (IDs as of Nov 2026; if one fails, search by title):

| What | Title | ID |
|---|---|---|
| Scans (flat folder) | `PPL book scans` | `1oBcOBIKEt14gZ33wUSxV8RKAjWq-I8Ex` |
| Vault root (one folder per subject) | `PPL` | `1Mie_qVkhpFFHEezayHV2oTS1x-UOE_X8` |
| Air Law notes | `01 Air Law` | `1jaKrv9fpV0j0AgQKfl3mDTymOWdItLvO` |

- List the scans: `search_files` with `parentId = '<scans id>'` (`excludeContentSnippets: true`). Scan titles
  look like `08.VisualFlightRules.pdf`: the number is the chapter number in Harry's sequence for that subject.
- List the subject's notes the same way. A note is `NN Title.md` (`08 Visual Flight Rules.md`). A scan is
  **new** when no note with the same `NN` exists in that subject's folder. Unnumbered scans (e.g. `Aerodromes.pdf`)
  are older ones already handled; skip them unless Harry asks.
- **Subject**: so far every scan is Air Law. If a scan clearly belongs to another subject (Meteorology,
  Navigation...), list the vault root's subject folders and use the matching one; if there's no folder or
  it's unclear, ask Harry before writing (that's his decision). App subject index `s` = position in
  `SUBJECTS` in `src/data.js` (Air Law = 0).
- Never trash, move or rename anything in his Drive.

## 2. Read each scan

- `read_file_content` on the PDF returns Drive's OCR text. Large chapters come back saved to a file; Read it
  in full. OCR is messy (split tables, stray headers like "AIR LA", answer keys like "20" for "2a"): rebuild
  tables and lists from sense, not layout.
- Figures arrive only as captions ("Figure 9-2 Registration markings"). Note them; they are diagram ideas.
- Each chapter ends with **Practice Questions** and an **answer key**. Check every key answer against the
  text and UK rules; the books have had wrong keys before.

## 3. Check the content against UK rules (the important step)

The textbook is partly out of date and sometimes wrong. Before writing, check each rule against current UK
practice (UK ANO 2016, UK SERA / Rules of the Air 2015, UK Part-FCL / Part-MED / Part-NCO, UK AIP, CAP 413,
CAA Skyway Code, Safety Sense) and CLAUDE.md's product decisions (e.g. 30 ft per hPa). Where the book is wrong,
outdated or muddled, the note says what's right **and** what the book says, briefly, so he isn't caught out by
either the exam or reality. Keep a list of these as `[["Topic (NN)", "what and why"], ...]`; it goes on the
review page. Things found last time, as examples of what to look for:
- units muddled (night ceiling given "AMSL"; a ceiling is above ground);
- definitions swapped in a glossary (skill test vs proficiency check), or contradicting itself (flight time);
- pre-Brexit or superseded rules (Mode A/C carriage, EU reporting portal, microlight masses);
- ICAO rule given where UK/Part-NCO differs (life rafts at 100 nm vs the PIC's 30 min / 50 nm assessment);
- an answer key that oversimplifies (who is "legally responsible" for maintenance paperwork).
If you can't verify something, hedge in the note ("check AIP ENR 1.6") rather than state it.

## 4. Write the Obsidian note (his format)

Copy the shape of an existing note (read one, e.g. `07 Air Traffic Services.md`):

```markdown
---
topic: Visual Flight Rules
tags:
  - ppl/law
  - status/draft
  - confidence/weak
---
## Big section
- Plain bullets, no bold. `code` every number with its unit: `1,500 m`, `30 minutes`.
- `Term`: definition, one term per bullet (never several definitions run together in one bullet).
- A list inside a bullet:
	- nested items are indented with a TAB (a single space renders out of line in Obsidian)

> [!note]
> An aside.

> [!warning] Exam trap
> The exam's favourite confusion.

> [!tip] Memory aid
> A mnemonic.

### Subsection

| Table | for | comparisons |
| --- | --- | --- |

%% image: Figure 8-1 General IFR requirements (p. 131) %%

### Practice Questions
1. Question copied from the book
	1. option
	2. option
##### Answers
1. 3 (short reason when the key needs one)
```

- Harry asked (27 Nov 2026) for far less bold and properly aligned bullets: no `**bold**` in notes, tabs for
  nesting, callouts for notes/traps/memory aids, and a blank line before and after every table (otherwise the
  next bullet is swallowed into the table).

- File name `NN Title.md` (no apostrophes: `11 Pilots Licences.md`), same NN as the scan; frontmatter
  `topic:` is the display name. Tag `ppl/law` for Air Law (use the subject's tag otherwise; check a sibling note).
- Rewrite in plain, concise bullets; keep every number and rule; group by the book's headings.
- Keep the book's **Practice Questions** and **Answers** in the note (his vault is private), but never put
  them in the app (the repo is public).
- Mark book figures with `%% image: ... %%` comments, as he does.
- Upload: write files to the scratchpad, then `create_file` with `parentId` = subject folder,
  `contentMimeType: "text/markdown"`, `disableConversionToGoogleType: true`, and
  `base64Content: "sha256:<hash>:<absolute path>"` (hash with `sha256sum`). One call per note, in parallel.
  Check first that no note with that NN exists (never overwrite his notes).

## 5. Add each chapter to the app

Topics from his notes live in `src/data.js` as `NOTES.push({...}); Object.assign(SUM,{...});` blocks, with
`num` = the note's NN (subject page lists them in that order) and `order = num*10`.

1. Write a content file per batch (scratchpad), shaped like this:
   ```python
   T={}
   T['08 Visual Flight Rules.md']=dict(topic="Visual Flight Rules",num=8,
     summary="3-5 sentences: the rules he must know, with the numbers.",
     sum={"Section heading prefix":"One-line summary of that section.", ...},   # one per section
     cards=[["Question?","Answer."], ...],      # 10-20, one fact each
     quiz=[["Question",["right","wrong","wrong","wrong"],0,"Why right; why the tempting one is wrong."], ...],  # 8-10
     rename={"Transponder":"Using the transponder"})   # optional, to avoid heading clashes
   ```
   Quiz rules are in CLAUDE.md ("Writing quiz questions"): write your own in the exam's style (one-element
   distractors, rule with and without its caveat, unit pairs, scenarios), never the book's questions, no
   "all of the above"; correct option first (the app shuffles).
2. Assemble and append (run from `src/`):
   ```
   python3 ../.claude/skills/ppl-scans/scripts/assemble.py --existing . NOTES_DIR CONTENT.py > /tmp/new.js
   cat /tmp/new.js >> data.js
   ```
   `scripts/md2sec.py` turns the note into app sections (each `##`/`###` heading with bullets becomes a section,
   tables become "**row**: col value; ..." items, nested bullets become "– " items, Practice Questions are cut).
   `assemble.py` refuses: a topic name already in the app; a section heading already used by another topic
   (`SUM` is global, so a clash overwrites that topic's summary; add a `rename`); a section without a summary;
   bad quiz items. Watch for near-duplicate topic names (e.g. existing "Operations of Aircraft" vs new
   "Operation of Aircraft") and mention them to Harry.
3. Work on the branch named in the session instructions, never straight on `main`.

## 6. Diagrams

Follow the **`ppl-diagram` skill** for every rule of drawing (style B, 320-wide canvas, 12/11 px text,
colour by role, nothing overlapping, Harry's agreed design decisions). Batch-specific practice:

- One file per batch: `src/labs8<N><short>.js` sorting **after** `labs85sky.js` (last batch: `labs86al.js`;
  next could be `labs87<short>.js`), so it can reuse figures from earlier files.
- Copy the helpers at the top of `labs86al.js`: `add(topic,list)`, `R(topic,title,sectionPrefix)` (reuse an
  existing figure by its title, searched across all topics), `box`, `lines`, `badge`, `vdim`, `hdim`, `ceil`,
  `mast`. Entries are `[title, w, h, drawing, caption, sectionPrefix]`; the prefix must match the start of a
  section heading in that topic.
- **Reuse before drawing**: grep `src/labs8*.js` for the subject (VMC, squawks, MAYDAY, declared distances,
  CTR/CTA were all reused last time). A reused figure counts for review like a new one.
- Aim for 2-4 figures per chapter, each showing something the exam asks you to *see*: thresholds on a
  scale (heights, ages, distances), side-by-side comparisons, numbered sequences, galleries of signals,
  tables for many attributes. A chapter of pure definitions may need only one or two.
- Pitfalls seen last time: `t_dgtext` reports "wider than its box" when a label crosses a tinted rect
  (use dotted dividers instead of background bands, or keep labels inside); see-through shapes that overlap
  darken at the joins (Harry spotted it: use solid fills such as `var(--accent-soft)`, or one path); a halo
  shape around a T-shaped area can swallow the space between (draw the halo as a thick stroke of the same
  path); low-contrast literal colours on `gnd` (use a fixed darker fill under white symbols).
- Look at every figure yourself, light and dark, at phone width:
  `node ../.claude/skills/ppl-scans/scripts/figs.js OUTDIR "Topic 1" "Topic 2"` (run from `src/` after
  `python3 build.py`) writes `NNN.png`, `dark_NNN.png`, contact sheets `sheetN.png` and `figs.json`.

## 7. Build and test (from `src/`)

```
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
python3 build.py
for t in t_dgsize t_dgtext t_secdg t_dark t_scan t_smoke t_mock; do python3 ../tests/$t.py | tail -2; done
```
All must pass; `t_smoke` may report only blocked CDN (jsdelivr) errors. Commit (`docs/index.html` is
regenerated by the build; never edit it by hand) and push the branch.

## 8. Review page, fixes, ship

1. `python3 ../.claude/skills/ppl-scans/scripts/review.py OUTDIR/figs.json FIXES.json PAGE.html "Air Law 17 to 20: review" al1720 "<lede>"`
   - FIXES.json is the step-3 list. The lede says what you did (notes in which Drive folder, topics on a
     branch, not live; N diagrams, how many new and reused) and asks for **Looks right** / **Needs work**.
   - Publish with the Artifact tool (load `artifact-design`/`artifact-capabilities` as the tool requires),
     `capabilities: {"db": {}, "user": {}}`, icon `checklist`. Then one `ArtifactData list` of the collection
     to confirm it's empty and reachable. Give Harry the link and a short summary, including the book fixes
     and anything he must decide.
2. When he says he has reviewed: `ArtifactData list` the collection. Fix every `fix` (read his comment
   closely), re-render, check light and dark, rerun the tests, commit to the branch, and show him just the
   changed figures (SendUserFile with the PNG is enough for one or two).
3. Only when he says to ship: `git fetch origin main`, fast-forward `main` to the branch, `git push origin main`.
   Pages redeploys in a minute or two; tell him what went live and to reopen the app if it looks stale.

## Checklist

- [ ] New scans listed, subject confirmed
- [ ] Each scan read in full; answer keys checked
- [ ] Book errors listed with the UK rule
- [ ] Notes in his format uploaded to the subject folder (no overwrites)
- [ ] Topics appended with summaries, cards, original quiz; no clashes
- [ ] Diagrams drawn or reused, looked at light/dark at 430 px
- [ ] Tests pass; branch pushed
- [ ] Review page published; Harry's picks read and fixed
- [ ] Shipped to `main` only on his say-so
