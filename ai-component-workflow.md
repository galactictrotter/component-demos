# AI-Guided Component Extraction Workflow

This playbook captures the workflow we follow when generating standalone HTML components from the existing Plantissima source pages. It emphasises guard rails that keep the source pristine, ensure visual parity, and maintain consistency across the demo library.

## 1. Preparation
- **Sync reference assets**: Pull the latest `index.html` (and any other source pages) from the upstream repo into place; never edit these copies directly.
- **Confirm tooling**: Ensure Node + Playwright are installed (`nvm use --lts`, `npx playwright --version`) and available for screenshots.
- **Baseline directories**: All component demos live under `webdev/component-demos/components`, sharing CSS from the co-located `css/` folder. Keep images and JS helpers within sibling folders to simplify paths.

## 2. Component Extraction Steps
1. **Identify scope**: Locate the exact markup block in the source page. Copy only the markup needed for the component; strip unrelated scripts or sections.
2. **Create standalone file**: Scaffold a minimal HTML document that links to shared fonts and CSS (`spaces.css`, `grid-12col.css`, `plantissima-styles.css`). Add component-specific inline styles only when the shared CSS lacks an equivalent.
3. **Respect the 12-column grid**: Ensure layout wrappers (`.content-wrapper`, `.grid`, etc.) mirror the original structure. Align sections to columns 2–11 when that’s how the live page renders; allow hero/nav wrappers to remain full-bleed.
4. **Preserve tokens & variables**: Use existing CSS variables (`var(--border-radius)`, spacing tokens) instead of hard-coded values. If the token doesn’t exist, reconsider the change before introducing new constants.
5. **Avoid source edits**: Do not modify files under `webdev/plantissima-hugo/`. If reference CSS deviates, note it and coordinate a refresh from the live site instead of patching locally.

## 3. Visual Validation
- **Capture reference**: Use Playwright to take screenshots of both the original page section and the new component (`ai-tests/<component>.spec.ts`). Keep outputs in `webdev/component-demos/screenshots`.
- **Compare**: Diff the component capture against the reference using `pixelmatch` if dimensions align; otherwise review by eye. Record gaps before adjusting CSS.
- **Iterate with intent**: Make targeted tweaks, rerun the Playwright test, and stop once diffs are within acceptable tolerances.

## 4. Content & Accessibility Guard Rails
- Preserve semantic structure (headings, lists, buttons) as in the source.
- Keep copy verbatim unless the task explicitly calls for edits.
- Maintain ARIA attributes, alt text, and link targets from the original markup.
- When extracting scripts (e.g., navigation toggles), sandbox them in `webdev/component-demos/js/` and include only the necessary logic.

## 5. Change Management
- Log each component addition or update with a short rationale (what changed, why it was needed).
- Whenever local CSS diverges from the live reference, pause and refresh the CSS bundle before continuing extraction.
- Run `git status` frequently to ensure only intended files within `component-demos` are being modified.

## 6. Handoff Checklist
- Component HTML lives in `webdev/component-demos/components/`.
- Shared assets (images, JS helpers, screenshots) reside in their respective folders.
- Playwright spec exists (or is updated) to cover the new component.
- Visual diff reviewed and documented (screenshots saved).
- Workflow guard rails observed; source repo remains untouched.

Following this workflow keeps the demo library faithful to the live site while giving us confidence that each component can be migrated into the future Hugo setup without surprises.
