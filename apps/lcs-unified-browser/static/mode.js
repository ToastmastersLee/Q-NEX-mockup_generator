export function initialMode() {
  return new URL(location.href).searchParams.get('mode') === 'demo' ? 'demo' : 'live';
}

// An explicit demo link opens the demo until the operator switches to real devices.
// A temporary demo selected from a normal entry point leaves its live default intact.
export function clearDemoLink(mode) {
  const url = new URL(location.href);
  if (mode === 'live' && url.searchParams.get('mode') === 'demo') {
    url.searchParams.delete('mode');
    history.replaceState(history.state, '', url);
  }
}
