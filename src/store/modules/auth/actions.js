export default {
  async login(context, payload) {
    const response = await fetch(`https://staging-02.z1platform.com/api/v2/signin-or-signup`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    console.log(response)
  },
}
