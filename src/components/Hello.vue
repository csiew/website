<template>
  <div class="section hello width-full width-max-640 text-align-center margin-auto-horizontal margin-xxl-top margin-m-bottom">
    <div class="section-header">
      <h1 class="flex-inline width-full justify-center align-center margin-xs-bottom text-align-center">Clarence Siew</h1>
      <p class="text-color-secondary">Software Engineer based in Melbourne, Australia</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hello'
}
</script>

<style scoped>
  .dark-mode .hello h1 {
    animation: hello-pulse 6s ease-in-out infinite !important;
  }
  @keyframes hello-pulse {
    0%, 100% {
        text-shadow: 0px 0px 8px var(--FG-COLOR);
    }
    25% {
      filter: contrast(0.75);
    }
    50% {
      text-shadow: 0px 0px 12px var(--FG-COLOR);
    }
    75% {
      filter: contrast(0.8);
    }
    80%, 90% {
      filter: contrast(0.9) brightness(0.9);
      transform: skewX(0.5deg);
      text-shadow: 0px 0px 6px gold;
    }
    81% {
      transform: skewX(-0.5deg);
      text-shadow: 0px 0px 8px var(--FG-COLOR);
    }
    82% {
      transform: skewX(0.5deg);
      filter: contrast(1.25) brightness(1.25);
      text-shadow: 0px 0px 12px aqua;
    }
    82% {
      transform: skewX(-0.5deg);
      text-shadow: 0px 0px 16px tomato;
    }
}
</style>