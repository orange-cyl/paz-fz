import service from '@/utils/request'
import axios from '@/http/axios';
export default {
  state:{
   marketingData:[]
  },
  getters:{
     marketingData:state=>state.marketingData
  },
  mutations:{
    changeMarketingData(state,data){
      state.marketingData=data.data.data.list
       // console.log(';;;;;;;;;',data.data.data)

    }
  },
  actions:{
    // 搜索
    searchMarketing(params){
       return new Promise((resolve,reject)=>{
          service.get('',{params:params}).then((res)=>{
            // console.log('======',res.data.data)
           
            resolve(res)
          }).catch((error)=>{
            reject(error)
          })
        })
    },
    // 新增员工
    addMarketing(params) {
      return new Promise((resolve,reject)=>{
        service.get('',{params:params}).then((res)=>{
          // console.log('======',res.data.data)
         
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    // 获取所有的推广员信息
      getMarketing(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/user/pageQuery',params).then((res)=>{
          // console.log('======',res.data.data)
          context.commit("changeMarketingData",res)
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