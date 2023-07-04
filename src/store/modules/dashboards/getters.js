export default {
  totalCases(state) {
    return state.totalCases
  },
  totalStatuses(state) {
    return state.totalStatuses
  },
  mappedStatuesStatistics(state) {
    return state.totalStatuses.map(item => {
      let color = ''
      let icon = ''
  
      switch (item.status) {
      case 'Inactive':
        color = 'primary'
        icon = 'mdi-pencil-box'
        break
      case 'New':
        color = 'error'
        icon = 'mdi-star-half-full'
        break
      case 'Progress':
        color = 'info'
        icon = 'mdi-clock-time-four'
        break
      case 'Pending':
        color = 'warning'
        icon = 'mdi-alert-circle'
        break
      case 'Closed Won':
        color = 'success'
        icon = 'mdi-check-circle'
        break
      case 'Sold Out':
        color = 'secondary'
        icon = 'mdi-history'
        break
      default:
        break
      }
  
      return {
        ...item,
        color,
        icon,
      }
    })
  },
  allTotalStatusesNum(state) {
    return state.allTotalStatusesNum
  },
}
