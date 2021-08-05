<template>
  <section class="container list">
    <h1 class="title" v-if="title">
      <NuxtLink v-if="preLink"
                :to="{ name: preLink.path}">
        {{ preLink.name }}
      </NuxtLink>
      {{ title }}
    </h1>
    <ul>
      <li v-for="item of articles" :key="item.title">
        <span class="date">{{ item.date | toParseTime}}</span>
        <NuxtLink class="title"
                  :to="{ name: routerName, params: { slug: item.slug , path: item.path } }">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
    <slot/>
  </section>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    preLink: {
      type: Object,
      default: () => null
    },
    title: {
      type: String,
      default: ''
    },
    articles: {
      type: Array,
      default: () => []
    },
    routerName: {
      type :String,
      default: "index-posts-content-slug"
    }
  }
}
</script>

<style scoped>

</style>

