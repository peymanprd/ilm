<script setup lang="ts">
import CityCard from '@/components/CityCard.vue'
import EmptyState from '@/components/EmptyState.vue'

import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { city } from '@/shared'

const router = useRouter()
const savedCities = ref([])

function previewCity({ id, city, state, coords }: any) {
  const { lat, lng } = coords
  router.push({
    name: 'city.page',
    params: { state, city },
    query: { id, lat, lng },
  })
}

function removeCity(city: never) {
  savedCities.value.splice(savedCities.value.indexOf(city), 1)
  localStorage.savedCities = JSON.stringify(savedCities.value)
}

async function getCities() {
  if (localStorage.savedCities) {
    savedCities.value = JSON.parse(localStorage.savedCities)

    const requests = []
    for (let city of savedCities.value) {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            city.coords.lat
          }&lon=${city.coords.lng}&appid=${
            import.meta.env.VITE_OPENWEATHERMAP_API_KEY
          }&units=imperial`
        )
      )
    }

    const weatherData = await Promise.all(requests)
    weatherData.forEach(({ data }, index) => {
      savedCities.value[index].weather = data
    })
  }
}

await getCities()
</script>

<template>
  <div class="mt-8">
    <template v-if="savedCities.length">
      <div class="flex flex-col gap-2">
        <template v-for="city in savedCities">
          <CityCard
            :city="city"
            @click="previewCity(city)"
            @remove-city="removeCity(city)"
          />
        </template>
      </div>
    </template>
    <template v-else>
      <EmptyState />
    </template>
  </div>
</template>
