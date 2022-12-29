<script setup lang="ts">
import Skeleton from '@/components/shared/Skeleton.vue'
</script>

<template>
  <div
    class="flex items-center py-5 md:py-6 pl-2 pr-6 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 hover:border-primary dark:hover:border-primary cursor-pointer transition"
  >
    <Skeleton class="w-10 md:w-12 h-10 md:h-12 ml-2 mr-3" />
    <div class="flex flex-col flex-1 gap-2">
      <Skeleton class="w-20 md:w-24 h-4 md:h-6" />
      <Skeleton class="w-12 md:w-32 h-4" />
    </div>
    <div class="flex flex-col items-end gap-2">
      <Skeleton class="w-6 md:w-8 h-6 md:h-8" />
      <Skeleton class="w-16 md:w-20 h-3 mt-1" />
    </div>
  </div>
</template>
