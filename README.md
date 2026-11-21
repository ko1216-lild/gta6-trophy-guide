# gta6-trophy-guide

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/ko1216-lild/gta6-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/ko1216-lild/gta6-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

# gta6-trophy-guide-01 — entry

This repository holds an offline guide and progress tracker for
the 55 official PlayStation 5 trophies of Grand Theft Auto VI,
built as an entry for make.fun's *gta6-trophy-guide-01* bounty.
Everything is a static file under `app/`: there is no network
access and no third-party library involved. To use it, simply
open `app/index.html` in a desktop browser.

What the guide gives you:

- All 55 trophies, each shown with its exact official name,
  official description and grade, together with a guide written
  in our own words — what the trophy asks for, where and how to
  do it, and whether it can be missed — with sources cited.
- A checklist that persists in the browser through localStorage,
  and can be exported to or imported from a JSON file.
- Filtering by grade, kind, earned state, missable and secret,
  plus full-text search. A spoiler setting keeps secret and
  story trophies hidden until they are earned or spoilers are
  switched on.
- A Roadmap to the Platinum in seven phases, assembled from the
  official trophy descriptions, and a dedicated Missable view —
  2 of the 55 trophies are flagged, conservatively, and each
  flag carries its reason inside that trophy's guide.
- A progress summary with the earned count, percentage, trophy
  points and a breakdown per grade.

The hand-in program `main.ts` copies `app/` and `screenshots/`
into the output directory and writes `dossier.json` through the
kit's vendored `vendor/makefun-frontend.ts`, which is unchanged;
it then verifies the hand-in and prints a build summary. The
images under `screenshots/` are genuine renders of this app.
No Rockstar logo or official artwork appears anywhere in the
entry.

## Run it

```sh
node serve.ts   # then open http://localhost:8080
```

## Round 2 revision

For the round-2 submission of this entry, this README has been
re-issued from within a recorded session, so that the hand-in's
transcript record covers the README in exactly the form
submitted. Nothing else changed: no application or source files
were touched in this revision, and the guide app itself is
identical to round 1.
