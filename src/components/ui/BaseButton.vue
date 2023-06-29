<template>
  <button
    v-if="!link"
    :class="mode"
  >
    <slot />
  </button>
  <RouterLink
    v-else
    :to="to"
    :class="mode"
  >
    <slot />
  </RouterLink>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
}
</script>

<style scoped>
button,
a {
  display: inline-block;
  border: 1px solid #3a0061;
  border-radius: 30px;
  background-color: #3a0061;
  color: white;
  cursor: pointer;
  font: inherit;
  margin-inline-end: 0.5rem;
  padding-block: 0.75rem;
  padding-inline: 1.5rem;
  text-decoration: none;
}

a:hover,
a:active,
button:hover,
button:active {
  border-color: #270041;
  background-color: #270041;
}

.flat {
  border: none;
  background-color: transparent;
  color: #3a0061;
}

.outline {
  border-color: #270041;
  background-color: transparent;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
