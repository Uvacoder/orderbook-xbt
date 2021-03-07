export type BidAskOrderBook = [number, number]

export interface BidAskData {
  size: number
  price: number
  total: number
  // new: boolean // TODO: for highlighting new/changed positions
}

export interface OrderBookData {
  bids: BidAskOrderBook[]
  asks: BidAskOrderBook[]
}

export interface OrderBookSnapshot extends OrderBookData {
  feed: string
  product_id: string
}

// State pattern types for order book
export interface OrderBookState {
  bids: BidAskData[]
  asks: BidAskData[]
  orderBookConnecting: boolean
  orderBookConnected: boolean
  orderBookError?: string | Event
  productIds: string[]
  reconnect: number
}

export type OrderBookActions =
  | { type: 'updateOrderBook'; bids: BidAskOrderBook[]; asks: BidAskOrderBook[] }
  | { type: 'unsubscribeFromOrderBook' }
  | { type: 'connectedToOrderBook' }
  | { type: 'reconnectToOrderBook' }
  | { type: 'changeProduct'; productId: string }
  | { type: 'orderBookError'; orderBookError: string }
  | { type: 'noop' } // for testing purposes

export type OrderBookDispatch = (action: OrderBookActions) => void
