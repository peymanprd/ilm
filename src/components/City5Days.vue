<script setup lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()

async function getWeatherData() {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        route.query.lat
      }&lon=${route.query.lng}&cnt=8&appid=${
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
  <div class="flex flex-col p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
    <!-- <h2 class="text-base text-zinc-700">{{ weatherData.list }}</h2> -->
    <div class="grid grid-cols-4 md:grid-cols-8 gap-10 overflow-x-auto text-sm">
      <template v-for="(weatherDay, index) in weatherData.list" :key="index">
        <div class="flex flex-col items-center gap-0.5 md:gap-1.5">
          <p class="text-zinc-800 dark:text-zinc-300 font-medium text-xs">
            {{
              new Date(weatherDay.dt_txt).toLocaleTimeString('en-us', {
                hour: 'numeric',
              })
            }}
          </p>
          <img
            :src="`https://openweathermap.org/img/wn/${weatherDay.weather[0].icon}@4x.png`"
            alt=""
            class="w-10 md:w-12 h-auto"
          />
          <p class="text-zinc-800 dark:text-zinc-300 font-medium text-xs">
            {{ Math.round(weatherDay.main.temp) }} &deg
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
