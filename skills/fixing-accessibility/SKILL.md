---
name: fixing-accessibility
description: Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, focus management, color contrast, form errors, and WCAG 2.2 compliance. Use when adding interactive controls, forms, dialogs, or reviewing WCAG compliance.
---

# fixing-accessibility

Fix accessibility issues.

## how to use

- `/fixing-accessibility`
  Apply these constraints to any UI work in this conversation.

- `/fixing-accessibility <file>`
  Review the file against all rules below and report:
  - violations (quote the exact line or snippet)
  - why it matters (one short sentence)
  - a concrete fix (code-level suggestion)

Do not rewrite large parts of the UI. Prefer minimal, targeted fixes.

## when to apply

Reference these guidelines when:
- adding or changing buttons, links, inputs, menus, dialogs, tabs, dropdowns
- building forms, validation, error states, helper text
- implementing keyboard shortcuts or custom interactions
- working on focus states, focus trapping, or modal behavior
- rendering icon-only controls
- adding hover-only interactions or hidden content
- implementing drag-and-drop, swipe, or pointer gestures
- designing touch targets or mobile interactions

## rule categories by priority

| priority | category | impact | WCAG |
|----------|----------|--------|------|
| 1 | accessible names | critical | 4.1.2, 2.4.4, 2.4.9 |
| 2 | keyboard access | critical | 2.1.1, 2.1.2, 2.4.7 |
| 3 | focus and dialogs | critical | 2.4.3, 2.4.11 |
| 4 | semantics | high | 1.3.1, 4.1.2 |
| 5 | forms and errors | high | 3.3.1, 3.3.2, 3.3.4, 3.3.8 |
| 6 | announcements | medium-high | 4.1.3 |
| 7 | contrast and states | medium | 1.4.1, 1.4.3, 1.4.11 |
| 8 | touch and pointer | medium | 2.5.1, 2.5.2, 2.5.7, 2.5.8 |
| 9 | media and motion | low-medium | 1.1.1, 1.2.2, 1.4.4, 2.3.1 |
| 10 | tool boundaries | critical | — |

## quick reference

### 1. accessible names (critical)

- every interactive control must have an accessible name
- icon-only buttons must have aria-label or aria-labelledby
- every input, select, and textarea must be labeled
- links must have meaningful text (no "click here", "read more")
- decorative icons must be aria-hidden
- images must have alt text (meaningful or empty for decorative)
- aria-label on interactive elements must be concise and descriptive

### 2. keyboard access (critical)

- do not use div or span as buttons without full keyboard support
- all interactive elements must be reachable by Tab
- focus must be visible for keyboard users
- do not use tabindex greater than 0
- Escape must close dialogs or overlays when applicable
- no keyboard traps — focus must move away from any component using Tab
- custom keystrokes must not override browser or assistive technology shortcuts

### 3. focus and dialogs (critical)

- modals must trap focus while open
- restore focus to the trigger on close
- set initial focus inside dialogs
- opening a dialog should not scroll the page unexpectedly
- **focus appearance (WCAG 2.2 2.4.11):** focus indicator must be at least 2px thick and have a contrast ratio of at least 3:1 against adjacent colors. Do not rely on browser default outlines alone — ensure custom focus styles meet this threshold
- **focus not obscured (WCAG 2.2 2.4.12):** when an element receives focus, it must not be entirely hidden by other content (e.g., sticky headers, floating panels). Ensure at least the focus indicator area remains visible

### 4. semantics (high)

- prefer native elements (button, a, input) over role-based hacks
- if a role is used, required aria attributes must be present
- lists must use ul or ol with li
- do not skip heading levels
- tables must use th for headers when applicable
- use landmark regions (header, nav, main, aside, footer) for page structure
- use aria-current for the current page/step in navigation

### 5. forms and errors (high)

- errors must be linked to fields using aria-describedby
- required fields must be announced
- invalid fields must set aria-invalid
- helper text must be associated with inputs
- disabled submit actions must explain why
- **accessible authentication (WCAG 2.2 3.3.8):** do not rely solely on cognitive function tests (e.g., identifying objects, transcribing audio) for authentication. Offer alternatives: copy-paste from a password manager, QR code, or biometric. If a cognitive test is the only option, provide a mechanism to skip it
- error summary should be placed at the top of the form before the first field

### 6. announcements (medium-high)

- critical form errors should use aria-live
- loading states should use aria-busy or status text
- toasts must not be the only way to convey critical information
- expandable controls must use aria-expanded and aria-controls
- use aria-live="polite" for non-critical updates, aria-live="assertive" for urgent ones
- region updates (e.g., dynamic content) should use aria-live or role="status"/"alert"

### 7. contrast and states (medium)

- ensure sufficient contrast for text and icons
  - normal text (<18px): 4.5:1 minimum
  - large text (>=18px bold or >=24px): 3:1 minimum
  - non-text contrast (UI components, icons): 3:1 minimum (WCAG 2.1 1.4.11)
- hover-only interactions must have keyboard equivalents
- disabled states must not rely on color alone — add an icon, pattern, or text indicator
- do not remove focus outlines without a visible replacement
- active/focus/selected states must be distinguishable from default
- consider APCA (Accessible Perceptual Contrast Algorithm) for future-proof contrast evaluation

