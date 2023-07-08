import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state() {
    return {
      cases: [],
      formOptions: [],
      recordTypes: [],
      propertyTypes: [],
      currentUses: [],
      purposes: [],
    }
  },
  mutations,
  actions,
  getters,
}
