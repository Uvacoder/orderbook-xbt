import React, { CSSProperties, memo } from 'react'
import { formatPrice } from 'utils/formatters'
import { BidAskData } from '~/types/OrderBookTypes'

import styles from './orderBook.module.scss'

interface OrderRowProps {
  bids: boolean
  order: BidAskData
  maxTotal: number
}

const OrderRow: React.FunctionComponent<OrderRowProps> = ({ bids, order, maxTotal }) => {
  const { price, size, total } = order
  return (
    <tr
      className={styles.tableRow}
      style={
        {
          '--bar-color': bids ? 'var(--bids-bars)' : 'var(--asks-bars)',
          '--bar-fill': total / maxTotal
        } as CSSProperties
      }
    >
      <td colSpan={2} className={bids ? styles.bidPrice : styles.askPrice}>
        {formatPrice(price)}
      </td>
      <td colSpan={2}>{size.toLocaleString()}</td>
      <td colSpan={2}>{total.toLocaleString()}</td>
      <td />
    </tr>
  )
}

export default memo(OrderRow)
