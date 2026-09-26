# Submit, preview, and publish a game

The homepage shows featured cartridges. The catalog lists every published game. Unmerged contributions appear only in their PR preview. Submit new games with `featured: false`; maintainers curate homepage selections.

1. Create a branch and copy `templates/game.json` into `demos/<id>/game.json`. Keep the stable lowercase, hyphenated folder name and game ID identical.
2. Add a README with playable/source links, controls, feedback questions and credits. Use an adjacent PNG/JPG/WebP/GIF image (up to 5 MB), or an HTTPS image URL. Clearly label concept art versus gameplay captures.
3. Run `node tooling/catalog/validate-local.mjs` and `git diff --check` from the repository root.
4. Open a PR against `openaigames/community:main`. The `Game catalog / Preview` check and bot comment provide its preview URL.
5. Inspect the cartridge, details, controls and embedded game. Further pushes update the same comment and preview. The pinned revision link preserves a particular commit's view. Failed checks must be fixed before review.
6. A maintainer merges the reviewed PR. The main-branch workflow publishes the catalog automatically; new page loads fetch it without rebuilding the website. An unsuccessful publication keeps the last production catalog.

`submission_url` can initially point to the game's community README; do not guess a future PR number. `gameplay_url`, `image_caption`, and `attribution` are optional. Other fields in the template are required. Do not edit `catalog/legacy.json` for new submissions: it preserves the dodo game that was already published before this workflow.

This previews the game's listing, using its submitted playable URL. Changes to game source need a playable deployment from the game's own repository first. Preview feedback belongs on the PR, not the production message board. Closed PRs are marked closed; merged PRs are marked merged.

Agents can use [the submission skill](../skills/openaigames-submit-demo/SKILL.md). No Cloudflare credentials are needed. See [the detailed field reference](GAME_SUBMISSION.md).

## Creation declarations

The web submission form and `game.json` share these fields:

| Field | Rule |
| --- | --- |
| `creation_method` | `undeclared` (default), `human`, `ai_assisted`, or `ai_generated` |
| `creation_note` | Optional public explanation, up to 500 characters, covering code, art, audio, writing or tools |

`human` declares that no generative AI was used; conventional engines and development tools are allowed. Use `ai_assisted` for generative AI assistance with code or assets, and `ai_generated` when generative AI produced most of the code or content. If you recommend someone else's work without knowing its process, keep `undeclared`. Never infer a declaration from appearance, hosting provider, source availability or approval. Creator submissions do not imply human-made production.

Labels appear in the catalog, details and player. They reflect declarations and supporting material, not platform certification. Older games remain Not declared until information is supplied; approval never changes the method automatically. Moderators may correct approved submissions with a review reason and an audit of previous and new values. Creation notes are public: exclude contact details, private URLs and credentials. PR records are authoritative for the published catalog; carry confirmed declarations over when promoting a quick submission.
