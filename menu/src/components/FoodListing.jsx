import React, { useState, useEffect } from 'react'
import './FoodListing.css';

const FoodListing = () => {

    const [food, setFood] = useState([]);
    const [formData ,setFormData] =useState({
        foodName : "",
        price: "" ,
        desc: "",
    })
 const menu = async () => {
        try {
            const data = await fetch("http://localhost:3000/menu");
            const response = await data.json();
            console.log(response)
            setFood(response)
        }
        catch (err) {
            console.log(err);

        }
    }
     useEffect(() => {
        menu();
    }, [])

const  
}
