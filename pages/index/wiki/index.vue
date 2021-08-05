<template>
  <section class="wiki-index">
    <div style="min-width: 600px; width: 70%;margin: 0 auto;" id="wiki-content">
      <div class="bar7" style="position: relative;">
        <input type="text" onblur="onBlur()" oninput="OnInput(event)" placeholder="请输入您要搜索的内容...">
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
              <nuxt-link :to="{name: 'index-wiki-content-slug', params: {slug: at.slug }}">{{ at.title }}</nuxt-link>
            </li>
            <li class="pagelist" v-for="sub of item.children" :key="sub.folderName">
                <span class="wiki-collection">
                    <fa class="fa" :icon="['fas', 'folder']" />&nbsp;
                    {{ sub.folderName }}
                </span>
              <ul>
                  <span v-for="at of sub.articles" :key="at.title">
                    <nuxt-link
                      :to="{name: 'index-wiki-content-slug', params: {slug: at.slug }}">{{ at.title || at.slug }}</nuxt-link>
                  &nbsp;/&nbsp;
                  </span>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div id="toc" style="padding-top:1rem;padding-right: 40px;overflow: auto;left: 88%;"
         class="sidebar-content toc-fixed">
      <nav id="TableOfContents">
        <ul>
          <li v-for="item of sortedArticles">
            <a :href="`#${item.folderName}`">{{ item.folderName }}</a>
          </li>
        </ul>
      </nav>
    </div>

  </section>
</template>

<script>

export default {
  name: "wiki",
  async asyncData ({ $content, params }) {
    const articles = await $content('wiki', { deep: true })
      .only(['title', 'date', 'slug'])
      .sortBy('date', 'desc')
      .fetch();
    return { articles }
  },
  data () {
    return {
      sortedArticles: []
    }
  },
  mounted () {
    this.sortedArticles = this.sortArticles(this.articles);
  },
  methods: {
    sortArticles (articles) {
      // let articles = [
      //   {
      //     "slug": "记录值是否存在另一个表中",
      //     "date": "2020-11-10T09:15:46.000Z",
      //     "title": "记录值是否存在另一个表中",
      //     "path": "/wiki/database/sql/记录值是否存在另一个表中",
      //     "extension": ".md"
      //   },
      //   {
      //     "slug": "时间处理.md",
      //     "date": "2020-11-10T08:35:45.000Z",
      //     "title": "时间处理",
      //     "path": "/wiki/database/oracle/时间处理.md",
      //     "extension": ".md"
      //   }];
      /*
      [
        {
          folderName: 'xx'
          articles:[ '1', '2', '3']
          children: [
             {
                folderName: 'xx'
                articles:[ '1', '2', '3']
                children: [
                   {

                   }
                ]
             }
          ]
        }
      ]
      */
      let sortedArticles = []
      for (const article of articles) {
        let path = article.path;
        let paths = path.substr('/wiki/'.length, path.length).split('/')
        paths.pop()
        // xx1 -> xx
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
}
</script>

<style scoped>
  .content {
    margin: 0 auto;
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
