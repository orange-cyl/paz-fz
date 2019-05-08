/* 详情页面的Id */
const detailsId = {
  state: {
    // 分站详情页面id
    subStationDetailsId:'',
    // 刷手详情页面id
    brushDetailsId:'',
    // 推广员详情页面id
    promoterDetailsId:'',
    // 商家详情页面id
    businessDetailsId:'',
    // 店铺详情页面id
    shopDetailsId:'',
    // 任务详情页面id
    taskDetailsId:'',
    // 订单详情页面id
    orderDetailsId:'',  
  },
  getters:{
   subStationDetailsId:state=>state.subStationDetailsId,
   brushDetailsId:state=>state.brushDetailsId,
   promoterDetailsId:state=>state.promoterDetailsId,
   businessDetailsId:state=>state.businessDetailsId,
   shopDetailsId:state=>state.shopDetailsId,
   taskDetailsId:state=>state.taskDetailsId,
   orderDetailsId:state=>state.orderDetailsId,

  },
  mutations: {
    alterSubStationDetailsId(state,data){
      state.subStationDetailsId = data;
    },
    alterBrushDetailsId(state,data){
      state.brushDetailsId = data;
    },
    alterPromoterDetailsId(state,data){
      state.promoterDetailsId = data;
    },
    alterBusinessDetailsId(state,data){
      state.businessDetailsId = data;
    },
    alterShopDetailsId(state,data){
      state.shopDetailsId = data;
    },
    alterTaskDetailsId(state,data){
      state.taskDetailsId = data;
    },
    alterOrderDetailsId(state,data){
      state.orderDetailsId = data;
    },
  },
  actions: {
    
  }
}

export default detailsId
