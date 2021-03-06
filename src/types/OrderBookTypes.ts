export type BidAskOrderBook = [number, number]

export interface OrderBookData {
  bids: BidAskOrderBook[]
  asks: BidAskOrderBook[]
}

export interface OrderBookSnapshot extends OrderBookData {
  feed: string
  product_id: string
}

// State pattern types for order book
export interface OrderBookState extends OrderBookData {
  orderBookConnecting: boolean
  orderBookConnected: boolean
  orderBookError?: string
  productIds: string[]
}

export type OrderBookActions =
  | { type: 'updateOrderBook'; orderBook: OrderBookData }
  | { type: 'unsubscribeFromOrderBook' }
  | { type: 'connectedToOrderBook' }
  | { type: 'orderBookError'; orderBookError: string | Event }

export type OrderBookDispatch = (action: OrderBookActions) => void
