<template>
  <section class="container post">
    <article>
      <ArticleHeader :article="article" />
      <aside ref="body-wrapper" id="body-wrapper">
        <div id="contents"
             :class="{'co-width-12': pageLoaded && !tocVisible }"
             class="body-content co-width-10">
          <nuxt-content :document="article" />
          <prev-next :prev="prev" :next="next" />
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
</template>

<script>

import ArticleHeader from "../../../../components/ArticleHeader"

export default {
  components: { ArticleHeader },
  async asyncData ({ $content, params, error }) {
    const scrollTop = params.scrollTop;
    const articles = await $content('articles', { deep: true })
      .where({ slug: params.slug })
      .limit(1)
      .fetch();
    if (articles.length === 0) {
      error({ statusCode: 404, message: '' });
    }
    const article = articles[0];
    const [prev, next] = await $content('articles', { deep: true })
      .only(['title', 'slug'])
      .sortBy('date', 'asc')
      .surround(params.slug)
      .fetch()
    return { article, prev, next, scrollTop }
  },
  data () {
    return {
      pageLoaded: false
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
      this.handleTocFixed();
      if (this.scrollTop) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    }
  },
  mounted () {
    this.handleTocFixed();
  },
  methods: {
    handleTocFixed () {
      const toc = this.$refs["toc-slider"];
      if (!toc) {
        return;
      }
      const topWrapper = this.$refs["body-wrapper"];
      if (topWrapper) {
        this.pageLoaded = true;
        const topWrapperOffsetTop = this.$refs["body-wrapper"].offsetTop;
        const updateLayout = (e) => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop > topWrapperOffsetTop - 15) {
            toc.classList.add("toc-fixed");
          } else {
            toc.classList.remove("toc-fixed");
          }
        };
        window.addEventListener("scroll", updateLayout);
        updateLayout();
      }
      this.updateScroll(toc);
    },
    updateScroll (toc) {
      let orgHtml = document.querySelectorAll("h1,h2,h3,h4,h5");
      window.addEventListener("scroll", function (e) {
        let scrollTop = window.pageYOffset;
        for (let i = 0; i < orgHtml.length; i++) {
          const seg = orgHtml[i];
          let nextSeg = orgHtml.length > i + 1 ? orgHtml[i + 1] : null;
          let currentTag = null;
          if (nextSeg) {
            if (scrollTop > seg.offsetTop - 40 && scrollTop < nextSeg.offsetTop) {
              currentTag = seg;
            }
          } else {
            if (scrollTop > seg.offsetTop - 40) {
              currentTag = seg;
            }
          }
          if (currentTag) {
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
      });
    }
  }
}
</script>

<style scoped>

</style>
