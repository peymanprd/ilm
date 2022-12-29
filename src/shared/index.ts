interface geometry {
  coordinates: Array<number>
  type: string
}

export interface city {
  bbox?: Array<number>
  center?: Array<number>
  context?: Array<object>
  geometry?: geometry | any
  id: string
  place_name: string
  place_type?: Array<string>
  properties?: object
  relevance?: number
  text?: string
  type?: string
}
