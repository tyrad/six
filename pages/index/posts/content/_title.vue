<template>
  <section class="container post">
    <article>
      <!--  模板  -->
      <header>
        <div class="post-title">
          <h1 class="title">{{ article.title }}</h1>
        </div>
        <div class="post-meta">
          <div class="date">
              <span class="posted-on">
                <fa class="fa" :icon="['fas', 'calendar-alt']" />
                <time datetime="2020-06-25 11:32:22">
                  {{ article.date }}
                </time>
              </span>
          </div>
          <div class="categories">
            <fa class="fa" :icon="['fas', 'folder']" />
            <span :key="index" v-for="(item, index) of article.categories">
              <a href="/categories/%e8%bd%af%e4%bb%b6/"> {{ item }} </a>
              <span v-if="index != article.categories.length - 1" class="separator">•</span>
            </span>
          </div>
          <div class="tags">
            <fa class="fa" :icon="['fas', 'tag']" />
            <span :key="index" v-for="(tag, index) of article.tags">
              <a href="/categories/%e8%bd%af%e4%bb%b6/"> {{ tag }} </a>
              <span v-if="index != article.tags.length - 1" class="separator">•</span>
            </span>
          </div>
        </div>
      </header>

      <div style="width: 100%;">
        <aside ref="body-wrapper" id="body-wrapper">
          <div id="contents" class="body-content co-width-10">
            <nuxt-content :document="article" />
          </div>
          <div class="sidebar co-width-2" style="padding-left: 12px;">
            <div ref="toc-slider" id="toc-slider" class="toc-fixed">
              <nav id="TableOfContents" v-if="showToc">
                <div>
                  <ul>
                    <li v-for="link of article.toc" :key="link.id"
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
  validate ({ params }) {
    return !/^\d+$/.test(params.title)
  },
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.title).fetch()
    return { article }
  },
  data(){
    return {
      showToc: false
    }
  },
  created () {
    this.$nextTick(() => {
      const toc = this.$refs["toc-slider"];
      if (!toc){
        return;
      }
      const topWrapper = this.$refs["body-wrapper"];
      if (topWrapper) {
        this.showToc = true;
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
    })
  }
}
</script>

<style scoped>

</style>
