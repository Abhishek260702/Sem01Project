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

}