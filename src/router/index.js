import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true }, 
  {
    path: '/',
    component: Layout,
    name:'首页',
    hidden: false,
    redirect: '/index',
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '首页', icon: 'shouye' }
    }]
  },
  {
    path: '/staffManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/staffManage/index'),
      meta: { title: '员工管理', icon: 'yuangongguanli' }
    },{
      path: 'logs',
      hidden: true,
      component: () => import('@/views/staffManage/logs'),
      meta: { title: '日志'}
    }]
  },
  {
    path: '/marketing',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/marketing/index'),
      meta: { title: '推广管理', icon: 'fenzhanguanli' }
    },
    {
      path: 'marketingDetails',
      hidden: true,
      redirect: '/marketing/marketingDetails/marketingDetails',
      component: () => import('@/views/marketing/marketingDetails'),
      meta: { title: '推广员详情'},
      children:[
        {
          path: 'marketingDetails',
          hidden: true,
          component: () => import('@/views/marketing/details/marketingDetails'),
          meta: { title: '推广员详情'}
        },{
          path: 'voucher',
          hidden: true,
          component: () => import('@/views/marketing/details/voucher'),
          meta: { title: '财务信息'}
        },{
          path: 'business',
          hidden: true,
          component: () => import('@/views/marketing/details/business'),
          meta: { title: '推广商家'}
        },{
          path: 'money',
          hidden: true,
          component: () => import('@/views/marketing/details/money'),
          meta: { title: '资金日志'}
        }
      ]
    }]
  },
  //  {
  //   path: '/businessManage',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/businessManage/index'),
  //     meta: { title: '商家管理', icon: 'shangjialiebiaoicon' }
  //   },{
  //     path: 'businessDetails',
  //     hidden: true,
  //     component: () => import('@/views/businessManage/businessDetails'),
  //     meta: { title: '商家详情'}
  //   }]
  // },
  {
    path: '/businessManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/businessManage/index'),
      meta: { title: '商家管理', icon: 'shangjialiebiaoicon'}
    },{
      path: 'businessDetails',
      hidden: true,
      redirect: '/businessManage/businessDetails/businessDetails',
      component: () => import('@/views/businessManage/businessDetails'),
      meta: { title: '基本信息'},
      children:[
        {
          path: 'businessDetails',
          hidden: true,
          component: () => import('@/views/businessManage/details/businessDetails'),
          meta: { title: '基本信息'}
        },{
          path: 'bindShop',
          hidden: true,
          component: () => import('@/views/businessManage/details/bindShop'),
          meta: { title: '绑定店铺'}
        },{
          path: 'voucher',
          hidden: true,
          component: () => import('@/views/businessManage/details/voucher'),
          meta: { title: '充值记录'}
        },{
          path: 'waitOrder',
          hidden: true,
          component: () => import('@/views/businessManage/details/waitOrder'),
          meta: { title: '待接订单'}
        },{
          path: 'doingOrder',
          hidden: true,
          component: () => import('@/views/businessManage/details/doingOrder'),
          meta: { title: '进行中订单'}
        },{
          path: 'finishOrder',
          hidden: true,
          component: () => import('@/views/businessManage/details/finishOrder'),
          meta: { title: '已完成订单'}
        },{
          path: 'cancelOrder',
          hidden: true,
          component: () => import('@/views/businessManage/details/cancelOrder'),
          meta: { title: '已撤销订单'}
        },{
          path: 'money',
          hidden: true,
          component: () => import('@/views/businessManage/details/money'),
          meta: { title: '资金日志'}
        }
      ]
    }]
  },
 
  {
    path: '/taskManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/taskManage/index'),
      meta: { title: '任务管理', icon: 'renwuguanli' }
    },{
      path: 'taskDetails',
      hidden: true,
      redirect: '/taskManage/taskDetails/taskDetails',
      component: () => import('@/views/taskManage/taskDetails'),
      meta: { title: '任务详情'},
      children:[
        {
          path: 'taskDetails',
          hidden: true,
          component: () => import('@/views/taskManage/details/taskDetails'),
          meta: { title: '任务详情'},
          children:[
            {
              path: 'basicInformation',
              hidden: true,
              component: () => import('@/views/taskManage/details/details/basicInformation'),
              meta: { title: '基本信息'}
            },
          //   {
          //     path: 'goodsInformation',
          //     hidden: true,
          //     component: () => import('@/views/taskManage/details/details/goodsInformation'),
          //     meta: { title: '商品信息'}
          //   },
          //   {
          //     path: 'findGoods',
          //     hidden: true,
          //     component: () => import('@/views/taskManage/details/details/findGoods'),
          //     meta: { title: '如何找到商品'}
          //   },
          //   {
          //     path: 'marketingAndD',
          //     hidden: true,
          //     component: () => import('@/views/taskManage/details/details/marketingAndD'),
          //     meta: { title: '推广类型和单数'}
          //   },
          //   {
          //     path: 'businessRequirements',
          //     hidden: true,
          //     component: () => import('@/views/taskManage/details/details/businessRequirements'),
          //     meta: { title: '商家附加要求'}
          //   },
          //   {
          //     path: 'addService',
          //     hidden: true,
          //     component: () => import('@/views/taskManage/details/details/addService'),
          //     meta: { title: '增值服务'}
          //   },
          //   {
          //     path: 'thousand',
          //     hidden: true,
          //     component: () => import('@/views/taskManage/details/details/thousand'),
          //     meta: { title: '千人千面'}
          //   },
          //   {
          //     path: 'cost',
          //     hidden: true,
          //     component: () => import('@/views/taskManage/details/details/cost'),
          //     meta: { title: '费用信息'}
          //   },
          ]
        },{
          path: 'businessDetails',
          hidden: true,
          component: () => import('@/views/taskManage/details/businessDetails'),
          meta: { title: '店铺详情'}
        },{
          path: 'waitOrder',
          hidden: true,
          component: () => import('@/views/taskManage/details/waitOrder'),
          meta: { title: '待接订单'}
        },{
          path: 'doingOrder',
          hidden: true,
          component: () => import('@/views/taskManage/details/doingOrder'),
          meta: { title: '进行中订单'}
        },{
          path: 'finishOrder',
          hidden: true,
          component: () => import('@/views/taskManage/details/finishOrder'),
          meta: { title: '已完成订单'}
        },{
          path: 'cancelOrder',
          hidden: true,
          component: () => import('@/views/taskManage/details/cancelOrder'),
          meta: { title: '已撤销订单'}
        }
      ]
    }]
  },
   {
    path: '/orderManage',
    component: Layout,
    redirect: '/orderManage/index/waitOrder',
    meta: { title: '订单管理', icon: 'dingdanguanli' },
    children: [{
      path: 'index',
      hidden: true,
      component: () => import('@/views/orderManage/index'),
      children:[
        {
          path: 'waitOrder',
          hidden: true,
          component: () => import('@/views/orderManage/waitOrder'),
          meta: { title: '待接订单'}
        },{
          path: 'doingOrder',
          hidden: true,
          component: () => import('@/views/orderManage/doingOrder'),
          meta: { title: '进行中订单'}
        },{
          path: 'finishOrder',
          hidden: true,
          component: () => import('@/views/orderManage/finishOrder'),
          meta: { title: '已完成订单'}
        },{
          path: 'cancelOrder',
          hidden: true,
          component: () => import('@/views/orderManage/cancelOrder'),
          meta: { title: '已撤销订单'}
        }
      ]
    },{
      path: 'orderDetails',
      hidden: true,
      component: () => import('@/views/orderManage/orderDetails'),
      meta: { title: '订单详情'}
    }]
  },
  {
    path: '/shopManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/shopManage/index'),
      meta: { title: '店铺管理', icon: 'dianpuguanli' }
    },{
      path: 'shopDetails',
      hidden: true,
      component: () => import('@/views/shopManage/shopDetails'),
      meta: { title: '任务详情'}
    }]
  },
   {
    path: '/newsCenter',
    component: Layout,
    // redirect: '/newsCenter/index',
    children: [{
      path: 'index',
      component: () => import('@/views/newsCenter/index'),
      meta: { title: '消息中心', icon: 'renwuguanli' },
    },{
      path: 'addOrUpdateNews',
      hidden: true,
      component: () => import('@/views/newsCenter/addOrUpdateNews'),
      meta: { title: '新增和修改消息'}
    }]
  },
   {
    path: '/recharge',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/recharge/index'),
      meta: { title: '充值记录', icon: 'shuazi' }
    },{
      path: 'rechargeDetails',
      hidden: true,
      component: () => import('@/views/recharge/rechargeDetails'),
      meta: { title: '充值详情'}
    }]
  },
  {
    path: '/accountManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/accountManage/index'),
      meta: { title: '分站财务', icon: 'chongzhizhongxin' }
    }]
  },
 
  // {
  //   path: '/appealCenter',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/appealCenter/index'),
  //     meta: { title: '申诉中心', icon: 'dingdanguanli' }
  //   }]
  // },
  // {
  //   path: '/siteSetting',
  //   component: Layout,
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/siteSetting/index'),
  //     meta: { title: '站点设置', icon: 'zhandianpeizhi' }
  //   }]
  // },
  /* {
    path: '/orderManage',
    component: Layout,
    redirect: '/orderManage/waitAcceptOrder',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'waitAcceptOrder',
        name: '待接订单',
        component: () => import('@/views/index/index'),
        meta: { title: '待接订单', icon: 'tree' }
      },
      {
        path: 'acceptOrder',
        name: '已接订单',
        component: () => import('@/views/index/index'),
        meta: { title: '已接订单', icon: 'tree' }
      },
      {
        path: 'finishOrder',
        name: '已完成订单',
        component: () => import('@/views/index/index'),
        meta: { title: '已完成订单', icon: 'tree' }
      },
      {
        path: 'revokeOrder',
        name: '已撤销订单',
        component: () => import('@/views/index/index'),
        meta: { title: '已撤销订单', icon: 'tree' }
      }
    ]
  }, */
  
  /*
  {
    path: '/shopManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '店铺管理', icon: 'example' }
    }]
  },
  {
    path: '/accountInfo',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '账户信息', icon: 'example' }
    }]
  },
  {
    path: '/underwayOrder',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '进行中订单', icon: 'example' }
    }]
  },
  {
    path: '/courseEnrollManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '课程报名管理', icon: 'example' }
    }]
  },
  {
    path: '/substationManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/index/index'),
      meta: { title: '分站管理', icon: 'example' }
    }]
  },
  */
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
