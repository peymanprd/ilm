<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'solid' },
  name: { type: String, default: 'sun' },
  size: { type: String, default: '2xl' },
})
</script>

<template>
  <i :class="`fa-${type}``fa-${name}``text-${size}`"></i>
</template>
