import React from 'react'
import { useOrderBookState, useOrderBookDispatch } from 'contexts/orderBook'
import productIdOptions from 'consts/productIdOptions'

// import styles from './orderBook.module.scss' // TODO:

const ProductSelect: React.FunctionComponent = () => {
  const { productIds } = useOrderBookState()
  const dispatch = useOrderBookDispatch()

  return (
    <select
      data-testid="product-id"
      value={productIds[0]}
      onChange={(e) => dispatch({ type: 'changeProduct', productId: e.target.value })}
    >
      {productIdOptions.map((id) => (
        <option key={id.value} value={id.value}>
          {id.label}
        </option>
      ))}
    </select>
  )
}

export default ProductSelect
