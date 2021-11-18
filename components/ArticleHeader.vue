<template>
  <header>
    <div class="post-title">
      <h1 class="title">{{ article.title }}</h1>
    </div>
    <div class="post-meta">
      <div class="date">
              <span class="posted-on">
                <fa class="fa" :icon="['fa', 'calendar-alt']" />
                <time datetime="2020-06-25 11:32:22">
                  {{ article.date | toParseTime }}
                </time>
              </span>
      </div>

      <div class="categories" v-if="!isWikiHeader && article.categories && article.categories.length > 0">
        <fa class="fa" :icon="['fa', 'folder']" />
        <span :key="index" v-for="(item, index) of article.categories">
              <NuxtLink :to="{ name: 'index-categories-slug', params:{slug: item } }"> {{ item }} </NuxtLink>
              <span v-if="index !== article.categories.length - 1" class="separator">•</span>
            </span>
      </div>
      <div class="categories" v-else>
        <fa class="fa" :icon="['fa', 'folder']" />
        <NuxtLink :to="{ name: 'wiki', hash:`#${wikiCategory}` }"> {{ wikiCategory }}</NuxtLink>
      </div>

      <div class="tags" v-if="article.tags && article.tags.length > 0">
        <fa class="fa" :icon="['fa', 'tag']" />
        <span :key="index" v-for="(tag, index) of article.tags">
              <NuxtLink :to="{ name: 'index-tags-slug', params:{slug: tag } }"> {{ tag }} </NuxtLink>
              <span v-if="index !== article.tags.length - 1" class="separator">•</span>
            </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "ArticleHeader",
  props: {
    article: {
      type: Object,
      default: {}
    },
    isWikiHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    wikiCategory () {
      let path = this.article.path;
      path = path.slice('/wiki/'.length)
      path = path.substr(0, path.indexOf("/"));
      console.log(path)
      return path
    }
  }
}
</script>

<style scoped>

</style>
