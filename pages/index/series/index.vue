<template>
  <List title="Series">
    <ul>
      <li v-for="item of sortedCategories"
          :key="item.title">
        <span class="date">
          {{ item.date | toParseTime}}
        </span>
        <NuxtLink class="title"
                  :to="{ name: 'index-series-slug', params: { slug: item.name } }">
          {{ item.name }}({{ item.count }})
        </NuxtLink>
      </li>
    </ul>
  </List>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const series = await $content('articles', { deep: true })
      .only(['series', 'date'])
      .sortBy('date', 'desc')
      .fetch()
    return { series }
  },
  computed: {
    sortedCategories () {
      const allSeries = {}
      for (const cate of this.series) {
        for (const name of cate.series) {
          const existed = allSeries[name];
          if (existed) {
            existed.count += 1
          } else {
            allSeries[name] = {
              name: name,
              date: cate.date,
              count: 1
            }
          }
        }
      }
      const sortable = [];
      for (const key in allSeries) {
        sortable.push(allSeries[key]);
      }
      sortable.sort(function (a, b) {
        return b.count - a.count;
      });
      return sortable;
    }
  }
}
</script>

<style scoped lang="scss">
</style>

