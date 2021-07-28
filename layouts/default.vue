<template>
  <main
    class="wrapper"
    :class="{
      'colorscheme-light': lightScheme,
      'colorscheme-auto': autoScheme,
      'colorscheme-dark': darkScheme,
    }"
  >
    <blog-header />
    <div class="content">
      <Nuxt />
    </div>
    <BlogFooter />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "Layout",
  components: {},
  data() {
    return {
      autoScheme: true,
      darkScheme: false,
      lightScheme: false,
    }
  },
  created(): void {
    this.$root.$on('darkModeChanged', () => {
      this.switchTheme(!this.lightScheme)
    })
  },
  methods: {
    switchTheme(isLight: boolean) {
      this.autoScheme = false;
      this.darkScheme = !isLight;
      this.lightScheme = isLight;
      localStorage.setItem("colorscheme", isLight ? "light" : "dark")
    },
  },
  mounted() {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const themeDefault = 'light'; //process.env.VUE_APP_THEME_DEFAULT
    const item = localStorage.getItem("colorscheme");
    if (item) {
      this.switchTheme(item.indexOf("light") > -1)
    } else if (
      themeDefault.indexOf("colorscheme-light") > -1 ||
      themeDefault.indexOf("colorscheme-dark") > -1
    ) {
      this.switchTheme(themeDefault.indexOf("colorscheme-light") > -1)
    } else {
      this.switchTheme(!darkModeMediaQuery.matches)
    }
  },
})
</script>
