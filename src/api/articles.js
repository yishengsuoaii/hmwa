import request from '@/utils/request'

export const article = ({ channelId, timestamp, withTop }) => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
