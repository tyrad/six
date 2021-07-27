<template>
  <List title="Tags">
    <div class="tag-wrap">
      <a class="tag" v-for="item of sortedTags" :key="item.name">
        {{ item.name }}({{ item.count }})
      </a>
    </div>
  </List>
</template>

<script>
export default {
  name: "Tags",
  async asyncData ({ $content, params }) {
    const tags = await $content('articles', { deep: true })
      .only(['tags'])
      .fetch()
    console.log(tags)
    return { tags }
  },
  computed: {
    sortedTags () {
      let tags = this.tags.map(item => {
        return item.tags
      }).flat();
      const counts = {};
      tags.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });
      const sortable = [];
      for (const key in counts) {
        sortable.push({ name: key, count: counts[key] });
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
  .tag-wrap {
    text-align: center;
    margin: 2rem;

    .tag {
      font-size: 1.8rem;
      flex: 2;
      color: #333;
      font-family: Lato, Helvetica, sans-serif;
      font-weight: 700;
      display: inline-block;
    }

    .tag + .tag {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
  }
</style>
