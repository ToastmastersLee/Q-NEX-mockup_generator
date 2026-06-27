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

## External Controls

The controls around the mockup device are documentation and testing controls. They are not part of the CPL20 screen itself.

- `Status`: toggles the mock connection state. When disconnected, the device screen shows a disconnected state.
- `Menu Config`: toggles whether each menu item is visible in the device navigation. `Home` remains available as a stable fallback.
- `Light Theme` / `Dark Theme`: switches the mockup between dark and light visual themes.

These controls exist on both mockup families conceptually. The NDP600 implementation keeps them outside the portrait device frame so screenshots can show either the real device UI alone or the surrounding test controls when needed.
