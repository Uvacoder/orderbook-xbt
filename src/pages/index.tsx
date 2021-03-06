import React from 'react'

import OrderBook from 'components/OrderBook'
import PageLayout from 'components/PageLayout'
import { OrderBookProvider } from 'contexts/orderBook'

const App: React.FunctionComponent = () => {
  return (
    <PageLayout>
      <OrderBookProvider>
        <OrderBook />
      </OrderBookProvider>
    </PageLayout>
  )
}

export default App
