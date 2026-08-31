---
title: GitHub Pages 发布说明
description: 说明个人网站的生产验证、手动部署、线上核对和常见故障处理流程
type: governance
layer: warm
status: active
created: 2026-08-30
updated: 2026-09-01
---

# GitHub Pages 发布说明

## 发布链路

源码保存在 `main`，GitHub Actions 从该分支安装依赖并生成 `dist`，再把静态产物写入
`gh-pages`。GitHub Pages 从 `gh-pages` 根目录提供
`https://araragi-koyomin.github.io/`。

推送 `main` 只保存源码，不会自动发布。部署必须由作者在 GitHub Actions 页面或通过
GitHub CLI 手动触发。

## 发布前检查

在 `E:\website1` 执行：

```powershell
pnpm run format:check
pnpm run lint
pnpm run build
```

生产构建会更新已被 Git 忽略的 `dist` 与 `public/pagefind`。检查通过后，应通过本地生产
预览复核首页、栏目页、汇总页和本次涉及的文章：

```powershell
pnpm run preview -- --host 127.0.0.1
```

## 提交与推送

先确认暂存范围，再提交并推送源码：

```powershell
git status --short
git diff --cached --stat
git commit -m "<本次变更说明>"
git push origin main
```

不得切换到 `gh-pages` 手工维护构建产物，也不使用 `pnpm run deploy` 绕过受控工作流。

## 手动部署

网页操作：进入仓库 Actions 页面，选择 `Deploy by Astro`，点击 `Run workflow` 并选择
`main`。

GitHub CLI 操作：

```powershell
gh workflow run deploy.yml --ref main --repo araragi-koyomin/araragi-koyomin.github.io
gh run watch --repo araragi-koyomin/araragi-koyomin.github.io --exit-status
```

工作流会严格按照 `pnpm-lock.yaml` 安装依赖、执行生产构建，并确认首页、文章总览、游戏
栏目、Celeste 汇总、三篇 Celeste 地图文章、Minecraft《新星工程》文章、RSS 和
Pagefind 搜索产物存在。任何检查失败都会在写入 `gh-pages` 前停止。

## 线上核对

部署任务成功后，还要等待 GitHub Pages 的 `pages-build-deployment` 任务完成，再检查：

- 首页和站点身份；
- `/posts/games/`；
- `/posts/games/celeste/`；
- 本次新增或修改的文章；
- `/rss.xml` 与 `/search/`。

若浏览器仍显示旧页面，先等待 Pages 任务完成，再使用强制刷新排除本地缓存。

## 认证与故障排查

工作流使用 GitHub 自动签发的 `GITHUB_TOKEN`，并只授予 `contents: write`，用于把构建
产物写入同一仓库的 `gh-pages`。不再依赖需要人工续期的个人访问令牌。

排查命令：

```powershell
gh run list --repo araragi-koyomin/araragi-koyomin.github.io --workflow deploy.yml --limit 5
gh run view <运行编号> --repo araragi-koyomin/araragi-koyomin.github.io --log-failed
```

如果日志显示构建失败，应先修复代码或内容；如果只有部署推送失败，应检查工作流的
`contents: write` 权限和 GitHub Pages 的 `gh-pages` 根目录设置。
