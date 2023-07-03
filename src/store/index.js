import { createStore } from 'vuex'

import authModule from './modules/auth/index'
import internetsModule from './modules/internets/index'

const state = createStore({
  modules: {
    auth: authModule,
    internets: internetsModule,
  },
})

export default state
