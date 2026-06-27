# CPL20 Mockup Generator

This repository contains React/Vite mockups for CPL20 control-panel screens.

## Mockups

- `NMP211 CPL20 landscape`: the original horizontal mockup, loaded by default.
- `NDP600 CPL20 portrait`: the vertical mockup, isolated under `src/mockups/ndp600-cpl20-portrait`.

The two mockups share the same Vite project and dependency setup, but the NDP600 portrait UI is kept in its own folder so layout work can stay independent from the NMP211 landscape UI.

## Run

```bash
npm run dev
```

Runs the default NMP211 landscape mockup.

```bash
npm run dev:ndp600
```

Runs the NDP600 portrait mockup.

```bash
npm run build
npm run build:ndp600
```

Builds the default mockup or the NDP600 portrait mockup.

## NDP600 Direct Links

When the NDP600 server is running, the mockup can be opened directly on specific states:

- `/?tab=power`
- `/?tab=home`
- `/?tab=video`
- `/?tab=video&duplicate=1`
- `/?tab=serial`
- `/?tab=volume`
- `/?tab=air`
- `/?tab=remote`
- `/?screen=lock`
- `/?theme=light`
- `/?status=disconnected`

## Code Structure & Module Directory

The project separates the two UI layouts so they can be developed and built independently while utilizing the same framework and assets.

### 1. Landscape Mockup (NMP211 CPL20)
Main code resides in the root of `src/` and uses **Tailwind CSS** classes.
- **Entry & Layout**: `src/App.jsx` handles state management, side controls, and page switching.
- **Shared Components**:
  - `src/components/TopBar.jsx`: Renders top utility header (time, date, home, refresh, link, settings, lock screen).
  - `src/components/BottomNav.jsx`: Renders bottom toolbar with the main Power button and responsive feature tabs.
  - `src/components/Buttons.jsx`: Reusable circle action buttons (`RowButton`, `LargeButton`) for video sources.
  - `src/components/ToggleSwitch.jsx`: Reusable switch animation.
  - `src/components/LockCountdownModal.jsx`: Countdown modal (10s) triggered before screen locks.
- **Pages (Main Content)**:
  - `Home.jsx`: Dashboard quick routing access.
  - `VideoSwitch.jsx`: Video input/output matrix mapping and Duplicate Mode toggle.
  - `Volume.jsx`: Speaker and Microphone EQ vertical steppers (Audio, Treble, Bass).
  - `PowerControl.jsx`: Display and External power toggles.
  - `AirConditioner.jsx`: AC panel featuring circular temperature slider, mode buttons, and fan speeds.
  - `ProjectionScreen.jsx`: Projector screen actions (Up, Stop, Down).
  - `RemoteControl.jsx`: Remote control placeholder.
  - `Settings.jsx` / `Customize.jsx` / `ScheduledPowerOff.jsx`: Network setup (Panel IP), customized tab visibility, and auto-power off schedule.
  - `LockScreen.jsx`: Screen lock panel with unlock animation.
  - `Disconnection.jsx`: Editable connection loss panel.

---

### 2. Portrait Mockup (NDP600 CPL20)
Contained under `src/mockups/ndp600-cpl20-portrait/` and uses **custom vanilla CSS** overrides inside `styles.css` designed to support both Dark and Light modes.
- **Entry & Layout**: `src/mockups/ndp600-cpl20-portrait/App.jsx` coordinates the vertical layouts:
  - **Sidebar** (left): Vertical tab navigation (Home, Power, Video, Serial, Volume, AC, Remote).
  - **TopTools** (top right): Floating utility actions (Refresh, Bind, Settings).
  - **BottomDock** (bottom): Lock, volume mute/unmute capsule, and the main blue Power button.
- **Content Pages** (conditionally rendered in center):
  - `HomePage`: Combines compact `AirPage` and Projection Screen controllers.
  - `PowerPage`: NDP600 power controls (display, light power).
  - `VideoPage`: Matrix output mapping (HDMI Out A/B/C) and Duplicate Mode selection.
  - `SerialPage`: Handles RS232 (power, inputs), RS485 (power), CBX 1 (momentary up/down wide commands), and CBX 3 (power, lecture capture).
  - `VolumePage`: Speaker & Mic EQ vertical faders, complete with middle values, horizontal dividers, and track ticks.
  - `AirPage`: Dedicated AC control panel (ON/OFF power switch, temp adjust buttons, and mode pills).
  - `SettingsPage`: High-fidelity scrollable settings rows (Device Name, Device ID with inline SVG QR Code, Panel IP, Customize, Version, Disconnection trigger, Clear Cache).
  - `LockScreen` / `DisconnectedScreen`: Basic lock panel with shadow ripple rings and connection lost status page.

## Styling System & Theme Shared Concepts
- **Dark Mode**: Soft shadows, deep blue gradients (`#1a2636` to `#111724`), and glowing active indicators.
- **Light (Wireframe) Mode**: Clean white cards, light-grey borders (`#d1d5db`), and active accents highlighted in standard iOS blue (`#3b82f6` or `#2563eb`), ensuring both mockups present a consistent visual theme.
- **Shared Assets**: Icons and common logos are imported from `src/assets/` to ensure graphical consistency.
