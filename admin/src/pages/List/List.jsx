<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify';

const List = () => {
  const[list , setList] = useState([]);

  const fetchList = async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/list`);
    console.log(response.data);
    if(response.data.success){
      setList(response.data.data);
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
  fetchList();
}, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${import.meta.env.VITE_API_URL}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>
            )
        })}
      </div>
=======
import React from 'react'
import './List.css'
const List = () => {
  return (
    <div>
      
>>>>>>> 299c093b2ea6ea9647f273872ed7516c3af7285d
    </div>
  )
}

export default List
