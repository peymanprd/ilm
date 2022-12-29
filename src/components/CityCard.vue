<script setup lang="ts">
defineProps({ city: { type: Object, required: true } })
</script>

<template>
  <div
    class="md:relative z-[5] flex items-center py-3 pl-2 pr-6 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 hover:border-primary dark:hover:border-primary cursor-pointer transition"
  >
    <span
      @click.stop="$emit('remove-city')"
      class="hidden md:inline-flex py-0.5 px-1.5 rounded-lg md:absolute left-1 bottom-1 hover:!text-rose-500 text-zinc-300 dark:text-zinc-600 cursor-pointer"
    >
      <i @click="" class="fa-regular fa-trash-can text-base"></i>
    </span>
    <img
      :src="`https://openweathermap.org/img/wn/${city.weather?.weather[0]?.icon}@4x.png`"
      :alt="city.city"
      class="w-16 md:w-20 h-auto"
    />
    <div class="flex flex-col flex-1">
      <h2 class="text-2xl text-zinc-800 font-medium dark:text-zinc-200">
        {{ city.city }}
      </h2>
      <h3 class="text-base text-zinc-600 dark:text-zinc-400 ml-0.5">
        {{ city.state }}
      </h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-xl font-medium self-end dark:text-zinc-200">
        {{ Math.round(city.weather?.main?.temp) }}&deg;
      </p>
      <div class="flex items-center gap-2">
        <span class="text-xs dark:text-zinc-400">
          H : {{ Math.round(city.weather?.main?.temp_max) }}
        </span>
        <span class="text-xs dark:text-zinc-400">
          L : {{ Math.round(city.weather?.main?.temp_min) }}
        </span>
      </div>
    </div>
  </div>
</template>
