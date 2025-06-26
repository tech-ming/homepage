import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/homepage/",

  lang: "zh-CN",
  title: "",
  description: "tech-ming 的博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
