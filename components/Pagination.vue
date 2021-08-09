<template>
  <ul class="pagination">
    <li>
      <nuxt-link :to="{name: routeName, params: {p: pageNum - 1} }"
                 v-if="pageNum !== 1">«
      </nuxt-link>
    </li>
    <li v-for="index in pageCount">
      <nuxt-link :to="{name: routeName, params: {p: index }}" v-if="index !== pageNum">{{ index }}</nuxt-link>
      <span style="margin-right: 5px;" v-if="index === pageNum">{{ index }}</span>
    </li>
    <li>
      <nuxt-link :to="{name: routeName, params: {p: pageNum + 1}}"
                 v-if="pageNum !== pageCount">»
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageNum: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: Number,
      default: 0
    },
    routeName: {
      type: String,
      default: 'index-wiki-p'
    },
  }
}
</script>

<style scoped>

</style>
