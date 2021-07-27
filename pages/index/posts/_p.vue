<template>
  <List :title="'Posts'">
    <ul>
      <li v-for="item of articles" :key="item.title">
        <span class="date">{{ item.date | toParseTime}}</span>
        <NuxtLink class="title" :to="{ name: 'index-posts-content-slug', params: { slug: item.slug } }">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>

    <ul class="pagination">
      <li>
        <a :href="`/posts/${pageNum - 1}`" v-if="pageNum !== 1">«</a>
      </li>
      <li v-for="index in pageCount">
        <a :href="`/posts/${index}`" v-if="index !== pageNum">{{ index }}</a>
        <span style="margin-right: 5px;" v-if="index === pageNum">{{ index }}</span>
      </li>
      <li>
        <a :href="`/posts/${pageNum + 1}`" v-if="pageNum !== pageCount">»</a>
      </li>
    </ul>
  </List>
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
    return Math.ceil((await $content('articles').only([]).fetch()).length / 10)
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
