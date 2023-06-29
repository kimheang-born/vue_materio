import { createStore } from 'vuex'

import authModule from './modules/auth/index'

const state = createStore({
  modules: {
    auth: authModule,
  },
})

export default state
