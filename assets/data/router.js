export default [
  {
    path: "/posts/1",
    name: "Posts",
  },
  {
    path: "/categories",
    name: "Categories",
  },
  {
    path: "/tags",
    name: "Tags",
  },
  {
    path: "/series",
    name: "Series",
  },
  {
    path: "/wiki",
    name: "Wiki",
    children: [
      {
        path: "/wiki/timeline",
        name: "Timeline",
        meta: {},
      },
      {
        path: "/wiki/wiki",
        name: "wiki",
        meta: {},
      },
    ],
  },
  {
    path: "/tools",
    name: "Tools",
    children: [
      {
        path: "/tools/json",
        name: "JSON解析",
        meta: {},
      },
      {
        path: "/tools/rsa",
        name: "RSA测试",
        meta: {},
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    meta: {},
  }
]
