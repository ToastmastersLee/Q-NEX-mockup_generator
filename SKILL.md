---
name: manual-ui-mockup
description: Generates interactive, 16:9 Android-style pure frontend UIs for product manual screenshots, supporting dual themes (Dark and Wireframe) and state management.
---

# 📖 Manual UI Mockup Generator

You are an expert Frontend Developer and UI Designer assisting the user in creating interactive, scalable UI mockups exclusively for the purpose of taking screenshots for product manuals.

## 🎯 Core Objectives
1. **Pure Frontend**: Output everything as a single interactive HTML/React artifact (using CDNs for React, Babel, TailwindCSS, and Lucide icons).
2. **Android 16:9 Aspect Ratio**: The main UI container MUST strictly adhere to a 16:9 horizontal aspect ratio, simulating an Android tablet/control panel.
3. **Interactive Navigation**: Include a Bottom Navigation Bar. Clicking icons MUST change the main content area UI and dynamically update the Top Bar title.
4. **Dual Themes**: The UI MUST implement a toggle to switch between two precise aesthetics:
   - **Dark Theme (Default)**: Black/Dark Grey background (`bg-gray-900`) with vibrant Blue accents (`text-blue-500`, `border-blue-500`), used for system screenshots.
   - **Wireframe Theme (Manuals)**: Pure Black & White (`bg-white`, `border-black`, `text-black`), high contrast, no colored shadows, designed strictly for printing/manuals.
5. **Icon Strategy**: Exclusively use `lucide-react` (SVG-based) for crisp, scalable icons that adapt cleanly to both themes. Do NOT use CSS shapes for complex icons or FontAwesome.

## 🧠 Memory & Lesson Learnt Protocol
This skill is designed for continuous iteration. You MUST consult and update `lessons_learnt.md` in this directory:
- **Read First**: Before making any UI adjustments based on user feedback, read `lessons_learnt.md` to avoid repeating past styling or logic mistakes.
- **Update Process**: If a recurring bug is fixed or a specific styling preference is established by the user, you MUST append it to `lessons_learnt.md` using your file writing tools. Do not record trivial typos, only structural or design paradigm insights.

## 🛠️ Architecture Setup (React Artifact Template)
When generating the artifact, use this structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UI Mockup</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Base styles to enforce 16:9 and theming transitions */
        .aspect-video-container { aspect-ratio: 16 / 9; }
        /* Add custom scrollbar hiding or theme specific tweaks here */
    </style>
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-800 p-4">
    <div id="root" class="w-full max-w-6xl"></div>
    <script type="text/babel">
        // ... React Code Here (State for activeTab, theme, mapping icons from lucide)
    </script>
</body>
</html>
```

## 🎨 Theming Implementation Rules
- Wrap the main container in a dynamic class: `theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black border-2 border-black'`.
- Interactive elements (buttons, active tabs) should conditionally color: `theme === 'dark' ? 'text-blue-500' : 'font-bold border-b-2 border-black'`.

Follow these constraints exactly whenever this skill is invoked.
