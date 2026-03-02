# Copilot Instructions — Frontend Workflow & Componentization

> Scope: These rules focus on developer workflow, refactoring cadence, and review hygiene for a React codebase that is already functional. Avoid restating business logic or app context.

## Goals
- Prioritize **layout polish** (responsive grid, spacing, motion that respects `prefers-reduced-motion`) and **componentization** (small, composable pieces with stable contracts).
- Keep changes **incremental** and **reviewable**; propose PR-sized patches with tests when possible.

## Change Strategy & Deliverables
- Start every task with:
  1) a **refactor plan** (bulleted, 5–10 items max),
  2) **small diffs** that are self‑contained,
  3) a **verification checklist** (visual, a11y, tests).
- Prefer **separate PRs** per concern (e.g., grid layout, a11y, animation) and include a brief “risk/rollback” note.

## Componentization Workflow
- Extract UI into focused components with **explicit, typed props**; keep side effects in hooks.
- Default to **presentational vs. stateful** split where it reduces coupling.
- Keep props stable; avoid prop drilling via **Context** only when multiple siblings need the data.
- Memoize only after measuring (no premature optimization). Add a note if memoization is skipped.

## Layout & Styling Workflow
- Use **CSS Grid/Flex** for responsiveness; avoid fixed sizes; ensure sensible min/max.
- Centralize spacing/typography tokens; avoid inline styles except for one‑off overrides.
- Motion: prefer lightweight animation and always respect `prefers-reduced-motion`.

## Accessibility First
- All interactive elements must be keyboard reachable; include correct roles/states (e.g., `aria-pressed`).
- Announce dynamic status changes with polite live regions where appropriate.
- Provide focus outlines and logical tab order; include at least one a11y test per PR touching UI.

## Testing & Review Hygiene
- For any new component/hook, include **at least one unit test** covering critical interaction or state.
- Write tests using **Testing Library** patterns (user-centric; no implementation details).
- Link PR description to this file and include: “What changed”, “How to test”, “A11y notes”.

## Response & Output Format (Copilot)
- Always return **Plan → Diffs → Tests → Checklist → Next steps**.
- If constraints (time/size) prevent tests now, add a “Pending tests” section with explicit items.
- Avoid adding heavy dependencies; justify any new package with cost/benefit.

## Things to Avoid
- Big‑bang refactors; mixing layout, logic, and routing in one PR.
- Inline CSS for entire components; hidden focus; motion without a11y fallback.
- Breaking public props without a migration note.


---
description: "Workflow rules for React components"
applyTo: "src/components/**/*.tsx"
---
- Prefer small, presentational components; keep them stateless where possible.
- Document public props in JSDoc/TS comments; avoid leaking implementation details.
- Provide one a11y check and one screenshot/visual step in the verification checklist.

---
description: "Workflow rules for React hooks"
applyTo: "src/hooks/**/*.ts"
---
- Keep side effects isolated; explicit dependency arrays; deterministic tests.
- Export the minimal API; no coupling to UI modules.