import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OrderBookProvider } from 'contexts/orderBook'
import { fakeAskData } from 'consts/fakeOrderBook'
import OrderBook from '.'
import OrderTable from './OrderTable'

describe('Order Book', () => {
  it('should have the loader and the correct product name', () => {
    const { container } = render(
      <OrderBookProvider>
        <OrderBook />
      </OrderBookProvider>
    )
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
  it('should change the product id', () => {
    render(
      <OrderBookProvider>
        <OrderBook />
      </OrderBookProvider>
    )
    userEvent.selectOptions(screen.getByTestId('product-id'), 'PI_ETHUSD')
    expect(screen.getByTestId('product-id')).toHaveValue('PI_ETHUSD')
  })
})

describe('OrderTable', () => {
  it('return null if no orders', () => {
    render(
      <OrderBookProvider>
        <OrderTable orders={[]} bids={false} />
      </OrderBookProvider>
    )
    expect(screen.queryByText('PRICE')).toBeNull()
    expect(screen.queryByText('$0.4607')).toBeNull()
  })
  it('should pass down asks data', () => {
    render(
      <OrderBookProvider>
        <OrderTable orders={fakeAskData} bids={false} />
      </OrderBookProvider>
    )
    expect(screen.getByText('PRICE')).toBeInTheDocument()
    expect(screen.getByText('$0.4607')).toBeInTheDocument()
    expect(screen.getByText('101,600')).toBeInTheDocument()
  })
  it('should pass down bids data', () => {
    render(
      <OrderBookProvider>
        <OrderTable orders={fakeAskData} bids />
      </OrderBookProvider>
    )
    expect(screen.queryByText('PRICE')).toBeNull()
    expect(screen.getByText('$0.4607')).toBeInTheDocument()
    expect(screen.getByText('101,600')).toBeInTheDocument()
  })
})
