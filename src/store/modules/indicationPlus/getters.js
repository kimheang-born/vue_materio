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
}
