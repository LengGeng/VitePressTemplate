# 使用 VitePress 构建在线文档

## 什么是 VitePress？

> [VitePress](https://vitejs.cn/vitepress/) 是 [VuePress](https://vuepress.vuejs.org/) 小兄弟, 基于 [Vite](https://github.com/vitejs/vite) 构建。可以理解为是基于 Vite 构建的 VuePress。
>
> `VuePress=Webpack+Vue2`, `VitePress=Vite+Vue3`

## 快速上手

1. 创建目录并进入

   ~~~shell
   mkdir project_name && cd project_name
   ~~~

2. 初始化项目

   像初始化普通的 Node 项目一样初始化它。

   ~~~shell
   pnpm init
   ~~~

3. 添加 VitePress 开发依赖

   ~~~shell
   pnpm i vitepress -D
   ~~~

4. 创建目录及文件

   在项目根目录下创建目录 `docs`，并在 `docs` 目录中创建 `index.md` 文件。

   ~~~shell
   # echo 写入内容到项目的 docs/index.md 中
   mkdir docs && echo '# Hello VitePress' > docs/index.md
   ~~~

5. 添加 scripts

   在 `package.json` 中添加项目的启动、打包、预览命令；

   ~~~json
   {
     "scripts": {
       "dev": "vitepress dev docs",
       "build": "vitepress build docs",
       "serve": "vitepress serve docs"
     }
   }
   ~~~

   上面的 `scripts` 配置中，`dev` 是以开发模式启动 `Vitepress`；`build` 是为项目进行打包编译；`serve` 是对打包后的结果启动服务进行预览。跟在命令参数 `vitepress xxx` 后的 `docs` 就是上一步在根目录创建的目录名 `docs`。

6. 启动服务

   在控制台执行命令 `pnpm dev` 启动服务，控制台会输出地址，前往该地址即可预览。

   至此，基本的站点已经搭建完毕。

## 配置

详情配置可查看：[Site Config | VitePress](https://vitepress.dev/reference/site-config)

### 配置文件

`VitePress` 的配置文件是 `.vitepress/config.ts`，`.vitepress` 目录会在运行一次后会自动创建，也可以手动进行创建。

在该目录下新建文件 `config.ts`。（使用 ts 是为了更好的类型提示，也可以使用 js）

~~~ts
import {defineConfig} from 'vitepress'

export default defineConfig({
    title: 'VitePress Template',
    description: 'VitePress 项目模板，包含一些基础配置。你可以通过它快速创建一个 VitePress 项目。',
    lang: 'cn-ZH',
    base: '/',
    lastUpdated: true
})
~~~

这时项目的目录结构会是这样

~~~
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  └─ index.md
└─ package.json
~~~

#### 基本配置

上述配置文件中指定了基本的站点配置，它们的作用分别如下所示

##### title

- 类型: `string`
- 默认值: `VitePress`

站点的标题。 这是所有页面标题的前缀，并显示在导航栏中。

##### description

- 类型: `string`
- 默认值: `A VitePress site`

站点的描述。 将作为 `<meta>` 标记渲染在页面  `HTML` 中。

##### lang

- 类型: `string`
- 默认: `en-US`

站点的 `lang` 属性。这个属性将作为 `<html lang="en-US"> ` 标记渲染到页面 HTML 中。

注意，`lang` 属性只会通过 `vitepress build` 构建站点时添加， 通过 `vitepress dev ` 渲染时不会出现。

##### base

- 类型: `string`
- 默认值: `/`

站点部署时的 `base url`。如果计划将站点部署到子路径（ `https://xxx.com/abc/`），则需要更改这个选项。

若将站点部署到（ `https://xxx.com/abc/`）, 需要设置 `base` 为 `'/abc/'`。这会使得你的链接得到正确的跳转。

注意，`base`需要以 `/` 开始并以 `/` 结尾。

因为 `base` 会自动的被插入到到其他配置中所有以 `/` 开始的链接之前，所以你只需要指定一次。

### 静态资源处理

#### 路由规则

`VitePress` 以 `/docs` 为根目录。

`/` 以 `docs` 开始，即文件 `/docs/test.md` 使用 `/test.md` 表示。后缀 `.md` 可以省略，若文件名为 `index.md` 时文件名也可以省略。

#### 静态资源

静态资源文件推荐放入 `/docs/public` 文件夹中。

存放在 `public `下的静态资源将原样复制到 `dist `目录的根目录。

**注意**，你应该使用根绝对路径引用放置在 `public` 文件夹中的文件。

例如，文件 `public/logo.png` 在源代码中应该始终作为 `/logo.png ` 被引用。

> 可以在 MarkDown、Html等地方使用。
>
> - `md`：`![Logo](/logo.png)`
> - `html`：`<img :src="/logo.png" />`

#### BaseUrl

如果你的站点部署在非根URL，你需要在 `.vitepress/config.js`中设置`base`选项。例如，如果你计划部署你的站点到`https://foo.github.io/bar/`，`base`选项就应该设置为`'/bar/'`(始终以`/`开始和结尾)。

设置基础URL后，为了引用`public`中的图像，你就需要使用类似`/bar/image.png`的URL。 但是，当你觉得改变`base`值时，这样会很脆弱。 为此，VitePress提供了一个内置的助手`$withBase`(注入在Vue原型上)，用于生成正确的路径：

```html
<img :src="$withBase('/foo.png')" alt="foo" />
```

注意，你不仅可以在主题组件中使用以上语法，还可以在Markdown文件中使用。

### 创建文件

接下来，我们新建一些 `.md` 文件来支持后续的配置，这些文件的内容展示配置其文件名即可。

这是 `docs` 目录下所有 `.md` 文件。

~~~
│  index.md                               
│                                         
├─.vitepress                              
│  │  config.ts                                     
├─入门
│      index.md
├─配置
│      基础配置.md
│      详细配置.md
│      进阶配置.md
└─模板
    ├─模板一
    │      布局.md
    │      按钮.md
    │      文本.md
    └─模板二
            布局.md
            按钮.md
            文本.md
~~~

### 导航

导航是一直显示在页面顶部的导航栏。它包含网站标题，全局菜单链接等。

#### 网站标题和Logo

如果您想更改导航的标题，您可以配置 `themeConfig.siteTitle` 中定义自定义文本。

- 类型：`string | false`
- 默认值：同 `config.title` 中的值。

~~~ts
export default defineConfig({
    themeConfig: {
        siteTitle: 'WebSite Title'
    }
})
~~~

如需配置网站 `Logo`，可以通过传入图像的路径来显示它。

你应该将 `Logo` 放置在 `public` 目录中，并在 `themeConfig.logo` 中配置其绝对路径。

- 类型：`string`
- 默认值

~~~js
export default defineConfig({
    themeConfig: {
        logo: '/logo.svg'
    }
})
~~~

默认情况下，同时配置网站标题和 `Logo` 时，他们会同时显示。

![网站标题和Logo](/images/入门/网站标题和Logo.png)

若只需要 `Logo` 并隐藏网站标题文本，需要将网站标题的值设置为 `false`。

~~~js
export default defineConfig({
    themeConfig: {
        logo: '/logo.svg',
        siteTitle: false,
    }
})
~~~

#### 导航链接

您可以定义 `themeConfig.nav` 配置项添加导航链接。其类型是 `DefaultTheme.NavItem[]`。

我们可以将 `nav` 单独配置并在 `config` 中进行引用，也可以提取到另外的文件中导入使用。

~~~js
import {defineConfig, DefaultTheme} from 'vitepress'

// 顶部导航配置
const nav: DefaultTheme.NavItem[] = [];

export default defineConfig({
    themeConfig: {
        logo: '/logo.svg',
        siteTitle: 'WebSite Title',
        nav
    }
})

~~~

##### 基本链接

一个基本的导航链接对象包括 `text`、`link` 两个属性。

- `text` 代表显示的文本，`link` 代表体安装的链接。
- `link` 为 `.md` 文件的绝对地址。

~~~js
const nav: DefaultTheme.NavItem[] = [
    {text: "入门", link: "/入门/"}
];
~~~

![导航-基本链接](/images/入门/导航-基本链接.png)

##### 下拉菜单

导航链接也可以是下拉菜单。通过 `items` 配置项配置多个导航链接，以在下拉显示。

~~~js
const nav: DefaultTheme.NavItem[] = [
    {
        text: "配置",
        items: [
            {text: "基础配置", link: "/指南/基础配置"},
            {text: "详细配置", link: "/指南/详细配置"},
            {text: "进阶配置", link: "/指南/进阶配置"}
        ]
    },
];
~~~

![导航-下拉菜单](/images/入门/导航-下拉菜单.png)

##### 下拉菜单分组

在下拉菜单中还可以通过 `items` 配置项再次嵌套，这样的话其中的导航链接将会进行分组显示。

~~~js
const nav: DefaultTheme.NavItem[] = [
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
        ]
    }
];
~~~

