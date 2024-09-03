import { createSlice } from '@reduxjs/toolkit'

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState: {
        expenses: []
    },
    reducers: {
        setExpenses: (state, action) => {
            return { ...state, expenses: [...action.payload] };
        },
        newExpense: (state, action) => {
            return { ...state, expenses: [...state.expenses, action.payload] };
        },
        editExpense: (state, action) => {
            return {
                ...state, expenses: state.expenses.map(expense => expense.id === action.payload.id
                    ? action.payload : expense)
            };
        },
        deleteExpense: (state, action) => {
            return { ...state, expenses: state.expenses.filter(expense => expense.id !== action.payload.id) };
        }
    }
});

export const { setExpenses, newExpense, editExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;