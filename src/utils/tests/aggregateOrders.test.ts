import fakeOrderBook, { fakeAskData } from 'consts/fakeOrderBook'
import aggregateOrders, { sortAndAddTotal } from '../aggregateOrders'

describe('sortAndAddTotal', () => {
  it('should sort the orders', () => {
    const sortData = [
      { price: 2, size: 2, total: 0 },
      { price: 1, size: 1, total: 0 },
      { price: 3, size: 3, total: 0 }
    ]
    expect(sortAndAddTotal([], false)).toEqual([])
    // asks
    expect(sortAndAddTotal(sortData, false)).toEqual([
      { price: 3, size: 3, total: 6 },
      { price: 2, size: 2, total: 3 },
      { price: 1, size: 1, total: 1 }
    ])
    // bids
    expect(sortAndAddTotal(sortData, true)).toEqual([
      { price: 3, size: 3, total: 3 },
      { price: 2, size: 2, total: 5 },
      { price: 1, size: 1, total: 6 }
    ])
  })
})

describe('aggregateOrders', () => {
  it('should merge in orders', () => {
    expect(aggregateOrders([], fakeOrderBook.asks)).toEqual([
      { price: 0.4607, size: 101600, total: 424532 },
      { price: 0.4601, size: 52784, total: 322932 },
      { price: 0.4598, size: 31279, total: 270148 },
      { price: 0.4597, size: 38631, total: 238869 },
      { price: 0.4596, size: 29039, total: 200238 },
      { price: 0.4595, size: 2968, total: 171199 },
      { price: 0.4594, size: 44442, total: 168231 },
      { price: 0.4593, size: 30148, total: 123789 },
      { price: 0.4592, size: 3082, total: 93641 },
      { price: 0.4591, size: 12978, total: 90559 },
      { price: 0.4589, size: 16418, total: 77581 },
      { price: 0.4588, size: 54836, total: 61163 },
      { price: 0.4587, size: 5000, total: 6327 },
      { price: 0.4586, size: 1327, total: 1327 }
    ])
    expect(aggregateOrders([], fakeOrderBook.bids, true)).toEqual([
      { price: 0.4581, size: 510, total: 510 },
      { price: 0.458, size: 14073, total: 14583 },
      { price: 0.4579, size: 1296, total: 15879 },
      { price: 0.4578, size: 53499, total: 69378 },
      { price: 0.4577, size: 17980, total: 87358 },
      { price: 0.4576, size: 12591, total: 99949 },
      { price: 0.4575, size: 8096, total: 108045 },
      { price: 0.4574, size: 37669, total: 145714 },
      { price: 0.4573, size: 50148, total: 195862 },
      { price: 0.4571, size: 6988, total: 202850 },
      { price: 0.4353, size: 6000, total: 208850 }
    ])
    expect(aggregateOrders(fakeAskData, fakeOrderBook.asks)).toEqual([
      { price: 0.4607, size: 101600, total: 424532 },
      { price: 0.4601, size: 52784, total: 322932 },
      { price: 0.4598, size: 31279, total: 270148 },
      { price: 0.4597, size: 38631, total: 238869 },
      { price: 0.4596, size: 29039, total: 200238 },
      { price: 0.4595, size: 2968, total: 171199 },
      { price: 0.4594, size: 44442, total: 168231 },
      { price: 0.4593, size: 30148, total: 123789 },
      { price: 0.4592, size: 3082, total: 93641 },
      { price: 0.4591, size: 12978, total: 90559 },
      { price: 0.4589, size: 16418, total: 77581 },
      { price: 0.4588, size: 54836, total: 61163 },
      { price: 0.4587, size: 5000, total: 6327 },
      { price: 0.4586, size: 1327, total: 1327 }
    ])
  })
})
