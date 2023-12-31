<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import { useStore } from 'vuex'

const store = useStore()
const isLoading = ref(false)
const error = ref(null)

const user = computed(() => {
  return store.getters.getUserProfile
})

const imgProfile = computed(() => {
  return user.value?.profile?.medium ?? avatar1
})

const loadUserProfile = async () => {
  isLoading.value = true

  try {
    await store.dispatch('fetchUserProfile')
  } catch (err) {
    error.value = err.message || 'Something went wrong'
  }

  isLoading.value = false
}

onMounted(() => {
  loadUserProfile()
})

const accountData = {
  avatarImg: avatar1,
  firstName: 'john',
  lastName: 'Doe',
  email: 'johnDoe@example.com',
  org: 'ThemeSelection',
  phone: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zip: '10001',
  country: 'USA',
  language: 'English',
  timezone: '(GMT-11:00) International Date Line West',
  currency: 'USD',
}

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}

const timezones = [
  '(GMT-11:00) International Date Line West',
  '(GMT-11:00) Midway Island',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central America',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Mexico City',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogota',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT-05:00) Indiana (East)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasilia',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Mid-Atlantic',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Cape Verde Is.',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) London',
]

const currencies = [
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'BRL',
  'CAD',
  'CNY',
  'CZK',
  'DKK',
  'HKD',
  'HUF',
  'INR',
]

const isReadOnly = ref(true)
const isSaving = ref(false)
const isSuccess = ref(false)
const accountError = ref(null)

const firstNameRules = ref([
  value => {
    if (value) return true

    return 'First name is required.'
  },
])

const lastNamedRules = ref([
  value => {
    if (value) return true

    return 'Last name is required.'
  },
])

const submitAccountForm = async () => {
  isSaving.value = true
  
  try {
    await store.dispatch('saveAccount', {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
    })
    isSuccess.value = true
  } catch (err) {
    accountError.value = err.message || 'Internal error.'
  }

  isSaving.value = false
}

const handleError = () => { 
  error.value = null 
  accountError.value = null 
}
</script>

<template>
  <VRow>
    <BaseDialog
      :show="!!error || !!accountError"
      title="An error occurred"
      @close="handleError"
    >
      <p v-if="!!error">
        {{ error }}
      </p>
      <p v-if="!!accountError">
        {{ accountError }}
      </p>
    </BaseDialog>
    <VCol cols="12">
      <VProgressLinear
        v-if="isLoading"
        indeterminate
        color="primary"
      />
    </VCol>
    <VCol
      v-if="isSuccess && !isSaving"
      md="12"
      cols="12"
    >
      <VAlert
        type="success"
        title="Congratulations"
        text="Your changes have been successfully saved!"
        border="start"
        variant="tonal"
      />
    </VCol>
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="imgProfile"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                :disabled="isSaving"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                :disabled="isSaving"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="mdi-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm
            class="mt-6"
            @submit.prevent="submitAccountForm"
          >
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="user.firstName"
                  :rules="firstNameRules"
                  label="First Name"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="user.lastName"
                  :rules="lastNamedRules"
                  label="Last Name"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="user.phone"
                  :readonly="isReadOnly"
                  label="Phone Number"
                />
              </VCol>
              
              <!-- 👉 Email -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VTextField
                v-model="user.email"
                label="E-mail"
                type="email"
                />
                </VCol> 
              -->

              <!-- 👉 Organization -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VTextField
                v-model="accountDataLocal.org"
                label="Organization"
                />
                </VCol> 
              -->

              <!-- 👉 Address -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VTextField
                v-model="accountDataLocal.address"
                label="Address"
                />
                </VCol> 
              -->

              <!-- 👉 State -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VTextField
                v-model="accountDataLocal.state"
                label="State"
                />
                </VCol> 
              -->

              <!-- 👉 Zip Code -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VTextField
                v-model="accountDataLocal.zip"
                label="Zip Code"
                />
                </VCol> 
              -->

              <!-- 👉 Country -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VSelect
                v-model="accountDataLocal.country"
                label="Country"
                :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                />
                </VCol> 
              -->

              <!-- 👉 Language -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VSelect
                v-model="accountDataLocal.language"
                label="Language"
                :items="['English', 'Spanish', 'Arabic', 'Hindi', 'Urdu']"
                />
                </VCol> 
              -->

              <!-- 👉 Timezone -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VSelect
                v-model="accountDataLocal.timezone"
                label="Timezone"
                :items="timezones"
                :menu-props="{ maxHeight: 200 }"
                />
                </VCol> 
              -->

              <!-- 👉 Currency -->
              <!--
                <VCol
                cols="12"
                md="6"
                >
                <VSelect
                v-model="accountDataLocal.currency"
                label="Currency"
                :items="currencies"
                :menu-props="{ maxHeight: 200 }"
                />
                </VCol> 
              -->

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  :disabled="isSaving"
                  type="submit"
                >
                  <template v-if="isSaving">
                    <VProgressCircular
                      indeterminate
                      color="white"
                    />
                  </template>
                  <template v-else>
                    Save changes
                  </template>
                </VBtn>

                
                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  :disabled="isSaving"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <!--
      <VCol cols="12">
      <VCard title="Deactivate Account">
      <VCardText>
      <div>
      <VCheckbox
      v-model="isAccountDeactivated"
      label="I confirm my account deactivation"
      />
      </div>

      <VBtn
      :disabled="!isAccountDeactivated"
      color="error"
      class="mt-3"
      >
      Deactivate Account
      </VBtn>
      </VCardText>
      </VCard>
      </VCol> 
    -->
  </VRow>
</template>
