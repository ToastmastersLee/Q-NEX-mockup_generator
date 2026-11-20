# AI 交接手册 · IQVideo 双教室互动控制台

**接手入口**　仓库 `ToastmastersLee/Q-NEX-mockup_generator`，分支 `main`，应用目录 `apps/lcs-unified-browser`。这份手册按 2026-11-20 的交接整理，已验证的实现基线为 [8a10a4e](https://github.com/ToastmastersLee/Q-NEX-mockup_generator/commit/8a10a4e920fec6eb121f8741169d5a49e2ed9828)。家里的电脑只需这个仓库和 Python 就能运行模拟课堂、开发页面和执行测试。

## 1. 项目是什么，为什么做

客户要在远程教室的两块交互平板（IFP）上同时显示主讲教师特写和课件，并询问学生能否直接开麦、录后能否双屏回看。售前需要能当场演示，也需要能说清每一项结论是怎么验证的。

这个应用最初用于从两台录播统一检索各自存储的录像。现在同一个网页也能指定哪层楼主讲、让另一端加入、在课堂中切换两路发送源，并查看听课端实际收到的视频。必须退出课堂才能生效的设置可以攒在一起，一次应用并重开。现场人员因此可以在一台电脑操作和监看。涉及实体屏接线、教室音箱或有人真实讲话的验收，仍需要现场观察。

## 2. 在家接手，先跑通一次离线演示

在有仓库读取权限的 Windows 电脑上执行。已有检出可直接进入应用目录，无需使用公司的 D 盘路径。首次安装需要网络，Python 版本为 3.11 或更高。

```powershell
git clone https://github.com/ToastmastersLee/Q-NEX-mockup_generator.git
Set-Location .\Q-NEX-mockup_generator\apps\lcs-unified-browser
# 如果 Miniconda 不在脚本默认位置，在已激活的 Python 环境里指定解释器
$env:LCS_DEMO_PYTHON = (Get-Command python -CommandType Application).Source
& $env:LCS_DEMO_PYTHON --version
.\start.cmd --setup
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
.\start.cmd
```

打开[中文离线控制台](http://127.0.0.1:8088/?mode=demo&lang=zh)。交接基线有 11 项自动测试。离线模式使用仓库内的两个 MP4 样片，无需录播、FFmpeg 或公司电脑的 `config.local.json`。其他操作系统可在同一目录用 Python 创建虚拟环境、安装 `requirements.txt`，再执行 `python app.py`；本项目实测平台为 Windows + Edge。

**第一次验收按这条路线走完：**

1. 选三楼主讲并开课。一楼应进入同一课堂，出现 OUT1 和 OUT2 的接收分配。
2. 给一楼 OUT1 选「电脑2」、OUT2 选「教师特写」，再只把 OUT2 改成「学生全景」。核对 OUT1 选源保持为电脑2。模拟样片用于操练流程；视频内容是否确实来自指定摄像机，要在真机验收。
3. 在设置中修改默认开麦数和发言方全屏，点「应用并重开」，检查角色、参会状态和设置回读。再试一楼主讲。
4. 打开录像库，搜索 `Lecture2.mp4`，进入同一堂课，和 `Teacher_C.mp4` 配对。一起播放、暂停和跳转，只保留一路声音。切到英文或法文再走一次演示。
5. 结束模拟课堂。若随后切到真机，先读取两台设备的当前状态。家里页面的 `127.0.0.1` 始终指向家中电脑；它不会连接公司电脑上已启动的服务。

## 3. 代码从哪里读，改动怎么验

普通首页默认进入真机模式。在家练习请使用上面的离线演示链接。Windows 上用 `start.cmd` 启动本机网页服务，双击 `end.cmd` 关闭服务。结束设备上的课程使用网页中的「结束课堂」。

用户要远程开录播时，在已配置的离线教室点「请求开机」。本地 TCP 6558 的电源命令为 `0x3105`，开机参数为 `power=2`。截至本次交接，已覆盖请求和回执处理，现场软关机后的网络可达性仍待验证。验收时分别记录待机是否持续供电、是否收到命令回执、设备何时恢复在线。协议来源见 [README](./README.md)。

| 要处理的问题 | 入口 | 验证要点 |
|---|---|---|
| 开课、重开、角色、切源、开麦、录制 | [classroom.py](./classroom.py) 的 `Desk` 编排流程，`DemoRecorder` 提供模拟设备；[recorder.py](./recorder.py) 调真机，[protocol.py](./protocol.py) 处理 TCP 包 | 一端加入失败后可只重试该端；设置更新保留其余原值。见 [课堂测试](./tests/test_classroom.py)。 |
| 首页、选源器、操作反馈、语言 | [console.js](./static/console.js)、[console-i18n.js](./static/console-i18n.js)、[console.html](./static/console.html) | 新控件同时走 demo/live，补齐中英法。用返回的设备状态更新控件。 |
| 两楼本地预览与接收端 OUT 监看 | [classroom_media.py](./classroom_media.py)、[monitor.js](./static/monitor.js) | PGM 和互动通道用当前固件的厂家播放器；接收端由服务端按布局取 RTSP，用 FFmpeg 转成网页监看帧。核对视频时间刷新、断流提示、关闭页面释放资源。见 [预览测试](./tests/test_preview.py)。 |
| 检索、同课多文件、双路回放 | [catalog.py](./catalog.py)、[app.py](./app.py)、[library.js](./static/library.js) | 按设备和目录配对，同名文件可以来自不同楼层。保留 Range 播放和跳转；旧只读页入口为 `/library`。见 [目录与播放测试](./tests/test_integration.py)。 |

前端通过 `GET /api/classroom?mode=demo|live` 读状态，通过 `POST /api/classroom/action?mode=demo|live` 提交操作。字段约定以 `classroom.py` 的 `Command` 为准。例如模拟「三楼主讲时切一楼左屏到课件」，在开课后向 demo 端点发送：

```json
{"action":"route","host":"a","room":"b","port":1,"value":2}
```

这里 `a` 始终指三楼、`b` 始终指一楼；`host` 是本堂课的主讲端，`room` 是要改变的接收教室，`port` 是实体 OUT 编号，`value` 是发送端的源通道。这四个值不可互换。新功能首先用 demo 和相应测试覆盖，再在实验室核对实机。

## 4. 到实验室怎样把画面验实

设备地址、启动方法和录像样本见 [README](./README.md)。真机控制从实验室电脑本机打开，配置从 [模板](./config.example.json) 复制到已被 Git 忽略的 `config.local.json`。实际凭据留在该机。2026-11-19 联测使用三楼 LCS810(i)、一楼 LCS810 Pro(i)，两端固件均为 `8.1.702-release-ss528v100`，互动服务在三楼录播上。

| 现场问题 | 看什么，再做什么 |
|---|---|
| 今天是否已经开课、录制？ | 先读 `/api/classroom?mode=live` 的 `online`、`host`、`sameClass` 和各端 `record`。同一堂课只缺听课端时使用「重新加入」。结束或重开前查看录制影响。 |
| 切了源，怎么确认是哪块屏？ | 主讲端 `0x4409/0x440B` 切两路发送源，`0x440A/0x440C` 回读。听课端 `0x4403` 给出布局，`0x4414` 按对端账号提供实际接收流。已核对的一楼接线为 OUT1 左屏、OUT2 右屏；双屏互动中第二路发送流到左屏，第一路到右屏。查看两张 OUT 卡的实时帧，再让课件翻页、教师移动，分别辨认。 |
| 左屏有更新时间，却只有灰色图标？ | 检查**主讲端输入信号**。现场曾出现两路接收都在刷新，但三楼两个 HDMI 都报 `No Signal`。打开课件端后，`0x3150` 显示「电脑2」恢复 1920×1080@60，一楼左屏随即看到该电脑的浏览器；要演示幻灯片，还要在该电脑上进入放映。 |
| 加入时返回 `uvc occupied`？ | 上次一楼机身仍停在文件回放页。现场点 Exit 回导播首页后，一楼成功加入。先检查机身当前用途，保留仍正常的主讲课堂。 |
| 楼层离线或地址返回了其他网页？ | 核实供电、设备型号及固件，重新读取状态后再发控制命令。上次三楼开机后恢复。原地址出现跳转时，不要把跳转目的地直接登记为新录播。 |

**最近一次现场读数（2026-11-19）**：三楼主讲，一楼 OUT1 收三楼电脑2，OUT2 收教师特写，两路均取得实际视频帧。三楼默认开麦数已恢复为 0，「发言方全屏」「显示本地视频」均关闭。当时三楼正在录制。接手当天的状态应重新读取。

## 5. 哪些可以向客户演示，哪些继续验证

| 议题 | 已有结论 | 下一次验收 |
|---|---|---|
| 互动双屏 | 三楼与一楼均可主讲。三楼主讲时，一楼两块实体屏已核实可分别显示教师和课件；会中可独立切源。反向课堂已读到三楼的双路接收分配。 | 核对三楼两个实体接口的左右接线，用真实翻页和讲话观察双屏时差及教室放音。 |
| 默认开麦与发言 | 当前固件可选默认开麦数 0–4；设为 4 时，一间听课教室入会自动解除静音。主讲端可授予和收回发言权。 | **声音自动触发全屏仍待验证。** 启用发言方全屏，分别观察「学生已开麦直接讲话」和「老师点名」。有多个可辨认的画面时更易判断。记录主讲端前后画面、发言状态及现场是否听到声音。 |
| 录后双路回放 | 网页能同步操作同一课目录的两份 MP4。短时抽查两路均为 1080p，已完成播放、暂停和跳转。机身文件页选第二份录像时，一楼两块屏一起跟随所选文件，右侧带文件列表。 | 用完整课时验证同步与音轨。现有接口资料未找到可把两份录像各自指定给一个机身 HDMI 的命令；文件回放期间资源全屏命令返回 200，实体屏仍跟随机身播放器。 |
| 扩到客户规模 | 当前实测覆盖两间实验室教室、内置互动服务和本地录像浏览。 | 50–100 间教室、独立 YS400、跨校网络以及客户数字图书馆的自动归档，需分别验证后再对外承诺。 |

如需还原客户原话、查看现场照片或查厂家参数，可从有权限的账号打开[项目咨询记录](https://github.com/ToastmastersLee/Q-NEX_PreSale/blob/main/林萍娜/科特迪瓦/Ediattah/phase2-300套教室互动方案/科特迪瓦_SMARTCLASSROOM.CI_售前咨询与跟进.md)、[双机实测记录](https://github.com/ToastmastersLee/Q-NEX_PreSale/blob/main/林萍娜/科特迪瓦/Ediattah/phase2-300套教室互动方案/LCS810-双机互动验证/双机互动验证.md)和[厂家接口资料](https://github.com/ToastmastersLee/QNEX/tree/main/Q-NEX_PRD/Q-NEX_API/LCS-API)。离线开发所需的代码、样片和测试均在本仓库。
