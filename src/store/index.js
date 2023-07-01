import { createStore } from 'vuex'

import accountSettingsModule from './modules/accountSettings'
import authModule from './modules/auth/index'

const state = createStore({
  modules: {
    auth: authModule,
    accSetting: accountSettingsModule,
  },
})

export default state
