<script setup lang="ts">
import Skeleton from '@/components/shared/Skeleton.vue'
</script>

<template>
  <div class="flex flex-col items-center gap-4 py-12">
    <Skeleton class="w-40 md:w-44 h-8" />
    <Skeleton class="w-28 md:w-40 h-28 md:h-40 mt-3 md:mt-6" />
    <Skeleton class="w-20 h-3 mt-1 md:mt-3" />
    <Skeleton class="w-28 h-3" />
    <Skeleton class="w-16 md:w-20 h-16 md:h-20 mt-2 md:mt-4" />
    <Skeleton class="w-full h-60 md:h-32 mt-6" shape="square"> </Skeleton>
  </div>
</template>
