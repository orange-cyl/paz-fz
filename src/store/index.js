import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import StaffManage from './staffManage'
import Marketing from './marketing'
import BusinessManage from './businessManage'
import Recharge from './recharge'
import TaskManage from './taskManage'
import ShopManage from './shopManage'
import AccountManage from './accountManage'
import NewsCenter from './newsCenter/newsCenter'
import OrderManage from './orderManage/orderManage'

// 详情页面的id
import detailsId from './modules/detailsId'
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    StaffManage,
    Marketing,
    BusinessManage,
    Recharge,
    TaskManage,
    ShopManage,
    AccountManage,
    NewsCenter,
    OrderManage,
    detailsId,
  },
  getters
})

export default store
