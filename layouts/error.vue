<template>
  <section class="container centered">
    <div class="error">
      <h1>{{ error.statusCode }}</h1>
      <h2 v-if="error.statusCode === 404">Page Not Found</h2>
      <h2 v-else>An error occurred</h2>
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
}
</script>
