<template>
  <List :title="'Posts'">
    <ul>
      <li>
        <span class="date">June 25,2020</span>
        <a class="title" href="/posts/content/my-first-blog-post">鼠须管(Rime)使用配置(2020)</a>
      </li>

      <li>
        <span class="date">June 23,2020</span>
        <a class="title" href="/posts/content/fastlane+Jenkins%e8%87%aa%e5%8a%a8%e5%8c%96%e9%83%a8%e7%bd%b2">fastlane+Jenkins自动化部署iOS项目</a>
      </li>

      <li>
        <span class="date">May 14,2020</span>
        <a class="title" href="/posts/content/WebViewJavascriptBridge%e6%ba%90%e7%a0%81%e5%88%86%e6%9e%90">WebViewJavascriptBridge源码分析</a>
      </li>

      <li>
        <span class="date">February 8,2020</span>
        <a class="title" href="/posts/content/go-learn-2">Go笔记(二)：面向对象、错误处理、协程、并发</a>
      </li>

      <li>
        <span class="date">February 8,2020</span>
        <a class="title" href="/posts/content/go-learn-3">Go笔记(三)：测试、反射、json解析</a>
      </li>

      <li>
        <span class="date">February 7,2020</span>
        <a class="title" href="/posts/content/go-learn-1">Go笔记(一)：基本类型、运算符、条件、方法</a>
      </li>

      <li>
        <span class="date">October 28,2019</span>
        <a class="title" href="/posts/content/tornado-with-eureka">将Python Tornado注册到Eureka</a>
      </li>

      <li>
        <span class="date">May 14,2019</span>
        <a class="title" href="/posts/content/java-quartz-1">Quartz学习笔记</a>
      </li>

      <li>
        <span class="date">May 4,2018</span>
        <a class="title" href="/posts/content/ios-ges-conflict">iOS开发之常见的手势冲突</a>
      </li>

      <li>
        <span class="date">June 3,2017</span>
        <a class="title" href="/posts/content/fastlane-2">fastlane使用指南(二)</a>
      </li>

      <li>
        <span class="date">June 3,2017</span>
        <a class="title" href="/posts/content/fastlane-1">fastlane使用指南(一)</a>
      </li>
    </ul>

    <ul class="pagination">
      <li><a href="/posts/1">«</a></li>
      <li><a href="/posts/2">1</a></li>
      <li>2</li>
      <li><a href="/posts/3">»</a></li>
    </ul>
  </List>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.p)
  }
}
</script>

<style scoped>

</style>
