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
  async fetchFormOptions(context) {
    const token = context.rootGetters.token

    const response = await axios.get(`${apiEndPoint}/api/v2/submitcase/form_option`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status !== 200) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    context.commit('setFormOptions', response?.data || [])
  },
  fetchPropertyTypes(context, recordTypeSelected) {
    const selectedRecordType = context.getters.getRecordTypes.find(recordType => recordType.value === recordTypeSelected)

    context.commit('setPropertyTypes', selectedRecordType?.children || [])
  },
  fetchCurrentUses(context, propertyTypeSelected) {
    const selectedPropertyType = context.getters.getPropertyTypes.find(propertyType => propertyType.value === propertyTypeSelected)

    context.commit('setCurrentUses', selectedPropertyType?.children || [])
  },
  async submitCase(context, data) {
    const token = context.rootGetters.token

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    console.log(data)

    const body = {
      case_type: 'Indication',
      purpose_of_property: data.purpose_of_property,
      record_type: data.record_type,
      property_type: data.property_type,
      current_use: data.current_use,
      property_land_width: null,
      property_land_length: null,
      property_land_area: null,
      property_latitude: null,
      property_longitude: null,
      address_code: null,
      topography: null,
      land_shape_type: null,
      image: null,
      image_back_side: null,
    }

    const response = await axios.post(`${apiEndPoint}/api/v2/submit_cases`, body, { headers })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.error(error?.response?.data?.errors || null)
      })

    if (response.status !== 200) {
      throw new Error(`Request failed with status: ${response.status}`)
    }
  },
}
