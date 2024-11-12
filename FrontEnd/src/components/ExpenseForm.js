import { React, useState, useEffect } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { EditExpense, NewExpense, DeleteExpense } from '../services/expenses';
import { useDispatch, useSelector } from 'react-redux';
import AddCategory from './AddCategory';

export default ({ expense, setIsEditing }) => {
    const descriptions = useSelector(state => state.categoriesSlice.categories.map(c => c.name));
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState(descriptions[0]);
    const [isNewExpense, setIsNewExpense] = useState(true);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        if (expense !== undefined) {
            setIsNewExpense(false);
            setAmount(expense.amount);
        }
        else {
            setIsNewExpense(true);
        }
    }, [expense]);

    return (
        <>
            <Form

                onSubmit={e => {
                    e.preventDefault();
                    if (isNewExpense) {
                        // add new expense
                        NewExpense(dispatch, { description: description, amount: Number(amount) });
                    }
                    else {
                        // update expense
                        EditExpense(dispatch, { id: expense.id, description: description, amount: Number(amount) });
                        setIsEditing(false);
                    }
                }}
            >
                <Row>
                    <Col>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='select' onChange={event => setDescription(event.target.value)}>
                            {descriptions.map((description, index) => <option key={index}>{description}</option>)}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type='number' step='0.01' placeholder={amount}
                            onChange={event => setAmount(event.target.value)} />
                    </Col>
                    <div style={{ marginTop: 'auto', width: '100px' }}>
                        {isNewExpense
                            ? <Button variant="primary" type="submit" style={{ width: '60px' }}>Add</Button>
                            : <div>
                                <Button variant="danger" style={{ marginRight: '2px', width: '70px' }}
                                    onClick={() => DeleteExpense(dispatch, expense)}>Delete</Button>
                                <Button variant="success" type="submit" style={{ marginRight: '2px', width: '60px' }}>Save</Button>
                                <Button variant="default" style={{ marginRight: '2px', width: '60px' }}
                                    onClick={() => setIsEditing(false)}>
                                    Cancel</Button>
                            </div>}

                    </div>
                    <div style={{ marginTop: 'auto', width: '150px' }}>
                        <Button variant="primary" style={{ marginRight: '2px', width: '125px' }}
                            onClick={openModal}>
                            Add Category</Button>
                    </div>
                </Row>

            </Form>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddCategory closeModal={closeModal} />
                </Modal.Body>
            </Modal>
        </>
    );
}