# LCS-WEB 多语言 (i18n) 架构与厂商翻译校验移交文档 (Handover Document)

本文档面向后续接手本项目的所有 AI 智能体 (Agent)、开发人员及产品质量团队，旨在详细说明 **LCS-WEB** 系统的多语言架构实现方式、各页面 JSON 字典的维护标准，以及**针对现有固件与 Web UI 中翻译缺陷的详细校验反馈表**。

---

> [!IMPORTANT]
> ### 🚨 核心开发与 AI Handover 铁律 (Strict Screenshot Fidelity Rule)
> 1. **严禁擅自脑补/意译中文**：对于用户尚未提供中文截图的页面，**严禁 AI 擅自翻译成汉语**。必须严格以用户后续同步的实际固件/Web 页面截图为唯一依据进行 1:1 录入。
> 2. **真实原貌溯源原则**：由于本项目核心目的之一是“**精确还原当前录播产品原始形态 -> 整理出存在缺陷/翻译不通顺的具体位置 -> 截图向厂商提出明确整改需求**”，因此任何非截图来源的臆造翻译都会破坏问题溯源与厂商沟通的准确性。
> 3. **工作流标准**：
>    - **第一步（原样录入）**：接收用户截图，按截图 1:1 还原原有英文与原有中文词条（保留原汁原味的拼写和用词）。
>    - **第二步（缺陷校验）**：在本文档第 2 节校验报告中记录缺陷原因，并输出专业修正建议。



## 1. 多语言架构设计 (Architecture Overview)

### 1.1 设计目标
- **视图与语言完全解耦**：所有中英文文本、提示语、表头、按钮文案均抽离至独立 JSON 字典文件中。
- **页面独立维护**：为 24 个以上功能页面及全局通用区域建立独立 JSON 文件，便于按页面独立校验与增量翻译。
- **即时响应式切换**：在 **系统设置 (System Setting) -> 语言设置 (Language Setting)** 中切换 `English` 或 `Chinese` 时，全局组件实时响应更新，无需刷新页面，且布局、数据状态与交互逻辑保持严格稳定。
- **状态持久化与 URL 联动**：语言设置通过 `localStorage('lcs_web_lang')` 持久化，并支持 URL 参数 `?lang=zh` / `?lang=en` 直达。

### 1.2 目录结构
```
src/mockups/lcs-web/
  └── i18n/
       ├── index.js                      # LanguageProvider, LanguageContext 与 useTranslation Hook
       ├── common.json                   # 顶栏、侧边栏导航与通用操作按钮 (OK, Cancel, Delete, Refresh 等)
       └── pages/                        # 各页面独立 JSON 字典
            ├── main.json                # 主页导播台 (状态信息, REC, LIVE, 云台, 导播模式, 布局, 视音频流)
            ├── recordings.json          # 视频管理 (详情, 播放器, 搜索栏, 视频列表, 分页)
            ├── input.json               # 输入设置 & IPC 搜索列表
            ├── output.json              # 输出设置
            ├── audio.json               # 音频设置 (增益, AEC, ANS, AGC)
            ├── subtitle.json            # 字幕设置 (预设, 字体, 静态/滚动模式, 提示)
            ├── logo.json                # 台标设置 (透明度, 位置, 提示)
            ├── titleTrailer.json        # 片头片尾 (播放时长, 启用, 预览)
            ├── osd.json                 # OSD 设置
            ├── interaction.json         # 互动设置
            ├── broadcast.json           # 广播设置
            ├── ptz.json                 # 云台设置 (通道, 协议, 串口, 波特率)
            ├── upload.json              # 资源上传
            ├── storage.json             # 存储设置 (磁盘状态, 循环覆盖, 格式化)
            ├── platform.json            # 平台设置
            ├── peripheral.json          # 外设控制
            ├── powerSupply.json         # 电源设置 (供电模式, 定时开关)
            ├── factory.json             # 恢复出厂与界面设置 (一键恢复, 配置文件导入导出)
            ├── userManagement.json      # 用户管理 (新增用户, 默认用户, 状态, 弹窗)
            ├── tracker.json             # 跟踪设置 (灵敏度, 屏蔽区, 端口与 IP)
            ├── trackerDebug.json        # 跟踪调试 (教师/学生/板书全景与特写标定, PTZ, 预置位, VISCA 参数)
            ├── record.json              # 录像设置
            ├── live.json                # 直播设置
            ├── ip.json                  # 网络设置 (DHCP, IP, 掩码, 网关, DNS)
            ├── version.json             # 版本信息 (系统版本, MCU, 内核, 序列号)
            └── guidingStrategy.json     # 导播策略 / 自动切换规则
```

