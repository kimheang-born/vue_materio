<script setup>
import { useStore } from 'vuex'

const store = useStore()

const selectedRecordType = ref(null)
const selectedPropertyType = ref(null)
const selectedCurrentUse = ref(null)
const selectedPurpose = ref(null)
const toggleCurrentUseColumn = ref(true)

// Property Description
const recordTypes = computed(() => store.getters['indicationPlus/getRecordTypesFormat'])
const propertyTypes = computed(() => store.getters['indicationPlus/getPropertyTypesFormat'])
const currentUses = computed(() => store.getters['indicationPlus/getCurrentUsesFormat'])
const purposes = computed(() => store.getters['indicationPlus/getPurposesFormat'])

const landShapeTypes = computed(() => store.getters['indicationPlus/getLandShapeTypesFormat'])
const topographies = computed(() => store.getters['indicationPlus/getTopographiesFormat'])
const sitePositions = computed(() => store.getters['indicationPlus/getSitePositionsFormat'])

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

const isLoading = ref(false)
const error = ref(null)

const submitForm = async () => {
  isLoading.value = true

  try {
    await store.dispatch('indicationPlus/submitCase', {
      record_type: selectedRecordType.value,
      property_type: selectedPropertyType.value,
      current_use: selectedCurrentUse.value,
      purpose_of_property: selectedPurpose.value,
    })
    
  } catch (err) {
    error.value = err.message || 'Data cannot be submitted.'
  }

  isLoading.value = false
}

onMounted(() => {
  store.dispatch('indicationPlus/fetchFormOptions')
})
</script>

<template>
  <div>
    <BaseDialog
      :show="isLoading"
      title="Saving..."
      fixed
    >
      <BaseSpinner />
    </BaseDialog>
    <VCol
      cols="12"
      md="12"
      sm="6"
    >
      <VForm @submit.prevent="submitForm">
        <VCard
          title="Property Description"
          class="mb-5"
        >
          <VCardText>
            <VRow>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
                <VSelect
                  v-model="selectedRecordType"
                  :items="recordTypes"
                  label="Record Type"
                  clearable
                  item-text="text"
                  @update:model-value="onRecordTypeChange"
                /> 
              </VCol>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
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
                md="6"
                sm="12"
              >
                <VSelect
                  v-model="selectedCurrentUse"
                  :items="currentUses"
                  label="Current Use"
                  clearable
                  item-text="text"
                />
              </VCol>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
                <VSelect
                  v-model="selectedPurpose"
                  :items="purposes"
                  label="Purpose"
                  clearable
                  item-text="text"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
        <VCard
          title="Land Information"
          class="mb-5"
        >
          <VCardText>
            <VRow>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
                <VTextField
                  label="Land Width (m) *"
                  variant="outlined"
                  type="number"
                />
              </VCol>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
                <VTextField
                  label="Land Length (m)"
                  variant="outlined"
                  type="number"
                />
              </VCol>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
                <VTextField
                  label="Land Area (m²) *"
                  variant="outlined"
                  type="number"
                />
              </VCol>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
                <VSelect
                  :items="landShapeTypes"
                  label="Shape *"
                  clearable
                  item-text="text"
                />
              </VCol>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
                <VSelect
                  :items="topographies"
                  label="Topography *"
                  clearable
                  item-text="text"
                />
              </VCol>
              <VCol
                cols="6"
                md="6"
                sm="12"
              >
                <VSelect
                  :items="sitePositions"
                  label="Site Position *"
                  clearable
                  item-text="text"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
        <VCardText>
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
        </VCardText>
      </VForm>
    </VCol>
  </div>
</template>
