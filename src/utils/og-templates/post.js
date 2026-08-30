import satori from "satori";
import { SITE } from "@/config";
import { BRAND_COLORS } from "@/constants/brand";
import { getContentCategory } from "@/constants/content";
import loadGoogleFonts from "../loadGoogleFont";

export default async post => {
  const category = getContentCategory(post.data.category)?.label ?? "个人文章";
  const heading = `${SITE.title} · 图书馆`;
  const authorLine = `作者：${post.data.author}`;
  const host = new URL(SITE.website).hostname;
  const fontText = `${post.data.title}${category}${heading}${authorLine}${host}`;

  return satori(
    {
      type: "div",
      props: {
        style: {
          background: BRAND_COLORS.ogPaper,
          color: BRAND_COLORS.ogInk,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          borderLeft: `18px solid ${BRAND_COLORS.darkAccent}`,
          fontFamily: "Noto Sans SC",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 25,
                fontWeight: 700,
              },
              children: [
                heading,
                {
                  type: "div",
                  props: {
                    style: {
                      border: `3px solid ${BRAND_COLORS.ogInk}`,
                      borderRadius: 999,
                      padding: "8px 18px",
                      color: BRAND_COLORS.ogMuted,
                    },
                    children: category,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                flex: 1,
                maxWidth: 1040,
                padding: "36px 0",
                overflow: "hidden",
                fontSize: 64,
                lineHeight: 1.25,
                fontWeight: 700,
                letterSpacing: -1,
              },
              children: post.data.title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: `3px solid ${BRAND_COLORS.ogRule}`,
                paddingTop: 22,
                color: BRAND_COLORS.ogMuted,
                fontSize: 24,
              },
              children: [
                { type: "div", props: { children: authorLine } },
                { type: "div", props: { children: host } },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(fontText),
    }
  );
};
