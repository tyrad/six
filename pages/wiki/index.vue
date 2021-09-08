<template>
  <section class="content">

    <div class="wiki-category-aside" ref="aside">
      <div @click="mxGoBack" class="navigation">
        <fa class="fa" :icon="['fas', 'arrow-left']" />
        <span style="margin-left: 8px;">Go back</span>
      </div>
      <ul>
        <li v-for="item of sortedArticles">
          <a :href="`#id-${item.folderName}`">{{ item.folderName }}</a>
        </li>
      </ul>
    </div>

    <div ref="wiki-content-wrap" id="wiki-content-wrap"
         class="wiki-content-aside">
      <div style="margin: 20px;" id="wiki-content">

<!--        <div class="bar7" style="position: relative;">-->
<!--          <input type="text" :onblur="onInput" v-model="searchKey" :oninput="onInput()" placeholder="请输入您要搜索的内容..." />-->
<!--          <div id="search-res" style="position: absolute;top:40px">-->
<!--            <ul class="dropdown-content">-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->

        <div class="wiki-category" v-for="item of sortedArticles" :key="item.folderName">
          <h3 :id="`id-${item.folderName}`">{{ item.folderName }}</h3>
          <div class="wiki-category-list">
            <ul>
              <li class="pagelist" v-for="at of item.articles" :key="at.title">
                <nuxt-link :to="{name: 'wiki-content-slug', params: {slug: at.slug }}">{{ at.title }}
                </nuxt-link>
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

import goBackMixin from "@/mixin/goback"
import sort from "@/utils/sortArticle"
import { isScrolledIntoView }from "@/utils/index.js";

export default {
  name: "wiki",
  mixins: [goBackMixin],
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
    return {
      searchKey: '',
      hTags: [],
      sideCategories: [],
      sortedArticles: []
    }
  },
  mounted () {
    this.asideList = this.$refs["aside"].querySelectorAll('a');
    this.hTags = this.$refs["wiki-content-wrap"].querySelectorAll("h3");
    document.getElementById("wiki-content-wrap").addEventListener("scroll", this.onScroll);
    this.onScroll();
  },
  methods: {
    onScroll () {
      // for layout
      const topWrapperOffsetTop = document.getElementById("wiki-content-wrap").scrollTop;
      let scrollTop = topWrapperOffsetTop + 100;
      let result = Array.from(this.hTags).filter(i => {
        return i.offsetTop < scrollTop;
      })
      if (result.length === 0) {
        return;
      }
      const seg = result.pop();
      for (const ele of this.asideList) {
        ele.classList.remove("highlighted");
      }
      let ele2 = this.$refs["aside"].querySelector(`a[href='#${(seg.id)}']`)
      if (ele2) {
        ele2.classList.add("highlighted");
        if (!isScrolledIntoView(ele2)) {
          ele2.scrollIntoView();
        }
      }
    },
    async onInput () {
      const articles = await this.$content('articles').search('title', this.searchKey).fetch()
    }
  }
}
</script>

<style scoped lang="scss">

  main.colorscheme-dark a {
    color: inherit;
  }

  .wiki-category {
    border-bottom: 1px solid #ccc;
    min-height: 3em;

    :last-child {
      border-bottom: none;
    }

    h3 {
      float: right;
      text-align: right;
      word-wrap: break-word;
      padding-top: 100px;
      margin-top: -100px;
    }

    .wiki-category-list {
      ul li {
        margin-top: 0;
      }

      ul {
        padding-left: 1em;
      }

      li.pagelist {
        width: 85%;
        margin-right: 1.5em;
        display: block;

        ul {
          margin: 0;
        }

        a {
          color: inherit;
        }
      }
    }
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

  #wiki-content {
    a {
      font-weight: 400;
    }

    ol,
    ul {
      list-style: none;
    }
  }

  /*body.colorscheme-dark #wiki-content a {*/
  /*  color: #dadada;*/
  /*}*/


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

  a.highlighted {
    color: #79aae6;
  }
</style>
