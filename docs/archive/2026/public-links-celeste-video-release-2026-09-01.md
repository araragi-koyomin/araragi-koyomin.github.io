---
title: 公开主页链接与 Celeste 视频入口发布记录
description: 归档首页公开链接、Celeste 视频字段、雨空文章及 2026-09-01 GitHub Pages 发布证据
type: report
layer: cold
status: completed
created: 2026-09-01
updated: 2026-09-01
archived_at: 2026-09-01
related:
  - CONTENT-007
  - DEPLOY-002
---

# 公开主页链接与 Celeste 视频入口发布记录

## 完成范围

- 首页公开链接增加 Bilibili 和 Bangumi，并与 GitHub 一样只显示可辨认的 SVG 图标；三条
  链接均保留屏幕阅读器可读名称。
- Celeste 地图文章支持可选 `celesteVideoUrl`，Front Matter CMS 字段、专用模板、内容
  校验、作者文档和文章详情页保持一致。
- “春葬”、`Journeys of a Bygone Wanderer` 和“雨空”均配置实际 Bilibili 视频网址。
- 作者新增的“雨空”文章和封面进入生产构建与 Celeste 汇总；汇总页在线显示 3 / 3 张地图。
- 部署工作流增加三篇 Celeste 地图文章的关键产物检查。

## 验证证据

- 源码提交：`229c54b4 feat: add public profiles and Celeste video entries`。
- 本地 `pnpm run format:check`、`pnpm run lint` 和 `pnpm run build` 全部通过；Astro 检查
  72 个文件无错误、警告或提示，生产构建生成 44 个页面。
- GitHub Actions `Deploy by Astro` 运行 `33436816096` 成功，关键页面检查和 `gh-pages`
  写入均通过。
- GitHub Pages `pages-build-deployment` 运行 `33436891772` 成功。
- 线上浏览器确认首页三条公开链接、Celeste 3 张地图汇总和“雨空”视频入口均可访问，
  页面没有浏览器控制台错误。

## 保留问题

`Journeys of a Bygone Wanderer` 和“雨空”的 `heroImageAlt` 仍为字面值 `nul`。该问题不会
阻止图片加载或文章发布，但会让屏幕阅读器读出无意义文字，继续由热层事项 WEB-007 跟踪。
