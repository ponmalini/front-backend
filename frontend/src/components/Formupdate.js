 import React, {useState,useEffect} from 'react'
 import axios from 'axios';
 import {useNavigate, useParams} from 'react-router-dom';
 import './Formupdate.css';
 function Formupdate() {
    const [name,setName] =useState('');
    const [age,setAge] =useState('');
    const [email,setEmail] =useState('');
    const {id}=useParams()
    const navigate = useNavigate()

    useEffect(()=>{
      console.log("id from url:",id); 
      if(id){
      axios.get(`http://localhost:1500/data/${id}`)
        .then(Response =>{
            const userdata =Response.data;
            setName(userdata.name);
            setEmail(userdata.email);
            setAge(userdata.age);
        })
        .catch(error=>{
            console.error('Error fetching user data:',error.Response?error.Response.data : error.message)
        })

    }else{
        console.error("id is not available")
    }
},[id]);
const handlesubmit=(e) =>{
    e.preventDefault();
    const formData ={ name,email,age};

    axios.put(`http://localhost:1500/user/${id}`,formData)
    .then(response =>{
        console.log('updated successfully',response.data);
        navigate('/get');
    })
    .catch(error=>{
        console.error('Error fetching user data:',error.response?error.response.data : error.message);
});
}
return (
     <div>
        <form onSubmit={handlesubmit}>
                <label>Name</label>
                <input class='one'
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter the name" 
              /><br/>
                
              <label>Email</label>
                 <input  class='one'
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter the email" 
                /><br />
                
                <label>Age</label>
                <input  class='one'
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    placeholder="Enter the age" 
                /><br />
                
                <button id="updatebutton" type="submit">Submit</button>
            </form>
            
     </div>
   )
 }
 
 export default Formupdate