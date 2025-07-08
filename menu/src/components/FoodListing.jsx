import React, { useState, useEffect } from 'react';
import './FoodListing.css';

const FoodListing = () => {
    const [food, setFood] = useState([]);
    const [formData, setFormData] = useState({
        foodName: "",
        price: "",
        desc: "",
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState({ foodName: '', price: '', desc: '' });

    const menu = async () => {
        try {
            const data = await fetch("http://localhost:3000/menu");
            const response = await data.json();
            console.log(response);
            setFood(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        menu();
    }, []);

    const handleOnClick = async () => {
        if (!formData.foodName || !formData.price) {
            return alert("Food name or price not entered");
        }
        try {
            const res = await fetch("http://localhost:3000/newfood", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const result = await res.json();
            console.log("Successfully sent", result);
            alert("Food added!");
            setFormData({ foodName: "", price: "", desc: "" });
            menu(); // refresh menu after adding
        } catch (err) {
            console.log("Error in adding food");
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/menu/${id}`, {
                method: "DELETE"
            });
            alert("Item Deleted");
            menu(); // refresh menu after deletion
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="menu-container">
            <div className="menu-title">Our Authentic Dishes</div>
            <div className="menu-grid">
                {food.map((item, index) => (
                    <div key={index} className='menu-card'>
                        <h2 className='food-name'>{item.foodName}</h2>
                        <p className='food-price'>Price: {item.price}</p>
                        <p className='food-desc'>Description: {item.desc}</p>
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                        <button onClick={() => {
                            setEditIndex(index);
                            setEditData({ foodName: item.foodName, price: item.price, desc: item.desc });
                        }}>Edit</button>
                        {editIndex === index && (
                            <div className="edit-form">
                                <input type="text" value={editData.foodName} onChange={e => setEditData({ ...editData, foodName: e.target.value })} placeholder="Food Name" />
                                <input type="text" value={editData.price} onChange={e => setEditData({ ...editData, price: e.target.value })} placeholder="Price" />
                                <input type="text" value={editData.desc} onChange={e => setEditData({ ...editData, desc: e.target.value })} placeholder="Description" />
                                <button onClick={async () => {
                                    try {
                                        const res = await fetch(`http://localhost:3000/menu/${item._id}`, {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(editData)
                                        });
                                        if (res.ok) {
                                            const updated = [...food];
                                            updated[index] = { ...updated[index], ...editData };
                                            setFood(updated);
                                            setEditIndex(null);
                                        } else {
                                            alert("Failed to update item");
                                        }
                                    } catch (err) {
                                        alert("Error updating item");
                                    }
                                }}>Save</button>
                                <button onClick={() => setEditIndex(null)}>Cancel</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="form-Fields">
                <input type="text" placeholder='Enter Food Name' value={formData.foodName} onChange={(e) => setFormData({ ...formData, foodName: e.target.value })} />
                <input type="text" placeholder='Enter Food Price' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                <input type="text" placeholder='Enter Food Desc' value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} />
                <button onClick={handleOnClick}>Add Item</button>
            </div>
        </div>
    );
};

export default FoodListing;
