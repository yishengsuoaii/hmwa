import request from '@/utils/request'

export const channel = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
