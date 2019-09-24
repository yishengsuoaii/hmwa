import request from '@/utils/request'

export const suggestion = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
