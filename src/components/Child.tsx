import React, { useEffect } from 'react'

type ChildProps = {
    count: number;
    [key: string]: string | number;
}

export default function Child(props: ChildProps) {
    useEffect(() => {
        console.log('count:', props.count);
    }, [props.count])

  return (
    <div>Child { props.count }</div>
  )
}

