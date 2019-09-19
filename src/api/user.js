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
