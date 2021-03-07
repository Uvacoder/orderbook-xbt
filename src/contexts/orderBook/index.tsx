/* eslint-disable consistent-return */
import React, { createContext, ReactNode, useContext, useReducer, useEffect, useRef } from 'react'
import useOnlineStatus from 'hooks/useOnlineStatus'
import useDocumentHidden from 'hooks/useDocumentHidden'
import { OrderBookState, OrderBookSnapshot, OrderBookDispatch } from '~/types/OrderBookTypes'
import { orderBookReducer, initialOrderBookState } from './orderBookReducer'

const OrderBookContext = createContext<OrderBookState>(initialOrderBookState)
const OrderBookUpdaterContext = createContext<OrderBookDispatch | undefined>(undefined)

const WSS_URL = process.env.WSS_URL || 'wss://www.cryptofacilities.com/ws/v1'

export const OrderBookProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [orderBook, dispatch] = useReducer(orderBookReducer, initialOrderBookState)
  const documentHidden = useDocumentHidden()
  const online = useOnlineStatus()
  const ws = useRef<WebSocket | undefined>()
  const firstUpdate = useRef(true)

  const { productIds, orderBookConnected, reconnect } = orderBook

  useEffect(() => {
    ws.current = new WebSocket(WSS_URL)

    ws.current.addEventListener('open', () => {
      dispatch({ type: 'connectedToOrderBook' })
    })

    ws.current.addEventListener('close', () => {
      dispatch({ type: 'unsubscribeFromOrderBook' })
    })

    ws.current.addEventListener('error', () => {
      dispatch({ type: 'orderBookError', orderBookError: 'The connection was lost' })
      ws.current.close()
    })

    return () => {
      if (ws.current && ws.current.readyState === ws.current.OPEN) {
        ws.current.close()
      }
    }
  }, [reconnect])

  useEffect(() => {
    // dont run on mount
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    if (documentHidden) {
      ws.current.close(1000)
    } else {
      dispatch({ type: 'reconnectToOrderBook' })
    }
  }, [documentHidden])

  useEffect(() => {
    if (!online) {
      ws.current.close()
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
      try {
        const { bids, asks }: OrderBookSnapshot = JSON.parse(event.data)
        if (!bids && !asks) {
          return
        }

        dispatch({ type: 'updateOrderBook', bids, asks })
      } catch (error) {
        dispatch({ type: 'orderBookError', orderBookError: error.message })
      }
    }

    ws.current.addEventListener('message', onMessage)

    return () => {
      if (ws.current) {
        ws.current.removeEventListener('message', onMessage)
      }
    }
  }, [orderBookConnected, productIds])

  return (
    <OrderBookContext.Provider value={orderBook}>
      <OrderBookUpdaterContext.Provider value={dispatch}>{children}</OrderBookUpdaterContext.Provider>
    </OrderBookContext.Provider>
  )
}

export const useOrderBookState = (): OrderBookState => {
  const state = useContext(OrderBookContext)
  if (typeof state === 'undefined') {
    throw new Error('useOrderBookState must be used within an OrderBookProvider')
  }
  return state
}

export const useOrderBookDispatch = (): OrderBookDispatch => {
  const dispatchContext = useContext(OrderBookUpdaterContext)
  if (typeof dispatchContext === 'undefined') {
    throw new Error('useOrderBookDispatch must be used within an OrderBookProvider')
  }
  return dispatchContext
}
