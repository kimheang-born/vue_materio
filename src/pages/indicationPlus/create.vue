<script setup>
const recordType = ref('')
</script>

<template>
  <div>
    <VCol
      cols="12"
      md="12"
      sm="6"
    >
      <VCard title="Create Case">
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <VCol cols="6">
                <VSelect
                  v-model="recordType"
                  clearable
                  label="Record Type *"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                  :rules="[v => !!v || 'Record Type is required']"
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  clearable
                  label="Property Type"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  clearable
                  label="Current Use"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  clearable
                  label="Purpose"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                />
              </VCol>
            </VRow>
            <VRow justify="end">
              <VCol cols="auto">
                <VBtn
                  color="secondary"
                  variant="tonal"
                  class="text-capitalize"
                  :to="{ name: 'case-list' }"
                >
                  Cancel
                </VBtn>
              </VCol>
              <VCol cols="auto">
                <VBtn
                  type="submit"
                  class="text-capitalize"
                >
                  Submit
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </div>
</template>
