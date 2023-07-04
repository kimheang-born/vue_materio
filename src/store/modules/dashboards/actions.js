import axios from "axios"

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT

const apiHeaders = token => {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}

export default {
  async fetchTotalCases(context) {
    const token = context.rootGetters.token

    const response = await fetch(`${apiEndPoint}/api/v2/indication-plus/case-by-record-type`, apiHeaders(token))

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
  async fetchTotalStatuses(context) {
    const token = context.rootGetters.token

    const response = await axios.get(`${apiEndPoint}/api/v2/submit_cases/total_case`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status !== 200) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    context.commit('setTotalStatuses', response?.data?.data)
    context.commit('setAllTotalStatusesNum', response?.data?.meta?.total?.value)
  },
}
