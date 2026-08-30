---
title: 模板清理与站点身份统一实现记录
description: 归档个人笔记迁移、模板内容移除、中文分享图、favicon 和验证结果
type: report
layer: cold
status: completed
created: 2026-08-30
updated: 2026-08-30
archived_at: 2026-08-30
related:
  - WEB-004
  - WEB-005
---

# 模板清理与站点身份统一实现记录

## 完成范围

- 公开内容只保留 `src/data/blog/copl/ch1.md` 和 `ch3.md` 两篇个人学习笔记。
- 保留两篇笔记仍在使用的 `src/assets/images/concepts_of_pl/1.7.png`。
- 延续并保留用户原有的 release 文章删除与 `concepts_of_pl` 到 `copl` 迁移状态；本轮
  另外移除 13 篇 AstroPaper 教程、示例或第三方模板文章。
- 移除仅由模板文章使用的 AstroPaper 版本截图、Forrest Gump 示例图片和旧的
  `astropaper-og.jpg`。这些受 Git 跟踪的文件仍可从仓库历史恢复。
- 第一篇笔记网址由包含大写字母的 `basic-concepts-in-PL` 统一为
  `basic-concepts-in-pl`；项目已经确认不为旧网址保留重定向。
- 模板迁移完成后，将 `category` 和 `contentType` 收紧为新文章必填字段。

## 身份与中文体验

- 站点标题、作者、描述、GitHub profile、编辑链接、语言和时区使用已确认身份。
- 首页、导航、About、文章列表与详情、日期、分页、分享、返回、归档、标签、搜索、
  404、Footer 和主要辅助文本使用简体中文。
- 默认分享图改用动态 `/og.png`，文章分享图继续使用文章专属路由；两者采用本站标题、
  栏目和配色。
- 动态分享图字体由不支持中文的 IBM Plex Mono 改为按实际文本下载的 Noto Sans SC
  中文字体子集，修复中文显示为方框的问题。
- favicon 使用不依赖外部图片的打开书本 SVG；同时补齐浏览器浅色、深色主题色元数据。

## 验证证据

- 全仓库 `prettier --check` 通过。个人 Markdown 正文被明确排除出自动格式化，避免
  工具重排作者控制的段落和代码布局。
- 全仓库 ESLint 通过。
- `astro check` 检查 59 个文件，结果为零错误、零警告、零提示。
- 首页、文章总览、四个栏目、标签、归档、搜索、两篇文章、RSS 和动态分享图在本地
  开发服务器返回 200。
- 文章总览、标签、归档和 RSS 均不包含 AstroPaper 或 Sat Naing；RSS 只包含两篇个人
  笔记。
- 三个抽查的旧模板文章网址均返回 404；新的小写笔记网址返回 200，旧混合大小写网址
  返回 404。
- 第一篇笔记的正文图片返回 200，并由 Astro 正常转换为 WebP。
- 站点和文章分享图经过图片级检查；中文、较长英文标题、分类、作者和域名均可辨认，
  没有方框或截断。favicon 和清理后的桌面、窄屏页面也经过应用内浏览器检查。

## 未包含事项

- 未执行生产构建、提交、推送或部署。
- 生产构建会刷新 `dist` 与 `public/pagefind`，并在生成动态分享图时访问 Google Fonts
  下载中文字体子集；该验证继续由 `WEB-002` 跟踪并等待明确授权。
- KaTeX 数学公式版本统一仍由 `WEB-003` 跟踪。

`WEB-004` 和 `WEB-005` 已完成并从 `docs/BACKLOG.md` 热层移除；本文保留实现、删除
范围与验证上下文。
