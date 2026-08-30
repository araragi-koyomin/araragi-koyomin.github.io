import type { CollectionEntry } from "astro:content";
import {
  CONTENT_CATEGORY_KEYS,
  type ContentCategoryKey,
} from "@/constants/content";

export type CategoryCounts = Record<ContentCategoryKey, number>;

export default function getCategoryCounts(
  posts: CollectionEntry<"blog">[]
): CategoryCounts {
  const counts = Object.fromEntries(
    CONTENT_CATEGORY_KEYS.map(category => [category, 0])
  ) as CategoryCounts;

  for (const post of posts) {
    if (post.data.category) counts[post.data.category] += 1;
  }

  return counts;
}
