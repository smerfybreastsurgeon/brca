import express from 'express';
import patients from './data/patients.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const app=express();

app.get('/',(req,res)=>{
    res.send('API is running....')
})

app.get('/api/patients',(req,res)=>{
    res.json(patients)
})

app.get('/api/patients/:id',(req,res)=>{
   const patient=patients.find((p)=>p.id===req.params.id);
   res.json(patient)
})

app.listen(port,()=>console.log(`Server is running on port : ${port}`))
