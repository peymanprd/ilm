<script setup lang="ts">
defineProps({ isActive: { type: Boolean } })
const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="outer">
      <div
        v-show="isActive"
        class="absolute z-40 top-0 left-0 w-full h-screen bg-zinc-800 bg-opacity-40 flex justify-center p-8"
      >
        <Transition name="inner">
          <div
            v-if="isActive"
            class="bg-white dark:bg-zinc-900 self-center sm:self-start w-full sm:w-4/12 rounded mt-10"
          >
            <header
              class="py-2.5 px-3 border-b dark:border-zinc-800 flex justify-between items-center"
            >
              <h3 class="text-base font-medium text-zinc-700 dark:text-white">
                <slot />
              </h3>
              <i
                @click="emit('close')"
                class="fa-solid fa-close text-base cursor-pointer text-zinc-400 hover:text-zinc-800 duration-150 mr-2"
              ></i>
            </header>
            <section class="p-3 dark:text-zinc-300">
              <slot name="body" />
            </section>
            <footer class="p-3">
              <slot name="footer">
                <button
                  @click="emit('close')"
                  class="bg-primary text-white rounded-md text-sm font-medium py-2 px-6"
                >
                  close
                </button>
              </slot>
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.outer-enter-active,
.outer-leave-active {
  transition: opacity 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.outer-enter-from,
.outer-leave-to {
  opacity: 0;
}

.inner-enter-active {
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.inner-leave-active {
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
</style>
