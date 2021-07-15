export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}

const initialState = {
    status: StatusFilters.All,
    colors: []
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
        case 'filters/colorFilterChanged': {
            let { color, changeType } = action.payload
            const { colors } = state
            switch ( changeType ) {
                case 'added': {
                    if (colors.includes(color)) {
                        return state
                    }

                    return {
                        ...state,
                        colors: state.colors.concat(color),
                    }
                }
                case 'removed': {
                    return {
                        ...state,
                        colors: state.colors.filter(
                            (existingColor) => existingColor !== color
                        ),
                    }
                }
                default:
                    return state
            }
        }
        // Do something here based on the different types of actions
        default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
}
