---
name: ppl-content-review
description: Independent second pass over flashcards and quiz questions in Harry's PPL Study Hub (UK CAA PPL(A) revision app) - every fact checked against his note section and the UK rule it rests on, every item given a source ref, distractors as long and as specific as the right answer, one fact per card, UK-vs-ICAO caveats, house rules (30 ft per hPa) - driven by the content lint, then a review page Harry signs off before it ships. Use after writing or changing any cards or questions (a ppl-scans batch, a ppl-notes-sync re-import, fixing the lint baseline), when Harry says a question is wrong, unfair, too easy, guessable or ambiguous, asks "is this right?" about app content, or asks to clean up, fix or audit the quizzes or flashcards - even if he doesn't name this skill.
---

# Content review: cards and questions

The app's content is in `src/content/<NN-subject>/<seq>-<slug>.json` (format: `src/content/README.md`).
The lint (`tests/t_content.py`, also run by every build) catches what a machine can: missing or dangling refs,
guessable longest answers, duplicates, malformed items, known wrong facts (`src/content/errata.json`). This
skill is the part a machine can't do: **is it true, is it the UK rule, is it fair, does it teach.** Work in
British English, plain language, on the session branch.

## 1. Lint first

From `src/`: `python3 ../tests/t_content.py --all > SCRATCH/lint.txt` and read the errors and warnings for
the topics in hand. `lint_baseline.json` is old debt from Nov 2026; it should only shrink.

## 2. Check every item (the important step)

For each card and question:

1. **Source.** Find the note section the fact is in and set `ref.sec` to the start of its heading. If the fact
   is in no section, either the note is missing it (tell Harry) or the item is wrong: never invent a ref.
2. **Rule.** Set `ref.rule` to the regulation it rests on when one exists (`SERA.5005`, `ANO art. 249`,
   `Rule 9 (Rules of the Air Regs 2015)`, `Part-FCL.055`, `Part-NCO.OP.180`, `CAP 413 4.1`, `AIP ENR 1.6`).
   Check the fact against current UK practice, not only the textbook: UK ANO 2016, UK SERA / Rules of the Air
   2015, UK Part-FCL / Part-MED / Part-NCO, UK AIP, CAP 413, Skyway Code, Safety Sense. Where the book is out
   of date or ICAO differs from the UK, the item says the UK rule and the `why` names the trap. If you can't
   verify something, say so to Harry rather than guess.
3. **House rules** (CLAUDE.md): 30 ft per hPa first (27 ft in brackets); CAP 413 phraseology as in the
   product decisions; the pilot in command, not ATC, avoids collisions.
4. **Distractors.** Same length, register and detail as the right option; differ by one element ("heading and
   speed" vs "heading and height"); the rule with and without its caveat; metric/imperial pairs; plausible
   numbers from neighbouring rules (600 m vs 150 m). No "all/none of the above" (options are shuffled). If
   the right option needs a caveat, give the wrong ones a caveat too, or move it into the question.
5. **Explanation.** `why` says why the answer is right and why the tempting option is wrong.
6. **Cards.** One fact per answer, under about 160 characters; split a card that lists several (keep the old
   question for the first fact so its progress survives).
7. **Progress keys.** Progress is keyed on topic name + question text. Rewording options, answers and `why`
   is free; **don't change a question's text** unless the fact changed, and never rename a topic.

Record every change you make: old item, new item, and the reason (one line), for the review page.

## 3. Lint again

`python3 ../tests/t_content.py` must PASS; when items from the baseline are fixed, run it with
`--rebaseline` so the baseline shrinks. Build and run the tests in CLAUDE.md plus `t_ref`.

## 4. Review page, then ship

Harry signs off rewritten content on a review page, one per subject or batch:

```
python3 ../.claude/skills/ppl-content-review/scripts/review_quiz.py CHANGES.json OUT.html "Air Law questions: review" alq1 "<lede>"
```

`CHANGES.json` = `[{"topic", "kind": "quiz"|"card"|"new"|"split", "old": item or null, "new": item, "why": "one line"}]`.
The page shows each change old → new with its source, and **Looks right** / **Needs work** + a comment.
Publish with the Artifact tool (load `artifact-design` / `artifact-capabilities` as that tool requires),
`capabilities: {"db": {}, "user": {}}`, icon `checklist`; check with one `ArtifactData list` of the collection
that it's reachable. Give Harry the link and a short summary (how many items, the facts you corrected, anything
he must decide). When he has reviewed, `ArtifactData list` the collection, fix every "needs work" item, show
him just those, and ship to `main` only when he says so.
