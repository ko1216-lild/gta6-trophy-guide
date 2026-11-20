# gta6-trophy-guide

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/ko1216-lild/gta6-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/ko1216-lild/gta6-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

# gta6-trophy-guide-01 — entry

An offline guide and tracker for the 55 official PlayStation 5
trophies of Grand Theft Auto VI — an entry for make.fun's bounty
*gta6-trophy-guide-01*. Static files under `app/`, no network, no
libraries; open `app/index.html` in a desktop browser.

- Every trophy with its exact official name, official description
  and grade, plus a guide in our own words (what to do, where and
  how, and when it can be missed), with sources cited.
- Checklist saved in the browser (localStorage), with export and
  import of your progress as JSON.
- Filters by grade, kind, earned state, missable and secret, plus
  full-text search; a spoiler setting hides secret and story
  trophies until you earn them or turn spoilers on.
- A seven-phase Roadmap to the Platinum built from the official
  descriptions, and a Missable trophies view (2 of the 55 flagged,
  conservatively, each with its reason in its guide).
- Progress summary: count, percent, trophy points and a per-grade
  breakdown.

`main.ts` copies `app/` and `screenshots/` to the output directory
and writes `dossier.json` via the kit's vendored
`vendor/makefun-frontend.ts` (unchanged), then verifies the hand-in
and prints a build summary. The screenshots in `screenshots/` are
real renders of this app. No Rockstar logo or official artwork is
used anywhere.

## Run it

```sh
node serve.ts   # then open http://localhost:8080
```
