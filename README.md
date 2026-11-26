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
