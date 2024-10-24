import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

function Formget() {
         
    const [users,setUsers] =useState([]);
    const navigate =useNavigate();

    useEffect(()=> {
        axios.get('http://localhost:1500/userget')
        .then(response =>{
            setUsers(response.data);
        })
        .catch(err =>{
           console.error('Error fetching users',err);
        })
       },[]);
        
       const handleupdate =(id)=>navigate(`/updateget/${id}`)
       
       const handleDelete =(id)=>{
        axios.delete(`http://localhost:1500/userdelete/${id}`)
        .then(response =>{
            console.log("user deleted : ",response.data)
            setUsers(pre=>pre.filter(user=>user._id!==id))
       })
       .catch(error =>{
        console.log('Error deleting user:',error);
       });
    };  

  return (
    <div>
        <h2>User List</h2>
        {users.length>0 ?(
            <div>
                {users.map((user) =>(
                  <div key={user._id}>
                    <strong>Name :</strong>{user.name} <br/>
                    <strong>Email :</strong>{user.email} <br/>
                    <strong>Age :</strong>{user.age} <br/>
                    <button onClick={() =>handleupdate(user._id)}>Update</button>
                    <button onClick={() =>handleDelete(user._id)}>Delete</button>
                    </div>
                ))}
                </div>
        ):(
        <p>No users found</p>
        )}
        </div>
    
  )
}

export default Formget