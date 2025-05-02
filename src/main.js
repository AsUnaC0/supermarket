import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/style/common.less'

// import Vant from 'vant'
// import 'vant/lib/index.css'
// 插件安装初始化 内部会将vant所有组件进行导入注册
// Vue.use(Vant)

// // 按需导入
// import { Button, Switch } from 'vant'
// Vue.use(Button)
// Vue.use(Switch)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
