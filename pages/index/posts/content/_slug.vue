<template>
  <section class="container post">
    <article>
      <header>
        <div class="post-title">
          <h1 class="title">{{ article.title }}</h1>
        </div>
        <div class="post-meta">
          <div class="date">
              <span class="posted-on">
                <fa class="fa" :icon="['fas', 'calendar-alt']" />
                <time datetime="2020-06-25 11:32:22">
                  {{ article.date | toParseTime }}
                </time>
              </span>
          </div>
          <div class="categories" v-if="article.categories && article.categories.length > 0">
            <fa class="fa" :icon="['fas', 'folder']" />
            <span :key="index" v-for="(item, index) of article.categories">
              <NuxtLink :to="{ name: 'index-categories-slug', params:{slug: item } }"> {{ item }} </NuxtLink>
              <span v-if="index !== article.categories.length - 1" class="separator">•</span>
            </span>
          </div>
          <div class="tags" v-if="article.tags && article.tags.length > 0">
            <fa class="fa" :icon="['fas', 'tag']" />
            <span :key="index" v-for="(tag, index) of article.tags">
              <NuxtLink :to="{ name: 'index-tags-slug', params:{slug: tag } }"> {{ tag }} </NuxtLink>
              <span v-if="index !== article.tags.length - 1" class="separator">•</span>
            </span>
          </div>
        </div>
      </header>
      <div style="width: 100%;">
        <!--  <pre> {{ article }} </pre>-->
        <aside ref="body-wrapper" id="body-wrapper">
          <div id="contents" class="body-content co-width-10">
            <nuxt-content :document="article" />
            <prev-next :prev="prev" :next="next" />
          </div>
          <div class="sidebar co-width-2" style="padding-left: 12px;">
            <div ref="toc-slider" id="toc-slider" class="toc-fixed">
              <nav id="TableOfContents" v-show="tocVisible">
                <div>
                  <ul>
                    <li v-for="link of article.toc" :key="link.id"
                        :style="{'text-indent': `${(link.depth - 1) * 8}px`}"
                        :class="{ 'py-2': link.depth === 2, 'ml-2 pb-2': link.depth === 3 }">
                      <a :href="`#${link.id}`"> {{ link.text }} </a>
                    </li>
                  </ul>
                </div>
              </nav>
              <a href="#" id="tap-to-top" style="display: inline;">
                <fa :icon="['fas', 'arrow-up']" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </article>
  </section>
</template>

<script>

export default {
  async asyncData ({ $content, params, error }) {
    //const article = await $content('articles/go', params.slug).fetch()
    //添加支持deep查询,注意:文件名称不能相同
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
    return { article, prev, next }
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
      const hideToc = !this.article || !(this.article.hideToc === true) || (!this.article.toc || this.article.toc.length === 0) || false;
      return hideToc && this.pageLoaded;
    }
  },
  watch: {
    slug () {
      this.handleTocFixed();
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
      window.onload = (e) => {
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
      };
    }
  }
}
</script>

<style scoped>

</style>
