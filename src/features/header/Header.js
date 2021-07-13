import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Header () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleChange = e => setText(e.target.value)

    const handleKeyDown = e => {
        const trimmedText = e.target.value.trim()

        if(e.key === 'enter' && trimmedText) {
            dispatch({ type: 'todos/todoAdded', payload: trimmedText })
            setText('');
        }
    }

    return (
        <input
            type="text"
            placeholder="何をしますか？"
            autoFocus={true}
            value{text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    )
}

export default Header
