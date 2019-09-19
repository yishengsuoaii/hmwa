import Axios from 'axios'
import JSONBig from 'json-bigint'

const request = Axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

request.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONBig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

export default request
