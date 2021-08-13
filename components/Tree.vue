<template>
  <ul>
    <li class="directory" v-for="item of treeData" :key="item.folderName">
      <a href="#" data-role="directory">
        <fa class="fa" :icon="['fas', 'angle-down']" />
        {{ item.folderName }}
      </a>
      <ul style="display: block;">
        <li class="file" v-for="file of item.articles" :key="file.title">
          <NuxtLink class="title"
                    :to="{ name: 'wiki-content-slug', params: { slug: file.slug , path: file.path } }">
            {{ file.title }}
          </NuxtLink>
        </li>
        <li class="directory">
          <Tree :tree-data="item.children" v-if="item.children && item.children.length > 0" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Tree",
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="scss">
  a {
    font-weight: 400;
    word-break: break-all;
    color: inherit;
  }

  main.colorscheme-dark a {
    color: inherit;
  }

  li {
    margin: 5px;
    line-height: 1.5;

    ul {
      padding-left: 0;
    }
  }
</style>
