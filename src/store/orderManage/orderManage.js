import service from '@/utils/request'
import axios from '@/http/axios';
export default {
  state:{
   orderData:[]
  },
  getters:{
   orderData:state=>state.orderData
  },
  mutations:{
    changeOrderData(state,data){
      state.orderData=data.data.data.list
       // console.log(';;;;;;;;;',state.newsData)
    }
  },
  actions:{
   
      getOrderData(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/order/query',params).then((res)=>{
          // console.log('======',res.data.data)
          // console.log(';;;;;;;;;',res)
          context.commit("changeOrderData",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      }else{
        return new Promise((resolve,reject)=>{
        service.get('').then((res)=>{
          console.log('======',res.data.data)
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