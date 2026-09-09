简体中文 · [English](CONTRIBUTING.en.md)

# 一起把游戏做出来

从一个点子、一个可玩的机制，或一次认真的试玩反馈开始。你可以参与程序、美术、叙事、声音，也可以只负责试玩。

## 通过 Pull Request 留存

已有整理好的点子、Demo 或工具需求，可以直接提 PR，不必先开 Issue。资料可以用中文或英文写。

1. Fork 本仓库，在自己的分支上添加记录。
2. 复制对应模板到下表中的位置，把 `<short-name>` 换成简短、稳定的小写英文名，如用连字符分隔单词。删除未使用的占位说明。
3. 填写创作者、内容和相关链接；有 Issue 或既往 PR 时附上关联。
4. 向本仓库的 `main` 提交 PR，说明新增或修改了什么。可以先开 Draft PR 一起完善，准备好后改为正式 PR。
5. 维护者检查内容、链接和署名后合并。后续版本继续更新同一份记录，保留文件历史和 PR 讨论。

| 内容 | 模板 | 保存位置 |
| --- | --- | --- |
| 游戏点子 | [idea.md](templates/idea.md) | `ideas/<short-name>/README.md` |
| 可试玩 Demo | [demo.md](templates/demo.md) | `demos/<short-name>/README.md` |
| 工具需求 | [tool-need.md](templates/tool-need.md) | `tooling/<short-name>/README.md` |

截图等配套素材放在这份记录旁边，用相对路径引用。游戏可执行文件、完整源码和工具实现链接到对应项目；这里保存共创资料与索引。

提交 Demo 归档时，可以在同一个 PR 中更新[投稿索引](SHOWCASE.md)，链接归档文档、试玩地址和相关讨论。

## 带一个点子来

[创建游戏点子](https://github.com/openaigames/community/issues/new?template=01-game-idea.yml)，说明玩家要做什么、什么地方有趣，以及第一版最小需要做出什么。想找人一起做时，写清楚你已经能做的部分和需要的帮助。

## 提交 Demo

[提交可试玩 Demo](https://github.com/openaigames/community/issues/new?template=02-game-demo.yml)，附上试玩链接、操作方式和最想验证的问题。能直接打开试玩最好；需要下载或配置时，请写明步骤。

源码和制作记录可以附在同一条投稿中。保持作者、协作者和素材的署名；共享其他人的作品或素材时，先确认有权分享。

## 一起试玩、一起迭代

在对应 Demo 的 Issue 或 PR 下留言：你试了什么、在哪里卡住、哪个瞬间好玩，以及一个具体建议。作者在同一条讨论中跟进反馈，有归档文档时通过 PR 更新版本和改动。

## 从制作中发现工具需求

[记录一个工具需求](https://github.com/openaigames/community/issues/new?template=03-tool-need.yml)，先说明真实制作里反复出现的问题，再讨论是否值得做成工具。描述具体步骤、耗时和希望改善的结果；有复现材料时附上。讨论明确后，再拆成实现任务。

使用 Issue 讨论时，一个点子或 Demo 保持一条主讨论；认领工作时在其中留言说明范围。PR 可以关联讨论，但不是必须先有 Issue。修改社区说明时，同时检查中文与英文版本。

Demo 来自已有点子时，在投稿中链接原始 Issue 或归档文档。试玩链接与署名齐全后，可以通过 Pull Request 更新[投稿索引](SHOWCASE.md)。
