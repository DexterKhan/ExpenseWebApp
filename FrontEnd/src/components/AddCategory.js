import { React, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { GetCategories, NewCategory, EditCategory, DeleteCategory } from '../services/categories';
import { useDispatch, useSelector } from 'react-redux';

const AddCategory = ({ closeModal }) => {
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categoriesSlice.categories);

    const [newCategory, setNewCategory] = useState('');

    useEffect(() => {
        GetCategories(dispatch);
    }, [dispatch]);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory.trim() !== '') {
            NewCategory(dispatch, { name: newCategory });
            setNewCategory('');
        }
    };

    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const handleEditCategory = (e) => {
        e.preventDefault();
        if (currentCategory && newCategory.trim() !== '') {
            EditCategory(dispatch, { id: currentCategory.id, name: newCategory });
            setIsEditing(false);
            setNewCategory('');
            setCurrentCategory(null);
        }
    };

    const handleDeleteCategory = (category, e) => {
        //e.preventDefault();
        setCurrentCategory(category);

        if (currentCategory) {
            DeleteCategory(dispatch, currentCategory);
            setCurrentCategory(null);
        }
    };

    const startEditing = (category) => {
        setIsEditing(true);
        setNewCategory(category.name);
        setCurrentCategory(category);
    };



    return (
        <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {categories.map((category) => (
                    <li key={category.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ flex: 1 }}>{category.name}</span>
                        <Button variant="primary" size="sm" style={{ marginRight: '8px' }} onClick={() => startEditing(category)}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => DeleteCategory(dispatch, { id: category.id, name: category.name })}>Delete</Button>
                    </li>
                ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter category name" style={{ flex: 1, marginRight: '8px', padding: '4px' }}/>
                {isEditing ? (
                    <Button onClick={handleEditCategory}>Save</Button>
                ) : (
                    <Button onClick={handleAddCategory}>Add</Button>
                )}
            </div>
            <Button variant="secondary" style={{ marginTop: '16px' }} onClick={closeModal}>Close</Button>
        </div>

    );
};
export default AddCategory;