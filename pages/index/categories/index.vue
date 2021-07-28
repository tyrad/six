<template>
  <List title="Categories">
    <ul>
      <li v-for="item of sortedCategories"
          :key="item.title">
        <span class="date">
          {{ item.date | toParseTime}}
        </span>
        <NuxtLink class="title"
                  :to="{ name: 'index-categories-slug', params: { slug: item.name } }">
          {{ item.name }}({{ item.count }})
        </NuxtLink>
      </li>
    </ul>
  </List>
</template>

<script>
export default {
  name: "Categories",
  async asyncData ({ $content, params }) {
    const categories = await $content('articles', { deep: true })
      .only(['categories', 'date'])
      .sortBy('date', 'desc')
      .fetch()
    return { categories }
  },
  computed: {
    sortedCategories () {
      const allCate = {}
      for (const cate of this.categories) {
        if (!cate.categories) {
          continue
        }
        for (const name of cate.categories) {
          const existed = allCate[name];
          if (existed) {
            existed.count += 1
          } else {
            allCate[name] = {
              name: name,
              date: cate.date,
              count: 1
            }
          }
        }
      }
      const sortable = [];
      for (const key in allCate) {
        sortable.push(allCate[key]);
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

