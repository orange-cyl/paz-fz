import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* import locale from 'element-ui/lib/locale/lang/en'  */// lang i18n
import '@/styles/main.css'
import '@/styles/index.scss' // global css
import * as filters from './filters'
import App from './App'
import store from './store'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import '@/icons' // icon
import _ from 'lodash'
Vue.prototype._ = _
/* import '@/permission' // permission control */
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


/* Vue.use(ElementUI, { locale }) */
Vue.use(ElementUI)
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
