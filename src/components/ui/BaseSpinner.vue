<template>
  <div class="spinner">
    <div class="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
}

.lds-roller {
  position: relative;
  display: inline-block;
  block-size: 80px;
  inline-size: 80px;
}

.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}

.lds-roller div::after {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: #3d008d;
  block-size: 7px;
  content: " ";
  inline-size: 7px;
  margin-block: -4px 0;
  margin-inline: -4px 0;
}

.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}

.lds-roller div:nth-child(1)::after {
  inset-block-start: 63px;
  inset-inline-start: 63px;
}

.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}

.lds-roller div:nth-child(2)::after {
  inset-block-start: 68px;
  inset-inline-start: 56px;
}

.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}

.lds-roller div:nth-child(3)::after {
  inset-block-start: 71px;
  inset-inline-start: 48px;
}

.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}

.lds-roller div:nth-child(4)::after {
  inset-block-start: 72px;
  inset-inline-start: 40px;
}

.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}

.lds-roller div:nth-child(5)::after {
  inset-block-start: 71px;
  inset-inline-start: 32px;
}

.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}

.lds-roller div:nth-child(6)::after {
  inset-block-start: 68px;
  inset-inline-start: 24px;
}

.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}

.lds-roller div:nth-child(7)::after {
  inset-block-start: 63px;
  inset-inline-start: 17px;
}

.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}

.lds-roller div:nth-child(8)::after {
  inset-block-start: 56px;
  inset-inline-start: 12px;
}

@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
