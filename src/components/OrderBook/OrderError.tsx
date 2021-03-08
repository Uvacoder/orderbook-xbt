import React from 'react'
import { useOrderBookState, useOrderBookDispatch } from 'contexts/orderBook'

const OrderError: React.FunctionComponent = () => {
  const { orderBookConnected, orderBookConnecting, orderBookError } = useOrderBookState()
  const dispatch = useOrderBookDispatch()

  if (orderBookConnected || orderBookConnecting || !orderBookError) {
    return null
  }

  return (
    <div>
      <p role="alert">{orderBookError}</p>
      <button type="button" onClick={() => dispatch({ type: 'reconnectToOrderBook' })}>
        Reconnect
      </button>
    </div>
  )
}

export default OrderError
