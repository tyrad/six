<template>
  <section class="container list"
           :class="{'column-flex': flexList}">
    <h1 class="title" v-if="title">
      {{ title }}
    </h1>
    <slot />
  </section>
</template>

<script>
export default {
  name: "List",
  props: {
    title: {
      type: String,
      default: ''
    },
    flexList: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .column-flex {
    display: flex;
    flex-direction: column;
  }
</style>
