import React from 'react'
import Usercomp from './usercomp'
import useAllUser from '../../context/useAlluser'
const Usersearch = () => {
  const[allUserInfo,setAllUserInfo]=useAllUser()
  console.log(allUserInfo)
  return (
    <div >
      <h1 className='px-8 py-2 font-semibold bg-slate-800 rounded-md'>Message</h1>
      <div className='overflow-y-auto max-h-[75vh] custom-scrollbar'>
        {allUserInfo.map((user,index)=>(
          <Usercomp key={index} user={user}/>
        ))}
      </div>
    </div>
  )
}

export default Usersearch
