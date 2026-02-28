import React, { useState, useCallback } from 'react'

export default function useToogle(initialValue: bool) {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(v => !v)
    }, [value])

    return [value, toggle];
}
