import axios from 'axios';
import { setExpenseAmountPerCategory } from "../app/statisticsSlice";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/statistics`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getExpensesPerCategory = async (dispatch) => {
  try {
    const { data } = await axiosInstance.get();
    dispatch(setExpenseAmountPerCategory(data));
    return data;
  } catch (error) {
    console.error('Error fetching expenses per category:', error);
    throw error;
  }
};


