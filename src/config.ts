export const SITE = {
  website: "https://araragi-koyomin.github.io",
  author: "往目琛",
  profile: "https://github.com/araragi-koyomin",
  desc: "往目琛的个人图书馆，整理和分享学习、游戏、生活记录与个人文章。",
  title: "私立直江津高校",
  // An empty value makes general pages use the local dynamic `/og.png` route.
  ogImage: "",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "在 GitHub 上编辑",
    url: "https://github.com/araragi-koyomin/araragi-koyomin.github.io/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "zh-CN",
  timezone: "Asia/Shanghai",
} as const;
