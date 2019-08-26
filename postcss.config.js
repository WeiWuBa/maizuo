module.exports = {
  // 插件的调用
  plugins: {
    // 自动补全浏览器的私有前缀的功能 display: flex  display: box
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 转换的基准数 html 的fontSize大小为37.5
      propList: ['*']
    }
  }
}


// 1rem = 37.5px
// xrem = 210px
