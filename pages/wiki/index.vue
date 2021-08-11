<template>
  <section class="wiki-index">
    <div class="wiki-category-aside">
      <NuxtLink :to="{ name: 'index' }"
                style="padding-top: 20px;display: flex;align-items:center;justify-content:center;">
        <fa class="fa" :icon="['fas', 'arrow-left']" />
        <span style="margin-left: 8px;">Go back</span>
      </NuxtLink>
      <ul>
        <li v-for="item of sortedArticles">
          <a :href="`#${item.folderName}`">{{ item.folderName }}</a>
        </li>
      </ul>
    </div>

    <div style="position:absolute;left:250px;right: 0;top:0;bottom: 0;overflow: auto;">
      <!--      <div style="min-width: 600px; width: 70%;" id="wiki-content">-->
      <div style="margin: 20px;" id="wiki-content">
        <div class="bar7" style="position: relative;">
          <input type="text" onblur="onBlur()" oninput="OnInput(event)" placeholder="请输入您要搜索的内容..." />
          <div id="search-res" style="position: absolute;top:40px">
            <ul class="dropdown-content">
            </ul>
          </div>
        </div>

        <div class="wiki-category" v-for="item of sortedArticles" :key="item.folderName">
          <h3 class="wiki-category-name" :id="item.folderName">{{ item.folderName }}</h3>
          <div class="wiki-category-list">
            <ul>
              <li class="pagelist" v-for="at of item.articles" :key="at.title">
                <nuxt-link :to="{name: 'wiki-content-slug', params: {slug: at.slug }}">{{ at.title }}</nuxt-link>
              </li>
              <li class="pagelist" v-for="sub of item.children" :key="sub.folderName">
                <span class="wiki-collection">
                    <fa class="fa" :icon="['fas', 'folder']" />&nbsp;
                    {{ sub.folderName }}
                </span>
                <ul>
                  <span v-for="at of sub.articles" :key="at.title">
                    <nuxt-link
                      :to="{name: 'wiki-content-slug', params: {slug: at.slug }}">{{ at.title || at.slug }}</nuxt-link>
                  &nbsp;/&nbsp;
                  </span>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>

const sort = {
  sortArticles (articles) {
    let sortedArticles = []
    for (const article of articles) {
      let path = article.path;
      let paths = path.substr('/wiki/'.length, path.length).split('/')
      paths.pop()
      let subFolder = sortedArticles;
      for (let [idx, p] of paths.entries()) {
        let el = this.getFolder(p, subFolder);
        subFolder = el.children;
        if (idx === paths.length - 1) {
          el['articles'].push(article);
        }
      }
    }
    return sortedArticles;
  },
  getFolder (name, children) {
    let filtered = children.filter(item => {
      return item['folderName'] === name
    });
    if (filtered.length === 0) {
      // 没有找到
      let newEle = {
        folderName: name,
        articles: [],
        children: []
      };
      children.push(newEle)
      return newEle;
    } else {
      return filtered[0];
    }
  }
}

export default {
  name: "wiki",
  async asyncData ({ $content, params }) {
    const articles = await $content('wiki', { deep: true })
      /// 坑点： dev启动是有path的。generate默认没有path，需要手动加上
      .only(['title', 'date', 'slug', 'path'])
      .sortBy('date', 'desc')
      .fetch();
    const sortedArticles = sort.sortArticles(articles);
    return { sortedArticles }
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped lang="scss">

  .wiki-category-aside {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 250px;
    overflow: auto;

    ul {
      list-style: none;
      padding-left: 20px;
    }

    li {
      list-style: none;
      margin: 10px 15px;
      font-size: 14px;
    }

    a {
      color: $fg-color;
    }
  }

  .wiki-category-name {
    float: right;
    text-align: right;
    word-wrap: break-word;
  }

  .wiki-category-list li.pagelist {
    width: 85%;
    margin-right: 1.5em;
  }

  .wiki-category-list ul {
    padding-left: 1em;
  }

  .wiki-category {
    border-bottom: 1px solid #ccc;
    min-height: 3em;
  }

  .wiki-category:last-child {
    border-bottom: none;
  }

  .wiki-category-list ul li {
    margin-top: 0;
  }

  .wiki-category-name {
    margin-top: 0;
  }

  .wiki-collection {
    font-weight: 500;
  }

  @media only screen and (max-width: 1000px) {
    /*主内容700px宽度*/
    #toc {
      display: none;
    }
  }

  .wiki-category-name {
    padding-top: 100px;
    margin-top: -100px;
  }

  #TableOfContents {
    margin-top: 40px;
  }

  #wiki-content a {
    color: #333333;
    font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
    Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Arial;
    font-weight: 400;
  }

  body.colorscheme-dark #wiki-content a {
    color: #dadada;
  }

  #wiki-content ol,
  #wiki-content ul {
    list-style: none;
    /*padding-left: 20px;*/
  }

  /*    search bar  */
  .bar7 {
    padding-bottom: 42px;
    width: 80%;
    padding-left: 10%;
  }

  .bar7 form {
    position: relative;
    width: 100%;
    margin: 0 auto;
    height: 42px;
  }

  .bar7 input {
    border: none;
    outline: none;
  }

  .bar7 input {
    width: 100%;
    height: 42px;
    padding-left: 13px;
  }

  .bar7 input {
    border-radius: 42px;
    border: 2px solid #324B4E;
    /*background: white;*/
    float: right;
  }

  .bar7 button {
    background: none;
    top: -2px;
    right: 0;
  }

  .bar7.dropdown {
    /*background-color: white;*/
    color: black;
    width: 100%;
  }

</style>