### 1.3 组件接入范式 (How to Use `useTranslation`)
在任何组件中引入：
```jsx
import { useTranslation } from './i18n';

function MyComponent() {
  const { t, language, setLanguage, isZh } = useTranslation('myPageNamespace');

  return (
    <div>
      {/* 优先读取 myPageNamespace.json 中的 key，若不存在则回退至 common.json 或 fallback 文本 */}
      <h2>{t('pageTitle', 'Default Title')}</h2>
      <button onClick={() => setLanguage('zh')}>切换中文</button>
      <button onClick={() => setLanguage('en')}>Switch English</button>
    </div>
  );
}
```

---

## 2. 厂商固件与 Web UI 语言缺陷校验报告 (Translation Audit & Vendor Feedback)

> [!CAUTION]
> **厂商当前固件与 Web 端英文存在大量严重拼写错误、中式直译（Chinglish）、专业术语不规范及大小写混用现象**。以下汇总各页面的具体缺陷，并给出规范的行业标准英文与标准中文对照，供提交给固件开发厂商整改。

### 2.1 全局与导航 (Global & Navigation)
| 页面 / 位置 | 厂商当前英文 (Vendor UI) | 存在缺陷与分析 (Critique) | 行业标准英文 (Recommended) | 标准中文含义 (Chinese) |
| :--- | :--- | :--- | :--- | :--- |
| 顶栏 (Topbar) | `ShutDown` | 驼峰连写错误，应为空格分隔动词 | `Shut Down` / `Power Off` | 关机 |
| 顶栏 (Topbar) | `LogOut` | 驼峰连写错误 | `Log Out` / `Sign Out` | 注销 / 退出登录 |
| 侧边栏 (Sidebar) | `TitleTrailer` | 缺失空格，术语不标准 | `Title & Credits` / `Intro & Outro` | 片头片尾 |
| 侧边栏 (Sidebar) | `PowerSupply` | 驼峰连写且不属于纯电源供电，实为定时开关机 | `Power Management` / `Power Settings` | 电源与定时设置 |

### 2.2 用户管理 (User Management)
| 页面 / 位置 | 厂商当前英文 (Vendor UI) | 存在缺陷与分析 (Critique) | 行业标准英文 (Recommended) | 标准中文含义 (Chinese) |
| :--- | :--- | :--- | :--- | :--- |
| 表格操作列 | `Opration` | **严重拼写错误**（漏写字母 e） | `Operation` / `Actions` | 操作 |
| 默认用户输入框 | `Input Default User` | 语法不自然，为中式直译 | `Enter default username` | 输入默认用户名 |
| 密码修改按钮 | `Update Password` | 行业通用习惯应为修改密码 | `Change Password` / `Modify Password` | 修改密码 |
| 查看详情按钮 | `Check` | 直译生硬，无上下文指向 | `View Details` | 查看详情 |

### 2.3 恢复出厂设置 (Factory & Interface Setting)
| 页面 / 位置 | 厂商当前英文 (Vendor UI) | 存在缺陷与分析 (Critique) | 行业标准英文 (Recommended) | 标准中文含义 (Chinese) |
| :--- | :--- | :--- | :--- | :--- |
| 恢复卡片标题 | `Restore Default Settings` | 语法可接受，但按钮 `One-Click Recovery` 属直译 | `Factory Reset` / `Reset to Defaults` | 恢复出厂设置 |
| 恢复按钮 | `One-Click Recovery` | 灾难恢复术语混用，“Recovery”通常指数据恢复 | `Reset Now` / `Restore Defaults` | 一键恢复 |
| 导入导出提示 | `The configuration file format is .bin. Please do not modify...` | 提示语气冗长生硬 | `Supported format: .bin. Do not edit configuration files manually.` | 配置文件提示 |

### 2.4 系统设置 (System Setting)
| 页面 / 位置 | 厂商当前英文 (Vendor UI) | 存在缺陷与分析 (Critique) | 行业标准英文 (Recommended) | 标准中文含义 (Chinese) |
| :--- | :--- | :--- | :--- | :--- |
| 副屏输出项 | `The second screen film screen displays` | **严重语法错误（Chinglish 堆砌）**，重复出现 screen | `Secondary Screen: PGM Output Only` | 副屏仅显示主输出画面 |
| 定时重启项 | `Scheduled automatic restart` | 语法尚可，但描述中“to clear cache”过于口语化 | `Daily Scheduled Reboot` | 定时自动重启 |
| 倒计时提醒 | `Start recording / live countdown reminder` | 缺少连词，表达松散 | `Recording & Streaming Countdown Alert` | 录制/直播开始倒计时提示 |
| 固件升级区域 | `System Up` | **非标准术语**，Up 为介词，升级应为 Upgrade/Update | `System Upgrade` / `Firmware Update` | 系统固件升级 |
| 升级行命名 | `Server Up`, `System Up`, `AEC Up`, `License Up` | **非标准命名**，全系误用 Up 代替 Upgrade | `Server Firmware`, `System OS`, `AEC DSP Engine`, `License Activation` | 各模块升级 |

