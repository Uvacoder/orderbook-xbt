import React from 'react'
import { useOrderBookState, useOrderBookDispatch } from 'contexts/orderBook'

import styles from './orderBook.module.scss'

const ProductSelect: React.FunctionComponent = () => {
  const { productIds } = useOrderBookState()
  const dispatch = useOrderBookDispatch()

  return (
    <select value={productIds[0]} onChange={(e) => dispatch({ type: 'changeProduct', productId: e.target.value })}>
      <option value="PI_XBTUSD">XBT/USD</option>
      <option value="PI_ETHUSD">ETH/USD</option>
      <option value="PI_LTCUSD">LTC/USD</option>
      <option value="PI_XRPUSD">XRP/USD</option>
    </select>
  )
}

export default ProductSelect
