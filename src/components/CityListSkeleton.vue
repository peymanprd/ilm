<script setup lang="ts">
import CityCardSkeleton from '@/components/CityCardSkeleton.vue'
</script>

<template>
  <div class="flex flex-col gap-2 mt-8">
    <template v-for="cs in 4" :key="cs">
      <CityCardSkeleton />
    </template>
  </div>
</template>
