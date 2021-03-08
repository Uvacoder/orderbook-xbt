import React from 'react'
import OrderRow from './OrderRow'
import { BidAskData } from '~/types/OrderBookTypes'

import styles from './orderBook.module.scss'

interface OrderTableProps {
  bids: boolean
  orders: BidAskData[]
}

const OrderTable: React.FunctionComponent<OrderTableProps> = ({ bids, orders }) => {
  if (orders.length === 0) {
    return null
  }

  const maxTotal = Math.max(orders[0].total, orders[orders.length - 1].total)

  return (
    <table className={styles.tableWrapper}>
      {!bids && (
        <thead>
          <tr>
            <th
              colSpan={2}
              title="Bids - the bids price represents the maximum price that a user is willing to buy it at. Asks - the ask price represents the minimum price that a user is willing to sell it at."
            >
              PRICE
            </th>
            <th colSpan={2} title="Number of contracts available at this price level">
              SIZE
            </th>
            <th colSpan={2} title="Cumulative number of contracts at this price level">
              TOTAL
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {orders.map((order) => (
          <OrderRow key={order.price} order={order} bids={bids} maxTotal={maxTotal} />
        ))}
      </tbody>
    </table>
  )
}

export default OrderTable
