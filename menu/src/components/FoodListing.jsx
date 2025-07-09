import React, { useState, useEffect } from 'react';
import './FoodListing.css';

const FoodListing = () => {
    const [food, setFood] = useState([]);
    const [formData, setFormData] = useState({ foodName: "", price: "", desc: "" });
    const [editingId, setEditingId] = useState(null);
    const [editInputs, setEditInputs] = useState({}); // Stores per-card edits

    const fetchMenu = async () => {
        try {
            const res = await fetch("http://localhost:3000/menu");
            const data = await res.json();
            setFood(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const handleAdd = async () => {
        if (!formData.foodName || !formData.price) {
            return alert("Food name or price not entered");
        }
        try {
            await fetch("http://localhost:3000/newfood", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            alert("Food added!");
            setFormData({ foodName: "", price: "", desc: "" });
            fetchMenu();
        } catch (err) {
            console.log("Error adding food:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/menu/${id}`, {
                method: "DELETE"
            });
            alert("Item Deleted");
            fetchMenu();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setEditInputs({
            [item._id]: {
                foodName: item.foodName,
                price: item.price,
                desc: item.desc
            }
        });
    };

    const handleSave = async (id) => {
        const updatedData = editInputs[id];
        try {
            const res = await fetch(`http://localhost:3000/menu/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });
            if (res.ok) {
                alert("Item Updated");
                setEditingId(null);
                fetchMenu();
            } else {
                alert("Failed to update item");
            }
        } catch (err) {
            alert("Error updating item");
        }
    };

    return (
        <div className="menu-container">
            <div className="menu-title">Our Authentic Dishes</div>
            <div className="menu-grid">
                {food.map((item) => (
                    <div key={item._id} className='menu-card'>
                        {editingId === item._id ? (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={editInputs[item._id].foodName}
                                    onChange={(e) =>
                                        setEditInputs({
                                            ...editInputs,
                                            [item._id]: { ...editInputs[item._id], foodName: e.target.value }
                                        })
                                    }
                                    placeholder="Food Name"
                                />
                                <input
                                    type="text"
                                    value={editInputs[item._id].price}
                                    onChange={(e) =>
                                        setEditInputs({
                                            ...editInputs,
                                            [item._id]: { ...editInputs[item._id], price: e.target.value }
                                        })
                                    }
                                    placeholder="Price"
                                />
                                <input
                                    type="text"
                                    value={editInputs[item._id].desc}
                                    onChange={(e) =>
                                        setEditInputs({
                                            ...editInputs,
                                            [item._id]: { ...editInputs[item._id], desc: e.target.value }
                                        })
                                    }
                                    placeholder="Description"
                                />
                                <button onClick={() => handleSave(item._id)}>Update</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <h2 className='food-name'>{item.foodName}</h2>
                                <p className='food-price'>Price: {item.price}</p>
                                <p className='food-desc'>Description: {item.desc}</p>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                                <button onClick={() => handleEdit(item)}>Update</button>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="form-Fields">
                <input
                    type="text"
                    placeholder='Enter Food Name'
                    value={formData.foodName}
                    onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder='Enter Food Price'
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder='Enter Food Desc'
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                />
                <button onClick={handleAdd}>Add Item</button>
            </div>
        </div>
    );
};

export default FoodListing;
