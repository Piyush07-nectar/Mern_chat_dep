import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import useSendMessages from '../../context/useSendMessages';
const Messagecontent = () => {
  const [message,setMessage]=useState("")
  const {loading,sendmessage}=useSendMessages();
 const handleOnChange = (e) => {
    setMessage(e.target.value );
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const textmessage=message
          setMessage("")
    await sendmessage(textmessage)
  };
  return (
    <div className='pl-5 pt-3 bg-slate-900 items-center'>
       <form action="" className='flex items-center space-x-3 w-full' onSubmit={handleOnSubmit}>
      <input type="text" placeholder="Type here" className="w-11/12 input input-ghost px-4 py-2 rounded-full bg-slate-800 text-gray-200 placeholder-gray-400 outline-none 
      focus:ring-2 focus:ring-blue-500 transition"  value={message}
      onChange={handleOnChange} />
     <div className='text-3xl items-center hover:text-blue-600  hover:cursor-pointer'>
        <button type='submit' className='hover:cursor-pointer hover:bg-gray-400 rounded-full'>
             <IoMdSend />
        </button>
     </div>
       </form>
    </div>
  )
}

export default Messagecontent
