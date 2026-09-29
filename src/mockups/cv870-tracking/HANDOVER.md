# CV870Pro 摄像机跟踪配置系统 (CameraCMS Mockup) - 交接文档 (HANDOVER.md)

> **目标受众**：接手本项目的 AI Agent 或前端开发人员。  
> **核心原则**：本项目为 **100% 原生 HTML/CSS/React 组件** 还原的 Windows 桌面级监控客户端（CameraCMS v1.0.27），**严禁使用静态截图叠加方案**，必须保持真实组件的交互性与独立维护性。

---

## 1. 项目背景与定位

- **业务背景**：Q-NEX 录播系统（LCS810/LCS710）配备的 CV870Pro 4K 跟踪摄像机（教师机与学生机）需要通过配套的 Windows 软件 **CameraCMS** 进行局域网发现、双码流拉取、PTZ 预置位设置及 AI 跟踪算法标定。
- **定位**：作为 `Q-NEX-mockup_generator` 下的**独立前端交互原型模块**，模拟完整真实的 CameraCMS 客户端体验。
- **官方参考手册**：`Docs/02_Extended_Products/LectureCaptureSystem/LCS810/LCS810UserManualMarkdown/CameraTrackingSettings/Tracking setting of teacher  or student camera (CV870Pro).md`

---

## 2. 快速启动与访问

```bash
# 方式 1：伴随 LCS 录播系统主服务启动 (推荐)
npm run dev:lcs
# 浏览器访问：http://localhost:5175/?view=cv870
# 或在 http://localhost:5175/ 顶部模拟控制条 (SimPanel) 点击 "CV870 Setup" 按钮在新标签页打开

# 方式 2：作为独立应用在 5178 端口启动
npm run dev:cv870
# 浏览器访问：http://localhost:5178/
```

- **验证编译状态**：
```bash
npm run build         # 构建整体项目（验证 0 错误）
npm run build:cv870   # 单独构建 CV870 模块
```

---

## 3. 目录结构与模块说明

源码路径：`src/mockups/cv870-tracking/`

```
cv870-tracking/
├── assets/                       # 官方手册截图与高分辨率视频画面参考资源
├── components/
│   ├── WindowHeader.jsx          # Windows 仿真系统栏（时钟、NET/CPU/RAM 动态仪表、系统按钮）
│   ├── TopNavBar.jsx             # 软件顶部导航 Tab（Device Management / Main View / Remote Playback）
│   ├── DeviceManagementView.jsx  # 设备管理视图（上下面板表格、搜索动画、设备选择）
│   ├── AddClientModal.jsx        # 真实的 "+ Add to client" 弹窗（IP、5000 端口、admin 凭据）
│   ├── MainView.jsx              # 主监控与标定视图（4/1 分屏、PTZ 面板、算法设置、Canvas 划区）
│   ├── CloseUpSettingsModal.jsx  # 特写画面微调弹窗（PTZ 8 向微调、Zoom 缩放、Set 保存）
│   ├── DualCmosModal.jsx         # 双目 CMOS 电子中心校准弹窗（双十字准心实时纠偏对齐）
│   ├── RemotePlaybackView.jsx    # 录像回放视图（日历选择、24 小时监控时间轴拖动）
│   └── GuideAssistantDrawer.jsx  # 右下角悬浮展开的 12 步配置向导抽屉（非侵入式参考）
├── data/
│   └── stepsData.js              # 结构化 12 个配置步骤数据（中英双语、检查清单、默认参数）
├── App.jsx                       # 顶层应用根组件（Tab 路由切换、全局状态、Toast 通知）
├── index.js                      # 模块出口
├── styles.css                    # 纯原生经典监控软件暗灰色主题样式（.cms-* 作用域隔离）
└── HANDOVER.md                   # 本文档
```

---

## 4. 关键架构与核心交互逻辑

### 4.1 全局状态流转 (`App.jsx`)
- `activeTab`: 当前活动选项卡，取值 `'device'` | `'mainView'` | `'playback'`。
- `managedDevices`: 已成功添加到客户端管理的摄像机列表。默认已连接教师机（`192.167.32.65`），支持在“设备管理”中扫描并添加学生机（`192.167.32.66`）。
- `toastMessage`: 统一的拟真操作系统 Toast 反馈。

