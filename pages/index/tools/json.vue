<template>
  <List :flex-list="true">
    <iframe class="iframe" src="/html/tools/json/index.html" frameborder="0" />
  </List>
</template>

<script>
export default {
  head () {
    return {
      title: "JSON · MISTJ"
    };
  }
}
</script>

<style>
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
