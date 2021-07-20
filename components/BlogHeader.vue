<template>
  <nav class="navigation">
    <section class="container">
      <a class="navigation-title" href="/"> {{ siteName }} </a>
      <span id="dark-mode-toggle" class="float-right" @click="darkModeChanged">
        <fa :icon="['fas', 'adjust']" style="cursor: pointer;" />
      </span>

      <!--  drop menu  -->
      <input type="checkbox" id="menu-toggle" />
      <label class="menu-button float-right" for="menu-toggle">
        <i class="fa fa-bars fa-fw" aria-hidden="true"></i>
      </label>

      <ul class="navigation-list">
        <li
          class="navigation-item"
          :class="{ dropdown: item.children && item.children.length > 0 }"
          v-for="item of routerItems"
          :key="item.name"
        >
          <a class="navigation-link" :href="item.path">{{ item.name }}</a>
          <i
            class="fa fa-angle-down"
            v-if="item.children && item.children.length > 0"
          />

          <ul
            class="dropdown-content"
            v-if="item.children && item.children.length > 0"
          >
            <li v-for="subItem in item.children" :key="subItem.path">
              <nuxt-link :to="subItem.path"> {{ subItem.name }}</nuxt-link>
            </li>
          </ul>
        </li>
        <li class="navigation-item separator">
          <span>|</span>
        </li>
      </ul>
    </section>
  </nav>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
  name: 'BlogHeader',
  data() {
    return {
      siteName: 'MistJ',
      routerItems: [
        {
          name: '测试',
          path: '/to'
        },
        {
          name: '测试1',
          path: '/to'
        },
        {
          name: '测试2',
          path: '/to'
        },
        {
          name: '测试3',
          path: '/to'
        },
      ],
    }
  },
  methods: {
    darkModeChanged() {
      this.$nuxt.$emit('darkModeChanged')
    },
  },
  created() {
    // this.routerItems = this.$router.options.routes.filter((item) => {
    //   return item.name && item.name === "Blog"
    // })[0].children
    this.$router;
    return
    // this.$router.options.routes.forEach(route => {
    //   this.items.push({
    //     name: route.name
    //     , path: route.path
    //   })
    // })
  },
})

</script>

<style scoped lang="scss">
  @import "@/assets/style/variables";
  @import "@/assets/style/header/navigation";
  @import "@/assets/style/header/navigation_dark";
  /*  巧妙的使用 input+label  结合css,控制显示隐藏，没有用到一行代码 */
</style>
