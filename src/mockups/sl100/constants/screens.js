/**
 * SL100 Mockup Screen Registry and URL Route Helpers
 */

export const SCREEN_REGISTRY = [
  {
    id: 'home-dup-ops',
    name: '主页: 复制模式 (OPS)',
    type: 'page',
    desc: '主页 · 复制模式开启 · 选中 OPS 主机 · 讲台升降桌/电子锁就绪',
  },
  {
    id: 'home-dup-hdmi',
    name: '主页: 复制模式 (HDMI)',
    type: 'page',
    desc: '主页 · 复制模式开启 · 选中 HDMI 外部输入',
  },
  {
    id: 'home-dup-typec',
    name: '主页: 复制模式 (Type-C)',
    type: 'page',
    desc: '主页 · 复制模式开启 · 选中 Type-C 笔记本输入',
  },
  {
    id: 'home-matrix',
    name: '主页: 矩阵切换模式 (3×3)',
    type: 'page',
    desc: '主页 · 复制模式关闭 · 3路 HDMI 输出独立矩阵路由分发',
  },
  {
    id: 'serial-ptz',
    name: '串口: PTZ Camera 云台摄像机',
    type: 'page',
    desc: '串口控制页 · PTZ Camera · 电源/AF自动对焦/八向飞梭/变焦',
  },
  {
    id: 'serial-lcd1',
    name: '串口: Interactive LCD Display (1)',
    type: 'page',
    desc: '串口控制页 · 触控一体机 1 · 电源/节能/锁/信源/音量/亮度',
  },
  {
    id: 'serial-lcd2',
    name: '串口: Interactive LCD Display (2)',
    type: 'page',
    desc: '串口控制页 · 触控一体机 2 · 独立控制',
  },
  {
    id: 'serial-lcd3',
    name: '串口: Interactive LCD Display (3)',
    type: 'page',
    desc: '串口控制页 · 触控一体机 3 · 独立控制',
  },
  {
    id: 'timer',
    name: '讲台课堂时钟 / 定时器',
    type: 'page',
    desc: '讲台辅助工具 · 实时大时钟 · 课堂倒计时提醒',
  },
  {
    id: 'settings-screen',
    name: '屏幕设置 (Screen settings)',
    type: 'page',
    desc: '屏幕设置页 · 亮度/按键音效/屏幕休眠/自动锁屏/密码解锁',
  },
  {
    id: 'settings-password-unlock',
    name: '密码解锁设置 (Password Unlock)',
    type: 'page',
    desc: '密码解锁页 · 开关与 4 位密码设置',
  },
  {
    id: 'settings-language',
    name: '语言设置 (Language Settings)',
    type: 'page',
    desc: '语言设置页 · 多国语言切换',
  },
  {
    id: 'settings-serial',
    name: '串口设置 (Serial Port Settings)',
    type: 'page',
    desc: '串口设置页 · 讲台多路串口波特率与控制码配置',
  },
  {
    id: 'settings-hdmi-res',
    name: 'HDMI 输出分辨率设置',
    type: 'page',
    desc: 'HDMI 输出分辨率页 · HDMI OUT A/B/C 三路独立分辨率配置',
  },
  {
    id: 'settings-other',
    name: '其他设置 (Other Settings)',
    type: 'page',
    desc: '其他设置页 · 开关机联动控制',
  },
  {
    id: 'lock',
    name: '锁屏界面 (Lock Screen)',
    type: 'screen',
    desc: '物理锁屏页 · 超宽屏解锁光环与 4 位 PIN 解锁',
  },
];

export function getScreenFromUrl() {
  if (typeof window === 'undefined') return 'home-dup-ops';
  const params = new URLSearchParams(window.location.search);
  const screen = params.get('screen') || params.get('tab');
  if (screen) return screen;
  return 'home-dup-ops';
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
