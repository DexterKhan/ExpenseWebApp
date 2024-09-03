import { newExpense, editExpense, deleteExpense } from '../app/expensesSlice';
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
        default:
            break;
    }
    return next(action);
}

export default ToastMiddleware;