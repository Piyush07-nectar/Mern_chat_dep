import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useAllUser from '../../context/useAlluser';
import useConversation from '../../zusand/useConversation';
const Search = () => {
  const [search,setSearch]=useState("");
  const [allUserInfo]=useAllUser();
  const {setSelectedConversation}=useConversation();
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(!search){
      return
    }
    const conversation=allUserInfo.find((user)=>
     user.email.toLowerCase().includes(search.toLowerCase()));
    if(conversation){
      setSelectedConversation(conversation);
          setSearch("");
    }
    else{
      alert("User Not Find");
    }
  }
  return (
    <div className='flex px-6 py-4'>
     <form action="" className=' w-full max-w-md' onSubmit={handleOnSubmit}>
        <div className='flex space-x-3 ml-3 mt-3 w-[100%]'>
         <label className="input border-[1px] border-gray-700 bg-slate-900">
  <input type="search " required placeholder="Search" className=' outline-none '
   value={search} onChange={(e)=>setSearch(e.target.value)}/>
</label>
<button type="submit" className=' text-[25px]  
sm:text-xl cursor-pointer hover:bg-gray-600 rounded-full translate-fll duration-200 '><FaSearch />
</button>
</div>
     </form>
    </div>
  )
}

export default Search
