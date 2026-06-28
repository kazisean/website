# Agent Instructions

<!-- This is the single source of truth for AI coding agents -->

## Overview
This project is a personal portfolio website of Kazi Hossain built with Hugo and the PaperMod theme.

## Architecture
- Hugo static site generator (v0.128.0)
- PaperMod theme (git submodule)
- Custom layouts and partials to override/extend PaperMod defaults
- Deployed to GitHub Pages via GitHub Actions

## Key Files
| File | Lines | Purpose |
|------|-------|---------|
| `config.yaml` | ~204 | Site configuration (URLs, menus, params, markup) |
| `layouts/index.html` | ~218 | Custom homepage with typing animation |
| `layouts/partials/header.html` | ~152 | Theme toggle, logo, and navigation header |
| `layouts/partials/footer.html` | ~202 | Footer with copyright, timezone widget, scroll-to-top |
| `layouts/partials/social_icons.html` | ~8 | Social icon link rendering |
| `layouts/partials/extend_head.html` | ~19 | Custom head tags (custom cursor, meta) |
| `layouts/partials/svg.html` | ~940 | SVG icon definitions for social links |
| `archetypes/default.md` | ~5 | Default frontmatter template for new posts |
| `run.sh` | ~2 | Build and dev server convenience script |
| `.github/workflows/hugo.yml` | ~74 | CI/CD pipeline for GitHub Pages deployment |
| `content/` | — | All blog posts and pages (posts, ctf, diy, leetcode, tech, opt, etc.) |
| `documentation/` | — | Local PaperMod docs: wiki (submodule) + exampleSite (separate clone) |
| `themes/PaperMod/` | — | PaperMod theme (git submodule) |

## Build And Run

Start the dev server:

```
hugo server --navigateToChanged
```
Override the baseURL when running the dev server:
```
hugo server --baseURL http://localhost:1313/ --navigateToChanged
```

Build for production:

```
hugo --minify
```

## Documentation

DO NOT use web fetch. Use the search browser MCP to fetch these documentation website or anything you need to look up on the internet to get the latest information. 

Full documentation of hugo: https://gohugo.io/documentation/

Consult these guides before working on related tasks:

- [Hugo directory structure](https://gohugo.io/getting-started/directory-structure/)
- [Content management](https://gohugo.io/content-management/)
- [Templates](https://gohugo.io/templates/)
- [Template lookup order](https://gohugo.io/templates/lookup-order/)

PaperMod theme documentation is available locally — do not fetch remotely:

- **Wiki**: `documentation/wiki/` — cloned from `hugo-PaperMod.wiki.git` (git submodule)
- **Example site**: `documentation/exampleSite/` — cloned from `hugo-PaperMod.git` `exampleSite` branch

Read these local files directly instead of fetching PaperMod docs from the web.

## Code Style & Conventions

All code you write must be responsive. 

### Code Clarity

- **Clear is better than clever.** Do not write functionality in fewer lines if it makes the code harder to understand
- Write more lines of code if additional lines improve readability and comprehension
- Make things so clear that someone with zero context would completely understand the variable names, method names, what things do, and why they exist
- When a variable or method name alone cannot fully explain something, add a comment explaining what is happening and why
- Write clean code and follow DRY (Don't Repeat Yourself) principle to avoid code duplication making the codebase easy to maintain

### Do NOT

- Do not add features, refactor code, or make "improvements" beyond what was asked
- Do not add docstrings, comments, or type annotations to code you did not change
- Do not let code fail silently

## Rules

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

## Self-Update Instructions

<!-- AI agents: follow these instructions to keep this file accurate. -->

When you make changes to this project that affect the information in this file, update this file to reflect those changes. Specifically:

1. **New files**: Add new source files to the "Key Files" table with their purpose and approximate line count
2. **Deleted files**: Remove entries for files that no longer exist
3. **Architecture changes**: Update the architecture section if you introduce new patterns, frameworks, or significant structural changes
4. **Build changes**: Update build commands if the build process changes
5. **New conventions**: If the user establishes a new coding convention during a session, add it to the appropriate conventions section
6. **Line count drift**: If a file's line count changes significantly (>50 lines), update the approximate count in the Key Files table

Do NOT update this file for minor edits, bug fixes, or changes that don't affect the documented architecture or conventions.
