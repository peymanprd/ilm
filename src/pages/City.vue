<script setup lang="ts">
import CityCurrent from '@/components/CityCurrent.vue'
import City5Days from '@/components/City5Days.vue'
import CitySkeleton from '@/components/CitySkeleton.vue'
</script>

<template>
  <div>
    <div
      v-if="$route.query.preview"
      class="text-white px-6 py-3 bg-primary dark:bg-zinc-900 w-full text-center text-[0.6969rem] md:text-sm"
    >
      You are currently previewing this city, click the
      <i class="fa-solid fa-plus text-xs leading-6 mx-0.5"></i>
      icon to start tracking this city.
    </div>
    <div class="container">
      <Suspense>
        <div>
          <CityCurrent />
          <City5Days />
        </div>
        <template #fallback>
          <CitySkeleton />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style></style>
