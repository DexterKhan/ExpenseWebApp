import { newExpense, editExpense, deleteExpense } from '../app/expensesSlice';
import { newCategory, editCategory, deleteCategory } from '../app/categoriesSlice';
import { toast } from 'react-toastify';

const ToastMiddleware = (store) => next => action => {
    switch (action.type) {
        case newExpense.type:
            toast.success("Expense added successfully");
            break;
        case editExpense.type:
            toast.success("Expense updated successfully");
            break;
        case deleteExpense.type:
            toast.success("Expense deleted successfully");
            break;
        case newCategory.type:
            toast.success("Category added successfully");
            break;
        case editCategory.type:
            toast.success("Category updated successfully");
            break;
        case deleteCategory.type:
            toast.success("Category deleted successfully");
            break;
        default:
            break;
    }
    return next(action);
}

export default ToastMiddleware;