### 4.2 设备管理页面 (`DeviceManagementView.jsx`)
- **上半部 (Device for Management)**：已管理设备表格，支持高亮选中行、删除、双击直达预览。
- **下半部 (Online Device)**：局域网在线设备表格。
  - 点击 `Start search` 触发扫描定时器，扫描完成后展示两台在线 CV870。
  - 选中表格行后，行背景变为经典 Windows 蓝色高亮（`#0078d7`）。
  - 点击 `+ Add to client` 调起 `AddClientModal`，确认后将摄像机推入已管理列表。

### 4.3 主监控与标定页面 (`MainView.jsx`)
- **左侧边栏模式切换 (`sidebarMode`)**：
  - `'ptz'` (监控模式)：设备树多码流菜单、8 方向云台盘、焦距/光圈、预置位、`Start` / `Stop` 跟踪、`Settings` 按钮进入设置模式。
  - `'settings'` (标定模式)：包含 `Basic1`（区域标定与硬件校准）与 `Basic2`（跟踪行为参数）。
- **关键规则（标定前必须停止跟踪）**：
  - 手册严格要求在画框和调镜头前点击 `Stop` 停止算法，否则算法会自动重写镜头位置。
- **画布鼠标交互式绘制 (`Interactive Drawing Canvas`)**：
  - 在 1 分屏模式下，切换对应工具（`activeDrawTool`）后鼠标变为 `crosshair` 准心。
  - 按住鼠标左键拖拽即可在视频上直接绘制/更新矩形框，生成对应带标签的画框：
    - 绿色框：`Lecturer Area`（教师走动活动区）
    - 红色框：`Blocking Zone`（讲台桌椅/窗外反光屏蔽区 1~8）
    - 蓝色框：`Preset Zone`（讲台特写预置位 1~4）
    - 黄色框：`BLS Zone`（黑板书写板书区 1~4）
- **微调弹窗与校准**：
  - `CloseUpSettingsModal`：点击预置位或黑板 `Set` 触发，支持在特写视频上调整 Zoom 和 Pan 并一键锁定。
  - `DualCmosModal`：点击 `Pos correct` 触发，模拟双目传感器由于物理安装差异造成的偏移，支持像素级对齐并归零。

### 4.4 辅助向导抽屉 (`GuideAssistantDrawer.jsx`)
- 作为非侵入式悬浮控件存在于界面右下角（胶囊按钮）。
- 点击展开侧边抽屉，可查看 PDF 手册中的 12 个标准配置步骤。
- 提供 `Auto Fill Standard` 按钮，一键快速填装标准参数并自动跳转。

---

## 5. 项目主工程集成点

如需检查或调整模块与主工程的集成：
1. **URL 参数路由**：[`src/main.jsx`](file:///D:/Github/IQ/Q-NEX-mockup_generator/src/main.jsx)
   ```javascript
   const viewParam = urlParams.get('view');
   if (viewParam === 'cv870') {
     const Cv870App = (await import('./mockups/cv870-tracking/App.jsx')).default;
     return <Cv870App />;
   }
   ```
2. **LCS 录播触摸屏顶栏按钮**：[`src/mockups/lcs-landscape/components/shell/SimPanel.jsx`](file:///D:/Github/IQ/Q-NEX-mockup_generator/src/mockups/lcs-landscape/components/shell/SimPanel.jsx)
   - 包含 `<button onClick={() => window.open('/?view=cv870', '_blank')}>CV870 Setup</button>`。
3. **独立环境配置**：
   - 根目录下有 [`.env.cv870`](file:///D:/Github/IQ/Q-NEX-mockup_generator/.env.cv870) 与 `package.json` 中的 `dev:cv870` 脚本。

---

## 6. 后续可扩展建议

- **模拟 RTSP/WebRTC 真实视频**：目前视频画面采用 `src/assets/` 下的高清录播抓帧图（`classroom_feed.png` 等），后续如接入实际视频流，只需替换 `<img className="cms-viewport-bg" />` 为 `<video>` 标签。
- **配置导出/导入**：可在 `MainView.jsx` 中增加导出 JSON 配置文件的功能，方便直接烧录进摄像机实际配置文件中。
- **与 LCS Web 后台联动**：LCS Web 端后台跟踪调试页 (`src/mockups/lcs-web/components/settings/TrackerSettingPage.jsx`) 中的 UDP 端口及协议（8645/8642）可与此客户端做状态联动。
