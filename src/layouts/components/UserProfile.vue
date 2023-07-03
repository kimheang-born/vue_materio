<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isLoading = ref(false)
const error = ref(null)

const onlineBadgeColor = computed(() => {
  return store.getters['internets/isOnline'] ? 'success' : 'secondary'
})

const userProfile = computed(() => {
  return store.getters.getUserProfile
})

const imgProfile = computed(() => {
  return userProfile.value?.profile?.small ?? avatar1
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

const handleError = () => error.value = null

const logout = () => store.dispatch('logout')

onBeforeMount(() => {
  loadUserProfile()
})
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    :color="onlineBadgeColor"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="imgProfile" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  :color="onlineBadgeColor"
                  bordered
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="imgProfile" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ userProfile.fullName }}
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-account-outline"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-cog-outline"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-currency-usd"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-help-circle-outline"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem
            to="/login"
            @click="logout"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
