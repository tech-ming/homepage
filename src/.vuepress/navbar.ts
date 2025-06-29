import { navbar } from "vuepress-theme-hope";

export default navbar([
  // {
  //   text: "欢迎页",
  //   icon: "weui:home-filled",
  //   link: "/views/homepage",
  // },
  {
    text: "博客",
    icon: "ri:blogger-fill",
    link: "/",
  },
  {
    text: "项目",
    icon: "ant-design:project-outlined",
    prefix: "/views/",
    children: [
      {
        text: "导航盒",
        icon: "",
        prefix: "app/navigationbox/",
        children: [
          { text: "隐私协议", icon: "shield", link: "privacyAgreement" },
        ],
      },
      {
        text: "一家人",
        icon: "",
        prefix: "app/familynest/",
        children: [
          { text: "隐私协议", icon: "shield", link: "privacyAgreement" },
          { text: "下载", icon: "line-md:download", link: "download" },
          { text: "测试", icon: "material-icon-theme:test-ts", link: "umeng-test" },
        ],
      },
    ],
  },
  {
    text: "Hope文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
