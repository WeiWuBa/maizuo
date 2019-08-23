# 网络请求工具

- 原生 ajax 的写法。自己实现 xmlhttprequest
- jquery \$.ajax
- vue-resource vue 1.x 的时候提供的 网络请求工具。尤雨溪在 vue 2.x 中推荐我们使用 axios
- axios
- fetch

## axios

> 专注于网络请求的工具，不光可以用在浏览器端，还可以用在 node 中。
> promise 封装
> 请求拦截和响应拦截

1. 安装

```shell
npm install --save axios
```

2. 简单使用
   2.0 axios(config)
   2.1 axios.get(url, [config])
   2.2 axios.post(url, [data], [config])

#### axios.get 如何传递请求参数

http://localhost:3000/api/getBrand

1. 直接将参数拼接在 url 地址后面。

```js
axios.get('http://localhost:3000/api/getBrand?pageNum=1&pageSize=10')
```

2. 使用 params 这个选项

```js
axios.get('http://localhost:3000/api/getBrand', {
  params: {
    pageNum: 1,
    pageSize: 10
  }
})
```

#### axios.post 如何传递请求参数

http://localhost:3000/api/getBrand

1. 使用 第二个 data 参数

```js
axios.post('http://localhost:3000/api/getBrand', {
  pageNum: 1,
  pageSize: 10
})
```

2. 使用 data 选项

```js
axios.post('http://localhost:3000/api/getBrand', null, {
  data: {
    pageNum: 1,
    pageSize: 10
  }
})
```

#### 创建实例来实现对 axios 的封装

```js
var instance = axios.create({
  // 默认选项的配置
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})
```

#### axios 请求的数据，默认需要在 reponse.data 中获取到

## fetch

html5 新增的一个底层 api,用来替代 xmlHttpRequest。

## ajax 与 jquery 里面的 \$.ajax 还有 axios 还有 fetch 他们之间有啥区别

1. ajax 不是一门技术，而是为了实现某个功能的一系列技术的统称。
2. jquery 中的 \$.ajax 是对原生的 XmlHttpRequest 对象的一个封装而已
3. axios 与 jquery 类似，也是基于原生的 XmlHttpReuqest 的封装。在此基础上，再提供了 Promise Api 与 请求响应拦截之类的功能。还能使用在 node 环境中
4. fetch 与上面 3 个没有可比性。他是一个 html5 中新增的底层 api，用来替代 xmlHttpRequest . 比 xmlHttpRequest 的使用来简便一些，也实现了 Promise Api. 但是兼容性不是那么好。但是可以通过垫片去增加其兼容性。用它来跟 jquery 中的 \$.ajax 或者 axios 来比。
