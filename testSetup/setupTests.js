// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
// import { server } from './server.js'

beforeAll(() => {
  // server.listen({ onUnhandledRequest: 'error' })
  jest.useFakeTimers()
})

afterEach(() => {
  // server.resetHandlers()
  jest.runAllTimers()
})

// afterAll(() => {
//   server.close()
// })
