import {DefaultTheme, defineConfig} from 'vitepress'

// 顶部导航配置
const nav: DefaultTheme.NavItem[] = [
  {text: "入门", link: "/入门/", activeMatch: "/入门/"},
  {
    text: "配置",
    items: [
      {text: "基础配置", link: "/配置/基础配置"},
      {text: "详细配置", link: "/配置/详细配置"},
      {text: "进阶配置", link: "/配置/进阶配置"}
    ],
    activeMatch: "/配置/"
  },
  {
    text: "模板",
    items: [
      {
        text: "模板一",
        items: [
          {text: "文本", link: "/模板/模板一/文本"},
          {text: "按钮", link: "/模板/模板一/按钮"},
          {text: "布局", link: "/模板/模板一/布局"}
        ]
      },
      {
        text: "模板二",
        items: [
          {text: "文本", link: "/模板/模板二/文本"},
          {text: "按钮", link: "/模板/模板二/按钮"},
          {text: "布局", link: "/模板/模板二/布局"}
        ]
      }
    ],
    activeMatch: "/模板/"
  }
];

export default defineConfig({
  title: 'VitePress Template',
  description: 'VitePress 项目模板，包含一些基础配置。你可以通过它快速创建一个 VitePress 项目。',
  lang: 'cn-ZH',
  base: '/',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'WebSite Title',
    nav
  }
})