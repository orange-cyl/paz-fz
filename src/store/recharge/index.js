import service from '@/utils/request'
import axios from '@/http/axios';
export default {
  state:{
   rechargeData:[]
  },
  getters:{
   rechargeData:state=>state.rechargeData
  },
  mutations:{
    changeRechargeData(state,data){
      state.rechargeData=data.data.data.list
       // console.log(';;;;;;;;;',data.data.data)

    }
  },
  actions:{
    // 搜索
    searchRecharge(params){
       return new Promise((resolve,reject)=>{
          service.get('',{params:params}).then((res)=>{
            // console.log('======',res.data.data)
           
            resolve(res)
          }).catch((error)=>{
            reject(error)
          })
        })
    },
    // 获取所有的充值信息
      getRecharge(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/recharge/query',params).then((res)=>{
          // console.log('======',res.data.data)
          context.commit("changeRechargeData",res)
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