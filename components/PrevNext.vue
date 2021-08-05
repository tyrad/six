<template>
  <div class="flex justify-between">
    <NuxtLink
      v-if="prev"
      :to="{ name:routerName, params: { slug: prev.slug} }"
      class="font-bold text-primary hover:underline"
    >
      上一篇{{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="{ name: routerName, params: { slug: next.slug } }"
      class="font-bold hover:underline"
    >
      下一篇{{ next.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  name: "PrevNext",
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    },
    routerName: {
      type :String,
      default: "index-posts-content-slug"
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }

  .justify-between {
    justify-content: space-between;
  }
</style>
