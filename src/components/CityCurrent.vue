<script setup lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

async function getWeatherData() {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        route.query.lat
      }&lon=${route.query.lng}&appid=${
        import.meta.env.VITE_OPENWEATHERMAP_API_KEY
      }&units=imperial`
    )
    return data
  } catch (err) {
    console.error(err)
  } finally {
  }
}

const weatherData = await getWeatherData()
</script>

<template>
  <div class="flex flex-col items-center flex-1">
    <div class="flex flex-col items-center py-12">
      <h1
        class="text-zinc-800 dark:text-white text-4xl md:text-5xl font-medium"
      >
        {{ route.params.city }}
      </h1>
      <p
        class="text-zinc-800 dark:text-white text-8xl md:text-9xl font-semibold mt-5 md:mt-8"
      >
        {{ Math.round(weatherData.main.temp) }}&deg
      </p>
      <p class="text-zinc-800 dark:text-zinc-200 text-base mt-5 md:mt-6">
        Feels like {{ Math.round(weatherData.main.feels_like) }}&deg
      </p>
      <p
        class="text-zinc-800 dark:text-zinc-200 text-sm capitalize font-medium mt-1"
      >
        {{ weatherData.weather[0].description }}
      </p>
      <img
        :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`"
        alt=""
        class="w-24 md:w-32 h-auto"
      />
    </div>
  </div>
</template>
