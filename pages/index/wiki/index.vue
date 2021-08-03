<template>
  <div>

    <pre>
        {{ articles }}
    </pre>

  </div>
</template>

<script>

export default {
  name: "wiki",
  async asyncData ({ $content, params }) {
    const articles = await $content('wiki', { deep: true })
      .only(['title', 'date', 'slug'])
      .sortBy('date', 'desc')
      .fetch();
    return { articles }
  },
  data () {
    return {}
  },
  mounted () {
    this.sortArticles(this.articles);
  },
  methods: {
    sortArticles (articles) {
      // let articles = [
      //   {
      //     "slug": "记录值是否存在另一个表中",
      //     "date": "2020-11-10T09:15:46.000Z",
      //     "title": "记录值是否存在另一个表中",
      //     "path": "/wiki/database/sql/记录值是否存在另一个表中",
      //     "extension": ".md"
      //   },
      //   {
      //     "slug": "时间处理.md",
      //     "date": "2020-11-10T08:35:45.000Z",
      //     "title": "时间处理",
      //     "path": "/wiki/database/oracle/时间处理.md",
      //     "extension": ".md"
      //   }];
      /*
      [
        {
          folderName: 'xx'
          articles:[ '1', '2', '3']
          children: [
             {
                folderName: 'xx'
                articles:[ '1', '2', '3']
                children: [
                   {

                   }
                ]
             }
          ]
        }
      ]
      */
      let sortedArticles = []
      for (const article of articles) {
        let path = article.path;
        let paths = path.substr('/wiki/'.length, path.length).split('/')
        paths.pop()
        // xx1 -> xx
        let subFolder = sortedArticles;
        for (let [idx, p] of paths.entries()) {
          let el = this.getFolder(p, subFolder);
          subFolder = el.children;
          // todo 最后一个元素时，push过去
          if (idx === paths.length - 1) {
            el['articles'].push(article);
          }
        }
      }
      console.log(sortedArticles);
    },
    getFolder (name, children) {
      let filtered = children.filter(item => {
        return item['folderName'] === name
      });
      if (filtered.length === 0) {
        // 没有找到
        let newEle = {
          folderName: name,
          articles: [],
          children: []
        };
        children.push(newEle)
        return newEle;
      } else {
        return filtered[0];
      }
    }
  }
}
</script>

<style scoped>

</style>
