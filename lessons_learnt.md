# 🧠 Lessons Learnt & Preferences Log

This document records persistent insights, fixes, and user preferences for the `manual-ui-mockup` skill.
**AI Instruct**: Always read this before generating or modifying the UI. Add new significant findings here.

## General Preferences
- Icons must be scalable SVGs (Lucide) to handle both dark and wireframe themes perfectly without refactoring CSS shapes.

## System & Execution Protocol
- **Token Limit Avoidance**: To prevent "Agent terminated due to error" (Token explosions), NEVER output large blocks of HTML or code directly into the chat.
- **Local Execution**: Always convert local file generation tasks into Python scripts (like `generate.py`) and use the `run_command` tool to execute them silently.
- **Persistent Memory**: Store long-term project context and recurring issues in this `lessons_learnt.md` file rather than relying on session memory.

## Styling Quirks & Fixes
- **Lucide + React Conditional Rendering Crash**: When using `lucide.createIcons()` inside a React `useEffect`, it replaces `<i>` tags with `<svg>` tags directly in the real DOM. If you use conditional rendering (like `foo ? <div>...</div> : <div>...</div>`), React's Virtual DOM will get out of sync with the real DOM and throw a `NotFoundError: Failed to execute 'removeChild'` when toggling states. **Fix**: ALWAYS add a unique `key` prop (e.g., `key="duplicate"` vs `key="normal"`) to the conditionally rendered wrapper `div`. This forces React to completely unmount and remount the node, bypassing the conflict.
- **CSS Grid Split Layout Clipping**: When a video split layout uses CSS Grid with image children, plain `1fr` rows can still be stretched by the grid item's default `min-height: auto`, causing lower rows to be clipped inside an `overflow: hidden` parent. **Fix**: use `minmax(0, 1fr)` for grid rows and set `min-height: 0; min-width: 0;` on the grid container and children.

## Mockup UI & State Management Insights
- **Preventing Double Scrollbars inside Flex Containers**: When absolute positioning popup panels or overlays (e.g., virtual keyboards, dialogs) inside a scrollable layout (e.g., `.lcs-settings-main` with `overflow-y: auto`), the absolute element's bounds can stretch the scrollHeight of that container and trigger unwanted scrollbars. **Fix**: Position the overlay elements as direct children of the parent non-scrollable container (e.g., `.lcs-full-settings-overlay` with `overflow: hidden`), rendering them as siblings to the main scrollable layout rather than children.
- **Checkbox Row nowrap constraint**: For checkbox configuration panels (like the `Select:` row in advance settings), do NOT wrap items (`flex-wrap: nowrap`) to keep the layout in a single line. Instead, prevent horizontal scrollbars using `overflow-x: hidden` on the outer scroll pane.
- **Global Hidden Scrollbars**: Mockups must allow scrolling/dragging of overflow content, but scrollbar tracks and thumbs should be hidden globally to maintain a clean mockup appearance. Add `-ms-overflow-style: none`, `scrollbar-width: none` (for IE/Edge/Firefox) and `display: none` on `::-webkit-scrollbar` (for Chrome/Safari/Opera) to all scroll containers (e.g. `.lcs-settings-main`, `.lcs-channels-list`, `.lcs-overlay-body`, `.lcs-file-list-container`).
- **State Hook Declaration Order**: Be extremely careful about declaration order in React functional components. Declaring helper constants or variables (like `displayTab` or `sublabelColor`) that depend on state hooks (like `activeSettingsTab` or `theme`) too early in the component function will result in a runtime `ReferenceError: Cannot access 'X' before initialization` since state hooks must be initialized first. Always declare dependent constants/helpers after the related state hooks have been declared.
- **Theme-Aware Mockup Styling**: When implementing double-themed layouts (Dark/Light mode), avoid hardcoding light gray values (like `#cbd5e0`, `#fff`, or `rgba(255,255,255,0.4)`) directly in inline styles for borders, text labels, or section headers, as they become low-contrast or invisible in the light theme. Always use theme-dependent variables (e.g., `theme === 'light' ? '#1f2937' : '#cbd5e0'`).

## LCS Mockup Color Palette Scheme
- **Dark Mode**:
  - Main backdrop / canvas: `#0b0f17`
  - Bezel outer body: `#12141a` / bezel border: `#232730`
  - Screen Background: `#171b26`
  - Sidebar background: `#1c1f26`
  - Settings main panel background: `#0b0c10`
  - Settings advance card background: `#1c1f26`
  - Text primary: `#ffffff`
  - Text secondary (sub-labels): `#cbd5e0` (light gray)
  - Active/Verify green color: `#00e676` (bright green)
- **Light (Wireframe) Mode**:
  - Main backdrop / canvas: `#f3f4f6`
  - Screen Background: `#e5e7eb`
  - Sidebar background: `#e5e7eb`
  - Settings main panel background: `#d1d5db`
  - Settings advance card background: `#ffffff`
  - Text primary: `#111827` (almost black)
  - Text secondary (sub-labels): `#1f2937` (slate gray-800)
  - Active/Verify green color: `#00e676`
  - Border separator colors: `#e5e7eb` or `#d1d5db`


