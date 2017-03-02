import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import CompanyDirectory from '@/components/CompanyDirectory'
import EnterInfo from '@/components/EnterInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
      {
      path: '/CompanyDirectory',
      name: 'CompanyDirectory',
      component: CompanyDirectory
    },
      {
      path: '/EnterInfo',
      name: 'EnterInfo',
      component: EnterInfo
    }
  ]
})
