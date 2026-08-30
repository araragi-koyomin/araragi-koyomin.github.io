import satori from "satori";
import { SITE } from "@/config";
import { BRAND_COLORS, BRAND_KICKER } from "@/constants/brand";
import loadGoogleFonts from "../loadGoogleFont";

export default async () => {
  const host = new URL(SITE.website).hostname;
  const categories = "学习 · 游戏 · WOTA艺 · 动漫";
  const fontText = `${SITE.title}${SITE.desc}${BRAND_KICKER}${categories}${host}`;

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
          padding: "64px 72px",
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
                fontSize: 26,
                fontWeight: 700,
                color: BRAND_COLORS.ogMuted,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: 40,
                      height: 28,
                      display: "flex",
                      marginRight: 16,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: 20,
                            height: 28,
                            border: `4px solid ${BRAND_COLORS.ogInk}`,
                            borderRightWidth: 2,
                            borderRadius: "8px 0 0 3px",
                          },
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            width: 20,
                            height: 28,
                            border: `4px solid ${BRAND_COLORS.ogInk}`,
                            borderLeftWidth: 2,
                            borderRadius: "0 8px 3px 0",
                          },
                        },
                      },
                    ],
                  },
                },
                BRAND_KICKER,
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                maxWidth: 1000,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 78,
                      lineHeight: 1.15,
                      fontWeight: 700,
                      letterSpacing: -2,
                    },
                    children: SITE.title,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      marginTop: 24,
                      maxWidth: 960,
                      color: BRAND_COLORS.ogMuted,
                      fontSize: 30,
                      lineHeight: 1.45,
                    },
                    children: SITE.desc,
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
                justifyContent: "space-between",
                borderTop: `3px solid ${BRAND_COLORS.ogRule}`,
                paddingTop: 24,
                fontSize: 24,
                fontWeight: 700,
              },
              children: [
                { type: "div", props: { children: categories } },
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
