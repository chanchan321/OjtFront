import React from 'react'
import one from'./components/images/homepage.jpg';
import two from'./components/images/green.jpg';
import logo from'./components/images/forbeslogo.png';
import cite from'./components/images/CITE.png';

export default function Homepage() {
  return (
    <>
        <div className="mx-auto w-full my-10 overflow-hidden">
            <div className='flex flex-col md:flex-row justify-around w-3/4 mx-auto items-center mb-[20px]'>
              <img src={logo} className=' w-72 m-10' />
              <img src={one} className='border-2 border-[#153462] rounded-lg w-96 shadow-md shadow-[#153462] bg-[#BAD1C2]' />
              <div className='min-w-[200px] font-bold text-[#153462] text-[30px]'>
                <p>Building the</p>   
                <p>Future with</p>
                <p>A Strong Foundation in </p>
                <p>Basic Education</p>
              </div>
            </div>
            <div className='flex flex-col xl:flex-row justify-around items-center w-3/4 mx-auto '>
              <img src={cite} className='w-[500px] m-10 xl:order-last' />
              <img src={two} className=' md:block border-2 border-[#153462] rounded-lg w-[700px] shadow-md shadow-[#153462] bg-[#BAD1C2' />
            </div>
              
        </div>
    </>
  )
}
