# LCS Web 原版实机核对记录

核对日期：2026-10-29。设备：`LCS810(i)`，服务版本 `5.0.1`，英文界面。
来源：用户授权访问的 `http://192.168.3.50`，通过现有 Chrome 插件读取页面 DOM、展开菜单和弹窗。未安装新插件。

本轮修正原版 `src/mockups/lcs-web`。V2 源码、翻译、文档和既有构建产物由独立的 317 文件 SHA256 清单保护；未发布客户站点。

## 证据范围

- [device-options.json](device-options.json)：按页整理的选项原文和顺序，是人工转录的 DOM 观察记录，不是完整原始网页导出。
- [device-current-values.json](device-current-values.json)：已观察的当前选择值和禁用状态；记录的是该设备当前配置，不能作为出厂默认值。
- [changed-files.json](changed-files.json)：原版修正文件清单。
- [verification.json](verification.json)：可重复执行的选项与 V2 哈希检查结果。
- [browser-checks.json](browser-checks.json)：浏览器检查范围和局限。
- [v2-baseline.json](v2-baseline.json)：本轮开始时的独立 V2 基线，不覆盖或更新 V2 历史旧版哈希基线。

实机仅执行导航、读取、展开。没有保存参数、切换设备协议、启动录制/直播、重启或关闭设备。密码、令牌、带凭证流地址、录制文件内容及私人配置不写入证据。原版已有的示例流凭证及 FTP、存储、SIP 示例密码已清空。

页面标题和路由先变化、控件稍后加载的现象确实存在。音频页重新等待加载后，结构与原版本地页面基本一致，先前“音频结构不同”的判断不成立。工程页面已通过可用会话读取；在设置页展开 Project 后可正常访问。独立新会话曾出现 `ErrorTypes is not defined` 的前端错误，不能据此认定密码错误。

## 按页对应清单

下表组件均位于 `src/mockups/lcs-web/components/`。已核验只指列出的英文枚举和状态，不表示整页所有功能和文案均已通过实机验收。

