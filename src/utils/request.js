import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui' 
import store from '../store'
import { getToken } from '@/utils/auth'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 创建axios实例
const service = axios.create({
  baseURL: "http://paz.huiguanjia.net:8888", // api 的 base_url，在config文件夹的dev.env.js
  // baseURL: "http://127.0.0.1:8888", // api 的 base_url，在config文件夹的dev.env.js
  timeout: 5000 // 请求超时时间
})

service.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data,{arrayFormat: 'repeat' });
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // console.log('++++',store.getters.token)
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => response,
  // response => {
  //   //code为非20000是抛错 可结合自己业务进行修改
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       MessageBox.confirm(
  //         '你已被登出，可以取消继续留在该页面，或者重新登录',
  //         '确定登出',
  //         {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }
  //       ).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
