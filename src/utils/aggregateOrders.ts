/* eslint-disable no-param-reassign */
import { BidAskData, BidAskOrderBook } from '~/types/OrderBookTypes'

const reduceTupleIntoOrderObject = (prevOrders: BidAskData[], orders: BidAskOrderBook[]) => {
  return orders.reduce((prev, cur) => {
    const [price, size] = cur
    const orderIndex = prevOrders.findIndex((prevOrder) => prevOrder.price === price)
    const isNew = orderIndex === -1
    const removeOrder = size === 0

    // don't update anything
    if (removeOrder && isNew) {
      return prev
    }

    // if the size returned by a delta is 0, then that price level should be removed from the orderbook
    if (removeOrder) {
      return prev.filter((_, index) => index !== orderIndex)
    }

    const newOrderData = {
      price,
      size,
      total: 0
    }

    // if new, add data at the end
    if (isNew) {
      return [...prev, newOrderData]
    }

    // otherwise, safely overwrite the state of the price level with new data
    prev[orderIndex] = newOrderData
    return prev
  }, prevOrders)
}

const aggregateOrders = (
  prevOrders: BidAskData[],
  ordersFromSnapshot: BidAskOrderBook[],
  bids = false
): BidAskData[] => {
  // merge the old and the new orders
  const orderObjs = reduceTupleIntoOrderObject(prevOrders, ordersFromSnapshot)

  const sortedOrder = orderObjs.sort((a, b) => b.price - a.price)

  if (bids) {
    sortedOrder.reverse()
  }

  // create new totals for all orders
  let total = 0
  const sortedTotal = sortedOrder.map((order) => {
    total += order.size
    return { ...order, total }
  })

  if (bids) {
    sortedTotal.reverse()
  }

  return sortedTotal
}

export default aggregateOrders