| 实机导航/证据键 | 本地控件 | 核对及修正结果 | 待确认范围 |
|---|---|---|---|
| Main / `main` | `main/MainPage.jsx` 预设 | 已读取预设 1–5；保留现有交互 | 导播切换、录像/直播及隐藏视频设置分支 |
| Recordings | `recordings/RecordingsPage.jsx` | 已只读查看加载完成的文件页；有关键词、起止日期和页码，无 `.el-select` 枚举 | 播放、编辑、下载、删除及完整布局差异；不复制设备文件清单 |
| Subtitle / `subtitle` | `settings/SubtitleSettingPage.jsx` | 已修正字体 5、字号 6、颜色 5、模式 3 项及顺序 | 其他预设内容、位置和中文原文 |
| Logo / `logo` | `settings/LogoSettingPage.jsx` | 已查看，当前页无下拉枚举；保留 | 上传、各预设及条件分支 |
| TitleTrailer / `titletrailer` | `settings/TitleTrailerSettingPage.jsx` | 已查看，当前页无下拉枚举；保留 | 上传、各预设及条件分支 |
| OSD / `osd` | `settings/OsdSettingPage.jsx` | 已修正 5 色及 Date+Time / Date / Time | 各显示组合与位置 |
| Record / `record` | `settings/record/RecordChannelTable.jsx`、`RecordScheduleTable.jsx` | 已修正 MOV、7 档码率、各通道分辨率/帧率、H264/H265 顺序、分段 7 项、最长时长 9 项；相机编码参数按观察禁用 | 启用/禁用其他录制配置后的状态、定时动作 |
| Live / `live` | `settings/LiveSettingPage.jsx` | 已修正 4 协议、4 档码率、2 帧率；Film1 当前协议为 RTMP Push | 改协议后的推流字段和真实推流动作 |
| Video Matting / `videomatting` | `settings/VideoMattingSettingPage.jsx` | 已查看，主页面无下拉枚举；保留 | 抠像弹窗、标定和参数变更 |
| Interaction / `interaction` | `settings/InteractionSettingPage.jsx` | 已修正 UHD/UD/FUD/HD/HD-、各输出列表、4/9 分屏和麦克风数量；初始化已核验的 FUD 当前值 | 其他模式、SIP 条件和实际呼叫 |
| Broadcast / `broadcast` | `settings/BroadcastSettingPage.jsx` | 实机当前动态分组列表为空；不当作固定枚举 | 设备分组、搜索及广播操作 |
| IP / `ip` | `settings/NetworkSettingPage.jsx` | 修复错误翻译命名空间；已修正 Wired Network / Wi-Fi / Mobile Network | Wi-Fi/移动网络选中后的字段；本地 Ping 仍为演示 |
| System / `system` | `settings/SystemSettingPage.jsx`、`device-timezones.json` | 已补 94 个时区、2 种日期格式、2 种时间格式、5 种锁屏时长和 6 个语言名称；加宽时区控件 | 原版仅实现中英文，其余 4 个语言名称显示但禁用，不能称为实机语言功能完全一致 |
| Version / `version` | `settings/VersionPage.jsx` | 读取型号与服务版本用于标识证据版本；无下拉枚举 | 版本页其他字段不作设备参数快照 |
| Project → Input / `input` | `settings/InputSettingPage.jsx` | 输入模式对应的非活动控件禁用；移除带凭证示例地址和虚构固定流选项；保留 RTSP 手工输入 | RTSP/IPC/USB 为动态列表；当前不导入设备流地址，未实现实时发现和完整远程列表 |
| Project → Output / `output` | `settings/OutputSettingPage.jsx` | 已修正 HDMI1 2 档、HDMI2 1 档；HDMI 内容 2 项且禁用；UVC 独立 7 项内容 | 其他设备/信号状态下的禁用条件 |
| Output → Display Settings | `settings/modals/DisplaySettingsModal.jsx` | 已补完整 16 项 Color Matrix，保留实机 `_TO_` 名称及顺序；初值 BT601FULL_TO_BT601FULL；加宽控件 | HDMI2 与其他标签页参数逐项对比尚未覆盖 |
| Output → Audio Setting | `settings/modals/AudioSettingsModal.jsx` | 按已读状态禁用 RTSP/Digital 中除 Teacher 外的混音项 | 是否随设备音频输入状态变化、HDMI2 差异 |
| Project → Audio / `audio` | `settings/AudioSettingPage.jsx` | 保留 Audio mode in/out、AllByPass、LocalAmplify、FeedbackSuppression、AnsLevel 原文；AnsLevel 0–5；扩音关闭时反馈抑制禁用 | 更换音频模式后的条件、声音实际处理 |
| Project → PTZ / `ptz` | `settings/PtzSettingPage.jsx` | 已补 Visca / Onvif / Visca over IP 以及 UDP / TCP / COM；保留此前观察的 Onvif 传输禁用规则 | 当前实机均为 Visca/UDP；未切换实机验证该条件 |
| Project → Upload / `upload` | `settings/UploadSettingPage.jsx` | 已补 close，保留 4 项方式及 4 项模式原文 | 改模式后的字段和真实上传 |
| Project → Storage / `storage` | `settings/StorageSettingPage.jsx` | 已核对 Local Path / Network Path；私人连接值留空 | 网络路径授权、保存和容量状态 |
| Project → Platform / `platform` | `settings/PlatformSettingPage.jsx` | 已修正 NAT 为 Open / Close 顺序；Transmission 为 TCP / UDP | 注册和平台接入状态 |
| Project → Peripheral / `peripheral` | `settings/PeripheralSettingPage.jsx` | 已补键盘 6、面板 2、时钟 3、电源 2、端口 2 项及顺序 | 各型号对应波特率与设备动作 |
| Project → PowerSupply / `power` | `settings/PowerSupplySettingPage.jsx` | 已修正 3 种供电模式；修复命名空间；Timing switch 1/2、PowerOn/PowerOff 用实机原文 | 定时动作和切换供电模式后的条件 |
| Project → Factory / `factory` | `settings/FactorySettingPage.jsx` | 已核对 Default / Classic；保留原文 | 切换界面、恢复、升级等动作不执行 |
| Project → User Management / `usermanagement` | `settings/UserManagementPage.jsx` | 已查看，主页面无下拉枚举；保留 | 新增/编辑用户弹窗和权限组合 |
| Project → Tracker / `tracker` | `settings/TrackerSettingPage.jsx` | 补 Protocol 4、TCP/UDP 顺序、地址码 1–7 | 协议变化后的字段和跟踪动作 |
| Project → GuidingStrategy / `guidingstrategy` | `settings/AutomaticSwitchingRulesPage.jsx` | 补 8 画面、Default 过渡画面和优先级 1–6；保留禁用当前值 7/8；关闭过渡时禁用过渡画面 | 其他自动策略和组合触发行为 |
| Project → TrackerDebug / `trackerdebug` | `settings/tracker-debug/*DebugCard.jsx` | 补教师/学生 13 型号、RS232、AMA/TCP、地址 1–8、9600/115200、5 档灵敏度 | 空选项占位用本地提示；检测区域、标定、镜头/PTZ 操作未执行 |

