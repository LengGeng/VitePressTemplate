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
    nav,
    socialLinks: [
      {icon: 'github', link: 'https://github.com/vuejs/vitepress'},
      {icon: 'twitter', link: '...'},
      {
        icon: {
          svg: '<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 44C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 22V4H33V22L27 15.7273L21 22Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4H38" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        },
        link: '...'
      }
    ],
  }
})