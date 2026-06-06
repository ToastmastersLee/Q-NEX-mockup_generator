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
