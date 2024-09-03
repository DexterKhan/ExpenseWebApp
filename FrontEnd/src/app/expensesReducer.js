const initialState = {
    expenses: [],
}

export const ActionTypes = {
    SET_EXPENSES: 'SET_EXPENSES',
    NEW_EXPENSE: 'NEW_EXPENSE',
    EDIT_EXPENSE: 'EDIT_EXPENSE',
    DELETE_EXPENSE: 'DELETE_EXPENSE'
}

export const ActionCreators = {
    setExpense: payload => ({ type: ActionTypes.SET_EXPENSES, payload }),
    newExpense: payload => ({ type: ActionTypes.NEW_EXPENSE, payload }),
    editExpense: payload => ({ type: ActionTypes.EDIT_EXPENSE, payload }),
    deleteExpense: payload => ({ type: ActionTypes.DELETE_EXPENSE, payload }),

}

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_EXPENSES:
            return { ...state, expenses: [...action.payload] };
        case ActionTypes.NEW_EXPENSE:
            return { ...state, expenses: [...state.expenses, action.payload] };
        case ActionTypes.EDIT_EXPENSE:
            return {
                ...state, expenses: state.expenses.map(expense => expense.id === action.payload.id
                    ? action.payload : expense)
            };
        case ActionTypes.DELETE_EXPENSE:
            return { ...state, expenses: state.expenses.filter(expense => expense.id !== action.payload.id) };
        default:
            return state;
    }
}