<script setup>
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

onMounted(() => {
  loadCases()
})

const loading = ref(false)

const addUser = () => {
  console.log(1)
}

const onClick = () => {
  console.log(2)
}
</script>

<template>
  <VProgressLinear
    v-if="isLoading"
    indeterminate
    color="primary"
    class="mb-3"
  />
  <VCard
    title="Filters"
    class="mb-6"
  >
    <VCardText>
      <VRow>
        <VCol
          cols="12"
          sm="4"
        >
          <VSelect
            label="Select"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="outlined"
          />
        </VCol>
        <VCol
          cols="12"
          sm="4"
        >
          <VSelect
            label="Select"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="outlined"
          />
        </VCol>
        <VCol
          cols="12"
          sm="4"
        >
          <VSelect
            label="Select"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            variant="outlined"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <VCard class="mb-6">
    <VCardTitle>
      <VRow align="center">
        <VCardText>
          <VTextField
            :loading="loading"
            density="compact"
            variant="solo"
            label="Search templates"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:append-inner="onClick"
          />
        </VCardText>
        <VCol
          cols="8"
          sm="6"
          class="text-end"
        >
          <VBtn
            color="primary"
            @click="addUser"
          >
            Add User
          </VBtn>
        </VCol>
      </VRow>
    </VCardTitle>
  </VCard>

  <VCard>
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
  </VCard>
</template>
