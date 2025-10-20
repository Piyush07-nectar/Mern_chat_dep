import Conversation from "../models/Conversation_model.js";
import Message from "../models/Message_model.js"
import { getReciverSocket, io } from "../socket/server.js";
export const sendMessage=async(req,res)=>{
    try{
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({
            members:{$all:[senderId,receiverId]},
        })
        if(!conversation){
            conversation=await Conversation.create({
                members:[senderId,receiverId],
            })
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()]);
        const reciverSocketId=getReciverSocket(receiverId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json({ newMessage });
        // console.log("Message is send",req.params.id,req.body.message)
    }
    catch (err) {
  console.error("Send message error:", err);
  res.status(500).json({ error: err.message });
}

}
export const getMessage=async(req,res)=>{
    try{
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let conversation=await Conversation.findOne({
            members:{$all:[senderId,receiverId]},
        }).populate("messages")
        if(!conversation){
           return res.status(201).json([]);
        }
        
       const messageGet=conversation.messages;
       res.status(201).json(messageGet)
        // console.log("Message is send",req.params.id,req.body.message)
    }
    catch(err){
        res.status(500).json({error:"Internal error"})
    }
}