<script setup>
import { useStore } from 'vuex'

const store = useStore()

const selectedRecordType = ref(null)
const selectedPropertyType = ref(null)
const selectedCurrentUse = ref(null)
const selectedPurpose = ref(null)
const toggleCurrentUseColumn = ref(true)

const recordTypes = computed(() => store.getters['indicationPlus/getRecordTypesFormat'])
const propertyTypes = computed(() => store.getters['indicationPlus/getPropertyTypesFormat'])
const currentUses = computed(() => store.getters['indicationPlus/getCurrentUsesFormat'])
const purposes = computed(() => store.getters['indicationPlus/getPurposesFormat'])

const hideOrShowCurrentUse = recordType => {
  const toggle = ['Land', 'Land and Building'].includes(recordType)

  toggleCurrentUseColumn.value = toggle
}

const onRecordTypeChange = () => {
  selectedPropertyType.value = null
  selectedCurrentUse.value = null

  hideOrShowCurrentUse(selectedRecordType.value)

  store.dispatch('indicationPlus/fetchPropertyTypes', selectedRecordType.value)
}

const onPropertyTypeChange = () => {
  selectedCurrentUse.value = null
  store.dispatch('indicationPlus/fetchCurrentUses', selectedPropertyType.value)
}

const submitForm = () => {
  console.log(1)
}

onMounted(() => {
  store.dispatch('indicationPlus/fetchFormOptions')
})
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
          <VForm @submit.prevent="submitForm">
            <VRow>
              <VCol cols="6">
                <VSelect
                  v-model="selectedRecordType"
                  :items="recordTypes"
                  label="Record Type"
                  clearable
                  item-text="text"
                  @update:model-value="onRecordTypeChange"
                /> 
              </VCol>
              <VCol cols="6">
                <VSelect
                  v-model="selectedPropertyType"
                  :items="propertyTypes"
                  label="Property Type"
                  clearable
                  item-text="text"
                  @update:model-value="onPropertyTypeChange"
                />
              </VCol>
              <VCol
                v-if="toggleCurrentUseColumn"
                cols="6"
              >
                <VSelect
                  v-model="selectedCurrentUse"
                  :items="currentUses"
                  label="Current Use"
                  clearable
                  item-text="text"
                />
              </VCol>
              <VCol cols="6">
                <VSelect
                  v-model="selectedPurpose"
                  :items="purposes"
                  label="Purpose"
                  clearable
                  item-text="text"
                />
              </VCol>
            </VRow>
            <VRow justify="end">
              <VCol cols="auto">
                <VBtn
                  color="secondary"
                  variant="tonal"
                  class="text-capitalize"
                  :to="{ name: 'case' }"
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
