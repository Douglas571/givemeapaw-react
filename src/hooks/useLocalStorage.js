import { useState, useEffect } from 'react'

const useLocalStorage = (key, defaultValue = '') => {
  // Source: https://blog.logrocket.com/using-localstorage-react-hooks/

  const [ value, setValue ] = useState(() => {
    const saved = localStorage.getItem(key)
    const initial = JSON.parse(saved)
    return initial || defaultValue
  })

  useEffect(() => {
    console.log({key, value})
    localStorage.setItem(key, JSON.stringify(value))
  }, [value] )

  return [ value, setValue ]
}

export default useLocalStorage