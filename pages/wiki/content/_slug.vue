<template>
  <div class="content">
    <div class="wiki-category-aside" ref="aside">
      <div class="navigation">
        <div @click="mxGoBack">
          <fa class="fa" icon="arrow-left" />
          <span style="margin-left: 8px;">Go back</span>
        </div>
        <div style="padding: 0 20px;" @click="mxGohome">
          Home
        </div>
      </div>
      <Tree :treeData="sideCategory" :selected="article.title"/>
    </div>

    <div class="wiki-content-aside" ref="wiki-content">
      <section class="container post" style="width:100%;">
        <article>
          <ArticleHeader :article="article" />
          <aside ref="body-wrapper" id="body-wrapper">
            <div id="contents" ref="contents"
                 :class="{'co-width-12': pageLoaded && !tocVisible }"
                 class="body-content co-width-10">
              <nuxt-content :document="article" />
              <!-- <prev-next routerName="wiki-content-slug" :prev="prev" :next="next" /> -->
            </div>
            <div class="sidebar co-width-2"
                 style="padding-left: 12px;"
                 v-show="pageLoaded && tocVisible">
              <div ref="toc-slider" class="toc-fixed">
                <nav id="TableOfContents">
                  <ul>
                    <li v-for="link of article.toc" :key="link.id"
                        :style="{'text-indent': `${(link.depth - 1) * 8}px`}"
                        :class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }">
                      <a :href="`#${link.id}`"> {{ link.text }} </a>
                    </li>
                  </ul>
                </nav>
                <a href="#" id="tap-to-top" @click="clickToTop">
                  <fa icon="arrow-up" />
                </a>
              </div>
            </div>
          </aside>
        </article>
      </section>
    </div>
  </div>
</template>

<script>

// TODO: 待修改完主题风格，可以精简重复代码

import ArticleHeader from "@/components/ArticleHeader"
import goBackMixin from "@/mixin/goback"
import sort from "@/utils/sortArticle"
import { isScrolledIntoView }from "@/utils/index.js";

const generateAside = async (dir, $content) => {
  // 查到所在目录dir: /wiki/iOS/Abc ->  iOS
  let wikiSubDirName = dir.substring('/wiki/'.length)
  if (wikiSubDirName.indexOf("/") > -1) {
    wikiSubDirName = wikiSubDirName.substring(0, wikiSubDirName.indexOf("/"))
  }
  const relatedArticles = await $content('wiki' , { deep: true })
    /// 坑点： dev启动是有path的。generate默认没有path，需要手动加上
    .only(['title', 'date', 'slug', 'path'])
    // .sortBy('title', 'desc')
    .fetch();
  let sorted  = sort.sortArticles(relatedArticles);
  return sorted.filter(item => {
    return item.folderName === wikiSubDirName
  })
}

export default {
  components: { ArticleHeader },
  async asyncData ({ $content, params, error }) {
    const scrollTop = params.scrollTop;
    const articles = await $content('wiki', { deep: true })
      .where({ slug: params.slug })
      .limit(1)
      .fetch();
    if (articles.length === 0) {
      error({ statusCode: 404, message: '' });
    }
    const article = articles[0];
    // todo add promise all
    const sideCategory = await generateAside(article.dir, $content)
    const [prev, next] = await $content('wiki', { deep: true })
      .only(['title', 'slug', 'date'])
      .sortBy('date', 'asc')
      .surround(params.slug)
      .fetch()
    return { article, prev, next, scrollTop, sideCategory }
  },
  mixins: [goBackMixin],
  data () {
    return {
      pageLoaded: false,
      hTags: []
    }
  },
  computed: {
    slug () {
      return this.article.slug;
    },
    tocVisible () {
      const hideToc = !this.article || this.article.hideToc === true || (!this.article.toc || this.article.toc.length === 0) || false;
      return !hideToc;
    }
  },
  watch: {
    slug () {
      this.pageLoaded = true;
      this.$nextTick(() => {
        this.handleTocFixed();
        this.updateLeftSideSelected();
      })
    }
  },
  mounted () {
    this.hashScrollInitial();
    this.pageLoaded = true;
    this.handleTocFixed();
    this.updateLeftSideSelected();
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    updateLeftSideSelected() {
      const eles = document.getElementsByClassName('side-highlighted')
      if(eles.length) {
        isScrolledIntoView(eles[0]);
      }
    },
    clickToTop() {
      this.$refs["wiki-content"].scrollTop = 0
    },
    hashScrollInitial () {
      const hash = this.$route.hash;
      if (hash) {
        const el = document.getElementById(decodeURI(hash).substr(1));
        if (el) {
          window.scrollTo(0, el.offsetTop + this.$refs["body-wrapper"].offsetTop)
        }
      }
    },
    handleTocFixed () {
      this.hTags = this.$refs["contents"].querySelectorAll("h1,h2,h3,h4,h5");
      // window.addEventListener("scroll", this.onScroll);
      this.$refs["wiki-content"].addEventListener("scroll", this.onScroll);
      this.onScroll();
    },
    onScroll () {
      // for layout
      const topWrapperOffsetTop = this.$refs["body-wrapper"].offsetTop;
      const toc = this.$refs["toc-slider"];
      //const scrollTop1 = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollTop1 = this.$refs["wiki-content"].scrollTop;
      if (scrollTop1 > topWrapperOffsetTop - 15) {
        toc.classList.add("toc-fixed");
      } else {
        toc.classList.remove("toc-fixed");
      }
      //let scrollTop = window.pageYOffset - topWrapperOffsetTop;
      let scrollTop = scrollTop1 - topWrapperOffsetTop;
      let result = Array.from(this.hTags).filter(i => {
        return i.offsetTop < scrollTop;
      })
      if (result.length === 0) {
        return;
      }
      const seg = result.pop();
      let element = toc.querySelectorAll("a");
      for (const ele of element) {
        ele.classList.remove("highlighted");
      }
      let ele2 = toc.querySelector(`a[href='#${(seg.id)}']`)
      if (ele2) {
        ele2.classList.add("highlighted");
        isScrolledIntoView(ele2);
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .wiki-content-aside {
    margin: 0;
    padding-right: 0;
    max-width: 100% !important;
    padding-bottom: 20px;

  }
</style>
