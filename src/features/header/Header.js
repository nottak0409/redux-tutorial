import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../todos/todosSlice'

const Header = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleChange = e => setText(e.target.value)

    const handleKeyDown = e => {
        // If the user pressed the Enter key:
        const trimmedText = text.trim()
        if (e.which === 13 && trimmedText) {
            dispatch(saveNewTodo(trimmedText))
            // And clear out the text input
            setText('')
        }
    }

    return (
        <header className="header">
            <input
                type="text"
                placeholder="何をしますか？"
                autoFocus={true}
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </header>
    )
}

export default Header
