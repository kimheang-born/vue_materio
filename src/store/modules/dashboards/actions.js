const apiEndPoint = import.meta.env.VITE_API_ENDPOINT

export default {
  async fetchTotalCases(context) {
    const token = context.rootGetters.token

    const response = await fetch(`${apiEndPoint}/api/v2/indication-plus/case-by-record-type`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(
        responseData.message || 'Failed to fetching data.',
      )
    }

    const { data } = responseData

    const totalCases = data.slice(1).map(item => item.value)

    context.commit('setTotalCases', totalCases)
  },
}
