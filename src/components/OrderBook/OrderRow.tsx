import React, { memo } from 'react'
import { formatPrice } from 'utils/formatters'
import { BidAskData } from '~/types/OrderBookTypes'

interface OrderRowProps {
  bids: boolean
  order: BidAskData
}

const OrderRow: React.FunctionComponent<OrderRowProps> = ({ bids, order }) => {
  return (
    <tr>
      <td>{formatPrice(order.price)}</td>
      <td>{order.size}</td>
      <td>{order.total}</td>
      {order.new && <td>&trade;</td>}
    </tr>
  )
}

export default memo(OrderRow)
