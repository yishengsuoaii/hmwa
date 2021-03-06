import Axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'

const request = Axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 大数据处理
request.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONBig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { userToken } = store.state
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken.token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default request
