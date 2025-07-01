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

 const handleOnClick = async () =>{
    if(!formData.foodName || !formData.price   ){
        return alert("food name or price not entered")
    }
    try{
        const res = await fetch("https://localhost:3000/newfood",{
          method : "POST",
          headers : {"Content-Type":"application/json"},//teell type is json only  
        body:JSON.stringify(formData) //convert to string because http accepts string only
        });
        const result = await res.json();
        console.log("successfully sent" , result);
        alert("food added !!")

        //reset form
        setFormData({foodName :"", price :"", desc:""});

    }
    catch(err){
  console.log("error in adding food")
    }
  }
}
const handleDelete = async(id) =>{
try{
    const res = await fetch(`http://localhost:3000/menu/${id}`,{
       method : "DELETE" 
    })
    alert("Item Deleted")
}
catch(err){
    console.log(err)
}

}


