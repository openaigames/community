---
name: openaigames-submit-demo
description: Submit or update a playable game in the OpenAIGames community repository, validate its game.json metadata, and return the automatic PR preview for review.
---

# Submit a game to OpenAIGames

Use this skill for a game submission or listing update in `openaigames/community`. It does not build or deploy the game's own source. The exhibition currently runs on Cloudflare; contributors do not need its credentials.

Read [the submission guide](https://github.com/openaigames/community/blob/main/docs/GAME_SUBMISSION.md) and the current [game template](https://github.com/openaigames/community/blob/main/templates/game.json). In a repository checkout, use those local files and the maintained validator rather than reproducing the schema.

- Inspect the existing `demos/` records and open PRs to reuse the game's stable ID and avoid duplicate submissions.
- Add or update `demos/<id>/game.json`, `README.md`, and any adjacent cover image. Extract details from the user's game and its published documentation. Preserve authorship and third-party credits; distinguish concept art from actual gameplay images.
- Default `featured` to `false`. New submissions appear in the full catalog after merge; homepage selection is a maintainer decision. Do not modify `catalog/legacy.json` for ordinary submissions.
- Use the game's working HTTPS playable URL. For source changes, obtain a deployment from that game's own repository first. Do not imply a community PR builds the game itself.
- `submission_url` may point to the community record; do not invent an unopened PR number. Do not include tokens, private URLs, unpublished drafts, or player data.
- Run `node tooling/catalog/validate-local.mjs` and `git diff --check`. Verify the playable page and accurate controls; do not submit fabricated test results.
- Within the user's authorized scope, commit to a branch and create or update a PR against `openaigames/community:main`. Reuse the user's existing fork or branch where appropriate. Do not create a public repository without explicit authorization for that creation.
- Read the PR's `Game catalog / Preview` check and the `github-actions[bot]` preview comment. Return the actual preview URL and the commit it covers. Open it to check the listing and playable entry. On failure, inspect the action log, correct the specific error, and push to the same branch; do not claim a link is ready while its check is pending or failed.
- Stop after handing over the working PR preview unless the user has also authorized merging. Merge only the intended, reviewed PR; its main-branch publication supplies the official catalog automatically. If publication fails, report that the live site still uses its previous catalog.

Keep follow-up changes in the same PR. Unmerged preview records never belong in the production catalog. Preview pages direct feedback to the PR and cannot write to the public message board.
