<template>
  <ArticleList title="Wiki"
               router-name="wiki-content-slug"
               :articles="articles">

    <Pagination
      route-name='wiki-p'
      :page-num="pageNum"
      :page-count="pageCount" />

  </ArticleList>
</template>

<script>
import Pagination from "@/components/Pagination"

const pagination = {
  getPostsOfPage ($content, page) {
    return $content('wiki', { deep: true })
      .only(['title', 'date', 'slug'])
      .sortBy('date', 'desc')
      .skip(15 * (page - 1))
      .limit(15)
      .fetch()
  },
  async getNumberOfPages ($content) {
    return Math.ceil((await $content('wiki', { deep: true }).only([]).fetch()).length / 15)
  },
}

export default {
  components: { Pagination },
  validate ({ params }) {
    return /^\d+$/.test(params.p)
  },
  async asyncData ({ $content, params }) {
    const pageNum = +params.p || 1;
    const [articles, pageCount] = await Promise.all([
      pagination.getPostsOfPage($content, pageNum),
      pagination.getNumberOfPages($content),
    ]);
    for (let item of articles) {
      item.path = item.path.slice('/wiki/'.length);
      item.path = item.path.substr(0, item.path.lastIndexOf("/" + item.slug));
      item.title = `【${item.path}】${item.title}`;
    }
    return { articles, pageNum, pageCount }
  }
}
</script>

<style scoped>

</style>
