import { formatProductId, formatPrice } from '../formatters'

describe('formatProductId', () => {
  it('should break up the two currencies by a slash', () => {
    expect(formatProductId(['PI_XBTUSD'])).toEqual('XBT/USD')
    expect(formatProductId(['PI_XRPUSD'])).toEqual('XRP/USD')
    expect(formatProductId(['PI_RVNBTC'])).toEqual('RVN/BTC')
    expect(formatProductId(['RVNBTC'])).toEqual('')
    expect(formatProductId([])).toEqual('')
  })
})

describe('formatPrice', () => {
  it('turns a number into a USD currency', () => {
    expect(formatPrice(3)).toEqual('$3')
    expect(formatPrice(1000)).toEqual('$1,000')
    expect(formatPrice(1000.999)).toEqual('$1,000.999')
    expect(formatPrice(0.987654321)).toEqual('$0.98765432')
  })
})
