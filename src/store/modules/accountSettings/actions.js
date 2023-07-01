const apiEndPoint = import.meta.env.VITE_API_ENDPOINT

export default {
  async saveAccount(context, payload) {
    console.log(1)

    // const response = await fetch(`${apiEndPoint}/api/v2/user`, {
    //   method: 'PUT',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     phone: payload.phone,
    //     password: payload.password,
    //   }),
    // })

    // const responseData = await response.json()

    // console.log(responseData)

    // if (!response.ok) {
    //   throw new Error(
    //     responseData.message || 'Failed to update account',
    //   )
    // }
  },
}
