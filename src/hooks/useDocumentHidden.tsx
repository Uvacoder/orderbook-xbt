import { useEffect, useState } from 'react'

const useDocumentHidden = (): boolean => {
  const [documentHidden, setDocumentHidden] = useState(false)

  useEffect(() => {
    const onVisibilitychange = () => {
      setDocumentHidden(document.hidden)
    }

    window.addEventListener('visibilitychange', onVisibilitychange)
    return () => {
      window.removeEventListener('visibilitychange', onVisibilitychange)
    }
  }, [])

  return documentHidden
}

export default useDocumentHidden
