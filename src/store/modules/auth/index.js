import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
      user: {
        id: null,
        fullName: null,
        company: null,
        profile: null,
      },
    }
  },
  mutations,
  actions,
  getters,
}
