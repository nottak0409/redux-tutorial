import { client } from '../../api/client'

import { createSelector } from 'reselect'
import { StatusFilters } from '../filters/filtersSlice'

const initialState = []

//function nextTodoId(todos) {
//    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
//    return maxId + 1
//}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todosLoaded': {
            return action.payload
        }
        case 'todos/todoAdded': {
            return [...state, action.payload]
        }
        case 'todos/todoToggled': {
            return state.map((todo) => {
                if (todo.id !== action.payload) {
                    return todo
                }

                return {
                    ...todo,
                    completed: !todo.completed,
                }
            })
        }
        case 'todos/colorSelected': {
            const { color, todoId } = action.payload
            return state.map((todo) => {
                if (todo.id !== todoId) {
                    return todo
                }

                return {
                    ...todo,
                    color,
                }
            })
        }
        case 'todos/todoDeleted': {
            return state.filter((todo) => todo.id !== action.payload)
        }
        case 'todos/allCompleted': {
            return state.map((todo) => {
                return { ...todo, completed: true }
            })
        }
        case 'todos/completedCleared': {
            return state.filter((todo) => !todo.completed)
        }
        default:
        return state
    }
}

export const todosLoaded = todos => {
    return {
        type: 'todos/todoLoaded',
        payload: todos
    }
}

export const fetchTodos = () => async dispatch => {
    const response = await client.get('/fakeApi/todos')
    dispatch(todosLoaded(response.todos))
}

export const todoAdded = todo => ({ type: 'todos/todoAdded', payload: todo })

export function saveNewTodo(text) {
    return async function saveNewTodoThunk(dispatch, getState) {
        const initialTodo = { text }
        const response = await client.post('/fakeApi/todos', { todo: initialTodo })
        dispatch(todoAdded(response.todo))
    }
}

export const selectTodoIds = createSelector(
    // First, pass one or more "input selector" functions:
    state => state.todos,
    // Then, an "output selector" that receives all the input results as arguments
    // and returns a final result value
    todos => todos.map(todo => todo.id)
)

export const selectFilteredTodos = createSelector(
    // First input selector: all todos
    state => state.todos,
    // Second input selector: current status filter
    state => state.filters.status,
    // Output selector: receives both values
    (todos, status) => {
        if (status === StatusFilters.All) {
            return todos
        }

        const completedStatus = status === StatusFilters.Completed
        // Return either active or completed todos based on filter
        return todos.filter(todo => todo.completed === completedStatus)
    }
)

export const selectFilteredTodoIds = createSelector(
    // Pass our other memoized selector as an input
    selectFilteredTodos,
    // And derive data in the output selector
    filteredTodos => filteredTodos.map(todo => todo.id)
)
