<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useStore } from 'vuex'

const form = ref({
  email: '',
  phoneNumber: '',
  password: '',
  remember: false,
})

// Validate
const phoneNumberRules = ref([
  value => {
    if (value) return true

    return 'Phone number is required.'
  },
])

const passwordRules = ref([
  value => {
    if (value) return true

    return 'Password is required.'
  },
])

const isLoading = ref(false)
const error = ref(null)

const router = useRouter()
const store = useStore()

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)

const submitForm = async function () {
  isLoading.value = true

  try {

    await store.dispatch('login', {
      phone: form.value.phoneNumber,
      password: form.value.password,
    })

    router.push({ name: 'dashboard' })
    
  } catch (err) {
    error.value = err.message || 'Failed to authenticate, try later.'
  }

  isLoading.value = false
}

const handleError = function () {
  error.value = null
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <Z1LogoWithText />
          </div>
        </template>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to Z1 App! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submitForm">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="form.phoneNumber"
                label="Phone Number"
                :rules="phoneNumberRules"
                type="text"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                :type="isPasswordVisible ? 'text' : 'password'"
                :rules="passwordRules"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  Forgot Password?
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block
                :disabled="isLoading"
                type="submit"
              >
                <template v-if="isLoading">
                  <VProgressCircular
                    indeterminate
                    color="white"
                  />
                </template>
                <template v-else>
                  Login
                </template>
              </VBtn>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
