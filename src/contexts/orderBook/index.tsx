/* eslint-disable camelcase */
import React, { createContext, ReactNode, useContext, useReducer } from 'react'
import { OrderBookState, OrderBookDispatch } from '~/types/OrderBookTypes'
import { orderBookReducer, initialOrderBookState } from './orderBookReducer'

const OrderBookStateContext = createContext<OrderBookState>(initialOrderBookState)
const OrderBookUpdaterContext = createContext<OrderBookDispatch | undefined>(undefined)

// Split up State and Dispatch to improve re-renders. See https://kentcdodds.com/blog/how-to-use-react-context-effectively
export const OrderBookProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [orderBook, dispatch] = useReducer(orderBookReducer, initialOrderBookState)
  return (
    <OrderBookStateContext.Provider value={orderBook}>
      <OrderBookUpdaterContext.Provider value={dispatch}>{children}</OrderBookUpdaterContext.Provider>
    </OrderBookStateContext.Provider>
  )
}

export const useOrderBookState = (): OrderBookState => {
  const state = useContext(OrderBookStateContext)
  if (typeof state === 'undefined') {
    throw new Error('useOrderBookState must be used within a OrderBookProvider')
  }
  return state
}

export const useOrderBookDispatch = (): OrderBookDispatch => {
  const dispatchContext = useContext(OrderBookUpdaterContext)
  if (typeof dispatchContext === 'undefined') {
    throw new Error('useOrderBookUpdater must be used within a OrderBookProvider')
  }
  return dispatchContext
}

export const getOrderBook = (dispatch: OrderBookDispatch): void => {
  try {
    // const { data } = await axios('api/OrderBookManagement', {
    //   method: 'GET',
    //   cancelToken: cancelToken.token
    // })

    // if (data.errorMessage) {
    //   dispatch({ type: 'orderBookError', orderBookError: data.errorMessage })
    //   return data.errorMessage
    // }

    // dispatch({ type: 'orderBook', items: data })
    dispatch({ type: 'orderBookError', orderBookError: '' })
  } catch (error) {
    dispatch({ type: 'orderBookError', orderBookError: error.message || error })
    return error.message || error
  }

  return null
}
