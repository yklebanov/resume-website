# resume-website

Personal resume/portfolio site for **yashakleb.dev**, currently a "coming soon"
landing page ([src/index.html](src/index.html), [src/style.css](src/style.css))
hosted on [GitHub Pages](https://pages.github.com).

## Layout

- [src/](src) — the static site itself (HTML/CSS). `src/CNAME` pins the
  custom domain.
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) — builds and
  publishes [src/](src) to GitHub Pages on every push to `main` (enable
  Pages in the repo's Settings → Pages, source: **GitHub Actions**).

## Releases & changelog

[.github/workflows/release.yml](.github/workflows/release.yml) runs on every
push to `main` and uses [git-cliff](https://git-cliff.org) (configured in
[cliff.toml](cliff.toml)) to automatically version the project:

1. Computes the next [SemVer](https://semver.org) version from commits since
   the last tag — `feat:` commits bump minor, `fix:`/other conventional
   commits bump patch, breaking changes (`!` or a `BREAKING CHANGE:`
   footer) bump major. Commits matching `chore|ci|docs|style|test` don't
   trigger a bump on their own (see `[bump]` in `cliff.toml`).
2. If there's something release-worthy, creates and pushes a new git tag
   (e.g. `v0.2.0`), regenerates [CHANGELOG.md](CHANGELOG.md) so those
   commits move from "Unreleased" into that version's section, commits it
   as `chore(release): vX.Y.Z`, and publishes a
   [GitHub Release](../../releases) with that section as its notes.
3. If nothing would bump the version (e.g. only `chore`/`docs` commits),
   it's a no-op.

[CHANGELOG.md](CHANGELOG.md) follows the
[Keep a Changelog](https://keepachangelog.com) format (`Added`/`Changed`/
`Fixed`/`Security`/etc. sections). Using
[Conventional Commits](https://www.conventionalcommits.org) (`feat:`,
`fix:`, etc.) is required for a commit to appear in it and drives both the
grouping and the version bump — non-conventional commit messages are
filtered out of the changelog entirely and don't affect versioning.

To preview locally: `git-cliff --config cliff.toml` (or add
`--bumped-version` to see what the next version would be).

## Security tooling

This repo enforces several automated checks via [pre-commit](https://pre-commit.com), configured in [.pre-commit-config.yaml](.pre-commit-config.yaml):

- **[gitleaks](https://github.com/gitleaks/gitleaks)** and **[TruffleHog](https://github.com/trufflesecurity/trufflehog)** — secret scanning (config: [.gitleaks.toml](.gitleaks.toml)).
- **[Semgrep](https://semgrep.dev)** — static analysis (SAST) using the free `p/security-audit` and `p/secrets` rulesets.
- **[Trivy](https://trivy.dev)** — filesystem/IaC/SCA scanning, failing on HIGH/CRITICAL findings.

These hooks are installed for **both** the `pre-commit` and `pre-push` git stages, so pushes are blocked just like commits if a check fails. After cloning, run:

```sh
pip install pre-commit
pre-commit install --hook-type pre-commit --hook-type pre-push
```
