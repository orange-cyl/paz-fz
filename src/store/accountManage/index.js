import axios from '@/http/axios';
import service from '@/utils/request'

export default {
  state:{
   
  },
  getters:{
   
  },
  mutations:{
    
  },
  actions:{
     changenote(context,params){
        return new Promise((resolve,reject)=>{
        service.post('/busines/comment',params).then((res)=>{
          // console.log('======',res.data.data.list)
          // context.commit("changeUser",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      },
    // 搜索
    searchAccountManage(params){
       return new Promise((resolve,reject)=>{
          service.get('',{params:params}).then((res)=>{
            // console.log('======',res.data.data)
           
            resolve(res)
          }).catch((error)=>{
            reject(error)
          })
        })
    },
    // 获取所有的账户信息
      getAccountManage(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/account/query',params).then((res)=>{
          // console.log('======',res.data.data)
          // context.commit("changeUser",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      }else{
        return new Promise((resolve,reject)=>{
        service.get('').then((res)=>{
          // console.log('======',res.data.data)
          // context.commit("changeUser",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      }
    },
  }
}