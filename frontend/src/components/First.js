import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './First.css';
function First() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();

        const formdata = { name, email, age };
        axios.post('http://localhost:1500/userpost', formdata)
            .then(response => {
                console.log("Response:", response.data);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    function handleview() {
        navigate('/get');
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <label>Name</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter the name" 
                /><br />
                
                <label>Email</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter the email" 
                /><br />
                
                <label>Age</label>
                <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    placeholder="Enter the age" 
                /><br />
                
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleview}>View</button>
        </div>
    );
}

export default First;
