import { formatProductId } from '../formatters'

describe('formatProductId', () => {
  it('should break up the two currencies by a slash', () => {
    expect(formatProductId(['PI_XBTUSD'])).toEqual('XBT/USD')
    expect(formatProductId(['PI_XRPUSD'])).toEqual('XRP/USD')
    expect(formatProductId(['PI_RVNBTC'])).toEqual('RVN/BTC')
    expect(formatProductId(['RVNBTC'])).toEqual('')
    expect(formatProductId([])).toEqual('')
  })
})
