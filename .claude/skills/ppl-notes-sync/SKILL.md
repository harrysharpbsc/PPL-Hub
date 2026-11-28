---
name: ppl-notes-sync
description: Check Harry's Obsidian PPL vault (Google Drive folder "PPL") against the topics in his PPL Study Hub app - which notes he has edited since they were imported, which notes have no app topic, duplicates, and notes outside a subject folder - then show exactly what changed section by section and which flashcards and quiz questions need re-checking, and re-import the changes after his review. Use whenever Harry says he has updated, edited, rewritten or tidied his notes, asks "is the app up to date with my notes?", "check my notes", "sync my notes", "what's changed", or before a scans batch (ppl-scans) to make sure the app starts from his latest notes - even if he doesn't name this skill.
---

# Vault drift check: Obsidian notes → app topics

Harry edits his notes in Obsidian (synced to Drive). The app's topics (`src/content/**/*.json`) were imported
from those notes at some point, and nothing updates them automatically. This skill finds what has drifted and
brings the app back in line through his usual review loop. **Report only for the vault: never edit, move,
rename or trash his notes** (Drive usually refuses anyway for notes not made through the connector).

## 1. List the vault

Drive IDs (Nov 2026; search by title if one fails): vault root `PPL` = `1Mie_qVkhpFFHEezayHV2oTS1x-UOE_X8`,
`01 Air Law` = `1jaKrv9fpV0j0AgQKfl3mDTymOWdItLvO`.

- Folders: `search_files` with `parentId = '<root>'` and `mimeType = 'application/vnd.google-apps.folder'`.
- Notes: `search_files` with `'<root>' in ancestors and title contains '.md'`, `excludeContentSnippets: true`.
  Drive pages are small: **keep passing `pageToken` until no token comes back**.
- Write `LISTING.json` in the scratchpad (never in the repo: the IDs stay private):
  ```json
  {"root": "<root id>", "folders": {"<id>": "01 Air Law", "<root id>": "PPL", "<other id>": "(unnamed folder)"},
   "files": [{"title": "08 Visual Flight Rules.md", "id": "...", "parent": "<folder id>", "modified": "<modifiedTime>"}]}
  ```
  Include every `NN Title.md` note; skip `*.excalidraw.md`, `Untitled*.md` and empty files.

## 2. First pass (dates only)

From `src/`: `python3 ../.claude/skills/ppl-notes-sync/scripts/drift.py LISTING.json`

It matches each note to a topic by subject folder + `NN` (= the topic's `num`) and compares the note's
`modifiedTime` with `note.modified` in the topic file. It reports: edited since import, never recorded, notes
with no app topic (those are a `ppl-scans` job), topics whose note is missing, duplicate notes (it uses the
newest and says so), and numbered notes outside a subject folder.

## 3. Download what changed and diff it

For each note in "Edited since they were imported" (and "No import date recorded yet" when checking a topic
for the first time): `download_file_content` with its ID, copy the saved file to `SCRATCH/notes/<title>`, then

```
python3 ../.claude/skills/ppl-notes-sync/scripts/drift.py LISTING.json --notes SCRATCH/notes --json SCRATCH/drift.json
```

For each topic it lists new sections, sections gone from the note, and per section the bullets new in the
note and those only in the app (formatting is ignored), plus the cards and questions whose `ref.sec` points at
a changed section. A section that is in the app only because it was split or renamed during import shows up
as removed + added: read both before deciding.

## 4. Tell Harry, then re-import on his say-so

Give him a short summary: which notes changed, what changed in a line each, how many items need a re-check,
and the vault housekeeping (duplicates, notes at the vault root). Housekeeping is his to do in Obsidian.

When he says go, on the session branch:
1. Update the topic file: replace changed sections with the `md2sec.conv` output (keep the existing heading
   text and order where a section still exists: per-section progress uses the index; append new sections at
   the end), add a `sum` line for every new heading, drop `sum` entries for removed headings.
2. Re-check every listed card and question against the new text and UK rules (see `ppl-content-review`);
   reword answers, options and `why` freely, but **don't change a question's text** unless the fact itself
   changed (that resets its progress); add items for new facts, each with a `ref`.
3. Record the import: `drift.py LISTING.json --notes SCRATCH/notes --record` (writes `note.modified` and `sha`).
4. `python3 build.py` and the tests in CLAUDE.md, plus `python3 ../tests/t_content.py` and `t_drift.py`.
5. Review page of the changed items (`ppl-content-review` step 4), then ship on his say-so.
