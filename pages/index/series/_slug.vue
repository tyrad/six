<template>
  <ArticleList
    :preLink="{'name':'Series:','path': 'index-series'}"
    :title="slug"
    :articles="articles" />
</template>

<script>
import ArticleList from "@/components/ArticleList"

export default {
  components: { ArticleList },
  async asyncData ({ $content, params }) {
    const slug = params.slug;
    const articles = await $content('articles', { deep: true })
      .only(['title', 'slug', 'date'])
      .where({ series: { $containsAny: [slug] } })
      .sortBy('date', 'desc')
      .fetch()
    return {
      articles,
      slug
    }
  },
}
</script>

<style scoped>

</style>
