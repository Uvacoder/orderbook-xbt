import { render, screen } from '@testing-library/react'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { OrderBookProvider, useOrderBookState, useOrderBookDispatch } from '../orderBook'

const SampleOrderBook = () => {
  const { orderBookError } = useOrderBookState()
  const dispatch = useOrderBookDispatch()
  return (
    <div>
      <span>orderBookError: {orderBookError}</span>
      <button type="button" onClick={() => dispatch({ type: 'orderBookError', orderBookError: "There's an error" })}>
        error
      </button>
    </div>
  )
}

describe('OrderBookProvider Component', () => {
  it('should dispatch all the values', () => {
    render(
      <OrderBookProvider>
        <SampleOrderBook />
      </OrderBookProvider>
    )

    expect(screen.getByText('orderBookError:')).toBeInTheDocument()
    userEvent.click(screen.getByText('error'))
    expect(screen.getByText("orderBookError: There's an error")).toBeInTheDocument()
  })
})
