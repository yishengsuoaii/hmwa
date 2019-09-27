
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
export const rTime = date => {
  return dayjs().from(dayjs(date))
}
export const formatDate = date => {
  return dayjs(date).format('YYYY-MM-DD')
}
