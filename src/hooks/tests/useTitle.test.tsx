import { renderHook } from '@testing-library/react-hooks'
import useTitle from '../useTitle'

describe('useTitle', () => {
  it('should update document title', () => {
    const hook = renderHook((props) => useTitle(props), { initialProps: 'XTB/USD' })

    expect(document.title).toBe('XTB/USD')
    hook.rerender('50,000 | XTB/USD')
    expect(document.title).toBe('50,000 | XTB/USD')
  })

  it('should restore document title on unmount', () => {
    renderHook((props) => useTitle(props), { initialProps: 'XTB/USD | OrderBook' })
    expect(document.title).toBe('XTB/USD | OrderBook')

    const hook = renderHook((props) => useTitle(props.title), {
      initialProps: { title: 'New Title', restore: true }
    })
    expect(document.title).toBe('New Title')
    hook.unmount()
    expect(document.title).toBe('OrderBook')
  })
})
