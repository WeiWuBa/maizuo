// 基于 axios 做的一个封装，用来实现网络请求工具

// 1. 引入 axios
import axios from 'axios'

// 2. 创建一个 axios 的实例对象
const request = axios.create({
  // 默认配置项
  baseURL: 'http://localhost:3000'
})

// 3. 在这还可以实现一些我们的拦截功能

// 3.1 响应拦截
//    3.1.1 直接将 response.data 给返回出去，以方便外面调用时还得 .data
request.interceptors.response.use(response => {
  return response.data
})

// 4. 将 实例暴露出去，
export default request
