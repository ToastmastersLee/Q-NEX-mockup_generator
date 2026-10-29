# V2 下拉单与说明补充（2026-10-29）

以原版 `docs/lcs-web-audit/device-options.json` 的 LCS810(i) / 5.0.1 实机记录确定选项及顺序，以用户指定 Excel 的 C 列中文、E 列审定英文（空白时采用 D 列）确定客户文案。Excel SHA-256 与 `source.json` 一致，1476 个词条均未重新解释；待确认备注不当作已批准译文。

## 本轮对应清单

| 原版证据 / 页面 | V2 修正 | 验证方式 |
| --- | --- | --- |
| Output | UVC 独立 7 源；HDMI1 2 种分辨率、HDMI2 1 种；HDMI 内容及 UVC 分辨率只读 | 双语渲染比对、浏览器选择 |
| Output Display | 16 个完整矩阵名称，288px 控件、完整名称提示；增加转换说明 | 顺序比对、浏览器切换、布局测量 |
| Output Audio | 按采集状态禁用未启用输入的 RTSP / 数字混音勾选 | 源码核对；其他输入条件仍待实机验证 |
| Subtitle / OSD | 字号 9–14；黑白红绿蓝顺序；保留 V2 左右滚动模式 | 中英文选项比对 |
| Record | MOV、完整 7 档码率、分通道分辨率/帧率、分段与时长；对应摄像机参数只读 | 各通道逐项比对 |
| Live | RTMP / HLS / RTMP Push / RTMPS Push，4 档码率、30/25fps | 各通道逐项比对 |
| Interaction | 5 档分辨率、完整来源、第二通道排除 PGM、SIP 3 档、4/9 分屏、0–4 麦克风 | 双语比对，FUD→FHD、HD-→SD 严格按 Excel |
| IP / System | 补移动网络、94 个时区、日期格式及超时顺序；4 种未实现语言保留禁用 | 双语比对、时区布局测量 |
| PTZ | Visca / Onvif / Visca over IP；UDP / TCP / COM；Onvif 通讯方式禁用 | 双语比对、浏览器条件切换 |
| Upload | “关闭”归入上传方式，模式保留 4 项；保留定时开始时间及持续时间 | 浏览器展开和定时字段检查 |
| Platform / Peripheral | NAT 顺序、TCP/UDP；键盘 6、面板 2、时钟 3、电源 2 种型号；端口 none/RS232 | 双语比对 |
| Power | 3 种模式，移除无实机依据的保持断电；保留 Excel 的 HDMI 信号开机表述 | 双语比对 |
| Tracker / Calibration | TCP/UDP、地址 1–7；教师/学生各 13 个型号、串口/网络、地址 1–8、波特率及灵敏度列表 | 双语比对；灵敏度中文为补充译文 |
| Guiding Strategy | 按来源顺序排列、优先级 1–6、全景优先级只读、未启用过渡时下拉禁用 | 双语比对；V2 板书排除规则保留 |
| Input / Audio | 输入类型控制 IPC/USB 选择状态；RTSP 动态列表不伪造设备；降噪上限 5、扩声关闭时反馈抑制禁用 | 源码和渲染核验 |

## 保留的 V2 差异和边界

- PGM、Content 1/2、Teacher Wide、Director Interface 等继续使用 Excel 客户文案，未复制原版不自然的英文。
- V2 已有的 Kanit-Regular 字体有 Excel 词条，继续保留；本次实机采集只显示另外 5 种字体，不能声明这第 6 项实机已核验。
- 板书源的既有客户限制、历史板书调试界面、用户管理弹窗、抠像弹窗继续保留，不据单次采集删除整块功能。
- 当前值是预览示例，未作为出厂默认值。保留 V2 的脱敏示例，未导入真实 RTSP 地址、凭证或动态设备列表。
- 新增说明文字及灵敏度中文记入 `supplementary/` 并注明来源边界。时区沿用原版完整名称；未声称获得实机中文时区证据。
- 只读状态针对采集配置。其他输入启用后的混音状态、硬件相关分支仍按原版核对记录列为待确认；此网页不连接实机。

## 校验与维护

`validation/original-alignment-baseline.json` 固定本轮开始时原版 108 个文件哈希；`verify.mjs` 用它保证本轮不改原版。`legacy-baseline.json` 是 2026-10-28 的 107 文件历史快照，未重写。`docs/lcs-web-audit/v2-baseline.json` 也仍是原版对齐阶段的历史 V2 快照，不能在本轮 V2 更新后当作现行不变断言。

```powershell
python scripts/lcs-web-v2/generate_catalog.py
npm run check:lcs-web-v2
python scripts/lcs-web-v2/verify-options.py
npm run build:lcs-web-v2
```

`validation/option-parity.json` 记录双语 29 个页面及弹窗的 960 项检查；`alignment-lint.json` 记录修改组件的 ESLint。浏览器 DOM/布局记录见 `alignment-browser.json`。Chrome 原有缩放使窄屏测量实际为 1365×768，另测 1920×1080；未冒充精确 1366×768。本地截图接口曾超时；2026-10-30 正式网站截图已成功抽查英文输出页及中文互动页，完整分辨率截图验收仍未完成。

发布仅替换公开仓库 `q/main` 的 `lcs/` 文件。发布提交、工作流和公网 SHA-256 以 `validation/deployment.json`、`public-file-verification.json` 的本次结果为准。
