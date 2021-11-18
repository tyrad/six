<template>
  <nav class="navigation">
    <section class="container">
      <NuxtLink class="navigation-title" to="/">
        {{ siteName }}
      </NuxtLink>
      <span id="dark-mode-toggle" class="float-right" @click="darkModeChanged">
        <fa :icon="['fa', 'adjust']" style="cursor: pointer;" />
      </span>

      <!--  drop menu  -->
      <input type="checkbox" id="menu-toggle" />
      <label class="menu-button float-right" for="menu-toggle">
        <fa :icon="['fa', 'bars']" />
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
          <fa :icon="['fa', 'angle-down']" v-if="item.children && item.children.length > 0" />
          <ul
            class="dropdown-content"
            v-if="item.children && item.children.length > 0"
          >
            <li v-for="subItem in item.children" :key="subItem.path">
              <div v-if="!subItem.outLink">
                <nuxt-link :to="{name: subItem.path, params: subItem.params}"> {{ subItem.name }}</nuxt-link>
              </div>
              <div v-else class="flex-align-center flex-y-center">
                <fa class="out-icon" :icon="['fa', 'link']" />
                <a class="out-link" :href="subItem.path" target="_Blank"> {{ subItem.name }}</a>
              </div>
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

  .out-link {
    font-size: 13px;
    margin-left: 5px !important;
    margin-right: 5px !important;
  }

  .out-icon {
    margin-left: 3px;
    font-size: 13px
  }

</style>
