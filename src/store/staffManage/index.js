import axios from '@/http/axios';
import service from '@/utils/request'

export default {
  state:{
   staffManageData: []
  },
  getters:{
   staffManageData:state=>state.staffManageData
  },
  mutations:{
     changeStaffData(state,data){
      state.staffManageData=data.data.data.list
       // console.log(';;;;;;;;;',data.data.data)

    }
  },
  actions:{
    // 禁用
    stopStaff(params){
       return new Promise((resolve,reject)=>{
          service.get('',params).then((res)=>{
            // console.log('======',res.data.data)
           
            resolve(res)
          }).catch((error)=>{
            reject(error)
          })
        })
    },
    // 启用
    startStaff(params){
       return new Promise((resolve,reject)=>{
          service.get('/user/changeEnabled',params).then((res)=>{
            // console.log('======',res.data.data)
           
            resolve(res)
          }).catch((error)=>{
            reject(error)
          })
        })
    },
    // 搜索
    // searchStaff(params){
    //    return new Promise((resolve,reject)=>{
    //       service.get('/user/pageQuery',params).then((res)=>{
    //         // console.log('======',res.data.data)
    //        context.commit("changeStaffData",res)
    //         resolve(res)
    //       }).catch((error)=>{
    //         reject(error)
    //       })
    //     })
    // },
    // 删除员工
    deleteStaff(oId){
      return new Promise((resolve,reject)=>{
        service.get('',oId).then((res)=>{
          // console.log('======',res.data.data)
         
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    // 新增员工
    addStaff(obj) {
      // console.log('==========',obj)
      return new Promise((resolve,reject)=>{
        service.post('/user/saveOrUpdate',obj).then((res)=>{
          // console.log('======',res.data.data)        
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    // 获取所有的员工信息
      getStaffManage(context,params){
      if(params){
        return new Promise((resolve,reject)=>{
        service.get('/user/pageQuery',params).then((res)=>{
          // console.log('22222222222',res.data.data)
          context.commit("changeStaffData",res)
          resolve(res)
        }).catch((error)=>{
          reject(error)
        })
      })
      }else{
        return new Promise((resolve,reject)=>{
        service.get('/user/pageQuery').then((res)=>{
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