![导航-下拉菜单分组](/images/入门/导航-下拉菜单分组.png)

##### 链接的活动状态

当前页面位于匹配路径下时，导航菜单项将突出显示。

通过 `nav[].activeMatch` 配置项配置匹配的正则表达式字符串。

注意：只能在 `nav` 根对象中配置，`items` 下中配置无效。

注意：该值应为正则表达式字符串，但必须将其定义为字符串。因为在构建时不可序列化 `RegExp` 对象。

~~~js
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
~~~

![导航-链接的活动状态](/images/入门/导航-链接的活动状态.png)

#### 社交链接

社交链接可以友好的结合网站图标展示一些社交网站链接，通过 `socialLinks` 配置项进行配置。

支持的社交网站包括：

- `discord`
- `facebook`
- `github`
- `instagram`
- `linkedin`
- `mastodon`
- `slack`
- `twitter`
- `youtube`

你也可以通过指定 `svg` 字符串来配置自定义图标。

~~~js
export default defineConfig({
    themeConfig: {
        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'},
            {icon: 'twitter', link: '...'},
            {
                icon: {
                    svg: '<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 44C8.89543 44 8 43.1046 8 42V6C8 4.89543 8.89543 4 10 4H38C39.1046 4 40 4.89543 40 6V42C40 43.1046 39.1046 44 38 44H10Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21 22V4H33V22L27 15.7273L21 22Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 4H38" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                },
                link: '...'
            }
        ]
    }
})
~~~

