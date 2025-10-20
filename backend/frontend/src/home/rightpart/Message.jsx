import React from 'react';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Message = ({ message }) => {
  const token = Cookies.get("jwt");
  let decoded = null;
  if (token) {
    try {
       decoded = jwtDecode(token);
      //console.log("Decoded token:", decoded);
    } catch (err) {
      console.error("Invalid JWT:", err);
    }
  }
const createdAt=new Date(message.createdAt)
const timeformate=createdAt.toLocaleTimeString([],{
  hour:'2-digit',
  minute:'2-digit'
})

const itsMe = String(decoded?.userid) === String(message?.senderId);
const chatPos=itsMe?"chat-end":"chat-start";
const chatColor=itsMe?"bg-blue-500":"";
  return (
    <div>
      <div className={`chat ${chatPos}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
        </div>
        <div className='chat-footer'>{timeformate}</div>
      </div>
    </div>
  );
};

export default Message;
