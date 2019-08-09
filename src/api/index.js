import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [
  (data) => {
    try {
      return JSONBig.parse(data)
    } catch (e) {
      return data
    }
  }
]

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (err) => {
  // 对请求错误做些什么
  return Promise.reject(err)
})

// 添加响应拦截器
axios.interceptors.response.use(res => {
  // 对响应数据做点什么
  return res
}, (err) => {
  // 对响应错误做点什么
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
