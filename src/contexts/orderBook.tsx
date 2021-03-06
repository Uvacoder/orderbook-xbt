/* eslint-disable camelcase */
import React, { createContext, useContext, useReducer } from 'react'
import axios from 'axios'

export type OrderBookData = any
type Action = { type: 'orderBookError'; orderBookError: string }
type Dispatch = (action: Action) => void
interface OrderBookState {
  orderBook?: OrderBookData
  orderBookError?: string
}

const initialOrderBookState: OrderBookState = {
  // orderBook: {},
  orderBookError: ''
}
const OrderBookStateContext = createContext<OrderBookState>(initialOrderBookState)
const OrderBookUpdaterContext = createContext<Dispatch | undefined>(undefined)

function orderBookReducer(state: OrderBookState, action: Action) {
  switch (action.type) {
    case 'orderBookError': {
      return {
        ...state,
        orderBookError: action.orderBookError
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function OrderBookProvider({ children }) {
  const [orderBook, dispatch] = useReducer(orderBookReducer, initialOrderBookState)
  return (
    <OrderBookStateContext.Provider value={orderBook}>
      <OrderBookUpdaterContext.Provider value={dispatch}>{children}</OrderBookUpdaterContext.Provider>
    </OrderBookStateContext.Provider>
  )
}

export function useOrderBookState() {
  const OrderBookState = useContext(OrderBookStateContext)
  if (typeof OrderBookState === 'undefined') {
    throw new Error('useOrderBookState must be used within a OrderBookProvider')
  }
  return OrderBookState
}

export function useOrderBookDispatch() {
  const dispatchContext = useContext(OrderBookUpdaterContext)
  if (typeof dispatchContext === 'undefined') {
    throw new Error('useOrderBookUpdater must be used within a OrderBookProvider')
  }
  return dispatchContext
}

export async function getOrderBook(dispatch: Dispatch, cancelToken) {
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
