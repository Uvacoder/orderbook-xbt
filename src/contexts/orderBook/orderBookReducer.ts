import { OrderBookState, OrderBookActions } from '~/types/OrderBookTypes'

export const initialOrderBookState: OrderBookState = {
  bids: [],
  asks: [],
  orderBookLoading: true,
  orderBookError: ''
}

export const orderBookReducer = (state: OrderBookState, action: OrderBookActions): OrderBookState => {
  switch (action.type) {
    case 'updateOrderBook': {
      return {
        ...state,
        bids: action.orderBook?.bids,
        asks: action.orderBook?.asks
      }
    }
    case 'orderBookError': {
      return {
        ...state,
        orderBookError: action.orderBookError
      }
    }
    default: {
      // eslint-disable-next-line no-console
      console.error(`Unhandled action type: ${JSON.stringify(action, null, 2)}`)
      return state
    }
  }
}
