import service from '@/utils/request'
import axios from '@/http/axios';
export default {
  state:{
   taskManageData:[]
  },
  getters:{
   taskManageData:state=>state.taskManageData
  },
  mutations:{
     changeTaskManageData(state,data){
      state.taskManageData=data.data.data.list
       // console.log(';;;;;;;;;',data.data.data)

    }
  },
  actions:{
    // 搜索
    searchTask(params){
       return new Promise((resolve,reject)=>{
          service.get('',{params:params}).then((res)=>{
            // console.log('======',res.data.data)
           
            resolve(res)
          }).catch((error)=>{
            reject(error)
          })
        })
    },
    // 获取所有的任务信息
      getTask(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/task/pageQuery',params).then((res)=>{
          // console.log('======',res.data.data)
          context.commit("changeTaskManageData",res)
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