export default {
  cases(state) {
    return state.cases
  },
  mappedCases(state) {
    return state.cases.map(item => {
      let color = ''

      switch (item.status) {
      case 'Save Draft':
        color = 'primary'
        break

      case 'New':
        color = 'error'
        break

      case 'In Progress':
        color = 'info'
        break
        
      case 'Pending':
        color = 'warning'
        break

      case 'Completed':
        color = 'success'
        break

      case 'Sold Out':
        color = 'secondary'
        break
      
      default:
        color = 'primary'
        break
      }

      return {
        ...item,
        color,
      }
    })
  },
  getRecordTypes(state) {
    return state.recordTypes
  },
  getRecordTypesFormat(state) {
    return state.recordTypes.map(option => option.value)
  },
  getPropertyTypes(state) {
    return state.propertyTypes
  },
  getPropertyTypesFormat(state) {
    return state.propertyTypes.map(option => option.value)
  },
  getCurrentUses(state) {
    return state.currentUses
  },
  getCurrentUsesFormat(state) {
    return state.currentUses.map(option => option.value)
  },
}
