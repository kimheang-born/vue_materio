let timer
const apiEndPoint = import.meta.env.VITE_API_ENDPOINT

export default {
  async login(context, payload) {
    const response = await fetch(`${apiEndPoint}/api/v2/signin-or-signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: payload.phone,
        password: payload.password,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(
        responseData.message || 'Failed to authenticate. Check your login data.',
      )
    }

    const expiresIn = +responseData.expires_in * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.access_token)
    localStorage.setItem('userId', responseData.user_id)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(function() {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.access_token,
      userId: responseData.user_id,
    })
  },
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout')
    }, expiresIn)

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      })
    }
  },
  logout(context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  },
  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  },
  async fetchUserProfile(context) {
    const token = context.getters.token

    const response = await fetch(`${apiEndPoint}/api/v2/user`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(
        responseData.message || 'Failed to fetch data.',
      )
    }

    context.commit('setUserProfile', {
      id: responseData.id,
      fullName: responseData.full_name,
      firstName: responseData.first_name,
      lastName: responseData.last_name,
      phone: responseData.phone,
      email: responseData.email,
      company: responseData.company,
      profile: responseData.profile,
    })
  },
  async saveAccount(context, payload) {
    const token = context.getters.token

    const response = await fetch(`${apiEndPoint}/api/v2/user`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        first_name: payload.firstName,
        last_name: payload.lastName,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(
        responseData.message || 'Failed to update data.',
      )
    }

    context.commit('setUserProfile', {
      id: responseData.id,
      fullName: responseData.full_name,
      firstName: responseData.first_name,
      lastName: responseData.last_name,
      phone: responseData.phone,
      email: responseData.email,
      company: responseData.company,
      profile: responseData.profile,
    })
  },
}
