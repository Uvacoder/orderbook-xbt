import config from 'consts/config'
import { useEffect } from 'react'

const useTitle = (title: string): void => {
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      document.title = config.defaultTitle
    }
  }, [])
}

export default useTitle
