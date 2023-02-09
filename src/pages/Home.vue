<script setup lang="ts">
import SpinnerLoop from '@/components/SpinnerLoop.vue'
import CityList from '@/components/CityList.vue'
import CityListSkeleton from '@/components/CityListSkeleton.vue'

import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref, reactive, toRefs, onMounted } from 'vue'
import type { city } from '@/shared'

interface searchState {
  searchQuery: string
  mapboxSearchResult: city | undefined | any
  searchError: boolean
  searchLoading: boolean
  highlightedIndex: number
}

const router = useRouter()
const searchInput = ref()
const state: searchState = reactive({
  searchQuery: '',
  mapboxSearchResult: undefined,
  searchError: false,
  searchLoading: false,
  highlightedIndex: 0,
})

onMounted(() => {
  searchInput.value.focus()
})

const {
  searchQuery,
  mapboxSearchResult,
  searchError,
  searchLoading,
  highlightedIndex,
} = toRefs(state)

let queryTimeout: number | undefined
const waitTime: number = 484
function getSearchResult() {
  clearTimeout(queryTimeout)
  queryTimeout = setTimeout(async () => {
    if (state.searchQuery.length) {
      state.searchLoading = true
      try {
        const { data } = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            state.searchQuery
          }.json?access_token=${
            import.meta.env.VITE_MAPBOX_API_KEY
          }&types=place`
        )

        state.mapboxSearchResult = data.features
        console.log(state.mapboxSearchResult)
      } catch {
        state.searchError = true
      } finally {
        state.searchLoading = false
      }
      return
    }
    state.mapboxSearchResult = undefined
  }, waitTime)
}

function previewCity(payload: city) {
  const [city, state] = payload.place_name.split(',')
  const { coordinates } = payload.geometry
  const [lng, lat] = coordinates
  const params: any = { city: city.replaceAll(' ', '') }
  if (state) params.state = state.replaceAll(' ', '')
  else params.state = 'none'
  router.push({
    name: 'city.page',
    params,
    query: { lat, lng, preview: 1 },
  })
}

function highlight(index: number) {
  state.highlightedIndex = index
  if (state.highlightedIndex > state.mapboxSearchResult.length - 1) {
    state.highlightedIndex = 0
  }
  if (state.highlightedIndex < 0) {
    state.highlightedIndex = state.mapboxSearchResult.length - 1
  }
}

function highlightNext() {
  highlight(state.highlightedIndex + 1)
}
function highlightPrev() {
  highlight(state.highlightedIndex - 1)
}

function selectHighlighted() {
  previewCity(state.mapboxSearchResult[state.highlightedIndex])
}
</script>

<template>
  <main class="container">
    <div class="pt-4 relative text-sm">
      <div class="relative">
        <template v-if="!searchLoading">
          <i
            class="fa-solid fa-magnifying-glass text-sm text-zinc-400 absolute left-0 bottom-3"
          ></i>
        </template>
        <template v-else>
          <SpinnerLoop
            class="absolute left-0 bottom-3 text-zinc-500 dark:text-zinc-400"
          />
        </template>
        <input
          ref="searchInput"
          type="text"
          v-model="searchQuery"
          @input="getSearchResult"
          @keydown.down="highlightNext"
          @keydown.up="highlightPrev"
          @keydown.enter.prevent="selectHighlighted"
          placeholder="search for a city or state"
          class="py-3 px-7 w-full bg-transparent !outline-none placeholder-zinc-500 border-b border-zinc-200 dark:border-zinc-700 focus:border-primary dark:focus:border-primary dark:text-zinc-300 transition"
        />
      </div>
      <ul
        v-show="mapboxSearchResult"
        class="absolute z-10 top-full left-0 mt-0.5 bg-white dark:bg-zinc-700 rounded-md shadow-lg shadow-zinc-100 dark:shadow-zinc-900 border border-zinc-100 dark:border-zinc-700 w-full max-h-80 overflow-y-auto"
      >
        <template v-if="mapboxSearchResult?.length">
          <TransitionGroup name="list" tag="ul">
            <template
              v-for="(
                { id, place_name, geometry }, index
              ) in mapboxSearchResult"
              :key="id"
            >
              <li
                @click="previewCity({ place_name, geometry })"
                class="px-2.5 py-3 flex items-center gap-x-2 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-600 cursor-pointer"
                :class="[
                  index != 0 && 'border-t dark:border-zinc-600',
                  index === highlightedIndex && 'bg-zinc-50 dark:bg-zinc-600',
                ]"
              >
                <i
                  class="fa-solid fa-map-location-dot text-base text-zinc-300 dark:text-zinc-500"
                ></i>
                {{ place_name }}
              </li>
            </template>
          </TransitionGroup>
        </template>
        <template v-else-if="searchError">
          <div class="px-3 py-4 text-xs text-zinc-400">
            Sorry, something went wrong, please try again.
          </div>
        </template>
        <template v-else>
          <div class="px-3 py-4 text-xs text-zinc-400">
            No results match your query, try a diffrent term.
          </div>
        </template>
      </ul>
    </div>

    <Suspense>
      <CityList />
      <template #fallback>
        <CityListSkeleton />
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-leave-active {
  position: absolute;
}
</style>
