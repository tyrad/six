<template>
  <ul>
    <li class="directory" v-for="item of treeData" :key="item.folderName">
      <a href="#" data-role="directory">
        <fa class="fa" :icon="['fa', 'angle-down']" />
        {{ item.folderName }}
      </a>
      <ul style="display: block;">
        <li class="file" v-for="file of item.articles" :key="file.title">
          <NuxtLink class="title"
                    :class="{'side-highlighted': file.title === selected}"
                    :to="{ name: 'wiki-content-slug', params: { slug: file.slug , path: file.path } }">
            {{ file.title }}
          </NuxtLink>
        </li>
        <li class="directory">
          <Tree :tree-data="item.children" :selected="selected" v-if="item.children && item.children.length > 0" />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>

import { isScrolledIntoView }from "@/utils/index.js";

export default {
  name: "Tree",
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    selected: {
      type: String,
      default: null
    }
  },
  watch: {
    selected () {
      // this.updateScroll();
    },
  },
  mounted () {
    // this.updateScroll();
  },
  methods: {
    updateScroll () {
      const eles = document.getElementsByClassName('side-highlighted')
      if(eles.length) {
        isScrolledIntoView(eles[0]);
      }
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

  .side-highlighted {
    color: $link-color;
  }

  main.colorscheme-dark a {
    color: inherit;
  }

  main.colorscheme-dark .side-highlighted {
    color: $link-color;
  }

  li {
    margin: 5px;
    line-height: 1.5;

    ul {
      padding-left: 0;
    }
  }
</style>
