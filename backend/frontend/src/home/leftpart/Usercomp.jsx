import React, { useState } from 'react'
import useConversation from '../../zusand/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

const Usercomp = ({user}) => {
  const{selectedConversation,setSelectedConversation}=useConversation();
  const isSelected=selectedConversation?._id===user._id;
  const handleOnClick=()=>{
    setSelectedConversation(user)
  }
  const {socket,onlineUsers}=useSocketContext();
  const isOnline=onlineUsers.includes(user._id)
  console.log(isOnline);
  return (
    <div className={`flex space-x-5 px-4 py-4 hover:bg-slate-900 translate-all duration-300 rounded-b-md 
      ${isSelected?"bg-slate-900":""}`}
        onClick={handleOnClick} >
    <div className={`avatar avatar-${isOnline?"online":" "}`}>
  <div className="w-12 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
  </div>
</div>
 <div> 
    <h1 className='text-[20px] font-bold'>{user.name}</h1>
    <span>{user.email}</span>
 </div>
    </div>
  )
}

export default Usercomp
