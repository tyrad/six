// 将wiki文件目录梳理成层级结构

export default {
  sortArticles (articles) {
    let sortedArticles = []
    for (const article of articles) {
      let path = article.path;
      let paths = path.substr('/wiki/'.length, path.length).split('/')
      paths.pop()
      let subFolder = sortedArticles;
      for (let [idx, p] of paths.entries()) {
        let el = this.getFolder(p, subFolder);
        subFolder = el.children;
        if (idx === paths.length - 1) {
          el['articles'].push(article);
        }
      }
    }
    return sortedArticles;
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
