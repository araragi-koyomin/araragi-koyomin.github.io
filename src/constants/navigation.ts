export const SITE_NAV_ITEMS = [
  { href: "/", label: "首页" },
  { href: "/posts/", label: "文章" },
  { href: "/about/", label: "关于" },
] as const;

export const PATH_LABELS: Record<string, string> = {
  posts: "文章",
  tags: "标签",
  types: "内容类型",
  archive: "发布时间",
  archives: "归档",
  search: "搜索",
  about: "关于",
  learning: "学习",
  games: "游戏",
  celeste: "Celeste 地图汇总",
  wota: "WOTA艺",
  anime: "动漫",
  note: "笔记",
  experience: "经历",
  solution: "题解",
  review: "评价",
  summary: "汇总",
  work: "作品",
};
