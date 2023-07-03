export default {
  handleOnlineStatus({ commit }) {
    const handleOnline = () => {
      commit('setOnline')
    }
    
    const handleOffline = () => {
      commit('setOffline')
    }
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  },
}
