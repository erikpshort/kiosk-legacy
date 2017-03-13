import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import CompanyDirectory from '@/components/CompanyDirectory'
import EnterInfo from '@/components/EnterInfo'
import ConfirmCompanyInfo from '@/components/ConfirmCompanyInfo'
import ServiceRequest from '@/components/ServiceRequest'
import backlog from '@/components/backlog'
import assigned from '@/components/assigned'
import job from '@/components/job'
import bluejobs from '@/components/Bluejobs'
import orangejobs from '@/components/Orangejobs'
import greenjobs from '@/components/Greenjobs'
import EditInfo from '@/components/EditInfo'
import AdminLogin from '@/components/AdminLogin'
import Reject from '@/components/Reject'
import AdminBoard from '@/components/AdminBoard'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
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
        },
        {
          path: '/ConfirmCompanyInfo',
          name: 'ConfirmCompanyInfo',
          component: ConfirmCompanyInfo
        },
        {
          path: '/ServiceRequest',
          name: 'ServiceRequest',
          component: ServiceRequest
        },
        {
          path: '/AdminLogin',
          name: 'AdminLogin',
          component: AdminLogin
        },

      ]
    },
    {
      path: '/backlog',
      name: 'backlog',
      component: backlog
    },
    {
      path: '/assigned',
      name: 'assigned',
      component: assigned
    },
    {
      path: '/job',
      name: 'job',
      component: job
    },
    {
      path: '/bluejobs',
      name: 'bluejobs',
      component: bluejobs
    },
    {
      path: '/orangejobs',
      name: 'orangejobs',
      component: orangejobs
    },
    {
      path: '/greenjobs',
      name: 'greenjobs',
      component: greenjobs
    },
    {
      path: '/EditInfo',
      name: 'EditInfo',
      component: EditInfo
    },

    {
      path: '/Reject',
      name: 'Reject',
      component: Reject
    },
    {
      path: '/AdminBoard',
      name: 'AdminBoard',
      component: AdminBoard,
    },

  ]
})
