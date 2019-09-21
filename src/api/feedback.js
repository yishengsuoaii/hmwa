import request from '@/utils/request'
export const feedback = ({ channelId, type }) => {
  return request({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data: {
      target: channelId,
      type,
      remark: null
    }
  })
}
