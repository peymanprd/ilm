<script setup lang="ts">
import TheNav from '@/components/TheNav.vue'
</script>

<template>
  <div
    class="flex flex-col min-h-screen font-Poppins bg-white dark:bg-zinc-800"
  >
    <TheNav />
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 250ms ease all;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
