const initialState = {
    categories: [],
}

export const ActionTypes = {
    SET_CATEGORIES: 'SET_CATEGORIES',
    NEW_CATEGORY: 'NEW_CATEGORY',
    EDIT_CATEGORY: 'EDIT_CATEGORY',
    DELETE_CATEGORY: 'DELETE_CATEGORY'
}

export const ActionCreators = {
    setCategories: payload => ({ type: ActionTypes.SET_CATEGORIES, payload }),
    newCategory: payload => ({ type: ActionTypes.NEW_CATEGORY, payload }),
    editCategory: payload => ({ type: ActionTypes.EDIT_CATEGORY, payload }),
    deleteCategory: payload => ({ type: ActionTypes.DELETE_CATEGORY, payload }),
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_CATEGORIES:
            return { ...state, categories: [...action.payload] };
        case ActionTypes.NEW_CATEGORY:
            return { ...state, categories: [...state.categories, action.payload] };
        case ActionTypes.EDIT_CATEGORY:
            return {
                ...state, categories: state.categories.map(category => category.id === action.payload.id
                    ? action.payload : category)
            };
        case ActionTypes.DELETE_CATEGORY:
            return { ...state, categories: state.categories.filter(category => category.id !== action.payload.id) };
        default:
            return state;
    }
}