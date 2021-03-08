import '@testing-library/jest-dom/extend-expect'

beforeAll(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runAllTimers()
})
