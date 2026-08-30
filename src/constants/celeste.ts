import collectionData from "@/data/celeste-collections.json";

export const CELESTE_COLLECTION_COLOR_KEYS = [
  "neutral",
  "sky",
  "violet",
  "rose",
  "amber",
  "emerald",
] as const;

export type CelesteCollectionColor =
  (typeof CELESTE_COLLECTION_COLOR_KEYS)[number];

export interface CelesteCollectionDefinition {
  id: string;
  name: string;
  color: CelesteCollectionColor;
}

export interface CelesteMapSummaryItem {
  id: string;
  href: string;
  title: string;
  description: string;
  collection: CelesteCollectionDefinition;
  difficulty: string;
  gameplay: string;
  rating: number;
}

const colorKeys = new Set<string>(CELESTE_COLLECTION_COLOR_KEYS);
const seenIds = new Set<string>();

export const CELESTE_COLLECTIONS = collectionData.map(entry => {
  if (!entry.id || !entry.name || !colorKeys.has(entry.color)) {
    throw new Error(`Celeste 合集注册表条目无效：${JSON.stringify(entry)}`);
  }

  if (seenIds.has(entry.id)) {
    throw new Error(`Celeste 合集注册表存在重复编号：${entry.id}`);
  }

  seenIds.add(entry.id);
  return entry as CelesteCollectionDefinition;
});

export const CELESTE_MAP_SUMMARY_PATH = "/posts/games/celeste/";

export function isCelesteCollectionId(value: string) {
  return CELESTE_COLLECTIONS.some(collection => collection.id === value);
}

export function getCelesteCollection(id?: string) {
  if (!id) return;
  return CELESTE_COLLECTIONS.find(collection => collection.id === id);
}
