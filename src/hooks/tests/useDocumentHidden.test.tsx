import { act, renderHook } from '@testing-library/react-hooks'
import useDocumentHidden from '../useDocumentHidden'

describe('useDocumentHidden', () => {
  it('should detect online state then offline state', () => {
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get() {
        return false
      }
    })
    const { result } = renderHook(() => useDocumentHidden())
    expect(result.current).toBe(false)

    act(() => {
      const changeTab = new window.Event('visibilitychange')
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get() {
          return true
        }
      })
      window.dispatchEvent(changeTab)
    })

    expect(result.current).toBe(true)
  })
})
