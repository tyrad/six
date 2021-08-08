<template>
  <nav class="navigation">
    <section class="container">
      <NuxtLink class="navigation-title" to="/">
        {{ siteName }}
      </NuxtLink>
      <span id="dark-mode-toggle" class="float-right" @click="darkModeChanged">
        <fa :icon="['fas', 'adjust']" style="cursor: pointer;" />
      </span>

      <!--  drop menu  -->
      <input type="checkbox" id="menu-toggle" />
      <label class="menu-button float-right" for="menu-toggle">
        <fa :icon="['fas', 'bars']" />
      </label>

      <ul class="navigation-list">
        <li
          class="navigation-item"
          :class="{ dropdown: item.children && item.children.length > 0 }"
          v-for="item of routerItems"
          :key="item.name"
        >
          <nuxt-link class="navigation-link"
                     :to="{name: item.path , params: item.params }"> {{ item.name }}
          </nuxt-link>
          <fa :icon="['fas', 'angle-down']" v-if="item.children && item.children.length > 0" />
          <ul
            class="dropdown-content"
            v-if="item.children && item.children.length > 0"
          >
            <li v-for="subItem in item.children" :key="subItem.path">
              <nuxt-link :to="{name: subItem.path, params: subItem.params}"> {{ subItem.name }}</nuxt-link>
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

<script>

import routerData from '../assets/data/router.js'

export default {
  name: 'BlogHeader',
  data () {
    return {
      siteName: 'MistJ',
      routerItems: routerData,
    }
  },
  methods: {
    darkModeChanged () {
      this.$nuxt.$emit('darkModeChanged')
    },
  },
  created () {
    // if (!this.$router || !this.$router.options || !this.$router.options.routes) {
    //   return;
    // }
    // for (const route of this.$router.options.routes) {
    //   if (route.path === '/' && route.children) {
    //     for (const sub of route.children) {
    //       this.routerItems = route.children;
    //       break
    //     }
    //   }
    // }
  },
}

</script>

<style scoped lang="scss">
  @import "@/assets/style/header/navigation";
  @import "@/assets/style/header/navigation_dark";
  /*  巧妙的使用 input+label  结合css,控制显示隐藏，没有用到一行js代码 */
</style>
