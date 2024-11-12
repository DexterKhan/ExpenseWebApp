import { setCategories, newCategory, editCategory, deleteCategory } from "../app/categoriesSlice";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Category`,
});

axiosInstance.interceptors.request.use(config => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token')};
    return config;
});

export const GetCategories = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get();
        dispatch(setCategories(data));
    } catch (error) {
        console.log("Error fetching categories!", error);
    }
}

export const NewCategory = async (dispatch, category) => {
    try {
        const { data } = await axiosInstance.post('', category);
        dispatch(newCategory(data));
    } catch (error) {
        console.log("Error adding category!", error);
    }
}

export const EditCategory = async (dispatch, category) => {
    try {
        const { data } = await axiosInstance.put('', category);
        dispatch(editCategory(data));
    } catch (error) {
        console.log("Error editing category!", error);
    }
}

export const DeleteCategory = async (dispatch, category) => {
    try {
        await axiosInstance.delete('', { data: { ...category } });
        dispatch(deleteCategory(category));
    } catch (error) {
        console.log("Error deleting category!", error);
    }
}

