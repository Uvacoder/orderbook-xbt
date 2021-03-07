import { act, renderHook } from '@testing-library/react-hooks'
import useOnlineStatus from '../useOnlineStatus'

describe('useOnlineStatus', () => {
  it('should detect online state then offline state', () => {
    const onLineSpy = jest.spyOn(window.navigator, 'onLine', 'get')
    onLineSpy.mockReturnValue(true)
    const { result } = renderHook(() => useOnlineStatus())
    expect(result.current).toBe(true)

    act(() => {
      const goOffline = new window.Event('offline')
      onLineSpy.mockReturnValue(false)
      window.dispatchEvent(goOffline)
    })

    expect(result.current).toBe(false)

    act(() => {
      const goOnline = new window.Event('online')
      onLineSpy.mockReturnValue(true)
      window.dispatchEvent(goOnline)
    })
    expect(result.current).toBe(true)
  })
})
