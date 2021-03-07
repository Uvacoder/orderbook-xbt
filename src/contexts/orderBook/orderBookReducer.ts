import aggregateOrders from 'utils/aggregateOrders'
import { OrderBookState, OrderBookActions } from '~/types/OrderBookTypes'

export const initialOrderBookState: OrderBookState = {
  bids: [],
  asks: [],
  orderBookConnecting: true,
  orderBookConnected: false,
  orderBookError: '',
  // productIds: ['PI_XBTUSD']
  productIds: ['PI_XRPUSD']
}

export const orderBookReducer = (state: OrderBookState, action: OrderBookActions): OrderBookState => {
  switch (action.type) {
    case 'updateOrderBook': {
      return {
        ...state,
        bids: aggregateOrders(state.bids, action.bids, true),
        asks: aggregateOrders(state.asks, action.asks)
      }
    }
    case 'connectedToOrderBook': {
      return {
        ...state,
        orderBookConnecting: false,
        orderBookConnected: true
      }
    }
    case 'unsubscribeFromOrderBook': {
      return {
        ...state,
        orderBookConnecting: false,
        orderBookConnected: false
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
