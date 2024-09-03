import { setExpenses, newExpense, editExpense, deleteExpense } from "../app/expensesSlice";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Expenses`,
});

axiosInstance.interceptors.request.use(config => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token')};
    return config;
})


export const GetExpenses = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get();
        /*const expenses = [
            { id: 1, description: 'Rent', amount: 1000 },
            { id: 2, description: 'Gas', amount: 50 },
            { id: 3, description: 'Food', amount: 300 },
            { id: 4, description: 'Student Loans', amount: 600 },

        ]*/

        dispatch(setExpenses(data));
    } catch {
        console.log("Error!")
    }
}


export const NewExpense = async (dispatch, expense) => {
    try {
        // api call
        const { data } = await axiosInstance.post('', expense);
        dispatch(newExpense(data));
    } catch {
        console.log("Error!");
    }
}

export const EditExpense = async (dispatch, expense) => {
    try {
        // api call
        await axiosInstance.put('', expense);
        dispatch(editExpense(expense));
    } catch {
        console.log("Error!");
    }
}

export const DeleteExpense = async (dispatch, expense) => {
    try {
        // api call
        await axiosInstance.delete('', { data: { ...expense } });
        dispatch(deleteExpense(expense));
    } catch {
        console.log("Error!");
    }
}