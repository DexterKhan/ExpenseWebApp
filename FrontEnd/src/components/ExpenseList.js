import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../services/expenses';
import { GetCategories } from '../services/categories';
import { Button, Col, Row } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';

export default () => {
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expensesSlice.expenses);

    useEffect(() => {
        GetExpenses(dispatch);
    }, []);

    useEffect(() => {
        GetCategories(dispatch);
    }, [dispatch]);

    return expenses.map(e =>
        <div key={e.id} style={{ marginBottom: '1rem' }} >
            <ListRow key={e.id} expense={e} />
        </div>

    );



}

const ListRow = ({ expense }) => {
    const [isEditing, setIsEditing] = useState(false);

    return isEditing
    ? <ExpenseForm expense={expense} setIsEditing= {setIsEditing} />
    : <div key={expense.id}>
        <Row key={expense.id}>
            <Col>{expense.description}</Col>
            <Col>${expense.amount}</Col>
            <Button variant="warning" style={{ width: '60px' }} onClick={() => setIsEditing(!isEditing)} >
                Edit</Button>
        </Row>
        <hr />
    </div>
}

