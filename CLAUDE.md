# PPL Study Hub — instructions for Claude

UK CAA PPL(A) revision app for Harry (student pilot). One self-contained web page, served by GitHub Pages at
**https://harrysharpbsc.github.io/PPL-Hub/** and installed on his Samsung Galaxy Tab (Chrome) as a home-screen app.

## Working with Harry
- British English, plain language. He usually works on the tablet in portrait, sometimes with a Book Cover keyboard; check layouts at ~800 px and ~430 px wide as well as desktop.
- Make the change, test it, push it, then say briefly what changed. He reviews on the live site, so pushing to `main` = shipping.
- If he says "just check" or "don't apply", investigate and report only. Changes not yet approved go on a branch, not `main`.
- Aviation content must match UK practice: check radio phraseology against **CAP 413** and the CAA's guidance (Safety Sense 22, the CAP 413 supplement), air law against the UK ANO / SERA / ICAO. Cite sources when he asks "is this right?".
- Keep generous spacing between all buttons and tiles; nothing may overflow its card. Decisions that are not radio calls use option tiles, not the speech box.
- Randomised scenarios stay inside their original lab entry (no separate "random" entries).
- Don't put real brands (Piper, Cessna names/logos) in the app's branding.
- Monetisation is shelved until the notes are finished.

## Layout
- `src/hub.html` — shell: all CSS (light and dark tokens on `:root`), core app (Today, Subjects, Practice, Radio, Labs, Progress), quiz/mock engine, backup/restore. Everything sits inside one IIFE.
- `src/data.js`, `radio.js`, `caa*.js` — study content (`NOTES`, quizzes, radio phraseology). Inserted at `/*DATA*/`.
- `src/labs*.js` — interactive labs, concatenated in sorted filename order at `/*LABS*/`. Each calls `addLab({id,name,sub,grp,init,on,view})`; buttons use `data-a="lx" data-k=... data-v=...`.
  - `labs1.js` flight framework (`flightLab`), voice answering and marking (`vnorm`, `vGradeBuild`, `vGradeMcq`), flight settings `FS` (localStorage `ppl-fs`), map/chart drawing.
  - `labs62.js` random scenario generators (cross-country, circuits, controlled arrival/departure).
  - `labs63kb.js` kneeboard (separate notes per page, cleared when a flight ends).
  - `labs64tts.js` ATC voices: default **Piper VCTK** (British, ~95 MB once), optional **Kokoro** ("Richer"); per-station voices; falls back to the tablet's en-GB voice. Runs in a blob worker; models cached in IndexedDB `ppl-tts`.
  - `labs65asr.js` speech recognition: default **Moonshine base** (transformers.js 3.8.1) on device, records the whole call and ends after the quiet time (`FS.hold`) or Done; falls back to Chrome's recogniser.
  - `labs66art.js` Chicago Convention articles (five themed blocks, cover-and-reveal, quiz, match).
  - `labs50data.js` UK airspace (YAIXM, CC0), coastline and chart layer (Natural Earth); packed at build time by `packdata.py`.
  - `labs80–82.js` topic diagrams.
- `docs/` — the published site (Pages serves `main` → `/docs`). `docs/index.html` is generated: never edit it by hand. `sw.js` (network-first offline cache), `manifest.webmanifest`, icons (logo: GA aircraft in plan view, cream on navy `#16284A`, cobalt windscreen).
- `index.html` at the root only redirects to `docs/`.
- `tests/` — Playwright scripts (run from `src/`).

## Build, test, publish
```
npm install                 # terser + csso
cd src && python3 build.py  # writes ../docs/index.html (minified) + hub_built/hub_download/hub_test.html in src/
python3 ../tests/t_smoke.py # opens every subject and lab, reports page errors
```
`hub_test.html` exposes `window.__T` (ses, S, KB, NTTS, ASR, `grade(e,text)`, speak, render) for tests.
Useful tests: `t_grade.py` (radio marking), `t_mock.py` (mock exam tiles), `t_art.py`, `t_listen.py` (pause handling), `t_asr.py`/`t_piper.py` (engines with mocked CDN), `t_backup.py`, `t_scan.py` (button spacing).
Then commit and `git push origin main`; Pages redeploys in a minute or two.

Sandbox note: cdn.jsdelivr.net, huggingface.co, fonts and github.io are blocked from the workspace, so real voice/speech models can't be heard or tested here — test the plumbing with Playwright route mocks and say so honestly.

## Product decisions so far
- Radio calls (CAP 413): full callsign on first contact; abbreviated callsign accepted once the station has used it; station name optional after first contact; circuit calls = callsign + position + intention (runway optional, no QFE in position reports); overhead join "overhead" + "deadside descending" in either order. Aircraft type belongs in the details call to a new unit, transit/joining requests and emergencies, not in taxi, line-up or circuit calls (the Ground taxi request and Circuits line-up still require type — Harry hasn't yet asked to change this).
- Voices: natural UK only, varied per station. Transcript of every radio exchange at the end of a flight for feedback.
- Mock exams: numbered question tiles; "Show right or wrong" (as I go / at the end) is a setting on the Practice page.
- Progress lives in browser storage per site; Progress → Save backup file / Restore from file.
- The older claude.ai artifact "PPL(A) Revision" must not be overwritten; the claude.ai artifact of this hub is superseded by the Pages site.
