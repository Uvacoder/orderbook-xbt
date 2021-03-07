import aggregateOrders from 'utils/aggregateOrders'
import { OrderBookState, OrderBookActions } from '~/types/OrderBookTypes'

export const initialOrderBookState: OrderBookState = {
  asks: [],
  bids: [],
  orderBookConnecting: true,
  orderBookConnected: false,
  orderBookError: '',
  // productIds: ['PI_XBTUSD']
  productIds: ['PI_XRPUSD'],
  reconnect: 0
}

export const orderBookReducer = (state: OrderBookState, action: OrderBookActions): OrderBookState => {
  switch (action.type) {
    case 'updateOrderBook': {
      return {
        ...state,
        orderBookConnecting: false,
        bids: aggregateOrders(state.bids, action.bids, true),
        asks: aggregateOrders(state.asks, action.asks)
      }
    }
    case 'connectedToOrderBook': {
      return {
        ...state,
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
    case 'reconnectToOrderBook': {
      return {
        ...state,
        orderBookConnecting: true,
        orderBookConnected: false,
        reconnect: state.reconnect + 1
      }
    }
    default: {
      // eslint-disable-next-line no-console
      console.error(`Unhandled action type: ${JSON.stringify(action, null, 2)}`)
      return state
    }
  }
}
