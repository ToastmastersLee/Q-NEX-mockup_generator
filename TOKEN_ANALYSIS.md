# 🔥 Token 消耗分析报告

## 问题：为什么几轮对话就烧光了 Gemini Flash 的 Token？

---

## 1. 项目代码规模

| 指标 | 数值 |
|------|------|
| 总源文件数 | 23 个 (.jsx/.js/.css) |
| 总行数 | 2,842 行 |
| 总字符数 | 143,277 |
| **估算 Token 数** | **~40,928 tokens** |

### Top 5 最大文件（占总量 49%）

| 文件 | 行数 | ~Token |
|------|------|--------|
| `AndroidEthernet.jsx` | 354 | 5,463 |
| `App.jsx` | 317 | 3,959 |
| `AirConditioner.jsx` | 257 | 3,935 |
| `Settings.jsx` | 220 | 3,456 |
| `Disconnection.jsx` | 248 | 3,168 |

---

## 2. Token 消耗在哪里？

### 每一轮 AI 交互的 Token 组成

```
┌──────────────────────────────────────────────────────┐
│  System Prompt + 对话历史          ~8,000-15,000     │
│  读取源文件 (通常 3-5 个)            ~15,000-20,000   │
│  AI 生成输出 (代码 + 解释)           ~8,000-12,000   │
│  ─────────────────────────────────────────────────── │
│  单轮估算                           ~35,000 tokens   │
└──────────────────────────────────────────────────────┘
```

### 今晚的累计消耗估算

> 8 个任务 × ~35,000 tokens/轮 ≈ **280,000 tokens**
> 
> 加上多轮对话上下文累积、重复读文件、构建输出等 → 实际可能达到 **400,000-500,000+ tokens**

> [!WARNING]
> 关键问题：**每次新任务都需要重新读取 App.jsx、Settings.jsx 等核心文件**，这些文件随着功能增多越来越大，导致 token 消耗呈指数增长。

---

## 3. 三大 Token 吞噬黑洞

### 🔴 黑洞 1：Tailwind className 膨胀 — 占代码的 29%

428 处 `className` 声明消耗了 **~11,937 tokens**，几乎占 1/3 的代码量。

```jsx
// 典型的 isDark 三元运算，每个组件都重复写：
className={`flex justify-between items-center py-5 
  ${isDark ? 'border-b border-gray-600/50' : 'border-b border-gray-300'}`}
```

这种模式在 **每个文件** 里都大量出现。

### 🔴 黑洞 2：重复的组件模式

| 重复模式 | 出现位置 | 浪费 |
|----------|----------|------|
| Modal 弹窗 | Settings (×2), ScheduledPowerOff, AndroidEthernet | ~2,000 tokens |
| 设置行 (Label + Chevron) | Settings, Customize, ScheduledPowerOff | ~800 tokens |
| isDark 样式三元 | 几乎全部 23 个文件 | ~3,000 tokens |
| SVG 图标模板 | Icons.jsx 内 8 处重复 | ~500 tokens |

### 🔴 黑洞 3：App.jsx 状态膨胀

App.jsx 从最初的简洁路由，膨胀到了 **317 行 / ~4,000 tokens**，集中管理了：
- 7 个布尔状态 (isDisconnected, isLocked, isLockCountdown...)
- 3 个字符串/对象状态 (panelIpAddress, settingsSubPage, navConfig)
- 多个事件处理函数
- 所有页面的条件渲染分支

**每次改任何功能，AI 都必须读这个文件** → 每轮至少 4,000 tokens 的固定消耗。

---

## 4. 优化方案（可节省 ~24% Token/轮）

### A. 提取共享样式对象 → 预计节省 ~7,000 tokens

```jsx
// 新建 src/styles/theme.js
export const theme = {
  border: (isDark) => isDark ? 'border-b border-gray-600/50' : 'border-b border-gray-300',
  text: (isDark) => isDark ? 'text-gray-100' : 'text-gray-800',
  textSub: (isDark) => isDark ? 'text-gray-400' : 'text-gray-500',
  settingsRow: (isDark) => `flex justify-between items-center py-5 ${...}`,
  // ...
};
```

### B. 提取共享组件 → 预计节省 ~2,500 tokens

```jsx
// 新建 src/components/SettingsRow.jsx — 统一设置行
<SettingsRow label="Device Name" value={name} type="text" onClick={...} />

// 新建 src/components/Modal.jsx — 统一弹窗
<Modal isOpen={...} onClose={...} title="...">
  {children}
</Modal>
```

### C. 拆分 App.jsx → 预计节省 ~1,500 tokens

```jsx
// 新建 src/context/AppContext.jsx — 状态管理
// App.jsx 只做布局和路由，缩减到 ~100 行
```

### D. 对话策略优化（最重要❗）

| 策略 | 效果 |
|------|------|
| 一次请求批量完成相关改动 | 减少重复读文件次数 |
| 提供具体行号范围，不让 AI 读全文件 | 每次少读 3,000-5,000 tokens |
| 新功能先写到独立文件，最后再改 App.jsx | 降低大文件的反复读取 |
| 简单改动直接告诉 AI 改哪行 | 避免 AI 做全文件扫描 |

---

## 5. 总结

| 项目 | 当前 | 优化后 |
|------|------|--------|
| 单轮 Token 消耗 | ~35,000 | ~27,000 |
| 8 轮任务总消耗 | ~280,000+ | ~216,000 |
| className 占比 | 29% | ~12% |
| App.jsx 大小 | 4,000 tokens | ~1,500 tokens |

> [!TIP]
> **最大的优化不是代码重构，而是对话策略**：尽量在一次请求中完成所有相关改动，减少 AI 反复读取相同大文件的次数。
