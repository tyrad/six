# six

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

# 其他

```
create-nuxt-app v3.7.1
✨  Generating Nuxt.js project in six
? Project name: six
? Programming language: TypeScript
? Package manager: Yarn
? UI framework: None
? Nuxt.js modules: (Press <space> to select, <a> to toggle all, <i> to invert se
lection)
? Linting tools: (Press <space> to select, <a> to toggle all, <i> to invert sele
ction)
? Testing framework: Jest
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Static (Static/Jamstack hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert
selection)
? Continuous integration: GitHub Actions (GitHub only)
? What is your GitHub username? tyrad
? Version control system: Git


  To get started:

	cd six
	yarn dev

  To build & start for production:

	cd six
	yarn build
	yarn start

  To test:

	cd six
	yarn test


  For TypeScript users.

  See : https://typescript.nuxtjs.org/cookbook/components/
✨  Done in 402.25s.
 
```


https://www.nuxtjs.cn/guide/installation


生成静态页面 yarn run generate


`node-sass assets/styles/main.scss static/main.css`

如果有引文件的需求:
`node-sass assets/style/coder.scss  static/coder.css --output-style compressed`
`node-sass assets/style/coder-dark.scss  static/coder-dark.min.css --output-style compressed`


https://nuxtjs.org/blog/creating-blog-with-nuxt-content

可获取全部文件
https://zh.nuxtjs.org/blog/creating-blog-with-nuxt-content#list-all-the-blog-posts

如何使用Nuxt建立个人博客
https://www.houzhenni.com/blog/nuxt-blog-static-website
