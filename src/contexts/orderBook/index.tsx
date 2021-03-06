import React, { createContext, ReactNode, useContext, useReducer, useEffect, useRef } from 'react'
import { OrderBookState, OrderBookSnapshot } from '~/types/OrderBookTypes'
import { orderBookReducer, initialOrderBookState } from './orderBookReducer'

const OrderBookContext = createContext<OrderBookState>(initialOrderBookState)

const WSS_URL = process.env.WSS_URL || 'wss://www.cryptofacilities.com/ws/v1'

export const OrderBookProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [orderBook, dispatch] = useReducer(orderBookReducer, initialOrderBookState)
  const ws = useRef<WebSocket | undefined>()

  const { productIds, orderBookConnected } = orderBook

  useEffect(() => {
    ws.current = new WebSocket(WSS_URL)

    ws.current.addEventListener('open', () => {
      dispatch({ type: 'connectedToOrderBook' })
    })

    ws.current.addEventListener('close', () => {
      dispatch({ type: 'unsubscribeFromOrderBook' })
    })

    ws.current.addEventListener('error', (event) => {
      dispatch({ type: 'orderBookError', orderBookError: event })
      // QUESTION: should the connection be closed after an error?
      // ws.current.close()
    })

    return () => {
      ws.current.close()
    }
  }, [])

  useEffect(() => {
    if (!ws.current || !orderBookConnected) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }

    if (ws.current.readyState === ws.current.OPEN) {
      ws.current.send(
        JSON.stringify({
          event: 'subscribe',
          feed: 'book_ui_1',
          product_ids: productIds
        })
      )
    }

    const onMessage = (event: MessageEvent) => {
      try {
        const data: OrderBookSnapshot = JSON.parse(event.data)
        if (!data.bids && !data.asks) {
          return
        }

        dispatch({ type: 'updateOrderBook', orderBook: data })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('WS error: bad message', event.data, err.message)
        dispatch({
          type: 'orderBookError',
          orderBookError: `There was an error with the incoming data: ${err.message}`
        })
      }
    }

    ws.current.addEventListener('message', onMessage)

    return () => {
      if (ws.current) {
        ws.current.removeEventListener('message', onMessage)
      }
    }
  }, [orderBookConnected, productIds])

  return <OrderBookContext.Provider value={orderBook}>{children}</OrderBookContext.Provider>
}

export const useOrderBookState = (): OrderBookState => {
  const state = useContext(OrderBookContext)
  if (typeof state === 'undefined') {
    throw new Error('useOrderBookState must be used within a OrderBookProvider')
  }
  return state
}
