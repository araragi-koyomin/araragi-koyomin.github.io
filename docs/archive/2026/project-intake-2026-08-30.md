---
title: 个人网站首轮接手审计
description: 记录 2026-08-30 对仓库、工作区、功能、模板残留和风险的只读调查结果
type: audit
layer: cold
status: completed
created: 2026-08-30
updated: 2026-08-30
archived_at: 2026-08-30
---

# 个人网站首轮接手审计

## 调查范围

首轮以严格只读方式检查了 Git 分支与工作区、README、依赖与 Astro 配置、GitHub
Actions、页面路由、主要布局和组件、内容集合、博客 frontmatter、未提交 diff、近期
历史以及线上站点响应。未安装依赖、未构建、未修改文件、未切换分支、未提交或部署。

## Git 快照

- 当前目录：`E:\website1`
- 当前分支：`main`
- HEAD 与 `origin/main`：`31bb06cf`
- 远程：`https://github.com/araragi-koyomin/araragi-koyomin.github.io.git`
- 本地 `gh-pages`：`680656a7`
- `origin/gh-pages`：`bbc4b323`
- 工作区当时包含 10 个修改、6 个删除和 2 个未跟踪 Markdown 文件，无 staged 修改。

所有既有修改均被视为用户工作并完整保留。

## 已实现能力

- Astro 内容集合与 frontmatter 校验
- 首页、文章列表、分页和文章详情
- 标签、标签分页和年月归档
- Pagefind 静态搜索
- RSS、sitemap、robots 和 Google 站点验证入口
- 动态站点/文章 OG 图片
- 明暗主题、View Transitions、代码高亮
- 草稿、定时发布、文章分享、返回顶部和阅读进度

## 当时的活跃修改

- 为 Markdown 加入 `remark-math`、`rehype-katex` 和 KaTeX。
- 将站点标题和首页部分文案改为中文。
- 将 GitHub 社交链接改为个人账号，隐藏 About 导航。
- 删除 AstroPaper 2～5 release 文章。
- 将第一章笔记从 `concepts_of_pl` 迁移到 `copl` 并调整标签。
- 新增《程序设计语言原理》第三章笔记。

## 模板残留

- README、About 和 `.github` 社区文档仍主要属于 AstroPaper。
- 多篇 AstroPaper 教程和三个非草稿示例仍会作为公开文章加载。
- profile、编辑链接、OG 图片、favicon、语言和时区仍含主题作者或默认值。
- 线上首页仍显示 `wmc's home`、`Mingalaba` 和 AstroPaper 介绍，未反映本地修改。

## 主要风险

1. `src/components/LinkButton.astro` 新增了从 `astro:schema` 导入不存在的
   `transformer`，很可能阻断类型检查或构建。
2. KaTeX 包版本为 0.16.22，而页面 CDN CSS 使用 0.15.2。
3. `pnpm-lock.yaml` 已加入数学依赖，`package-lock.json` 尚未同步。
4. 文章编辑链接仍指向 AstroPaper 原仓库。
5. 模板文章会进入首页、搜索、RSS、标签和归档。
6. 没有发现自动化测试文件；首轮因只读边界未执行构建验证。
7. README 记录 Cloudflare Pages 和 FuseJS，实际使用 GitHub Pages 和 Pagefind。

## 后续结论

在正式功能完善前，应先明确公开内容、语言、About、作者身份、正式站点标题和部署策略；
随后按“构建基线 → 内容与身份 → 工程质量 → 发布链路”的顺序推进。活跃事项已转入
`docs/BACKLOG.md`，本报告作为冷层历史保留。