UVC 分辨率实机选项列表为空、当前值为禁用的 Self-adaption；本地使用一个禁用展示项表示当前值，不把它算作可选择的硬件分辨率。

## 复核与构建

在仓库根目录执行：

```powershell
& C:/Users/jackding/Miniconda3/python.exe -X utf8 scripts/verify_lcs_legacy.py
npm run build:lcs-web -- --outDir dist/lcs-web-audit
npm run dev:lcs-web -- --host 127.0.0.1 --port 5191 --strictPort
```

预览：`http://127.0.0.1:5191/?page=output&lang=en`。如 5191 被已有本次预览占用，直接使用现有服务即可。

验证工具通过 Vite 在本机服务端渲染原版组件，再由 Python HTMLParser 比较实际输出中的选项数量、原文、顺序、当前值及禁用状态，并逐文件复核 V2 哈希。它不访问实机、不安装依赖、不更新基线；也不验证浏览器布局、交互后状态、自定义菜单、中文和硬件行为。

浏览器最终复查了 28 页 × 2 个实际 CSS 内容区尺寸：1920×1080、1365×768，共 56 次，没有渲染错误、损坏图片或页面横向溢出。Chrome 当前缩放使整数视口对应 1365 或 1367 像素，因此选了更窄的 1365；不把之前仅按请求尺寸执行的检查当作精确尺寸验收。矩阵宽度已确认 288 像素，时区约 512 像素；上传长选项未超出可用区域。截图工具多次超时，精确 1366×768 和最终截图视觉验收仍待完成。已恢复临时视口设置。

本地 UVC 独立选择、扩音/反馈抑制联动、PTZ 协议/传输联动、上传方式/模式展开均已验证。改变的本地条件已恢复，实机参数没有变化。修改过的 JSX 通过定向 ESLint；整个原版目录仍有未改文件中的历史 lint 问题（多余 React 导入及 TimePicker 的 effect 规则），不宣称全目录 lint 已通过。

构建输出单独放在 `dist/lcs-web-audit`，避免原有默认构建清空共享 dist 目录而影响 V2。原项目为多模拟器入口，因此产物仍包含其他模拟器的代码块，不代表这些模拟器已修改。

最终构建通过（存在原项目大代码块提示）；694 项自动断言通过，其中包括 V2 的 317 份文件哈希。构建完成后再次确认 V2 哈希无变化。

## 验收边界

未完成核验的中文、其他语言、动态设备数据、全部逐字标签和条件分支不能宣称与实机完全一致。现有无证据的本地功能保留并在本表登记。原版完成上述范围的修正后，V2 功能同步和客户文案仍需另行安排。
