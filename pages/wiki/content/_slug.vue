<template>
  <div class="content">
    <section class="container post">
      <article>
        <ArticleHeader :article="article" />
        <aside ref="body-wrapper" id="body-wrapper">
          <div id="contents" ref="contents"
               :class="{'co-width-12': pageLoaded && !tocVisible }"
               class="body-content co-width-10">
            <nuxt-content :document="article" />
            <prev-next routerName="wiki-content-slug" :prev="prev" :next="next" />
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
              <a href="#" id="tap-to-top">
                <fa :icon="['fas', 'arrow-up']" />
              </a>
            </div>
          </div>
        </aside>
      </article>
    </section>
  </div>
</template>

<script>

// TODO: 待修改完主题风格，可以精简重复代码

import ArticleHeader from "@/components/ArticleHeader"

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
    const [prev, next] = await $content('wiki', { deep: true })
      .only(['title', 'slug'])
      .sortBy('date', 'asc')
      .surround(params.slug)
      .fetch()
    return { article, prev, next, scrollTop }
  },
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
      })
    }
  },
  mounted () {
    this.hashScrollInitial();
    this.pageLoaded = true;
    this.handleTocFixed();
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
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
      window.addEventListener("scroll", this.onScroll);
      this.onScroll();
    },
    onScroll () {
      // for layout
      const topWrapperOffsetTop = this.$refs["body-wrapper"].offsetTop;
      const toc = this.$refs["toc-slider"];
      const scrollTop1 = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop1 > topWrapperOffsetTop - 15) {
        toc.classList.add("toc-fixed");
      } else {
        toc.classList.remove("toc-fixed");
      }
      // for hash
      let scrollTop = window.pageYOffset - topWrapperOffsetTop;
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
      }
    }
  }
}
</script>

<style scoped>

</style>
