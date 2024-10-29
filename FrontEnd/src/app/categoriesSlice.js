import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: []
    },
    reducers: {
        setCategories: (state, action) => {
            return { ...state, categories: [...action.payload] };
        },
        newCategory: (state, action) => {
            return { ...state, categories: [...state.categories, action.payload] };
        },
        editCategory: (state, action) => {
            return {
                ...state, categories: state.categories.map(category => category.id === action.payload.id
                    ? action.payload : category)
            };
        },
        deleteCategory: (state, action) => {
            return { ...state, categories: state.categories.filter(category => category.id !== action.payload.id) };
        }
    }
});

export const { setCategories, newCategory, editCategory, deleteCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;