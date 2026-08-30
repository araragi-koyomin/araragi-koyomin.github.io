import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";
import { CONTENT_CATEGORY_KEYS, CONTENT_TYPE_KEYS } from "@/constants/content";
import { isCelesteCollectionId } from "@/constants/celeste";
import { WOTA_SECTION_KEYS } from "@/constants/wota";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z
      .object({
        author: z.string().default(SITE.author),
        pubDatetime: z.date(),
        modDatetime: z.date().optional().nullable(),
        title: z.string(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
        category: z.enum(CONTENT_CATEGORY_KEYS),
        subcategory: z.string().min(1).optional(),
        wotaSection: z.enum(WOTA_SECTION_KEYS).optional(),
        contentType: z.enum(CONTENT_TYPE_KEYS),
        status: z.string().min(1).optional(),
        rating: z.number().min(0).max(10).optional(),
        recommendationScore: z.number().min(0).max(10).optional(),
        celesteCollection: z
          .string()
          .min(1)
          .refine(isCelesteCollectionId, {
            message: "celesteCollection 必须使用合集注册表中的编号。",
          })
          .optional(),
        celesteDifficulty: z.string().min(1).optional(),
        celesteGameplay: z.string().min(1).optional(),
        spoiler: z.boolean().default(false),
        sourceLinks: z
          .array(
            z.object({
              label: z.string().min(1),
              url: z.string().url(),
            })
          )
          .optional(),
        heroImage: image().optional(),
        heroImageAlt: z.string().min(1).optional(),
        heroImageCaption: z.string().min(1).optional(),
        ogImage: image().or(z.string()).optional(),
        description: z.string(),
        canonicalURL: z.string().optional(),
        hideEditPost: z.boolean().optional(),
        timezone: z.string().optional(),
      })
      .superRefine((data, context) => {
        if (data.category === "wota" && !data.wotaSection) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["wotaSection"],
            message:
              "WOTA艺文章必须填写 wotaSection，并归入我的作品、我喜欢的作品或副歌技汇总。",
          });
        }

        if (data.category !== "wota" && data.wotaSection) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["wotaSection"],
            message: "只有 WOTA艺文章可以填写 wotaSection。",
          });
        }

        const isCelesteMap =
          data.category === "games" && data.subcategory === "celeste";
        const celesteFields = [
          ["celesteCollection", data.celesteCollection],
          ["celesteDifficulty", data.celesteDifficulty],
          ["celesteGameplay", data.celesteGameplay],
        ] as const;

        if (isCelesteMap && !data.draft) {
          celesteFields.forEach(([field, value]) => {
            if (!value) {
              context.addIssue({
                code: z.ZodIssueCode.custom,
                path: [field],
                message: `公开的 Celeste 地图文章必须填写 ${field}。`,
              });
            }
          });

          if (data.rating === undefined) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["rating"],
              message: "公开的 Celeste 地图文章必须填写总体评分 rating。",
            });
          }
        }

        if (!isCelesteMap) {
          celesteFields.forEach(([field, value]) => {
            if (value) {
              context.addIssue({
                code: z.ZodIssueCode.custom,
                path: [field],
                message: `只有 Celeste 地图文章可以填写 ${field}。`,
              });
            }
          });
        }

        if (data.heroImage && !data.heroImageAlt && !data.draft) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["heroImageAlt"],
            message: "公开文章设置 heroImage 后必须填写 heroImageAlt。",
          });
        }

        if (!data.heroImage && (data.heroImageAlt || data.heroImageCaption)) {
          const field = data.heroImageAlt ? "heroImageAlt" : "heroImageCaption";
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: `${field} 只能与 heroImage 一起使用。`,
          });
        }
      }),
});

export const collections = { blog };
