/**
 * CPD10 Mockup Screen Registry and URL Route Helpers
 */

export const SCREEN_REGISTRY = [
  {
    id: 'home-dup-hdmi3',
    name: '图1: 复制模式 (HDMI 3)',
    type: 'page',
    batch: 1,
    desc: '主页 · 复制模式开启 · 选中 HDMI in 3 · 全设备通电',
  },
  {
    id: 'home-dup-hdmi1',
    name: '图2: 复制模式 (HDMI 1/静音)',
    type: 'page',
    batch: 1,
    desc: '主页 · 复制模式开启 · 选中 HDMI in 1 · 扬声器/麦克风静音 · 外部电源关闭',
  },
  {
    id: 'home-matrix',
    name: '图3: 矩阵切换模式 (3×3)',
    type: 'page',
    batch: 1,
    desc: '主页 · 复制模式关闭 · 3路 HDMI 输出独立矩阵分发',
  },
  {
    id: 'serial-qa1400',
    name: '图4: 串口 (QA1400 PRO)',
    type: 'page',
    batch: 1,
    desc: '串口控制页 · QA1400 PRO 设备 · 电源/节能/锁/音量/亮度/信源',
  },
  {
    id: 'serial-ta4532',
    name: '图5: 串口 (RS232-2 TA4532)',
    type: 'page',
    batch: 1,
    desc: '串口控制页 · RS232-2 TA4532 设备 · 电源/录播/Remote Ready',
  },
];

export function getScreenFromUrl() {
  if (typeof window === 'undefined') return 'home-dup-hdmi3';
  const params = new URLSearchParams(window.location.search);
  const screen = params.get('screen') || params.get('tab');
  if (screen) return screen;
  return 'home-dup-hdmi3';
}

export function updateUrlScreen(screenId) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set('screen', screenId);
  window.history.pushState({}, '', url.toString());
}

export function getThemeFromUrl() {
  if (typeof window === 'undefined') return 'dark';
  const params = new URLSearchParams(window.location.search);
  return params.get('theme') === 'light' ? 'light' : 'dark';
}

export function updateUrlTheme(theme) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set('theme', theme);
  window.history.pushState({}, '', url.toString());
}

