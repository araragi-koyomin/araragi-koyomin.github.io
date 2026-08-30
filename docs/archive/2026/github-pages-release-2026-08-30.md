---
title: GitHub Pages 构建基线与首次新版发布记录
description: 归档跨平台生产构建修复、手动发布链路、远程任务和线上页面验收证据
type: report
layer: cold
status: completed
created: 2026-08-30
updated: 2026-08-30
archived_at: 2026-08-30
related:
  - WEB-002
  - WEB-008
---

# GitHub Pages 构建基线与首次新版发布记录

## 故障与修复

旧部署工作流完成了依赖安装和 Astro 构建，但在把产物推送到 `gh-pages` 时返回
`Invalid username or token`。仓库 Secret `GH_PAGES_TOKEN` 仍存在，但其中的个人访问
令牌已经无效。

工作流现改为 GitHub 自动签发的 `GITHUB_TOKEN`，只授予同一仓库内容写权限；触发方式
由推送 `main` 自动发布改为作者明确操作的 `workflow_dispatch` 手动发布。依赖安装使用
固定 pnpm 版本和 `--frozen-lockfile`，工作流工具使用明确版本，并在写入发布分支前检查
8 个关键静态产物。

本地生产构建还发现原脚本使用 Windows 不支持的 Unix `cp` 命令。现使用
`scripts/sync-pagefind.mjs` 调用 Node.js 自带文件接口，在 Windows 与 Linux 上同步
Pagefind 索引，不增加新依赖。

## 本地验证

- `git diff --check`：通过。
- `pnpm run format:check`：通过。
- `pnpm run lint`：通过。
- `pnpm run build`：通过；Astro 检查 71 个文件，零错误、零警告、零提示。
- Astro 生成 43 个静态页面；Pagefind 索引 5 个公开内容页面、590 个词。
- 首页、文章总览、游戏栏目、Celeste 汇总、两篇游戏文章、RSS 和 Pagefind 入口共 8 个
  关键产物均存在。

## 远程发布证据

- 源码提交：`876d38cd`，提交说明 `fix: harden GitHub Pages deployment`。
- 手动部署任务：`33312170843`，依赖安装、生产构建、关键页面检查和写入 `gh-pages`
  全部成功。
- 发布分支提交：`c8b5cf56`，提交说明指向源码 `876d38cd`。
- GitHub Pages 平台任务：`33312202268`，成功完成。

## 线上验收

首页、文章总览、游戏栏目、Celeste 汇总、`Journeys of a Bygone Wanderer`、
《新星工程》、RSS 和搜索页均返回 HTTP 200。浏览器检查确认：首页显示“私立直江津高校”
和“图书馆”，游戏栏目有 3 篇文章；Celeste 汇总显示 2 张地图，在 786 像素视口使用信息
卡且没有横向溢出，合集名称、颜色、难度、主要玩法、评分和简评完整。

`Journeys of a Bygone Wanderer` 的正文和封面加载成功，控制台没有脚本错误；其封面替代
文字目前是无意义的 `nul`，已经记录到 WEB-007，不在本次发布修复中擅自改写。线上
《新星工程》没有表格，与当前 Markdown 源文件没有表格语法一致，不属于渲染丢失。
