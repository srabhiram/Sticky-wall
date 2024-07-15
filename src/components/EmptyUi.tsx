import React from 'react'
import { MdTask } from 'react-icons/md'

export default function EmptyUi() {
  return (
   <>
   <div className=' flex flex-col items-center justify-center w-full '>
   <MdTask className='text-8xl text-gray-500' />
   <h1>No tasks found</h1>
    </div></>
  )
}
