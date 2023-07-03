<script setup>
import VueApexCharts from 'vue3-apexcharts'

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

const chartSeries = ref([44, 55, 13])
</script>

<template>
  <VCard>
    <VCardItem>
      <VueApexCharts
        type="donut"
        :options="chartOptions"
        :series="chartSeries"
      />
    </VCardItem>
  </VCard>
</template>
