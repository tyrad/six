<template>
  <List title="RSA"
        :flex-list="true">
    <iframe src="/html/tools/rsa/index.html" frameborder="0" />
  </List>
</template>

<script>
export default {
  head () {
    return {
      title: "RSA · MISTJ"
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
