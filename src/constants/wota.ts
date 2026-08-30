export const WOTA_SECTION_KEYS = [
  "my-works",
  "favorite-works",
  "chorus-techniques",
] as const;

export type WotaSectionKey = (typeof WOTA_SECTION_KEYS)[number];

export interface WotaSectionDefinition {
  key: WotaSectionKey;
  label: string;
}

export const WOTA_SECTIONS: readonly WotaSectionDefinition[] = [
  { key: "my-works", label: "我的作品" },
  { key: "favorite-works", label: "我喜欢的作品" },
  { key: "chorus-techniques", label: "副歌技汇总" },
] as const;

// 栏目顶部的固定总结文字。用户提供内容前保持为空，不在公开页面显示占位文案。
export const WOTA_INTRO_PARAGRAPHS: readonly string[] = [];

export function getWotaSection(key?: string) {
  return WOTA_SECTIONS.find(section => section.key === key);
}
