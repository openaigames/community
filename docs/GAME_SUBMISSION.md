# 投稿、预览与上架

首页的 3D 卡带区展示精选游戏；游戏目录展示全部已上架游戏。未合并的投稿只出现在该 PR 的预览里。新投稿默认 `featured: false`，是否进入精选由维护者决定。

## 给人和 Agent 的最短流程

1. 在新分支下复制 `templates/game.json` 到 `demos/<id>/game.json`。`id` 使用小写字母、数字和连字符，与目录名保持一致。
2. 同目录添加 `README.md`，介绍玩法、按键、反馈问题、作者和第三方素材署名。封面可放同目录，也可引用 HTTPS 图片。
3. 在仓库根目录运行 `node tooling/catalog/validate-local.mjs`，然后运行 `git diff --check`。
4. 提交到 `openaigames/community` 的 `main`。PR 中说明游戏、试玩地址和验证情况。
5. 查看 `Game catalog / Preview` 检查及机器人评论。打开“预览”检查目录、封面、详情、试玩地址和按键说明。
6. 继续向同一分支 push 会更新原评论与预览；“固定本次版本”可查看对应提交。失败时查看检查结果并修正，不把旧预览当成新提交已通过。
7. 维护者审核后合并。主分支工作流自动发布正式目录；网页重新读取目录后出现新作品，无需手动修改网站或登录 Cloudflare。

PR 关闭但未合并时，预览显示“已关闭，未上架”；合并后显示“已合并”。`catalog/legacy.json` 仅保留建立自动流程前已经在网站展示的 dodo，普通投稿不要修改它。

## game.json 字段

| 字段 | 内容 |
| --- | --- |
| `id`、`title`、`description`、`category` | 稳定 ID、名称、简介、类型 |
| `creator`、`creator_url` | 作者与主页 |
| `preview_url`、`source_url`、`submission_url` | 可试玩 HTTPS 页面、源码、投稿记录；投稿记录可以先链接当前归档文档，不必猜 PR 编号 |
| `cover_url` | 同目录图片文件名或 HTTPS 图片地址；PNG / JPG / WebP / GIF，单个本地图片不超过 5 MB |
| `gameplay_url`、`image_caption` | 可选展示图与准确说明；概念海报不要标成实机截图 |
| `version_label` | 展示的版本或日期 |
| `controls`、`instructions` | 按键摘要与玩法说明 |
| `feedback_questions` | 1–8 个想请玩家回答的问题 |
| `credits`、`attribution` | 创作者说明与第三方署名；后者可为空 |
| `featured` | 新投稿填写 `false`；仅维护者决定精选 |

网站只嵌入试玩地址，不构建游戏源码。要测试游戏的新代码，请先在游戏仓库生成试玩地址，再填入这里。无法被 iframe 嵌入的游戏需修正托管设置，或向维护者说明只能在原站打开。

## Agent 入口

直接阅读 [提交游戏 Skill](../skills/openaigames-submit-demo/SKILL.md)。该 skill 可放入支持 `SKILL.md` 的 Agent 技能目录；它不需要 Cloudflare 权限或网站部署密钥。

技术实现与工作流在 `tooling/catalog/` 和 `.github/workflows/catalog.yml`。预览不接收正式留言，也不加载正式站分析脚本。目录发布失败时保留上一份正式目录。

## 制作方式声明

网页快捷投稿和 `game.json` 使用相同字段：

| 字段 | 规则 |
| --- | --- |
| `creation_method` | `undeclared`（未声明，默认）、`human`（人工制作）、`ai_assisted`（AI 辅助制作）、`ai_generated`（主要由 AI 生成） |
| `creation_note` | 可选的公开制作说明，最多 500 字；可说明代码、美术、音频、文案的制作过程和工具 |

`human` 表示声明未使用生成式 AI，可以使用常规引擎和开发工具；使用生成式 AI 辅助代码或素材时选择 `ai_assisted`，主要代码或内容由生成式 AI 产出时选择 `ai_generated`。推荐他人作品但不了解其制作过程时，保留 `undeclared`。不要从画风、托管平台、源码是否公开或审核通过推断制作方式，也不要把作者自荐等同于人工制作。

标签会在目录、详情与试玩界面展示。依据投稿声明与补充材料标注，不代表平台认证。旧作品缺少声明时显示“未声明”；审核通过不会自动改变制作方式。后台可补录或更正已通过作品的制作方式与公开说明，须填写审核依据，修改前后值会留在审核记录中。制作说明不应包含联系方式、私有地址或凭据。PR 档案是正式目录的来源；将快捷投稿整理为正式档案时，应保留已确认的声明。
