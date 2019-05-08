import service from '@/utils/request'
import axios from '@/http/axios';
export default {
 state:{
   shopData:[]
  },
  getters:{
   shopData:state=>state.shopData
  },
  mutations:{
    changeShopData(state,data){
      state.shopData=data.data.data.list
       // console.log('~~~',state.shopData)

    }
  },
  actions:{
    // 获取所有的充值信息
      getShopManage(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/store/pageQuery',params).then((res)=>{
          // console.log('1111======',res)
          context.commit("changeShopData",res)
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