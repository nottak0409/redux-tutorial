const initialState = {
    filters: {
        status: 'All',
        colors: []
    }
}

export default function filtersReducer(state = initialState, action) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        case 'filters/statusFilterChanged': {
            return {
                ...state,
                //statusフィルターを変更する
                filters: {
                    ...state.filters,
                    status: action.payload
                }
            }
        }
        // Do something here based on the different types of actions
        default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
}
