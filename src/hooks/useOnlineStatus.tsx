import { useEffect, useState } from 'react'

const useOnlineStatus = (): boolean => {
  const [onlineStatus, setOnlineStatus] = useState(true)

  useEffect(() => {
    const handleOnline = () => {
      setOnlineStatus(true)
    }
    const handleOffline = () => {
      setOnlineStatus(false)
    }
    document.addEventListener('online', handleOnline)
    document.addEventListener('offline', handleOffline)
    return () => {
      document.removeEventListener('online', handleOnline)
      document.removeEventListener('offline', handleOffline)
    }
  }, [])

  return onlineStatus
}

export default useOnlineStatus