![社交链接](/images/入门/社交链接.png)

#### 页脚配置

你可以通过 `footer` 配置项在页脚上添加消息或版权文本，但是，只有当页面不包含侧边栏时才会显示。这是由于设计问题。

~~~js
export default defineConfig({
    themeConfig: {
        footer: {
            message: '底部信息',
            copyright: 'Copyright © 2023 XXX'
        }
    }
})
~~~

![页脚配置](/images/入门/页脚配置.png)

#### 编辑链接

你可以通过 `edit` 配置项配置一个可以指向编辑页面的链接。

~~~js
export default defineConfig({
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        }
    }
})
~~~

![编辑链接](/images/入门/编辑链接.png)

#### 最后编辑时间

> 你可以通过 `lastUpdate` 配置项添加在上次更新时间之前显示的前缀文本。
>
> 该配置好像从 `git commit` 中获取编辑的事件，所以需配合 `git` 使用。
>
> ~~~js
> export default defineConfig({
>     themeConfig: {
>         lastUpdatedText: '上次更新:'
>     }
> })
> ~~~

最新的配置可以使用 `lastUpdated.text` 来设置文本，还可以通过 `formatOptions` 参数指定时间格式化。

~~~js
export default defineConfig({
  themeConfig: {
    lastUpdated: {
      text: '上次更新:'
    }
  }
})
~~~

### 侧边菜单

侧边栏是文档的主要导航块。它包含网站标题，全局菜单链接等。

侧边栏是文档的主要导航块。可以通过 `themeConfig.sidebar` 配置项进行配置。其类型是 `DefaultTheme.Sidebar`。

#### 全局侧边菜单

边栏菜单的最简单形式是传入链接数组。这样配置的菜单可视为全局菜单，会在每个页面进行显示。

第一个级别的项目定义了侧边栏的“部分”，包含 `text`、 `items` 属性。

同样的，我们也可以将 `sidebar` 单独配置并在 `config` 中进行引用，或提取到另外的文件中导入使用。

- `text`：标题，部分的标题。
- `items`：可以理解为下级菜单，包含下级的导航链接，可以进行多级嵌套。

~~~js
const global_sidebar: DefaultTheme.Sidebar = [
    {
        text: "入门",
        items: [
            {text: "入门指南", link: "/入门/"}
        ]
    },
    {
        text: "配置",
        items: [
            {text: "基础配置", link: "/配置/基础配置"},
            {text: "详细配置", link: "/配置/详细配置"},
            {text: "进阶配置", link: "/配置/进阶配置"}
        ]
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
        ]
    }
];
~~~

![全局侧边栏](/images/入门/全局侧边栏.png)

#### 多级嵌套

