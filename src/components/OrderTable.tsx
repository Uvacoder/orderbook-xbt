import React from 'react'
import { useOrderBookState } from 'contexts/orderBook'
import Loader from 'svg/Loader'

const OrderTable: React.FunctionComponent = () => {
  const { bids, asks, orderBookConnecting, orderBookConnected, orderBookError } = useOrderBookState()

  if (orderBookConnecting) {
    return <Loader />
  }

  if (!orderBookConnected) {
    return (
      <div>
        <p>{orderBookError}</p>
        <button type="button">Reconnect</button>
      </div>
    )
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>PRICE</th>
            <th>SIZE</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.price}>
              <td>{bid.price}</td>
              <td>{bid.size}</td>
              <td>{bid.total}</td>
              {bid.new && <td>&trade;</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h2>Asks</h2>
      <br />
      <table>
        <tbody>
          {asks.map((ask) => (
            <tr key={ask.price}>
              <td>{ask.price}</td>
              <td>{ask.size}</td>
              <td>{ask.total}</td>
              {ask.new && <td>&trade;</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default OrderTable
