export default {
  methods: {
    mxGoBack () {
      this.mxHasHistory() ? this.$router.go(-1) : this.$router.push('/')
    },
    mxHasHistory () {
      return window.history.length > 2
    },
    mxGohome() {
      this.$router.push('/')
    }
  }
}
