# AI-Guided Component Extraction Workflow

This playbook captures the workflow we follow when generating standalone HTML components from the existing Plantissima source pages. It emphasises guard rails that keep the source pristine, ensure visual parity, and maintain consistency across the demo library.

## 1. Preparation
- **Sync reference assets**: Pull the latest `index.html` (and any other source pages) from the upstream repo into place; never edit these copies directly.
- **Confirm tooling**: Ensure Node + Playwright are installed (`nvm use --lts`, `npx playwright --version`) and install local dependencies with `npm install` at the repository root.
- **Baseline directories**: All component demos live under `webdev/component-demos/components`, sharing CSS from the co-located `css/` folder. Keep images and JS helpers within sibling folders to simplify paths.

## 2. Component Extraction Steps
1. **Identify scope**: Locate the exact markup block in the source page. Copy only the markup needed for the component; strip unrelated scripts or sections.
2. **Create standalone file**: Scaffold a minimal HTML document that links to shared fonts and the modular CSS stack (`core.tokens.css`, `core.base.css`, `grid-12col.css`, optional `spaces.css`) plus the matching `css/components/<component>.css`. Do not introduce inline styles; add missing rules in the component bundle instead.
3. **Respect the 12-column grid**: Ensure layout wrappers (`.content-wrapper`, `.grid`, etc.) mirror the original structure. Align sections to columns 2–11 when that’s how the live page renders; allow hero/nav wrappers to remain full-bleed.
4. **Preserve tokens & variables**: Use existing CSS variables (`var(--border-radius)`, spacing tokens) instead of hard-coded values. If the token doesn’t exist, reconsider the change before introducing new constants.
5. **Avoid source edits**: Do not modify files under `webdev/plantissima-hugo/`. If reference CSS deviates, note it and coordinate a refresh from the live site instead of patching locally.

## 3. Visual Validation
- **Capture reference**: Run `npm run test:visual` (or `npm run test:components` for the full gates) to execute the Playwright specs in `ai-tests/`. Baseline screenshots live in `webdev/component-demos/screenshots`.
- **Compare**: Playwright will fail if the new render diverges from the baseline; review the generated diff in `test-results` when that happens and adjust CSS intentionally.
- **Iterate with intent**: Update the component bundle, refresh the manifest if copy/structure changed, and rerun the tests until visual and accessibility checks pass.

## 4. Content & Accessibility Guard Rails
- Preserve semantic structure (headings, lists, buttons) as in the source.
- Keep copy verbatim unless the task explicitly calls for edits.
- Maintain ARIA attributes, alt text, and link targets from the original markup.
- When extracting scripts (e.g., navigation toggles), sandbox them in `webdev/component-demos/js/` and include only the necessary logic.

## 5. Change Management
- Log each component addition or update with a short rationale (what changed, why it was needed).
- Keep `data/component-manifests/<component>.json` in sync with the markup; run `npm run lint:manifests` before opening a PR.
- Whenever local CSS diverges from the live reference, pause and refresh the CSS bundle before continuing extraction.
- Run `git status` frequently to ensure only intended files within `component-demos` are being modified.

## 6. Handoff Checklist
- Component HTML lives in `webdev/component-demos/components/`.
- Shared assets (images, JS helpers, screenshots) reside in their respective folders.
- Playwright spec exists (or is updated) to cover the new component.
- Visual diff reviewed and documented (screenshots saved).
- Workflow guard rails observed; source repo remains untouched.

Following this workflow keeps the demo library faithful to the live site while giving us confidence that each component can be migrated into the future Hugo setup without surprises.

## 7. Phase Two Prep (Hugo Data-First)
- **Model data early**: Treat `data/component-manifests/<component>.json` as the contract that future Hugo templates will consume; keep strings, loops, and media references there.
- **Strip wrappers for partials**: As components graduate to Hugo, remove `<html>/<body>` scaffolding, wrap optional sections in conditional blocks, and reuse the same component CSS bundle through the asset pipeline.
- **Centralize styling**: Component CSS should be the only place new rules land; if a token is missing, propose the addition in `core.tokens.css` before encoding hard values.
- **Re-use automated gates**: The Playwright + axe suite doubles as regression coverage for the Hugo version—point the tests at the rendered partial once it exists to prove parity.
