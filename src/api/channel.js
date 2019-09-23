import request from '@/utils/request'

export const allChannel = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

export const userChannel = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

export const changeChannel = channels => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
export const removeChannel = id => {
  return request({
    url: `/app/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}
