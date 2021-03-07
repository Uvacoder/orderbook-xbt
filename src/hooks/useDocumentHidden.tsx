import { useEffect, useState } from 'react'

const useDocumentHidden = (): boolean => {
  const [documentHidden, setDocumentHidden] = useState(false)

  useEffect(() => {
    const onVisibilitychange = () => {
      setDocumentHidden(document.hidden)
    }
    document.addEventListener('visibilitychange', onVisibilitychange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilitychange)
    }
  }, [])

  return documentHidden
}

export default useDocumentHidden
