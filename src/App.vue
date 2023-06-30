<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onBeforeMount(() => {
  store.dispatch('tryLogin')
})
</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
