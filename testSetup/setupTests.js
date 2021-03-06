// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { cache } from 'swr'
import { server } from './server.js'

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
  jest.useFakeTimers()
})

afterEach(() => {
  cache.clear()
  server.resetHandlers()
  jest.runAllTimers()
  global.gc()
})

afterAll(() => {
  server.close()
})
