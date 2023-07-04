<script setup>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const statistics = [
  {
    title: 'Sales',
    stats: '245k',
    icon: 'mdi-trending-up',
    color: 'primary',
  },
  {
    title: 'Customers',
    stats: '12.5k',
    icon: 'mdi-account-outline',
    color: 'success',
  },
  {
    title: 'Product',
    stats: '1.54k',
    icon: 'mdi-cellphone-link',
    color: 'warning',
  },
  {
    title: 'Revenue',
    stats: '$88k',
    icon: 'mdi-currency-usd',
    color: 'info',
  },
]

const isLoading = ref(false)
const error = ref(null)

const allTotalStatusesNum = computed(() => store.getters['dashboards/allTotalStatusesNum'])

const mappedStatuesStatistics = computed(() => store.getters['dashboards/mappedStatuesStatistics'])

const loadTotalStatuses = async () => {
  isLoading.value = true

  try {
    await store.dispatch('dashboards/fetchTotalStatuses')
  } catch (err) {
    error.value = err || 'Unable to retrieve the data'
  }

  isLoading.value = false
}

onBeforeMount(() => {
  loadTotalStatuses()
})
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Status ({{ allTotalStatusesNum }})</VCardTitle>

      <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VRow>
        <VCol
          v-for="item in mappedStatuesStatistics"
          :key="item.status"
          cols="6"
          sm="3"
        >
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                :color="item.color"
                rounded
                size="42"
                class="elevation-1"
              >
                <VIcon
                  size="24"
                  :icon="item.icon"
                />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption text-no-wrap">
                {{ item.text }}
              </span>
              <span class="text-h6">{{ item.value }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
