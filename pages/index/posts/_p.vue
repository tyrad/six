<template>
  <ArticleList title="Posts"
               :articles="articles">
    <Pagination
      route-name='index-posts-p'
      :page-num="pageNum"
      :page-count="pageCount" />
  </ArticleList>
</template>

<script>
const pagination = {
  getPostsOfPage ($content, page) {
    return $content('articles', { deep: true })
      .only(['title', 'date', 'slug'])
      .sortBy('date', 'desc')
      .skip(20 * (page - 1))
      .limit(20)
      .fetch()
  },
  async getNumberOfPages ($content) {
    return Math.ceil((await $content('articles', { deep: true }).only([]).fetch()).length / 20)
  },
}

export default {
  validate ({ params }) {
    return /^\d+$/.test(params.p)
  },
  async asyncData ({ $content, params }) {
    const pageNum = +params.p || 1;
    const [articles, pageCount] = await Promise.all([
      pagination.getPostsOfPage($content, pageNum),
      pagination.getNumberOfPages($content),
    ]);
    return { articles, pageNum, pageCount }
  }
}
</script>

<style scoped>

</style>
