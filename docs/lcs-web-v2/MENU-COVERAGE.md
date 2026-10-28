# 菜单覆盖、补全依据与待确认项

2026-10-28。以下按现有导航顺序记录；所有 28 个页面均已接入新版中英文并通过两种尺寸检查。覆盖页面不表示已实现真实设备功能。

| 菜单 | 已处理 | 补全／边界 |
|---|---|---|
| Home | 状态、PGM、通道、模式、叠加、PTZ、转场 | 叠加下拉值与文案分离；Semi-auto 保持短标签；预置位 Recall |
| Recordings | 搜索、元数据、操作、播放状态 | 原演示文件保留；未新增 Excel 独有媒体编辑能力 |
| Text Overlays | 手动文字叠加、预设、提示 | 补 Simsun/Simkai/Simhei/Arial/SourceHanSansKR/Kanit-Regular；Static/Scroll Left/Scroll Right。来源 subtitle 对应 key |
| Logo | 所有标签、预设及四条提示 | 修复旧页整页硬编码英文；默认预设可随语言变化 |
| Intro / Outro | 两组预设、文件、时长、提示 | 合并导航名称；保存提示及预设名双语 |
| OSD Settings | 类型、颜色、位置、提示 | 保留原选项；位置提示双语 |
| Recording Settings | 通道参数、计划、混音 | 保留 MP4/TS、分段 none/30m/1h/2h、最大 4/6/8/12h。Excel 还有 10/15/20/45 分钟及 10/24 小时，但未证明各值属于哪个字段，暂未混入列表；FLV/MKV 仅有条件提示，未推断全部通道支持 |
| Streaming Settings | 通道、推流/观看地址、计划 | 短 REC/LIVE；来源名称统一；当前分辨率列表不扩充猜测值 |
| Chroma Key Settings | 场景列表及基础设置弹窗 | 补开关、Green/Blue、背景上传、阈值文字、Auto Adjust 提示；颜色在抠像开启时禁改。依据 keying.*。媒体/前景位置及 Linkage Mode 结构不明，未构造；没有真实抠像算法 |
| Interaction Settings | 发起/接收、输出、分屏、SIP | UHD/FHD/HD 按已确认词条；未凭 pending 的 UD 增添新的清晰度 |
| Broadcast Settings | 分组、成员、开始/停止 | 默认组使用固定 ID，切换语言不丢失选择；外部接收插件不可从静态站点安装 |
| Network Settings | 网络、地址与检测字段 | 修复 network 未注册；Wi-Fi 文案引用 IP.wifi。模拟检测明确不访问目标；Wi-Fi 枚举不等于实现无线扫描 |
| System Settings | 时间、NTP、其他、语言、账户、升级、日志 | 超时补 2/15 分钟，移除无原厂词条支持的旧 30 分钟选项；时区名称补全截断文字，但不臆造完整时区列表 |
| System Information | 系统信息标签 | 示例 UUID/MAC/IP 中性化，更新按钮只做预览 |
| Project → Input | 六路输入、音源、IPC 搜索弹窗 | 去掉演示凭证；空选择使用固定空值。IPC/USB 实际枚举依赖发现结果，保留空表，不伪造设备 |
| Project → Output | HDMI1/2、UVC 与两类弹窗 | 保留已见分辨率、色彩矩阵代码；Compositing 与 PGM 不合并；Film Video 图层单独映射。更多分辨率、色彩代码含义需原厂资料 |
| Project → Audio | 模式、处理、扩声、静音、增益及提示 | AllByPass 等 pending 名称保留原英文；REC 不扩写、不推断路由；不添加未显示的整套 AEC 页面 |
| Project → PTZ | 协议、通讯方式、地址与端口 | 既有枚举保留；额外串口地址/接口范围缺少证据，暂不增加 |
| Project → Upload | 路径、调度、模式、独立目录与 PGM | 补 Off、定时开始时间及持续分钟；依据 project.upload.close/startTime/duration，限制 10–1200 分钟。Idle/Continuous/Scheduled，不承诺边录边传 |
| Project → Storage | 策略、路径、容量、状态和格式化 | 明确 Delete Oldest / Stop Recording；实际磁盘清单不能由翻译表推出 |
| Project → Platform | 互动/SIP、平台与组织标签 | 本地示例地址/名称；不请求实际平台 |
| Project → Peripheral | 键盘、面板、时钟、电源标签 | 型号列表只保留原模拟数据，没有资料支持额外兼容型号 |
| Project → Power | 模式与两组计划 | 修复 power 未注册；补 Start on HDMI Signal，来源 project.powerSupply.hdmiInputPowerOn。保留旧 Stay Off 选项并登记为 mockup 补充项，未视作新证明的硬件能力 |
| Project → Factory | 恢复、配置导入/导出、界面设置 | 提示与文件名约束保留；不读取或修改真实设备配置 |
| Project → User Management | 列表与默认用户；添加/密码/详情/删除弹窗 | 原厂角色、字段与校验提示；密码不持久化，用户状态只在当前页面有效 |
| Project → Tracking | 检测、两路协议与网络参数 | 两路补 Protocol 4，来源 project.tracker.protocol4；协议细节和硬件通讯不模拟 |
| Project → Automatic Switching Rules | 默认源、优先级、停留/中间源、条件及布局 | 默认/中间源补六路现有源中的缺项；V3 明确不支持独立 Board，旧行禁用并去除 Board 源对；Staggered Windows 与 Picture-by-Picture 按最新 Excel，不按 key 字面猜测 |
| Project → Tracking Calibration | 三组原有调试卡片、保存与提示 | 原厂 autoTrackerSet 实际为源对字典，不能拿它替换摄像机几何参数；未覆盖字段在 supplementary 中登记 |

