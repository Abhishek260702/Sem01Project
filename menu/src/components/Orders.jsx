import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';


const Orders = () => {

    const [orderInfo, setOrderInfo] = useState([{ foodName: "idle", quantity: 2, price: 150 }]);  //its a array of 3 object not a string so ==>  for debug

    const [currentOrder, setCurrentOrder] = useState({   // here adding 3 objects 
        foodName: "", quantity: "", price: ""
    });


    const [givenOrders, setGivenOrders] = useState([]);  //fetch orders

    const handleInputChange = (e) => {
        console.log(e.target.name, " = ", console.log(e.target.value))
        const { name, value } = e.target;    //destr
        setCurrentOrder({ ...currentOrder, [name]: value });      //adding [name] : value => in currentOrder
    }
const handleSubmit = async () => {
        const newOrder = {   //here  giving the obj by bundling all string together
            foodName: currentOrder.foodName,
            quantity: parseInt(currentOrder.quantity),
            price: parseInt(currentOrder.price)
        };
        console.log("newOrder", newOrder)
        setOrderInfo([...orderInfo, newOrder]);
        console.log("orderIndo :", orderInfo);
        console.log("currentOrder :", currentOrder);
        setCurrentOrder({ foodName: "", quantity: "", price: "" });

        try {
            const res = await axios.post("http://localhost:3000/order", [currentOrder]);
            console.log(res);
        }
        catch (err) {
            console.log(err);

        }
    }

    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:3000/showorder");
        console.log("given orders", res.data)
        setGivenOrders(res.data);
    }

    useEffect(() => {
        fetchOrders();
    }, [])
}