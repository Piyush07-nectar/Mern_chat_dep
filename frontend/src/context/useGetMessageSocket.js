import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../zusand/useConversation';

const useGetMessageSocket = () => {
    const {socket}=useSocketContext();
    const {messages,setMessages}=useConversation();
    useEffect(()=>{
       socket.on("newMessage",(newMessage)=>{
        setMessages([...messages,newMessage]);
       })
       return ()=>{
         socket.off("newMessage");
       }
    },[socket,messages,setMessages]);
}

export default useGetMessageSocket
