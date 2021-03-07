import React from 'react'
import useTitle from 'hooks/useTitle'
import { useOrderBookState } from 'contexts/orderBook'
import config from 'consts/config'
import { formatProductId } from 'utils/formatters'
import Loader from 'svg/Loader'
import OrderTable from './OrderTable'
import OrderError from './OrderError'

import styles from './orderBook.module.scss'

/* TODO:
- bar styes
- same key problem?
- Add a couple different product Ids
- Grouping
- unit tests
- cypress tests
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
      <h1>OrderBook {tradeName}</h1>
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
