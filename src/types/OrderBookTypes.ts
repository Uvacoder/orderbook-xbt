export type BidAsk = [number, number]

export interface OrderBookData {
  bids: BidAsk[]
  asks: BidAsk[]
}

export interface OrderBookState extends OrderBookData {
  orderBookLoading?: boolean
  orderBookError?: string
}

export type OrderBookActions =
  | { type: 'updateOrderBook'; orderBook: OrderBookData }
  | { type: 'orderBookError'; orderBookError: string }

export type OrderBookDispatch = (action: OrderBookActions) => void

export interface OrderBookWSSSnapshot extends OrderBookData {
  feed: string
  numLevels: number
  product_id: string
}
