// Step definitions, multilingual content, checklist, and asset mappings for CV870 Tracking Guide

import img01Icon from '../assets/01_camera_cms_icon.jpeg';
import img02StartSearch from '../assets/02_start_search.png';
import img03SearchResult from '../assets/03_camera_search_result.png';
import img04AddToClient from '../assets/04_add_to_client.png';
import img05MainView from '../assets/05_main_view_close_up_panorama.png';
import img06TeacherStop from '../assets/06_teacher_camera_presets_stop.png';
import img07TargetLost from '../assets/07_target_lost_action.jpeg';
import img08LecturerArea from '../assets/08_lecturer_area_setting.png';
import img09BlockingZone from '../assets/09_blocking_zone.png';
import img10PresetZone from '../assets/10_preset_zone.png';
import img11TrackingScreen from '../assets/11_tracking_screen_close_up.png';
import img12BlsZone from '../assets/12_bls_zone_blackboard.png';
import img13LeftBlackboard from '../assets/13_left_blackboard_settings.png';
import img14RightBlackboard from '../assets/14_right_blackboard_settings.png';
import img15StudentStop from '../assets/15_student_camera_presets_stop.png';
import img16StudentBlocking from '../assets/16_student_blocking_zone.png';
import img17DualCmos from '../assets/17_dual_cmos_calibration.jpeg';
import img18PowerOnState from '../assets/18_power_on_state.png';

export const STAGES = [
  { id: 'prep', titleEn: '1. Preparation & Network', titleZh: '1. 准备与网络配置' },
  { id: 'client', titleEn: '2. CameraCMS Client', titleZh: '2. 客户端连接与取流' },
  { id: 'teacher', titleEn: '3. Teacher Tracking', titleZh: '3. 教师机跟踪设置' },
  { id: 'student', titleEn: '4. Student Tracking', titleZh: '4. 学生机跟踪设置' },
  { id: 'calibration', titleEn: '5. Calibration & Troubleshooting', titleZh: '5. 校准与排错' }
];

