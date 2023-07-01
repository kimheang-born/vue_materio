import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state() {
    return {
      account: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
      },
    }
  },
  mutations,
  actions,
  getters,
}
