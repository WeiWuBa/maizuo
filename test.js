// 1. 引入 axios  node 中的 commonJS 规范方式
const axios = require('axios')

// axios
//   .get('https://m.maizuo.com/gateway?type=2&cityId=440300&k=1367332', {
//     headers: {
//       'X-Client-Info':
//         '{"a":"3000","ch":"1002","v":"5.0.4","e":"156584910960129542198"}',
//       'X-Host': 'mall.cfg.common-banner'
//     }
//   })
//   .then(response => {
//     console.log(response.data)
//   })

const http = axios.create({
  // 传递一些默认的选项
  baseURL: 'https://m.maizuo.com', // 在发送请求时，如果没有明确指定请求的域名地址信息，那么会主动将请求地址拼接上这个 baseURL
  headers: {
    'X-Client-Info':
      '{"a":"3000","ch":"1002","v":"5.0.4","e":"156584910960129542198"}',
    'X-Host': 'mall.cfg.common-banner'
  }
})

// 一些拦截的设置

// 响应的拦截，当请求响应回到 .then 回调之前，会执行这段代码的回调函数
http.interceptors.response.use(function (response) {
  console.log('1')
  return response.data
})

http.get('/gateway?type=2&cityId=440300&k=1367332').then(response => {
  console.log(2)
  console.log(response)
})
