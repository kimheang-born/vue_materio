<script setup>
const desserts = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
  },
  {
    name: 'Eclair',
    calories: 262,
  },
  {
    name: 'Cupcake',
    calories: 305,
  },
  {
    name: 'Gingerbread',
    calories: 356,
  },
  {
    name: 'Jelly bean',
    calories: 375,
  },
  {
    name: 'Lollipop',
    calories: 392,
  },
  {
    name: 'Honeycomb',
    calories: 408,
  },
  {
    name: 'Donut',
    calories: 452,
  },
  {
    name: 'KitKat',
    calories: 518,
  },
])
</script>

<template>
  <VTable
    fixed-header
    height="300px"
  >
    <thead>
      <tr>
        <th
          id="name"
          class="text-left"
        >
          Name
        </th>
        <th
          id="calories"
          class="text-left"
        >
          Calories
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
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
