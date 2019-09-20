import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button, NavBar, Field, Toast,
  Icon, Cell, CellGroup, Tabbar,
  TabbarItem, Tab, Tabs, List }
  from 'vant'

import '@/styles/index.less'

import {
  ValidationProvider,
  extend,
  ValidationObserver
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules' // 加载所有的验证规则
import zhCN from 'vee-validate/dist/locale/zh_CN' //

Vue.use(Button).use(NavBar).use(Field)
  .use(Toast).use(Icon).use(Cell).use(CellGroup)
  .use(Tabbar).use(TabbarItem).use(Tab).use(Tabs)
  .use(List)
Vue.config.productionTip = false

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}

// 一个原则：有内置的使用内置的，内置的满足不了再自定义
extend('phone', {
  validate (value) {
    return /^1[345678]\d{9}$/.test(value)
  },
  message: '格式错误!'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
