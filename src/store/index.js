import { createStore } from 'vuex'

import authModule from './modules/auth/index'
import dashboardsModule from './modules/dashboards/index'
import internetsModule from './modules/internets/index'

const state = createStore({
  modules: {
    auth: authModule,
    internets: internetsModule,
    dashboards: dashboardsModule,
  },
})

export default state