### 8. touch and pointer (medium)

- **target size (WCAG 2.2 2.5.8):** interactive targets must be at least 24x24 CSS pixels, with exceptions for inline links, browser-default controls, and essential targets
- **pointer cancellation (WCAG 2.1 2.5.2):** do not trigger actions on pointer down (mousedown/touchstart). Use pointer up (mouseup/touchend) so users can cancel by dragging away
- **pointer gestures (WCAG 2.1 2.5.1):** if a feature uses multipoint or path-based gestures (pinch, swipe, drag), provide a single-point alternative (button, tap)
- **dragging (WCAG 2.2 2.5.7):** if a feature requires dragging (drag-and-drop, slider thumb), provide a single-pointer alternative (buttons, click-to-move)
- ensure touch targets have adequate spacing to prevent accidental activation

### 9. media and motion (low-medium)

- images must have correct alt text (meaningful or empty)
- videos with speech should provide captions when relevant
- respect prefers-reduced-motion for non-essential motion
- avoid autoplaying media with sound
- provide transcripts for audio content
- do not use flashing content more than 3 times per second (general flash threshold)

### 10. tool boundaries (critical)

- prefer minimal changes, do not refactor unrelated code
- do not add aria when native semantics already solve the problem
- do not migrate UI libraries unless requested
- do not invent design intent — if the accessible fix requires a visual redesign, flag it but do not implement it

## testing tools

Use these tools to verify accessibility before and after fixes:

| tool | type | use case |
|------|------|----------|
| axe-core / axe DevTools | automated | Catch 57% of common issues: missing labels, contrast, ARIA |
| Lighthouse a11y audit | automated | Quick CI gate, covers ~20 rules |
| WAVE (browser extension) | visual overlay | See contrast, heading structure, landmark violations inline |
| Accessibility Insights | guided manual | FastPass for keyboard + screen reader workflows |
| VoiceOver (macOS) | screen reader | Test with `Cmd+F5`, navigate by Tab, rotor, VO keys |
| NVDA (Windows) | screen reader | Most widely used; test forms, dialogs, live regions |
| TalkBack (Android) | screen reader | Test mobile web with gesture navigation |
| colour contrast analyser (CCA) | color tool | Measure contrast ratios accurately |
| Accessibility Tree (Chrome DevTools) | inspector | Verify computed accessible name, role, and state |

## screen reader testing quick guide

### VoiceOver (macOS)
- Enable: `Cmd+F5`
- Navigate by element: `Ctrl+Opt+Right/Left`
- Rotor: `Ctrl+Opt+U` (headings, links, landmarks)
- Interact with content: `Ctrl+Opt+Shift+Down`
- Read page: `Ctrl+Opt+A`
- Test forms: Tab through fields, verify labels are announced

### NVDA (Windows)
- Enable: `Ctrl+Alt+N`
- Navigate: Tab for interactive elements, arrow keys for content
- Browse mode: `NVDA+Space` to toggle between browse and focus modes
- Elements list: `NVDA+F7` (headings, links, landmarks)
- Test forms: Tab through, verify error announcements

## common fixes

```html
<!-- icon-only button: add aria-label -->
<!-- before --> <button><svg>...</svg></button>
<!-- after -->  <button aria-label="Close"><svg aria-hidden="true">...</svg></button>

<!-- div as button: use native element -->
<!-- before --> <div onclick="save()">Save</div>
<!-- after -->  <button onclick="save()">Save</button>

<!-- form error: link with aria-describedby -->
<!-- before --> <input id="email" /> <span>Invalid email</span>
<!-- after -->  <input id="email" aria-describedby="email-err" aria-invalid="true" /> <span id="email-err">Invalid email</span>

<!-- focus indicator: ensure visible custom focus ring -->
<!-- before --> button:focus { outline: none; }
<!-- after -->  button:focus-visible { outline: 2px solid var(--color-brand); outline-offset: 2px; }

<!-- target size: ensure minimum 24x24px touch target -->
<!-- before --> <button style="width:16px;height:16px;padding:0">×</button>
<!-- after -->  <button style="width:24px;height:24px;padding:0" aria-label="Close">×</button>

<!-- pointer cancellation: use pointer up instead of down -->
<!-- before --> <button onmousedown="submit()">Submit</button>
<!-- after -->  <button onclick="submit()">Submit</button>

<!-- dragging alternative: provide buttons -->
<!-- before --> <div draggable="true" role="listitem">Reorder by dragging</div>
<!-- after -->  <div role="listitem"><button aria-label="Move up">↑</button> Item <button aria-label="Move down">↓</button></div>

<!-- accessible authentication: offer alternatives -->
<!-- before --> <label>Solve: 3 + 7 = <input type="text" /></label>
<!-- after -->  <label>Solve: 3 + 7 = <input type="text" /></label> <a href="/auth/magic-link">Send magic link instead</a>
```

## review guidance

- fix critical issues first (names, keyboard, focus, tool boundaries)
- prefer native HTML before adding aria
- quote the exact snippet, state the failure, propose a small fix
- for complex widgets (menu, dialog, combobox), prefer established accessible primitives over custom behavior
- verify fixes with at least one automated tool (axe) and one manual check (keyboard navigation)
- when in doubt about a rule, reference the WCAG 2.2 understanding documents