## 本轮未新增整页

登录/404/功能引导独立页、课表、Mic、工厂内部高级项，以及 113 条停用页词条对应的功能均未启用。所有原厂 key 仍保存在内部 catalog/coverage，可后续定位；客户包中没有内部审阅备注。

## 23 个原厂待确认词条

完整中文问题见各 catalog 文件的 note；以下原文未被备注中的建议覆盖。

| 原厂 key | 待确认边界 |
|---|---|
| record.conflict | 行号拼接方式及完整任务冲突提示 |
| record.lessThanSixtySeconds | 行号拼接方式与“间隔”对象，不能误作录制时长 |
| live.maxChannel | 插入数字及完整句子的拼接方式 |
| keying.linkageMode | 联动对象、模式选项和作用范围 |
| interaction.UD | UD 是否有意为独立档位 |
| basic.cloudCamera | 4K 云镜摄像机的实际技术含义 |
| ymAecSettings.dodgeValue | Ducking 数值代表音量、衰减量或其他量 |
| dwAecSettings.aecAttenuateLevel | AEC 数值的实际量与单位 |
| project.input.userName | IPC 表格的“名称”是账号还是设备名称 |
| project.output.compositing | 与 PGM 选项的实际功能区别 |
| project.output.layer0 | 电影视频层的具体范围 |
| project.output.defaultBrightness | 亮度配置含义与数值域 |
| project.output.extendedBrightness | 与默认配置的区别 |
| project.audio.JINGPING | 模式含义与适用机型 |
| project.audio.allBypass | 开关极性：启用处理还是旁路处理 |
| project.audio.recovery6 | 回采 6 的回环音频来源；不能解释成恢复功能 |
| project.audio.recovery7 | 回采 7 的回环音频来源；不能解释成恢复功能 |
| project.audio.recovery19 | 回采 19 的回环音频来源；不能解释成恢复功能 |
| project.audio.rec | REC 在外部音频路由中的含义 |
| project.PTZ.camAddr | 地址是 VISCA、串口还是其他设备地址 |
| project.PTZ.camAddrError | 适用协议和地址范围 |
| parameter.close | 不同调用处表示关闭、停止或 Off |
| parameter.open | 不同调用处表示打开、启用或 On |

## 验收边界

截图用于评审新版实际文案和布局。动态设备枚举、完整硬件支持表、服务器错误条件、真实流媒体、真实导播算法及停用功能都需要原厂资料或实机验收。不能从浏览器检查通过推断这些能力已验证。
