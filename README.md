# PPL Study Hub

UK CAA PPL(A) revision app: notes, quizzes, labs, radio practice with spoken ATC, maps and a kneeboard.

**Live site:** https://harrysharpbsc.github.io/PPL-Hub/

## Layout
- `src/` – source: `hub.html` (shell, styles, core app), content (`data.js`, `radio.js`, `caa*.js`) and labs (`labs*.js`)
- `docs/` – the published site (GitHub Pages serves this folder). `index.html` is generated; don't edit it by hand.
- `tests/` – Playwright checks

## Build
```
npm install
python3 src/build.py
```
This writes `docs/index.html` (minified, installable, works offline) plus local preview and test builds in `src/`.
