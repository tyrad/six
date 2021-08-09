<template>
  <List title="Tools">
    <ul>
      <li :key="item.name" v-for="item of routes" style="text-align:center;">
        <nuxt-link
          class="title"
          :to="{name: item.name}">
          {{ item.path }}
        </nuxt-link>
      </li>
    </ul>
  </List>
</template>

<script>
export default {
  name: "Tools",
  data () {
    return {
      routes: []
    }
  },
  mounted () {
    if (!this.$router || !this.$router.options || !this.$router.options.routes) {
      return;
    }
    this.routes = this.rescueForPath('/tools').filter( item => {
      return item.name !== ''
    });
  },
  methods: {
    rescueForPath (path, routes = this.$router.options.routes) {
      for (let route of routes) {
        if (route.path === path) {
          return route.children || [];
        }
        let rs = this.rescueForPath(path, route.children || [])
        if (rs && rs.length) {
          return rs;
        }
      }
      return [];
    }
  }
}
</script>

<style scoped>

</style>