### 2.5 跟踪设置与跟踪调试 (Tracker & Tracker Debug)
| 页面 / 位置 | 厂商当前英文 (Vendor UI) | 存在缺陷与分析 (Critique) | 行业标准英文 (Recommended) | 标准中文含义 (Chinese) |
| :--- | :--- | :--- | :--- | :--- |
| 预置位设置 | `Set Preset View` | 模糊不清，未区分“设置”与“调用” | `Save Preset Position` | 保存预置位 |
| 全景位设置 | `Set Full View` | 表达不准确 | `Set Panorama Position` | 设置全景预置位 |
| 屏蔽区关闭按钮 | `Close` | 语义错误，该按钮实际功能为“清除所选屏蔽区” | `Clear` / `Remove Area` | 清除屏蔽区 |
| 参数字段名 | `FullCameraAngle` | 驼峰连写无空格，不符合 Web 表单规范 | `Panorama Camera Angle` | 全景相机倾角 |
| 参数字段名 | `StableMode` | 连写无空格 | `Anti-Shake Mode` / `Stabilization` | 防抖稳定模式 |
| 参数字段名 | `BlackboardDelayTime` | 连写且啰嗦 | `Blackboard Switch Delay (s)` | 板书跟踪切换延迟 |
| 参数字段名 | `FullCameraCorrectParam` | 语法错误，Correct 为动词，应用 Correction | `Panorama Correction Parameter` | 全景相机校正参数 |

### 2.6 输入设置 (Input Setting)
| 页面 / 位置 | 厂商当前英文 (Vendor UI) | 存在缺陷与分析 (Critique) | 行业标准英文 (Recommended) | 标准中文含义 (Chinese) |
| :--- | :--- | :--- | :--- | :--- |
| 输入源占位符 | `Please select or enter` | 缺少宾语，首字母大小写混杂 | `Select or enter stream URL` | 请选择或输入流地址 |
| 音频开关 | `RTSP audio input` | 大小写混杂 (首字母大写与后续小写) | `RTSP Audio Input` | RTSP 音频输入 |
| 音频开关 | `Digital audio input` | 大小写混杂 | `Digital Audio Input` | 数字音频输入 |

### 2.7 上传与存储设置 (Upload & Storage Setting)
| 页面 / 位置 | 厂商当前英文 (Vendor UI) | 存在缺陷与分析 (Critique) | 行业标准英文 (Recommended) | 标准中文含义 (Chinese) |
| :--- | :--- | :--- | :--- | :--- |
| 上传模式 | `Standard ftp upload` | FTP 协议名小写且混排 | `Standard FTP Upload` | 标准 FTP 上传 |
| 仅电影模式录像 | `Only upload movies recorded in movie mode` | 啰嗦且语义繁杂 (双重 movie 重复) | `Upload Movie Mode Recordings Only` | 只上传电影模式的录像 |
| 磁盘空间策略 | `Delete file first` / `Stop recording first` | 直译生硬，无动作主语与适用条件说明 | `Auto-Delete Oldest Recordings` / `Stop Recording on Full Disk` | 删除文件优先 / 停止录制优先 |
| 存储路径状态 | `(Available)` / `(Opened)` | 状态描述模糊，`(已开启)` 直译为 `Opened` 属语法错误 | `(Enabled)` / `(Active)` | (已开启) |

### 2.8 导播策略 (Guiding Strategy)
| 页面 / 位置 | 厂商当前英文 (Vendor UI) | 存在缺陷与分析 (Critique) | 行业标准英文 (Recommended) | 标准中文含义 (Chinese) |
| :--- | :--- | :--- | :--- | :--- |
| 表头列 | `Whether to participate in switching` | 严重中式直译，表头过宽过长 | `Enable Switching` / `Include in Switch` | 是否参与切换 |
| 停留时间 | `Stay time(s)` | 连写且非广电专业术语 | `Dwell Time (s)` | 停留时间 (s) |
| 画面过渡 | `Screen transition` | 大小写不规范，建议布尔命名 | `Transition Effect` | 画面过渡 |
| 多策略条件 | `Blackboard detection requires teacher detected simultaneously` | 缺少介词与助动词，表达生硬 | `Require Teacher Detection for Blackboard Switch` | 板书检测要求同时检测到教师 |

---

## 3. 后续扩展指南 (How to Add New Locales & Pages)

1. **添加新页面**：
   - 在 `src/mockups/lcs-web/i18n/pages/` 下新建 `newPage.json`。
   - 分别在 `"en"` 与 `"zh"` 键下写入相应翻译文本。
   - 在 `src/mockups/lcs-web/i18n/index.js` 的 `dictionaries` 对象中引入该 JSON。
   - 在页面组件中使用 `const { t } = useTranslation('newPage');`。

2. **添加新语种（如日语 ja、西语 es 等）**：
   - 在 `common.json` 及所有 `pages/*.json` 中增加 `"ja"` 或 `"es"` 对象并填入对应翻译。
   - 在 `src/mockups/lcs-web/i18n/pages/system.json` 的语言下拉选项中加入新语种。
