import { useEffect, useRef } from 'react'

export default function usePrevious(initialVal) {
  const curRef = useRef();

  useEffect(() => {
    curRef.current = initialVal; 
  }, [initialVal])

  return curRef.current;
}
