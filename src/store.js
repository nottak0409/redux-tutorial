//import { createStore, applyMiddleware } from 'redux'
//import thunkMiddleware from 'redux-thunk'
//import { composeWithDevTools } from 'redux-devtools-extension'
//import rootReducer from './reducer'
//コメントアウトしているコードはtoolskitを利用する前のコード
import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'


//const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
//const store = createStore(rootReducer, composedEnhancer)
const store = configureStore({
    reducer: {
        todos: todosReducer,
        filters: filtersReducer
    }
})

export default store
