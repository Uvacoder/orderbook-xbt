import { render, screen } from '@testing-library/react'

import React from 'react'
import { OrderBookProvider, useOrderBookState } from '.'

const SampleOrderBook = () => {
  const { orderBookError } = useOrderBookState()
  return (
    <div>
      <span>orderBookError: {orderBookError}</span>
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
    // userEvent.click(screen.getByText('error'))
    // expect(screen.getByText("orderBookError: There's an error")).toBeInTheDocument()
  })
})
