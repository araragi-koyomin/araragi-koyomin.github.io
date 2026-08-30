import type { CollectionEntry } from "astro:content";
import {
  CONTENT_TYPE_KEYS,
  GAME_SUBCATEGORY_DEFINITIONS,
  getContentTypeLabel,
  type ContentCategoryKey,
  type ContentTypeKey,
} from "@/constants/content";
import { slugifyStr } from "./slugify";

export const CONTENT_BROWSE_FACET_KEYS = ["tags", "types", "archive"] as const;

export type ContentBrowseFacetKey = (typeof CONTENT_BROWSE_FACET_KEYS)[number];

export interface ContentBrowseFacetItem {
  value: string;
  label: string;
  count: number;
  href: string;
}

export interface ContentBrowseFacetGroup {
  key: ContentBrowseFacetKey;
  label: string;
  items: ContentBrowseFacetItem[];
}

const incrementCount = (counts: Map<string, number>, value: string) => {
  counts.set(value, (counts.get(value) ?? 0) + 1);
};

export function getCategoryBrowseFacets(
  category: ContentCategoryKey,
  posts: CollectionEntry<"blog">[]
): ContentBrowseFacetGroup[] {
  const categoryPosts = posts.filter(post => post.data.category === category);
  const tagNames = new Map<string, string>();
  const tagCounts = new Map<string, number>();
  const typeCounts = new Map<ContentTypeKey, number>();
  const yearCounts = new Map<string, number>();

  categoryPosts.forEach(post => {
    if (category === "games" && post.data.subcategory) {
      const game = slugifyStr(post.data.subcategory);
      tagNames.set(game, post.data.subcategory);
      incrementCount(tagCounts, game);
    } else {
      post.data.tags.forEach(tagName => {
        const tag = slugifyStr(tagName);
        tagNames.set(tag, tagName);
        incrementCount(tagCounts, tag);
      });
    }

    typeCounts.set(
      post.data.contentType,
      (typeCounts.get(post.data.contentType) ?? 0) + 1
    );
    incrementCount(yearCounts, String(post.data.pubDatetime.getFullYear()));
  });

  const tags =
    category === "games"
      ? [
          ...GAME_SUBCATEGORY_DEFINITIONS.flatMap(game => {
            const count = tagCounts.get(game.key) ?? 0;
            return count > 0 || game.alwaysShow
              ? [
                  {
                    value: game.key,
                    label: game.label,
                    count,
                    href: game.href,
                  },
                ]
              : [];
          }),
          ...Array.from(tagCounts, ([value, count]) => ({
            value,
            label: tagNames.get(value) ?? value,
            count,
            href: `/posts/games/tags/${value}/`,
          }))
            .filter(
              item =>
                !GAME_SUBCATEGORY_DEFINITIONS.some(
                  game => game.key === item.value
                )
            )
            .sort((a, b) => a.label.localeCompare(b.label, "zh-CN")),
        ]
      : Array.from(tagCounts, ([value, count]) => ({
          value,
          label: tagNames.get(value) ?? value,
          count,
          href: `/posts/${category}/tags/${value}/`,
        })).sort((a, b) => a.label.localeCompare(b.label, "zh-CN"));

  const types = CONTENT_TYPE_KEYS.flatMap(value => {
    const count = typeCounts.get(value);
    const label = getContentTypeLabel(value);

    return count && label
      ? [
          {
            value,
            label,
            count,
            href: `/posts/${category}/types/${value}/`,
          },
        ]
      : [];
  });

  const years = Array.from(yearCounts, ([value, count]) => ({
    value,
    label: `${value}年`,
    count,
    href: `/posts/${category}/archive/${value}/`,
  })).sort((a, b) => Number(b.value) - Number(a.value));

  return [
    { key: "tags", label: "主题标签", items: tags },
    { key: "types", label: "内容类型", items: types },
    { key: "archive", label: "发布时间", items: years },
  ];
}

export function filterPostsByCategoryFacet(
  posts: CollectionEntry<"blog">[],
  category: ContentCategoryKey,
  facet: ContentBrowseFacetKey,
  value: string
) {
  return posts.filter(post => {
    if (post.data.category !== category) return false;

    if (facet === "tags") {
      if (category === "games") {
        return slugifyStr(post.data.subcategory ?? "") === value;
      }

      return post.data.tags.some(tag => slugifyStr(tag) === value);
    }

    if (facet === "types") {
      return post.data.contentType === value;
    }

    return String(post.data.pubDatetime.getFullYear()) === value;
  });
}
