import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { saveNewTodo } from '../todos/todosSlice'

const Header = () => {
    const [text, setText] = useState('')
    const [status, setStatus] = useState('idle')
    const dispatch = useDispatch()

    const handleChange = e => setText(e.target.value)

    const handleKeyDown = e => {
        // If the user pressed the Enter key:
        const trimmedText = text.trim()
        if (e.which === 13 && trimmedText) {
            setStatus('loading')
            dispatch(saveNewTodo(trimmedText))
            // And clear out the text input
            setText('')
            setStatus('idle')
        }
    }

    let isLoading = status === 'loading'
    let placeholder = isLoading ? '' : '何をしますか？'
    let loader = isLoading ? <div className="loader"></div> : null

    return (
        <header className="header">
          <input
            className="new-todo"
            placeholder={placeholder}
            autoFocus={true}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {loader}
        </header>
    )
}

export default Header
