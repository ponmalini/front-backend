const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./userSchema");
const port = 1500;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/Website1")
.then(()=> console.log("Database connected"))
.catch((err) => console.log("Database not connected.error : ",err));


app.get("/userget",async (req,res)=> {
    try{
        const user = await userModel.find();
        res.json(user);
    }catch (err) {
        console.log("error :",err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

app.post("/userpost",async (req,res)=> {
    try{
        const { name, age, email} = req.body;
        const newUser = await userModel.create({name,age,email});
        res.status(201).json({
            data: newUser,
        });
    }catch (err) {
        console.log("error :",err);
        res.status(400).json({error: "error in creating user"});
    }
});
//Update get
app.get('/data/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const user = await userModel.findById(id);
        if (!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user);
    }catch (error){
        res.status(400).json({error:error.message});
    }
});
//put request to update a user by id
app.put('/user/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const {name,age,email}=req.body;
        const user = await userModel.findById(id);
        const updateUser = await userModel.findByIdAndUpdate(id,{name,age,email},{new:true});
        if(!updateUser){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({updateUser});
      }catch (error){
        res.status(400).json({error:error.message});
    }
});
app.delete('/userdelete/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const {name,age,email}=req.body;
        const user = await userModel.findById(id);
        const deleteUser = await userModel.findByIdAndDelete(id,{name,age,email},{new:true});
        if(!deleteUser){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({deleteUser});
      }catch (error){
        console.log('Error to find the person in given id',error);
        res.status(400).json({error:error.message});
    }
});
app.listen(port,()=> {
    console.log(`server running port is :${port}`);
});