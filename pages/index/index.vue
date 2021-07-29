<template>
  <section class="container centered">
    <div class="about">
      <div class="avatar">
        <img src="@/assets/image/avatar.jpg" alt="avatar" />
      </div>
      <h1>MistJ</h1>
      <h2>Full Stack Developer</h2>
      <!--      <ul>-->
      <!--        <li>-->
      <!--          <a href="https://github.com/johndoe/" aria-label="Github">-->
      <!--            <i class="fa fa-github" aria-hidden="true"></i>-->
      <!--          </a>-->
      <!--        </li>-->

      <!--        <li>-->
      <!--          <a href="https://gitlab.com/johndoe/" aria-label="Gitlab">-->
      <!--            <i class="fa fa-gitlab" aria-hidden="true"></i>-->
      <!--          </a>-->
      <!--        </li>-->

      <!--        <li>-->
      <!--          <a href="https://twitter.com/johndoe/" aria-label="Twitter">-->
      <!--            <i class="fa fa-twitter" aria-hidden="true"></i>-->
      <!--          </a>-->
      <!--        </li>-->

      <!--        <li>-->
      <!--          <a href="https://www.linkedin.com/in/johndoe/" aria-label="LinkedIn">-->
      <!--            <i class="fa fa-linkedin" aria-hidden="true"></i>-->
      <!--          </a>-->
      <!--        </li>-->

      <!--        <li>-->
      <!--          <a href="https://medium.com/@johndoe" aria-label="Medium">-->
      <!--            <i class="fa fa-medium" aria-hidden="true"></i>-->
      <!--          </a>-->
      <!--        </li>-->

      <!--        <li>-->
      <!--          <a-->
      <!--            href="https://myhugosite.com/index.xml"-->
      <!--            aria-label="RSS"-->
      <!--            rel="alternate"-->
      <!--            type="application/rss+xml"-->
      <!--          >-->
      <!--            <i class="fa fa-rss" aria-hidden="true"></i>-->
      <!--          </a>-->
      <!--        </li>-->
      <!--      </ul>-->
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  mounted () {
    this.xx().then(() => {

    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    xx () {
      return new Promise((resolve, reject) => {
        reject({ code: true, success: true })
      });
    }
  }
}
</script>

<style scoped>

</style>
