import React from 'react'
import Search from './Search'
import Usersearch from './Usersearch'
import Log from './Log'
const left = () => {
  return (
    <div className='text-white bg-black w-[30%]'>
      <Search />
      <div className='min-h-[82vh]'>
        <Usersearch />
      </div>
      <Log/>
    </div>
  )
}

export default left
