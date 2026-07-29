import type { CountryGreeting } from '../components/StylizedGlobe'

// One major country per widely-spoken language, each greeted in its own tongue.
export const COUNTRY_GREETINGS: CountryGreeting[] = [
  { country: 'United States', greeting: 'Hello', lat: 39, lng: -98 },
  { country: 'France', greeting: 'Bonjour', lat: 46, lng: 2 },
  { country: 'Spain', greeting: 'Hola', lat: 40, lng: -4 },
  { country: 'Germany', greeting: 'Hallo', lat: 51, lng: 10 },
  { country: 'China', greeting: '你好', lat: 35, lng: 105 },
  { country: 'Japan', greeting: 'こんにちは', lat: 36, lng: 138 },
  { country: 'Russia', greeting: 'Привет', lat: 61, lng: 90 },
]
