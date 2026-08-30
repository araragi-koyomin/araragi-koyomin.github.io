---
title: 开发文档与三层记忆规范
description: 定义开发文档的位置、frontmatter、生命周期、归档和 BACKLOG 同步规则
type: governance
layer: warm
status: active
created: 2026-08-30
updated: 2026-08-30
---

# 开发文档与三层记忆规范

## 目录模型

```text
AGENTS.md                         仓库级执行规则，不属于 docs frontmatter 约束
docs/
├── BACKLOG.md                    热层：唯一活跃事项索引
├── PROJECT.md                    温层：长期项目目标与需求基线
├── DOCUMENTATION.md              温层：文档治理规则
├── plans/                        温层：必要时创建的跨文件/跨回合计划
└── archive/<年份>/               冷层：完成、取消或被替代的文档
```

不得把开发计划、调查报告、决策记录或任务清单放进 `src/pages`、`src/data/blog` 或
`public`。这些目录属于网站实现或发布内容。

## Frontmatter 最小模式

每个 `docs/**/*.md` 必须从第 1 行开始使用：

```yaml
---
title: 文档标题
description: 一句话用途
type: backlog | project | governance | plan | decision | audit | report
layer: hot | warm | cold
status: active | ready | in_progress | blocked | completed | cancelled | superseded
updated: YYYY-MM-DD
---
```

约束：

- `BACKLOG.md` 固定为 `layer: hot`、`type: backlog`、`status: active`。
- 温层文档使用 `layer: warm`，状态反映当前生命周期。
- 冷层文档使用 `layer: cold`，状态只能是 `completed`、`cancelled` 或 `superseded`，
  并包含 `archived_at`。
- 日期使用当前项目时区下的 ISO 日期 `YYYY-MM-DD`。
- 文档状态、正文和 BACKLOG 必须一致。

## 何时创建温层文档

以下情况应创建独立的 `docs/plans/<id>-<slug>.md`：

- 工作跨多个模块或预计跨多个会话。
- 存在重要架构、URL、内容迁移、兼容性或部署决策。
- 需要独立验收清单、回滚说明或调查证据。

简单、局部、可在单次工作中完成的改动只写 BACKLOG 和必要的 `PROJECT.md` 更新，
避免为个人博客制造文档负担。

## 生命周期

### 新需求

1. 先在 `BACKLOG.md` 新增活跃项。
2. 若需求会改变长期目标，更新 `PROJECT.md`。
3. 若工作复杂，再创建温层计划并从 BACKLOG 链接。
4. 有影响范围的歧义时将事项标为 `blocked`，立即询问用户。

### 进行中

1. 开始实现前改为 `in_progress`。
2. 记录新增需求、风险、依赖和验收变化。
3. 不把调查发现只留在聊天或代码注释中。

### 完成或终止

1. 写明结果、验证命令、验证日期和未验证项。
2. 将需要保留的温层文档移入 `docs/archive/<年份>/`，frontmatter 改为冷层状态并加入
   `archived_at`。
3. 更新仍长期有效的 `PROJECT.md` 或治理文档。
4. 从 `BACKLOG.md` 删除完成、取消或被替代的事项。

归档文件不得因为“不再活跃”而删除；若内容被新方案替代，使用 `status: superseded`
并链接替代文档。

## BACKLOG 项目格式

每个活跃项至少记录：

- 稳定 ID
- 一句话目标
- `ready`、`in_progress` 或 `blocked` 状态
- 依赖或阻塞原因
- 可验证的完成证据

BACKLOG 不保存已完成列表、周报或提交日志。历史结果应进入冷层。

## 文档校验清单

每次交付前检查：

- 新开发文档是否全部位于 `docs/`。
- 所有 `docs/**/*.md` 是否从第 1 行包含有效 frontmatter。
- BACKLOG 是否收录全部活跃需求和新发现风险。
- 完成项是否已从 BACKLOG 移除并按需归档。
- 文档中的状态、日期、链接、路径和代码事实是否仍然准确。
