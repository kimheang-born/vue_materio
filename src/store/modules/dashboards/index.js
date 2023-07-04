import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"

export default {
  namespaced: true,
  state() {
    return {
      totalCases: [],
      totalStatuses: [],
      allTotalStatusesNum: 0,
    }
  },
  mutations,
  actions,
  getters,
}