export const STEPS_DATA = [
  {
    id: 1,
    stage: 'prep',
    titleEn: 'Physical Connection & PC Static IP',
    titleZh: '物理网络连线与 PC 网卡静态 IP',
    summaryEn: 'Configure your PC network adapter and connect to the Video Station POE3 port.',
    summaryZh: '配置电脑有线网卡静态参数，并通过 RJ45 网线连接至录播机 POE3 网口。',
    asset: img01Icon,
    alert: {
      type: 'NOTE',
      titleEn: 'Virtual IP Environment',
      titleZh: '虚拟网段说明',
      contentEn: 'The Video Station virtual IP is 192.167.32.1. The PC must be configured on the same 192.167.32.X subnet.',
      contentZh: '录播主机虚拟 IP 为 192.167.32.1。调试电脑网卡必须处于同一 192.167.32.X 网段。'
    },
    checklist: [
      { id: 'c1', textEn: 'Set PC IP: 192.167.32.100', textZh: '配置 PC IP: 192.167.32.100' },
      { id: 'c2', textEn: 'Set Subnet Mask: 255.255.255.0', textZh: '配置子网掩码: 255.255.255.0' },
      { id: 'c3', textEn: 'Set Default Gateway: 192.167.32.248', textZh: '配置网关: 192.167.32.248' },
      { id: 'c4', textEn: 'Plug RJ45 cable into Station POE3 port', textZh: '网线插入录播机 POE3 网口' }
    ],
    interactiveType: 'network_setup',
    networkParams: {
      ip: '192.167.32.100',
      subnet: '255.255.255.0',
      gateway: '192.167.32.248',
      stationIp: '192.167.32.1',
      port: 'POE3'
    }
  },
  {
    id: 2,
    stage: 'client',
    titleEn: 'Open CameraCMS & Search Cameras',
    titleZh: '启动 CameraCMS 并搜索局域网摄像机',
    summaryEn: 'Open CameraCMS (V1.0.27.97) and click Start search to discover online cameras.',
    summaryZh: '启动 CameraCMS 工具，点击底部的【Start search】扫描在线摄像机。',
    asset: img02StartSearch,
    assetResult: img03SearchResult,
    alert: {
      type: 'TIP',
      titleEn: 'Camera IP Addresses',
      titleZh: '摄像机默认 IP 地址',
      contentEn: 'Teacher Camera defaults to 192.167.32.65, Student Camera defaults to 192.167.32.66.',
      contentZh: '教师摄像机默认 IP 为 192.167.32.65，学生摄像机默认 IP 为 192.167.32.66。'
    },
    checklist: [
      { id: 'c1', textEn: 'Open CameraCMS tool', textZh: '打开 CameraCMS 管理软件' },
      { id: 'c2', textEn: 'Click "Start search" button', textZh: '点击底部的【Start search】开始搜索' },
      { id: 'c3', textEn: 'Confirm discovered cameras in the list', textZh: '确认列表中检测到 192.167.32.65/66 设备' }
    ],
    interactiveType: 'camera_search'
  },
  {
    id: 3,
    stage: 'client',
    titleEn: 'Add Cameras to Client Device List',
    titleZh: '将发现的摄像机添加到客户端管理列表',
    summaryEn: 'Select the cameras in the search list and click "+ Add to client" -> "Add".',
    summaryZh: '在已发现设备列表中勾选摄像机，点击【+ Add to client】，在弹窗中点击【Add】。',
    asset: img04AddToClient,
    checklist: [
      { id: 'c1', textEn: 'Select target camera checkbox', textZh: '勾选目标摄像机复选框' },
      { id: 'c2', textEn: 'Click "+ Add to client"', textZh: '点击【+ Add to client】按钮' },
      { id: 'c3', textEn: 'Confirm port 5000 and click "Add"', textZh: '确认端口 5000 并点击【Add】' }
    ],
    interactiveType: 'add_to_client'
  },
  {
    id: 4,
    stage: 'client',
    titleEn: 'Add Main View Dual Streams',
    titleZh: '在主预览界面拉取特写与全景视频流',
    summaryEn: 'Go to Main View tab, right-click the camera and select close-up & panorama.',
    summaryZh: '进入 Main View 页面，右键点击摄像机设备，在菜单中选择拉取特写与全景画面。',
    asset: img05MainView,
    checklist: [
      { id: 'c1', textEn: 'Switch to "Main View" tab', textZh: '切换至【Main View】主预览选项卡' },
      { id: 'c2', textEn: 'Right-click the camera node', textZh: '鼠标右键点击设备节点' },
      { id: 'c3', textEn: 'Select "close-up & panorama" streams', textZh: '勾选并打开【close-up & panorama】画面' }
    ],
    interactiveType: 'main_view'
  },
  {
    id: 5,
    stage: 'teacher',
    titleEn: 'Stop Tracking & Basic Presets',
    titleZh: '停止跟踪与设置预置位及目标丢失动作',
    summaryEn: 'Crucial: Click Stop Tracking first! Set Preset 1 (close-up), Preset 0 (target lost), and set Target Lost Action.',
    summaryZh: '关键前置：必须先点击【Stop】停止跟踪！设置预置位 1（特写）、0（目标丢失），并在 Basic2 中指定丢失动作为 No.0。',
    asset: img06TeacherStop,
    assetSub: img07TargetLost,
    alert: {
      type: 'IMPORTANT',
      titleEn: 'Stop Tracking Before Setup!',
      titleZh: '配置前务必先停止跟踪！',
      contentEn: 'You MUST click Stop Tracking before adjusting zones or presets, otherwise tracking algorithms will overwrite manual adjustments.',
      contentZh: '在调整任何跟踪区域或镜头预置位前，必须先点击【Stop】停止跟踪，否则自动算法会干扰手动设置。'
    },
    checklist: [
      { id: 'c1', textEn: 'Click "Stop" to halt active tracking', textZh: '点击【Stop】停止当前跟踪' },
      { id: 'c2', textEn: 'Set Preset 1 as Close-up View', textZh: '设置 Preset 1 为教师特写画面' },
      { id: 'c3', textEn: 'Set Preset 0 as Target Lost Fallback View', textZh: '设置 Preset 0 为目标丢失回位全景' },
      { id: 'c4', textEn: 'Configure Settings-Basic2 Target Lost Action = No. 0', textZh: '在 Basic2 设置中确认 Target lost action 为 No. 0' }
    ],
    interactiveType: 'teacher_stop_presets'
  },
  {
    id: 6,
    stage: 'teacher',
    titleEn: 'Lecturer Area Setting (Green Rectangle)',
    titleZh: '讲台/教师活动区域绘制（绿色矩形框）',
    summaryEn: 'Draw the green rectangle covering the entire lectern/stage where the camera will track the walking teacher.',
    summaryZh: '绘制绿色矩形框，覆盖讲台与讲师所有自由走动的有效区域，完成后点击【Save】。',
    asset: img08LecturerArea,
    color: '#22c55e',
    zoneNameEn: 'Lecturer Area',
    zoneNameZh: '讲师活动区',
    defaultZone: { x: 24, y: 38, width: 70, height: 42 },
    checklist: [
      { id: 'c1', textEn: 'Select "Lecturer" zone setting button', textZh: '点击选中【Lecturer】区域配置' },
      { id: 'c2', textEn: 'Draw green rectangle over podium stage', textZh: '在画面上绘制覆盖讲台的绿色矩形框' },
      { id: 'c3', textEn: 'Click "Save" to apply', textZh: '点击【Save】保存区域' }
    ],
    interactiveType: 'draw_zone',
    zoneType: 'lecturer'
  },
  {
    id: 7,
    stage: 'teacher',
    titleEn: 'Blocking Zone Setting (Red Rectangle)',
    titleZh: '屏蔽区域绘制（红色矩形框防误触）',
    summaryEn: 'Draw red rectangles to prevent false tracking from front-row students or bright interactive screens showing faces.',
    summaryZh: '绘制红色矩形框，屏蔽前排听众学生头部及可能展示人脸的大屏幕，避免误触跟踪。',
    asset: img09BlockingZone,
    color: '#ef4444',
    zoneNameEn: 'Blocking Zone',
    zoneNameZh: '屏蔽区',
    defaultZone: { x: 30, y: 55, width: 38, height: 28 },
    alert: {
      type: 'TIP',
      titleEn: 'Screen Masking',
      titleZh: '发光屏幕遮蔽技巧',
      contentEn: 'If the classroom interactive display shows avatars or videos of faces, draw a blocking box over it. This will not interfere with teacher tracking.',
      contentZh: '若教室大屏播放带有人脸的课件或视频，建议在屏幕位置画屏蔽红框，这不会影响教师走入该区域时的正常跟踪。'
    },
    checklist: [
      { id: 'c1', textEn: 'Select "Blocking zone 1"', textZh: '选中【Blocking zone 1】' },
      { id: 'c2', textEn: 'Draw red box over front row / interfering screen', textZh: '在第一排学生或反光大屏处框选红框' },
      { id: 'c3', textEn: 'Click "Save" to store blocking rules', textZh: '点击【Save】保存屏蔽区' }
    ],
    interactiveType: 'draw_zone',
    zoneType: 'blocking'
  },
  {
    id: 8,
    stage: 'teacher',
    titleEn: 'Preset Zone & Tracking Screen (Blue Rectangle)',
    titleZh: '讲桌静止预置区与特写画面微调（蓝色矩形框）',
    summaryEn: 'Blue box defines the table position: minor head/hand gestures at desk will not cause jitter. Then adjust close-up PTZ screen.',
    summaryZh: '蓝色框标记讲桌位置，教师伏案讲课时手部或头部微动不会引起画面抖动；随后通过虚拟云台微调特写画面并保存。',
    asset: img10PresetZone,
    assetSub: img11TrackingScreen,
    color: '#3b82f6',
    zoneNameEn: 'Preset Zone',
    zoneNameZh: '讲桌预置区',
    defaultZone: { x: 42, y: 46, width: 26, height: 24 },
    checklist: [
      { id: 'c1', textEn: 'Select "Preset zone 1" and draw blue rectangle', textZh: '选中【Preset zone 1】并绘制讲桌蓝色框' },
      { id: 'c2', textEn: 'Click "Save" for Preset Zone', textZh: '点击【Save】保存预置区' },
      { id: 'c3', textEn: 'Click "Set" under tracking screen to open PTZ dialog', textZh: '点击特写设置【Set】打开云台微调弹窗' },
      { id: 'c4', textEn: 'Adjust Pan/Tilt/Zoom, click Set and Save', textZh: '微调镜头方向与特写大小，点击 Set 并保存' }
    ],
    interactiveType: 'draw_zone_with_ptz',
    zoneType: 'preset_table'
  },
  {
    id: 9,
    stage: 'teacher',
    titleEn: 'BLS Blackboard Tracking (Yellow Rectangles)',
    titleZh: '板书跟踪区域与左右黑板特写设置（黄色矩形框）',
    summaryEn: 'Yellow boxes define blackboards. When teacher writes on board (facing board, one hand raised), camera tracks blackboard close-up.',
    summaryZh: '黄色矩形框圈出黑板区域。当教师转身板书并举手时，摄像机自动切入对应黑板特写画面。',
    asset: img12BlsZone,
    assetLeft: img13LeftBlackboard,
    assetRight: img14RightBlackboard,
    color: '#eab308',
    zoneNameEn: 'BLS Blackboard Zone',
    zoneNameZh: '板书区',
    defaultZone: { x: 30, y: 35, width: 22, height: 28 },
    checklist: [
      { id: 'c1', textEn: 'Select "Bls zone 1" and draw yellow box on Left Blackboard', textZh: '选中【Bls zone 1】在左侧黑板画黄色矩形框并保存' },
      { id: 'c2', textEn: 'Configure Left Blackboard PTZ close-up view and Save', textZh: '打开特写微调，调整左黑板构图并保存' },
      { id: 'c3', textEn: 'Select "Bls zone 2" and draw yellow box on Right Blackboard', textZh: '选中【Bls zone 2】在右侧黑板画黄色矩形框并保存' },
      { id: 'c4', textEn: 'Configure Right Blackboard PTZ close-up view and Save', textZh: '打开特写微调，调整右黑板构图并保存' }
    ],
    interactiveType: 'blackboard_setup',
    zoneType: 'bls'
  },
  {
    id: 10,
    stage: 'student',
    titleEn: 'Student Camera Tracking & Window Blocking',
    titleZh: '学生机跟踪预置位与走廊窗户干扰屏蔽',
    summaryEn: 'Stop student tracking, set Preset 1, and draw red blocking boxes around outdoor windows and hallways.',
    summaryZh: '切换至学生摄像机，停止跟踪后设定预置位 1，并在窗外、走廊行人走动处框选红色屏蔽区域。',
    asset: img15StudentStop,
    assetSub: img16StudentBlocking,
    color: '#ef4444',
    zoneNameEn: 'Student Blocking Zone',
    zoneNameZh: '学生防干扰屏蔽区',
    defaultZone: { x: 38, y: 25, width: 34, height: 24 },
    checklist: [
      { id: 'c1', textEn: 'Select Student Camera in Device Management', textZh: '在设备列表中切换选择学生摄像机' },
      { id: 'c2', textEn: 'Click "Stop" and record Preset 1', textZh: '点击【Stop】停止跟踪并设置 Preset 1' },
      { id: 'c3', textEn: 'Draw red blocking zone over windows/doors', textZh: '在窗户和后门区域画红框屏蔽室外人员干扰' },
      { id: 'c4', textEn: 'Click "Save"', textZh: '点击【Save】保存学生机配置' }
    ],
    interactiveType: 'student_setup',
    zoneType: 'student_blocking'
  },
  {
    id: 11,
    stage: 'calibration',
    titleEn: 'Dual CMOS Center Calibration (Pos Correct)',
    titleZh: '双目摄像机 CMOS 中心校准（Pos Correct）',
    summaryEn: 'If student close-up framing is misaligned, calibrate the two sensors under Basic1 -> Pos Correct. Never adjust PTZ head manually!',
    summaryZh: '若特写画面无法对准学生面部中心，进入 Basic1 -> Pos Correct 进行软件微调对准两颗 CMOS 中心。严禁手动扳动云台！',
    asset: img17DualCmos,
    alert: {
      type: 'WARNING',
      titleEn: 'Hardware Damage Warning',
      titleZh: '严禁手动扭动云台镜头',
      contentEn: 'NEVER force or manually turn the physical PTZ camera head. Always calibrate electronically using the Pos Correct software interface.',
      contentZh: '绝对禁止用手强行扭动摄像机物理镜头云台。任何中心偏移均应通过软件界面中的 Pos Correct 按钮进行电子校正。'
    },
    checklist: [
      { id: 'c1', textEn: 'Enter Settings -> Basic1', textZh: '进入 Settings -> Basic1 设置项' },
      { id: 'c2', textEn: 'Click "Pos correct" to open calibration overlay', textZh: '点击【Pos correct】进入传感器对齐模式' },
      { id: 'c3', textEn: 'Adjust directional arrows until both CMOS align to center', textZh: '点击微调方向键使广角与特写中心重合' },
      { id: 'c4', textEn: 'Click "OK" to store calibration matrix', textZh: '点击【OK】保存校准数据' }
    ],
    interactiveType: 'dual_cmos'
  },
  {
    id: 12,
    stage: 'calibration',
    titleEn: 'Power-On Auto-Track State & Final Check',
    titleZh: '开机自动跟踪状态设定与配置验收完成',
    summaryEn: 'Configure Basic2 -> Power on State: Track so tracking starts automatically after power loss or reboot.',
    summaryZh: '在 Basic2 中将【Power on State】设置为【Track】并保存，确保系统断电重启后自动恢复全功能跟踪。',
    asset: img18PowerOnState,
    alert: {
      type: 'TIP',
      titleEn: 'Ready for Operation',
      titleZh: '配置已就绪',
      contentEn: 'Once saved, restart tracking by clicking "Start" in the main view or rebooting the LCS station.',
      contentZh: '保存后可在主界面点击【Start】开启跟踪，或直接通过 LCS 导播触屏测试实际课堂走动跟踪效果。'
    },
    checklist: [
      { id: 'c1', textEn: 'Navigate to Settings -> Basic2', textZh: '进入 Settings -> Basic2 页面' },
      { id: 'c2', textEn: 'Locate "Power On State" dropdown', textZh: '找到【Power On State】下拉选择框' },
      { id: 'c3', textEn: 'Select "Track" mode', textZh: '选择为【Track】跟踪模式' },
      { id: 'c4', textEn: 'Click "Save" to finalize configuration', textZh: '点击【Save】完成全部配置' }
    ],
    interactiveType: 'power_on_state'
  }
];