~~~js
const global_sidebar: DefaultTheme.Sidebar = [
    {
        text: "一级标题",
        items: [
            {
                text: "二级标题",
                items: [
                    {
                        text: "三级标题",
                        items: [
                            {
                                text: "四级标题",
                                items: [
                                    {
                                        text: "五级标题",
                                        items: [
                                            {
                                                text: "六级标题",
                                                items: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
~~~

![侧边栏嵌套](/images/入门/侧边栏嵌套.png)

#### 折叠菜单

> ~~可以通过 `collapsible` 属性配置该组是否展示 `折叠/展示` 菜单。~~
>
> ~~可以通过 `collapsed` 属性配置该组是否默认折叠。~~

可以通过 `collapsed` 属性配置该组是否可以折叠以及默认是否折叠。

如果未指定该属性，则组不可折叠；如果指定属性的值，则组可以折叠。

如果为 `true`，则默认情况下是折叠的；如果为 `false`，则默认情况下是展开的。

~~~js
const global_sidebar: DefaultTheme.Sidebar = [
  {
    text: "入门",
    items: [
      {text: "入门指南", link: "/入门/"}
    ],
    collapsed: false
  },
  {
    text: "配置",
    items: [
      {text: "基础配置", link: "/配置/基础配置"},
      {text: "详细配置", link: "/配置/详细配置"},
      {text: "进阶配置", link: "/配置/进阶配置"}
    ],
    collapsed: true
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
    collapsed: true
  },
  {
    text: "一级标题",
    items: [
      {
        text: "二级标题",
        items: [
          {
            text: "三级标题",
            items: [
              {
                text: "四级标题",
                items: [
                  {
                    text: "五级标题",
                    items: [
                      {
                        text: "六级标题",
                        items: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    collapsed: true
  }
];
~~~

![侧边栏-折叠](/images/入门/侧边栏-折叠.png)

#### 多侧边栏

除了上述的全局菜单栏，也可以为每个路径单独配置独有的菜单栏。

格式： `{"路径": 侧边菜单配置}`。

这时的 `sidebar` 是一个对象，键为路径，值为改路径下的侧边菜单配置，菜单配置与上述的全局菜单配置相同，只不过该菜单只会在处于该路径下显示。

~~~js
const sidebar: DefaultTheme.Sidebar = {
    "/入门": [
        {
            text: "入门",
            items: [
                {text: "入门指南", link: "/入门/"}
            ],
            collapsed: true
        }
    ],
    "/配置": [
        {
            text: "配置",
            items: [
                {text: "基础配置", link: "/配置/基础配置"},
                {text: "详细配置", link: "/配置/详细配置"},
                {text: "进阶配置", link: "/配置/进阶配置"}
            ],
            collapsed: true
        }
    ],
    "/模板": [
        {
            text: "模板一",
            items: [
                {text: "文本", link: "/模板/模板一/文本"},
                {text: "按钮", link: "/模板/模板一/按钮"},
                {text: "布局", link: "/模板/模板一/布局"}
            ],
            collapsed: true
        },
        {
            text: "模板二",
            items: [
                {text: "文本", link: "/模板/模板二/文本"},
                {text: "按钮", link: "/模板/模板二/按钮"},
                {text: "布局", link: "/模板/模板二/布局"}
            ],
            collapsed: true
        }
    ]
};
~~~

![多侧边栏](/images/入门/多侧边栏.png)

#### 上一页/下一页

当配置好侧边菜单时，文章末尾会出现 `上一页/下一页` 的按钮。

显示的文字可以通过 `docFooter` 配置项进行配置。

~~~js
export default defineConfig({
    themeConfig: {
        sidebar,
        docFooter: {prev: '上一篇', next: '下一篇'},
    }
})
~~~

![上一页下一页](/images/入门/上一页下一页.png)

#### 大纲目录

~~~js
export default defineConfig({
  themeConfig: {
    outline: {
      level: 'deep',
      label: '目录'
    }
  }
})
~~~

## 首页配置

文档首页(`docs/index.md`)，可以使用 `Frontmatter` 进行编写让其更为美观。

`Frontmatter` 的本质上就是在 `md` 文件中编写 `yaml`、`json` 配置，书写在两个 `---` 之间，且必须放在文件顶部。

可以通过 `Frontmatter` 指定文档的标题、布局、按钮等属性。

详情配置可查看：

- [Frontmatter Configs | VitePress (vuejs.org)](https://vitepress.vuejs.org/config/frontmatter-configs)
- [Frontmatter | VitePress中文网 (vitejs.cn)](https://vitejs.cn/vitepress/guide/frontmatter.html)

index.md

~~~yaml
---
layout: home

title: VitePress Template
titleTemplate: 通过创建模板快速在线文档
editLink: true
lastUpdated: true
hero:
  name: VitePress Template
  text: VitePress 项目模板
  tagline: 通过模板快速创建在线文档
  image:
    src: /logo.svg
    alt: Logo
  actions:
    - theme: brand
      text: 快速入门
      link: /入门/
    - theme: alt
      text: 配置
      link: /配置/基础配置
features:
  - icon: 🔨
    title: 功能 1
    details: 功能 1 具体描述信息。
  - icon: 🧩
    title: 功能 2
    details: 功能 2 具体描述信息。
  - icon: ✈️
    title: 功能 3。
    details: 功能 3 具体描述信息。
---
~~~

![主页](/images/入门/主页.png)