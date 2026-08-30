export const CONTENT_CATEGORY_KEYS = [
  "learning",
  "games",
  "wota",
  "anime",
] as const;

export type ContentCategoryKey = (typeof CONTENT_CATEGORY_KEYS)[number];

export interface ContentCategoryDefinition {
  key: ContentCategoryKey;
  label: string;
  description: string;
  shortDescription: string;
  href: `/posts/${ContentCategoryKey}/`;
  emptyMessage: string;
}

export const CONTENT_CATEGORIES: readonly ContentCategoryDefinition[] = [
  {
    key: "learning",
    label: "学习",
    description:
      "整理秋招面试、人工智能智能体、LeetCode 解题思路和其他学习心得。",
    shortDescription: "面试复盘、智能体学习、算法题与长期笔记",
    href: "/posts/learning/",
    emptyMessage: "学习笔记仍在整理，之后会从已有课程笔记开始逐步归档。",
  },
  {
    key: "games",
    label: "游戏",
    description:
      "分享 Celeste 模组地图、Minecraft 模组与整合包，以及其他 Steam 游戏体验。",
    shortDescription: "Celeste、Minecraft 与其他游戏体验",
    href: "/posts/games/",
    emptyMessage: "游戏记录仍在整理，之后会加入游玩感受、评分和汇总。",
  },
  {
    key: "wota",
    label: "WOTA艺",
    description: "收录我的作品、我喜欢的作品和副歌技汇总。",
    shortDescription: "我的作品、喜欢的作品与副歌技汇总",
    href: "/posts/wota/",
    emptyMessage: "WOTA艺内容仍在整理，之后会从作品和副歌技记录开始补充。",
  },
  {
    key: "anime",
    label: "动漫",
    description: "按季度、剧场版或独立作品记录观看感受与个人推荐。",
    shortDescription: "观看记录、感想、评分与个人推荐",
    href: "/posts/anime/",
    emptyMessage: "动漫观看记录仍在整理，之后会按作品逐步补充。",
  },
] as const;

export const CONTENT_TYPE_KEYS = [
  "note",
  "experience",
  "solution",
  "review",
  "summary",
  "work",
] as const;

export type ContentTypeKey = (typeof CONTENT_TYPE_KEYS)[number];

export const CONTENT_TYPE_LABELS: Record<ContentTypeKey, string> = {
  note: "笔记",
  experience: "经历",
  solution: "题解",
  review: "评价",
  summary: "汇总",
  work: "作品",
};

export const GAME_SUBCATEGORY_DEFINITIONS = [
  {
    key: "celeste",
    label: "Celeste",
    href: "/posts/games/celeste/",
    alwaysShow: true,
  },
  {
    key: "minecraft",
    label: "Minecraft",
    href: "/posts/games/tags/minecraft/",
    alwaysShow: false,
  },
  {
    key: "steam",
    label: "其他 Steam 游戏",
    href: "/posts/games/tags/steam/",
    alwaysShow: false,
  },
] as const;

export type GameSubcategoryKey =
  (typeof GAME_SUBCATEGORY_DEFINITIONS)[number]["key"];

export function getContentCategory(key?: string) {
  return CONTENT_CATEGORIES.find(category => category.key === key);
}

export function getContentTypeLabel(key?: string) {
  if (!key || !CONTENT_TYPE_KEYS.includes(key as ContentTypeKey)) return;
  return CONTENT_TYPE_LABELS[key as ContentTypeKey];
}

export function getGameSubcategory(key?: string) {
  return GAME_SUBCATEGORY_DEFINITIONS.find(game => game.key === key);
}
