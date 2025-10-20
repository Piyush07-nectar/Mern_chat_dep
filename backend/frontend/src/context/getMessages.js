import React, { useEffect, useState } from 'react'
import useConversation from '../zusand/useConversation.js'
import axios from 'axios'
const getMessages = () => {
    const [loading,setLoading]=useState(false)
    const {messages,setMessages,selectedConversation}=useConversation();
    useEffect(()=>{
        const getmessage=async()=>{ 
            setLoading(true)
            if(selectedConversation&&selectedConversation._id){
                try{
                    const response=await axios.get(
                        `/message/get/${selectedConversation._id}`
                    );
                    setMessages(response.data)
                    setLoading(false)
                }
                catch(err){
                    console.log(err)
                    setLoading(false)
                }
            }

        }
        getmessage();
    },[selectedConversation,setMessages])
  return {loading,messages}
}

export default getMessages
