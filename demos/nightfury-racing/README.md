# NIGHTFURY · 极夜狂飙

基于 Three.js 的浏览器街机赛车：八张赛道、两款跑车、五位 AI 对手，每场五圈。通过漂移积攒氮气，在霓虹都市、火山、冰原和浮岛间竞速，挑战回环与断桥飞跃。

- 创作者 / Creator：[Ziang-Chen](https://github.com/Ziang-Chen)，使用 Codex 辅助开发。
- 试玩链接 / Playable link：https://ziang-chen.github.io/nightfury-racing/
- 当前版本 / Current version：2026-09-13 可试玩 Demo；归档基于已发布提交 [`dfaa093`](https://github.com/Ziang-Chen/nightfury-racing/commit/dfaa093fab5e18abf8d2e9a925fad21f11b45802)。试玩地址会随后续发布更新。
- 源码 / Source：https://github.com/Ziang-Chen/nightfury-racing
- 制作记录 / Design notes：[设计文档](https://github.com/Ziang-Chen/nightfury-racing/blob/main/docs/DESIGN.md)

## 怎么玩 / How to play

使用支持 WebGL 的桌面浏览器打开试玩地址，选择地图与车型，等待车辆资源加载后开始。当前归档版本为单人游戏，与五位 AI 对手完成五圈比赛；可在设置中选择流畅或精细画质。

| 按键 | 操作 |
| --- | --- |
| W / S | 加速 / 刹车、倒车 |
| A / D | 转向 |
| Space | 漂移 / 空中翻转 |
| Shift | 氮气 |
| C | 切换镜头 |
| R | 回到路面 |
| Esc | 暂停，可继续、重赛或返回主菜单 |

地图包括霓虹都市、熔岩火山、山地发卡、极光冰原、云端回环、峡谷飞跃、糖果云岛与星辉秘境。利用漂移和落地奖励补充氮气，注意对手碰撞、冰面打滑和赛道障碍。

## 想验证什么 / Feedback wanted

- 首次加载和选图、选车流程是否清楚？在你的设备上是否流畅？
- 转向、漂移和氮气的手感是否容易掌握？
- 回环与断桥飞跃是否容易理解，失误后能否顺利回到赛道？
- 五圈比赛与 AI 追击的难度是否合适？

## 制作记录与更新 / Making-of notes and updates

2026-09-13：首次社区归档。已发布版本包含八张地图、回环和空中特技、AI 氮气追击、分阶段车辆加载，以及山脊、松树、雪地和岩柱的环境细节。后续版本继续更新本记录。

游戏源码与完整模型资源保留在独立项目仓库；本记录提供试玩、源码、操作与署名入口。

## 署名 / Credits

- 原创代码：Ziang-Chen，使用 Codex 辅助开发；[MIT 许可](https://github.com/Ziang-Chen/nightfury-racing/blob/main/LICENSE)。
- Lamborghini Aventador 模型：Arion Digital；Bugatti Veyron 模型：DevPoly3D。模型遵循 CC BY 4.0，原始来源、修改说明与完整署名见[第三方许可说明](https://github.com/Ziang-Chen/nightfury-racing/blob/main/THIRD_PARTY_NOTICES.md)。
- Three.js 与 meshoptimizer：MIT；Draco：Apache-2.0。
- 项目中的地图封面与海报由 OpenAI ImageGen 生成，属于概念艺术，并非游戏实机截图。
- [游戏内署名页](https://ziang-chen.github.io/nightfury-racing/credits.html)。汽车名称与商标属于各自权利人，本项目与汽车厂商无隶属或代言关系。
