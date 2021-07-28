<template>
  <section class="container list">
    <h1 class="title" v-if="title">
      {{ title }}
    </h1>
    <slot/>
  </section>
</template>

<script>
export default {
  name: "List",
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
