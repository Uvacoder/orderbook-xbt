import React from 'react'
import useTitle from 'hooks/useTitle'
import { useOrderBookState } from 'contexts/orderBook'
import Loader from 'svg/Loader'
import config from 'consts/config'

/* TODO:
- Tooltip component for price, size, total
- SVG in background
*/
const OrderBook: React.FunctionComponent = () => {
  const { bids, asks, orderBookConnecting, orderBookConnected, orderBookError } = useOrderBookState()
  useTitle(orderBookConnected ? '' : config.defaultTitle)

  return (
    <div>
      <h1>Order Books XBT/USD</h1>
      <div>
        {orderBookConnecting && !orderBookConnected ? (
          <Loader />
        ) : (
          <table>
            <thead>
              <tr>
                <th>PRICE</th>
                <th>SIZE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4600</td>
                <td>23</td>
                <td>23</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default OrderBook
