import React from 'react'
import useTitle from 'hooks/useTitle'
import { useOrderBookState } from 'contexts/orderBook'
import config from 'consts/config'
import { formatProductId } from 'utils/formatters'
import Loader from 'svg/Loader'
import OrderTable from './OrderTable'
import OrderError from './OrderError'
import ProductSelect from './ProductSelect'

import styles from './orderBook.module.scss'

/* TODO:
- products are aggregating and not erasing
- unit tests
- cypress tests
- Grouping
- Tooltip component for price, size, total
*/
const OrderBook: React.FunctionComponent = () => {
  const { orderBookConnecting, productIds, bids, asks } = useOrderBookState()
  const tradeName = formatProductId(productIds)
  useTitle(
    orderBookConnecting
      ? `${tradeName} | ${config.defaultTitle}`
      : `${bids[0]?.price || ''} ${tradeName} | ${config.defaultTitle}`
  )

  return (
    <div className={styles.container}>
      <div>
        <h1>OrderBook {tradeName}</h1>
        <ProductSelect />
      </div>
      <div className={styles.orderBook}>
        <OrderError />
        {orderBookConnecting ? (
          <Loader />
        ) : (
          <>
            <OrderTable orders={asks} bids={false} />
            <OrderTable orders={bids} bids />
          </>
        )}
      </div>
    </div>
  )
}

export default OrderBook
