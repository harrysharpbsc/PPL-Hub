# Study content

One JSON file per topic: `NN-subject/<seq>-<slug>.json`. `build.py` loads them with `src/content.py`,
checks them (`content.gate`) and writes the `NOTES` / `SUM` / `MN` block at `/*DATA*/`.

## Topic file

| Key | Meaning |
|---|---|
| `seq` | Position in `NOTES`. Never renumber existing topics (`n.id` and some progress use it). New topics take the next free number. |
| `s` | Subject index in `SUBJECTS` (`src/data.js`): 0 Air Law ... 8 Communications. |
| `topic` | Display name. Part of every progress key: never rename an existing topic. |
| `num` | Number of Harry's Obsidian note (`03 Rules of the Air.md` → 3). Absent for CAA-guidance topics. |
| `order`, `conf`, `status`, `summary` | As before. |
| `src` | `[[title, url], ...]` for topics paraphrased from CAA guidance. |
| `note` | `{file, modified, sha}` of the Obsidian note it was imported from (used by the `ppl-notes-sync` drift check). |
| `sections` | `[[heading, [bullet, ...]], ...]`. Keep the order: per-section progress uses the index. |
| `sum` | `{heading: one-line summary}` for every heading. Headings must be unique across all topics. |
| `cards` | `{q, a, m?, ref}`. `m` = memory aid. `q` is the progress key: don't reword an existing one. |
| `quiz` | `{q, o: [4 options], a: index of the right one, why, ref}`. Options are shuffled at run time. |

`ref` = `{sec, rule?, p?}`: `sec` is the start of a section heading in the same topic (the fact must be in that
section), `rule` the regulation it rests on (`SERA.3210`, `ANO art. 249`, `Part-FCL.040`, `CAP 413 4.1`),
`p` a page in the `src` document. The app shows it after each answer.

## Lint (`tests/t_content.py`, also run by every build)

Errors: duplicate topic / heading / question, section without summary, malformed quiz item, "all/none of the
above", missing or dangling `ref`, correct option clearly the longest (≥ 1.3× the average wrong one), a subject
where more than 35% of questions have the right option longest, and anything in `errata.json` (known wrong
facts and house rules such as 30 ft per hPa).
Warnings: card answers over 160 characters or with three or more `;` clauses, Air Law items without `ref.rule`,
sections no item points at.

`lint_baseline.json` lists the errors that existed when the lint was added (Nov 2026). The build fails only on
errors not in it; the baseline should only ever shrink (`t_content.py --rebaseline` after fixing).
