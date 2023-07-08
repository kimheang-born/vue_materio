export default {
  setCases(state, payload) {
    state.cases = payload
  },
  setFormOptions(state, options) {
    return state.formOptions = options
  },
  setRecordTypes(state, recordTypes) {
    state.recordTypes = recordTypes
  },
  setPropertyTypes(state, propertyTypes) {
    state.propertyTypes = propertyTypes
  },
  setCurrentUses(state, currentUses) {
    state.currentUses = currentUses
  },
}
