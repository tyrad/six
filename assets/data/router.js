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
    path: "index-wiki",
    name: "Wiki",
    children: [
      // {
      //   path: "index-wiki-some",
      //   name: "Timeline",
      // },
      {
        path: "index-wiki-p",
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
    ],
  },
  {
    path: "index-about",
    name: "About",
    meta: {},
  }
]
