import request from '@/utils/request'

export const Login = ({ mobile, code }) => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

export const attention = articleId => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}

export const unAttention = articleId => {
  return request({
    url: `/app/v1_0/user/followings/${articleId}`,
    method: 'DELETE'
  })
}
