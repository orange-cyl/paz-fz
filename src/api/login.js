import request from '@/utils/request'
export function login(username, password) {
  // console.log(password)
  return request({
    url: '/authentication/form',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/authentication/logout',
    method: 'post'
  })
}
