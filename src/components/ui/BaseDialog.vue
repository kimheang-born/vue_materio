<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="backdrop"
      @click="tryClose"
    />
    <Transition name="dialog">
      <dialog
        v-if="show"
        open
      >
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot />
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <BaseButton @click="tryClose">
              Close
            </BaseButton>
          </slot>
        </menu>
      </dialog>
    </Transition>
  </Teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return
      }
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  z-index: 10;
  background-color: rgba(0, 0, 0, 75%);
  block-size: 100vh;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
}

dialog {
  position: fixed;
  z-index: 100;
  overflow: hidden;
  padding: 0;
  border: none;
  border-radius: 12px;
  margin: 0;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 26%);
  inline-size: 80%;
  inset-block-start: 20vh;
  inset-inline-start: 10%;
}

header {
  --v-theme-overlay-multiplier: var(--v-theme-primary-overlay-multiplier);

  padding: 1rem;
  background-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-on-primary)) !important;
  inline-size: 100%;
}

header h2 {
  margin: 0;
  color: #fff;
}

section {
  padding: 1rem;
}

menu {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    inline-size: 40rem;
    inset-inline-start: calc(50% - 20rem);
  }
}
</style>
