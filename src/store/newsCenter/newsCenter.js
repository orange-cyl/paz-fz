import service from '@/utils/request'
import axios from '@/http/axios';
export default {
  state:{
   newsData:[]
  },
  getters:{
   newsData:state=>state.newsData
  },
  mutations:{
    changenewsData(state,data){
      state.newsData=data.data.data.list
       // console.log(';;;;;;;;;',state.newsData)
    }
  },
  actions:{
   
      getNewsCenter(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/notice/pageQuery',params).then((res)=>{
          // console.log('======',res.data.data)
          // console.log(';;;;;;;;;',res)
          context.commit("changenewsData",res)
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