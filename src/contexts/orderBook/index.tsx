/* eslint-disable consistent-return */
import React, { createContext, ReactNode, useContext, useReducer, useEffect, useRef } from 'react'
import useDocumentHidden from 'hooks/useDocumentHidden'
import useOnlineStatus from 'hooks/useOnlineStatus'
import { OrderBookState, OrderBookSnapshot } from '~/types/OrderBookTypes'
import { orderBookReducer, initialOrderBookState } from './orderBookReducer'

const OrderBookContext = createContext<OrderBookState>(initialOrderBookState)

const WSS_URL = process.env.WSS_URL || 'wss://www.cryptofacilities.com/ws/v1'

export const OrderBookProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [orderBook, dispatch] = useReducer(orderBookReducer, initialOrderBookState)
  const documentHidden = useDocumentHidden()
  const online = useOnlineStatus()
  const ws = useRef<WebSocket | undefined>()

  const { productIds, orderBookConnected } = orderBook

  useEffect(() => {
    if (documentHidden) {
      ws.current?.close()
      dispatch({ type: 'unsubscribeFromOrderBook' })
      return
    }

    ws.current = new WebSocket(WSS_URL)

    ws.current.addEventListener('open', () => {
      dispatch({ type: 'connectedToOrderBook' })
    })

    ws.current.addEventListener('close', () => {
      dispatch({ type: 'unsubscribeFromOrderBook' })
    })

    ws.current.addEventListener('error', (event) => {
      dispatch({ type: 'orderBookError', orderBookError: event })
      ws.current.close()
    })

    return () => {
      ws.current.close()
    }
  }, [documentHidden])

  useEffect(() => {
    if (!online) {
      dispatch({
        type: 'orderBookError',
        orderBookError: 'You have lost internet access. Please reconnect to see orderbook'
      })
    }
  }, [online])

  useEffect(() => {
    if (!ws.current || !orderBookConnected) {
      return
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
      const { bids, asks }: OrderBookSnapshot = JSON.parse(event.data)
      if (!bids && !asks) {
        return
      }

      dispatch({ type: 'updateOrderBook', bids, asks })
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
