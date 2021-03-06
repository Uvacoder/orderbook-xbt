import React from 'react'
import useTitle from 'hooks/useTitle'
import { useOrderBookState } from 'contexts/orderBook'

/* TODO:
- Tooltip component for price, size, total
- SVG in background
*/
const OrderBook: React.FunctionComponent = () => {
  const { bids, asks } = useOrderBookState()
  useTitle('')
  return <></>
}

export default OrderBook
