import service from '@/utils/request'
import axios from '@/http/axios';
export default {
  state:{
   businessData:[]
  },
  getters:{
   businessData:state=>state.businessData
  },
  mutations:{
    changebusinessData(state,data){
      state.businessData=data.data.data.list
       // console.log(';;;;;;;;;',state.businessData)
    }
  },
  actions:{
   
    // 获取所有的商家信息
      getBusinessManage(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/busines/pageQuery',params).then((res)=>{
          // console.log('======',res.data.data)
          // console.log(';;;;;;;;;',res)
          context.commit("changebusinessData",res)
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