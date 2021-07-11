const initialState = {
    todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
    ],
}

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

// Use the initialState as a default value
export default function todoReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case 'todos/todoAdded': {
            return {
                //現在のstateを展開
                ...state,
                todos: [
                    //今までのstateの後に新しいtodoをpush
                    ...state.todos,
                    {
                        id: nextTodoId(state.todos),
                        text: action.payload,
                        completed: false
                    }
                ]
            }
        }
        case 'todos/todoToggled': {
            return {
                ...state,
                todos: state.todos.map(todo => {
                    //idが存在しない値の時
                    if (todo.id !== action.payload) {
                        return todo
                    }
                    //todoのcompletedを反転させる
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                })
            }
        }
        // Do something here based on the different types of actions
        default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
}
