<template>
  <div class="p-4 mb-4 text-white bg-blue-500">
    <p><slot name="info-box">default</slot></p>
  </div>
</template>

<script>
/*
配置文件`components: true`，全局自动注册，md文件中使用举例:
在 markdown 中不能使用自结束标记，例如，< author: author = “ author”/> 不起作用。

<info-box>
  <template #info-box>
    This is a vue component inside markdown using slots
  </template>
</info-box>
*/
export default {
  name: "InfoBox"
}
</script>

<style scoped>

</style>
