---
title: 文章顶部封面图实现与验收
description: 归档独立文章封面字段、Front Matter CMS 接入和“春葬”真实图片响应式验收结果
type: report
layer: cold
status: completed
created: 2026-08-30
updated: 2026-08-30
archived_at: 2026-08-30
related:
  - AUTHOR-004
---

# 文章顶部封面图实现与验收

## 完成范围

- 新增 `heroImage`、`heroImageAlt` 和 `heroImageCaption`，分别保存本地封面图片、替代文字
  和可选说明文字。
- 公开文章设置封面时必须填写替代文字；没有封面时不得单独填写替代文字或说明文字。
- 封面显示在文章标题、日期和结构化元数据之后、Markdown 正文之前；没有封面的文章不
  生成空占位。
- 封面与 `ogImage` 分开维护，后者继续只用于社交分享和页面元数据。
- Front Matter CMS 已提供三个字段，Celeste 专用模板和作者文档也已写明使用方式。

## 首张真实图片

作者提供的 1858×1114 PNG 已原样复制为
`src/assets/images/games/celeste/chun-zang-cover.png`，并用于“春葬”。源文件和项目副本的
SHA-256 校验值一致。替代文字说明了森林、红色斗篷角色和白色相框；没有虚构图片来源或
说明文字。

## 验证结果

- Astro 开发预览正常解析本地图片，并生成包含多个宽度的 WebP `srcset`；图片具有明确的
  原始宽高属性，避免加载时布局跳动。
- 1440×1000 视口下，封面约为 736×414；390×1200 视口下约为 343×193。
- 两端均使用 16:9 居中裁切，主体和白色相框可辨，没有页面横向溢出。
- 浏览器语义结构包含具有完整替代文字的 `figure` 和 `img`，控制台没有脚本错误。
- 相关文件通过 Prettier 和针对性 ESLint 检查；未运行生产构建、提交、推送或部署。
