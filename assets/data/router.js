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
      {
        path: "index-wiki-timeline",
        name: "Timeline",
        meta: {},
      },
      {
        path: "index-wiki-wiki",
        name: "wiki",
        meta: {},
      },
    ],
  },
  {
    path: "index-tools",
    name: "Tools",
    children: [
      {
        path: "index-tools-json",
        name: "JSON解析",
        meta: {},
      },
      {
        path: "index-tools-rsa",
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
