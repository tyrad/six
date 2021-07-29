<template>
  <ArticleList title="Posts"
               :articles="articles">
    <ul class="pagination">
      <li>
        <nuxt-link :to="{name: 'index-posts-p', params: {p: pageNum - 1} }"
                   v-if="pageNum !== 1">«
        </nuxt-link>
      </li>
      <li v-for="index in pageCount">
        <nuxt-link :to="{name: 'index-posts-p', params: {p: index }}" v-if="index !== pageNum">{{ index }}</nuxt-link>
        <span style="margin-right: 5px;" v-if="index === pageNum">{{ index }}</span>
      </li>
      <li>
        <nuxt-link :to="{name: 'index-posts-p', params: {p: pageNum + 1}}"
                   v-if="pageNum !== pageCount">»
        </nuxt-link>
      </li>
    </ul>
  </ArticleList>
</template>

<script>
const pagination = {
  getPostsOfPage ($content, page) {
    return $content('articles', { deep: true })
      .only(['title', 'date', 'slug'])
      .sortBy('date', 'desc')
      .skip(10 * (page - 1))
      .limit(10)
      .fetch()
  },
  async getNumberOfPages ($content) {
    return Math.ceil((await $content('articles', { deep: true }).only([]).fetch()).length / 10)
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
