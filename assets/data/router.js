export default [
  {
    path: "index-posts-p",
    name: "Posts",
    params: { p: 1 }
  },
  {
    path: "index-categories",
    name: "Categories",
  },
  {
    path: "index-tags",
    name: "Tags",
  },
  {
    path: "index-series",
    name: "Series",
  },
  {
    path: "wiki",
    name: "Wiki",
    children: [
      {
        path: "wiki-p",
        name: "Timeline",
        params: { p: 1 }
      },
      // {
      //   path: "index-wiki",
      //   name: "wiki",
      //   meta: {},
      // },
    ],
  },
  {
    path: "tools",
    name: "Tools",
    children: [
      {
        path: "tools-json",
        name: "JSON解析",
        meta: {},
      },
      {
        path: "tools-rsa",
        name: "RSA测试",
        meta: {},
      },
      {
        path: "https://wangchujiang.com/linux-command/",
        name: "linux命令",
        outLink: true,
        meta: {},
      },
    ],
  },
  {
    path: "about",
    name: "About",
    meta: {},
  }
]
