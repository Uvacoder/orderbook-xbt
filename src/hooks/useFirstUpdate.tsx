import { useEffect, useRef } from 'react'

const useFirstUpdate = (func: () => void, deps = []): void => {
  const didMount = useRef(false)

  useEffect(() => {
    // dont run on mount
    if (didMount.current) {
      func()
    } else {
      didMount.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useFirstUpdate
