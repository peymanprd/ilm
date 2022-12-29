<script setup lang="ts">
const props = defineProps({
  shape: {
    type: String,
    default: 'circle',
    validator: (value: string) => ['square', 'circle'].includes(value),
  },
  inline: { type: Boolean },
})
</script>

<template>
  <div
    class="skeleton"
    :class="[
      inline && 'inline-block',
      shape == 'circle' && `rounded-full`,
      shape == 'square' && `rounded-lg`,
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.skeleton {
  @apply bg-gradient-to-r from-zinc-200 dark:from-zinc-700 to-zinc-100 dark:to-zinc-600 animate-pulse;
}
</style>
