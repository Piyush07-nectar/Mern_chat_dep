import React, { useEffect, useRef } from "react";
import Message from "./Message";
import getMessages from "../../context/getMessages.js";
import Loading from "../../compo/Loading.jsx";
import useGetMessageSocket from "../../context/useGetMessageSocket.js";

const Messages = () => {
  const { loading, messages = [] } = getMessages(); // ✅ safe default array
  useGetMessageSocket();
  console.log(messages);
  const lastRef=useRef()
  useEffect(()=>{ 
    setTimeout(()=>{
      if(lastRef.current){
        lastRef.current.scrollIntoView({behavior:"smooth"});
      }
    },100)
  },[messages])
  return (
    <div className="p-2 overflow-y-auto max-h-[85vh] custom-scrollbar">
      {/* ✅ Case 1: Loading */}
      {loading && (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      )}

      {/* ✅ Case 2: Messages exist */}
      {!loading && messages.length > 0 && (
        messages.map((message) => (
          <div key={message._id} ref={lastRef}>
             <Message  message={message} />
          </div>
        ))
      )}

      {/* ✅ Case 3: No messages */}
      {!loading && messages.length === 0 && (
        <div className="flex justify-center items-center h-full text-gray-400">
          <p>Say Hi 👋 to Start Chat</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
