import React from 'react'
import { render } from '@testing-library/react'
import { SWRConfig } from 'swr'

// tesing with useSwr - https://medium.com/frontend-digest/using-testing-libary-with-useswr-f595919de2fd

const Wrapper = ({ children }) => {
  return <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
}

const customRender = (ui, options = {}) => render(ui, { wrapper: Wrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
