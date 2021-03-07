import React from 'react'
import clsx from 'clsx'
import OrderRow from './OrderRow'
import { BidAskData } from '~/types/OrderBookTypes'

import styles from './orderBook.module.scss'

interface OrderTableProps {
  bids: boolean
  orders: BidAskData[]
}

const OrderTable: React.FunctionComponent<OrderTableProps> = ({ bids, orders }) => {
  return (
    <table className={styles.tableWrapper}>
      {bids && (
        <thead>
          <tr>
            <th>PRICE</th>
            <th>SIZE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
      )}
      <tbody>
        {orders.map((order) => (
          <OrderRow key={order.price} order={order} bids={bids} />
        ))}
      </tbody>
    </table>
  )
}

export default OrderTable
