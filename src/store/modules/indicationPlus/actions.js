import axios from "axios"

const apiEndPoint = import.meta.env.VITE_API_ENDPOINT

export default {
  async fetchCases(context) {
    const token = context.rootGetters.token

    const response = await axios.get(`${apiEndPoint}/api/v2/submit_cases`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status !== 200) {
      throw new Error(`Request failed with status: ${response.status}`)
    }
    
    const responseData = response?.data?.data

    const cases = responseData.map(item => {
      return {
        id: item.id,
        code: item.code,
        status: item.status,
        addressText: item.address_text,
        recordType: item.record_type,
        recordTypeDynamicName: item.record_type_dynamic_name,
        propertyType: item.property_type,
        propertyTypeDynamicName: item.property_type_dynamic_name,
        currentUse: item.current_use,
        currentUseDynamicName: item.current_use_dynamic_name,
        image: item.image,
        soldOut: item.sold_out,
        createdAt: item.created_at,
      }
    })

    context.commit('setCases', cases)
  },
}
