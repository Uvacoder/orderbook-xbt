/* eslint-disable no-console */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import React from 'react'
import fakeOrderBook from 'consts/fakeOrderBook'
import productIdOptions from 'consts/productIdOptions'
import { OrderBookProvider, useOrderBookDispatch, useOrderBookState } from '.'

const SampleOrderBook = () => {
  const {
    orderBookError,
    asks,
    bids,
    orderBookConnecting,
    orderBookConnected,
    productIds,
    reconnect
  } = useOrderBookState()
  const dispatch = useOrderBookDispatch()
  return (
    <div>
      <span>asks: {asks.length}</span>
      <span>bids: {bids.length}</span>
      <span>orderBookConnecting: {`${orderBookConnecting}`}</span>
      <span>orderBookConnected: {`${orderBookConnected}`}</span>
      <span>productId: {productIds[0]}</span>
      <span>reconnect: {reconnect}</span>
      <span>orderBookError: {orderBookError}</span>
      <button
        type="button"
        onClick={() => dispatch({ type: 'updateOrderBook', bids: fakeOrderBook.bids, asks: fakeOrderBook.asks })}
      >
        updateOrderBook
      </button>
      <button type="button" onClick={() => dispatch({ type: 'connectedToOrderBook' })}>
        connectedToOrderBook
      </button>
      <button type="button" onClick={() => dispatch({ type: 'unsubscribeFromOrderBook' })}>
        unsubscribeFromOrderBook
      </button>
      <button type="button" onClick={() => dispatch({ type: 'reconnectToOrderBook' })}>
        reconnectToOrderBook
      </button>
      <button type="button" onClick={() => dispatch({ type: 'orderBookError', orderBookError: "There's an error" })}>
        error
      </button>
      <button type="button" onClick={() => dispatch({ type: 'changeProduct', productId: productIdOptions[1].value })}>
        changeProduct
      </button>
      <button type="button" onClick={() => dispatch({ type: 'noop' })}>
        noop
      </button>
    </div>
  )
}

describe('OrderBookProvider Component', () => {
  it('should dispatch all the values to reducer', () => {
    render(
      <OrderBookProvider>
        <SampleOrderBook />
      </OrderBookProvider>
    )

    expect(screen.getByText('asks: 0')).toBeInTheDocument()
    expect(screen.getByText('bids: 0')).toBeInTheDocument()
    expect(screen.getByText('orderBookConnecting: true')).toBeInTheDocument()
    userEvent.click(screen.getByText('updateOrderBook'))
    expect(screen.getByText('asks: 14')).toBeInTheDocument()
    expect(screen.getByText('bids: 11')).toBeInTheDocument()
    expect(screen.getByText('orderBookConnecting: false')).toBeInTheDocument()

    expect(screen.getByText('orderBookConnected: false')).toBeInTheDocument()
    userEvent.click(screen.getByText('connectedToOrderBook'))
    expect(screen.getByText('orderBookConnected: true')).toBeInTheDocument()

    userEvent.click(screen.getByText('unsubscribeFromOrderBook'))
    expect(screen.getByText('orderBookConnecting: false')).toBeInTheDocument()
    expect(screen.getByText('orderBookConnected: false')).toBeInTheDocument()

    expect(screen.getByText('reconnect: 0')).toBeInTheDocument()
    userEvent.click(screen.getByText('reconnectToOrderBook'))
    expect(screen.getByText('reconnect: 1')).toBeInTheDocument()

    expect(screen.getByText('orderBookError:')).toBeInTheDocument()
    userEvent.click(screen.getByText('error'))
    expect(screen.getByText("orderBookError: There's an error")).toBeInTheDocument()

    expect(screen.getByText('productId: PI_XBTUSD')).toBeInTheDocument()
    userEvent.click(screen.getByText('changeProduct'))
    expect(screen.getByText('productId: PI_ETHUSD')).toBeInTheDocument()

    console.error = jest.fn
    userEvent.click(screen.getByText('noop'))
  })
})
