import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import UserRoute from './routes/user_route.js';
import messageRoute from './routes/message_route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/server.js';
dotenv.config();
const port=process.env.PORT||5000
const uri=process.env.MONGODB_URI;
app.get('/', (req, res) => {
  res.send('Hello WORLD!')
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

try{
    mongoose.connect(uri)
    console.log("DataBase is connected")
}
catch{
    console.log("Error")
}
app.use("/user",UserRoute)
app.use("/message",messageRoute)
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
