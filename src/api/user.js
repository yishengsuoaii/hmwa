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

export const getSelf = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

export const getProfile = () => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}

export const savePhoto = file => {
  const files = new FormData()
  files.append('photo', file)
  return request({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data: files
  })
}

export const setProfile = ({ name,
  gender,
  birthday }) => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name,
      gender,
      birthday
    }
  })
}
