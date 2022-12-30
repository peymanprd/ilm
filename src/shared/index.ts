import type { LocationQueryValue } from 'vue-router'

interface geometry {
  coordinates: number[]
  type: string
}

export interface city {
  bbox?: number[]
  center?: number[]
  context?: object[]
  geometry?: geometry | any
  id?: number | string | LocationQueryValue | LocationQueryValue[]
  place_name: string
  place_type?: string[]
  properties?: object
  relevance?: number
  text?: string
  type?: string
}

interface coords {
  lat: LocationQueryValue | LocationQueryValue[]
  lng: LocationQueryValue | LocationQueryValue[]
  preview?: number | boolean
}

export interface queryCity {
  id?: number | string | LocationQueryValue | LocationQueryValue[]
  state: string | string[]
  city: string | string[]
  coords?: coords
}
