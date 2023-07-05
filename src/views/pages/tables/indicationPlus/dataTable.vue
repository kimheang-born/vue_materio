<script setup>
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const page = ref(1)
const isLoading = ref(false)
const error = ref(null)

const mappedCases = computed(() => store.getters['indicationPlus/mappedCases'])

const loadCases = async () => {
  isLoading.value = true

  try {
    await store.dispatch('indicationPlus/fetchCases')
  } catch (err) {
    error.value = err.message || 'The data could not be retrieved.'
  }

  isLoading.value = false
}

const headers = [
  'Cases Number',
  'Status',
  'Property Type',
  'Created At',
]

onBeforeMount(() => {
  loadCases()
})
</script>

<template>
  <VTable
    :headers="headers"
    fixed-header
    height="450px"
  >
    <thead>
      <tr>
        <th
          v-for="header in headers"
          id="cases"
          :key="header"
          class="text-left able-rounded"
          hide-default-footer
          disable-sort
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in mappedCases"
        :key="item.id"
      >
        <td
          class="text-sm"
          v-text="item.id"
        />
        <td>
          <VChip
            size="small"
            :color="item.color"
            class="text-capitalize"
          >
            {{ item.status }}
          </VChip>
        </td>
        <td
          class="text-sm"
          v-text="item.propertyTypeDynamicName"
        />
        <td
          class="text-sm"
          v-text="$filters.timeAgo(item.createdAt)"
        />
      </tr>
    </tbody>
  </VTable>
  <div class="text-center">
    <VContainer>
      <VRow justify="center">
        <VCol cols="8">
          <VContainer class="max-width">
            <VPagination
              v-model="page"
              class="my-4"
              :length="15"
            />
          </VContainer>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>
