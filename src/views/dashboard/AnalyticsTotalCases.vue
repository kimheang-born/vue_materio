<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const chartOptions = ref({
  labels: ['Land', 'Building', 'Land and Building'],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            offsetY: 0,
          },
          value: {
            fontWeight: 400,
            offsetY: 24,

            // color: '#fff',
          },
          total: {
            show: true,
            label: 'Total Cases',
            fontSize: '12px',
            fontWeight: 400,

            // color: '#fff',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
            },
          },
        },
      },
    },
  },
  colors: ['#E68875', '#F0C3BA', '#F4D9D4'],
})

const error = ref(null)
const isLoading = ref(false)

const totalCases = computed(() => store.getters['dashboards/totalCases'])

const loadTotalCases = function () {
  isLoading.value = true

  try {
    store.dispatch('dashboards/fetchTotalCases')
  } catch (err) {
    error.message = err.message || 'Unable to retrieve the data'
  }

  isLoading.value = true
}

onBeforeMount(() => {
  loadTotalCases()
})
</script>

<template>
  <VCard>
    <VCardItem>
      <VueApexCharts
        type="donut"
        :options="chartOptions"
        :series="totalCases"
      />
    </VCardItem>
  </VCard>
</template>
