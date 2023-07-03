<script setup>
import { computed, watch, onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const snackbar = ref(false)

const isOnline = computed(() => store.getters['internets/isOnline'])
const onlineMessage = computed(() => isOnline.value ? 'Connected to the internet' : 'No internet connection')

watch(isOnline, newValue => {
  snackbar.value = !newValue
})

onBeforeMount(() => {
  store.dispatch('internets/handleOnlineStatus')
  store.dispatch('tryLogin')
})

onBeforeUnmount(() => {
  store.dispatch('internets/handleOnlineStatus')
})
</script>

<template>
  <VApp>
    <RouterView />
    <VSnackbar
      v-model="snackbar"
      :color="isOnline ? 'success' : 'error'"
      bottom
      left
    >
      <VIcon
        v-if="isOnline"
        left
        class="mr-2"
      >
        mdi-wifi-off
      </VIcon>
      <VIcon
        v-else
        left
        class="mr-2"
      >
        mdi-wifi-off
      </VIcon>
      <span>{{ onlineMessage }}</span>
      <template #actions>
        <VBtn
          color="white"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </VApp>
</template>
