import React from 'react'
import useTitle from 'hooks/useTitle'
import { useOrderBookState } from 'contexts/orderBook'
import config from 'consts/config'
import { formatProductId } from 'utils/formatters'
import OrderTable from './OrderTable'

/* TODO:
- Tooltip component for price, size, total
- SVG in background when loading and on another tab
- bar styes
- same key problem
- is new styles
- Add a couple different product Ids
- Grouping
*/
const OrderBook: React.FunctionComponent = () => {
  const { orderBookConnected, productIds } = useOrderBookState()
  useTitle(orderBookConnected ? '' : config.defaultTitle)

  return (
    <div>
      <h1>OrderBook {formatProductId(productIds)}</h1>
      <div>
        <OrderTable />
      </div>
    </div>
  )
}

export default OrderBook
