<script setup>
import DataTable from '@/views/pages/tables/indicationPlus/dataTable.vue'

const loading = ref(false)

const addUser = () => {
  console.log(1)
}

const onClick = () => {
  console.log(2)
}
</script>

<template>
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
    <DataTable />
  </VCard>
</template>
