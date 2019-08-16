// vue-cli 3.x 版本 脚手架的一个 配置文件

module.exports = {
  // 选项

  // 正向代理配置
  devServer: {
    proxy: {
      // key: value key-> 代理的请求的请求前缀 value 要代理到哪里的对象配置
      '/api': {
        target: 'https://m.aihuishou.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
      // 访问地址如下：
      // http://localhost:8080/api/portal-api/product/category-brands/1
      // 经过代理之后，真实请求的数据地址如下：
      // https://m.aihuishou.com/api/portal-api/product/category-brands/1
      // 经过路径重写之后，真实请求的数据地址如下：
      // https://m.aihuishou.com/portal-api/product/category-brands/1
    }
  }
}
