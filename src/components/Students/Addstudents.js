import React,{useEffect, useState, useRef} from 'react'
import { motion } from "framer-motion"
import Axios from 'axios';
import Swal from 'sweetalert2'
import useStore from '../../store/store';

export default function Addstudents({refresh,sy,close}) {
    const container = {
        hidden: { opacity: 0 },
        show: {
          scale:1,
          opacity: 1,
          transition: {
            delayChildren: 0.5,
            staggerDirection: -1
          }
        }
      }
      const lastname = useRef()
      const firstname = useRef()
      const middlename = useRef()
      const course = useRef()

      const cUser = useStore(state => state.cUser)
      const dept = cUser.department


     

      const SaveStudent = () =>{
        if(!lastname.current.value || !firstname.current.value || !middlename.current.value || !course.current.value){
          return Swal.fire({
            icon: 'error',
            title: 'empty inputs',
            showConfirmButton: false,
            timer: 1500
          })
        }

        Swal.fire({
          title: 'Are you sure?',
          text: "Please double check inputs!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'SAVE'
        }).then( async (result) => {
          if (result.isConfirmed) {
            try{
              const response= await Axios.post(`http://localhost:3030/students`,{
                lastname:lastname.current.value,
                firstname:firstname.current.value,
                middlename:middlename.current.value,
                course:course.current.value,
                sy:sy,
                dept:dept,
              })
              Swal.fire({
                icon: 'success',
                title: 'Student Added!',
                showConfirmButton: false,
                timer: 1500
              })
              refresh()
              close()
            }catch (err){
              if (err) {
                  Swal.fire({
                      icon: 'error',
                      title: 'SERVER ERROR',
                      showConfirmButton: false,
                      timer: 1500
                    })
              }
            } 
          }
        })
      }

  return (
    <>
   
    <div className="absolute top-[20%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
 {/*content*/}
               <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
               variants={container}
               initial="hidden"
               animate="show"> 
     {/*header*/}
                       <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-slate-200 rounded-t">
                         <h3  className=" text-[white] w-full m-auto flex flex-col items-center">
                                  <div className='text-[25px] text-black'>Student credentials</div>
                         </h3>
                     </div>
     {/*body*/}
                  <div className=" px-2 z-50 w-[320px]">
                            <div className='py-2'>
                              <div>Lastname:</div>
                             <input type='text' 
                              ref={lastname}
                              placeholder='lastname' 
                              className='w-full shadow-inner shadow-gray-500/50 border-[1px] p-[2px] border-gray-200 rounded-md px-2'/>
                            </div>
                            <div className='py-2'>
                              <div>Firstname:</div>
                             <input type='text' 
                               ref={firstname}
                              placeholder='firstname' 
                              className='w-full shadow-inner shadow-gray-500/50 border-[1px] p-[2px] border-gray-200 rounded-md px-2'/>
                            </div>
                            <div className='py-2'>
                              <div>Middlename:</div>
                             <input type='text' 
                              ref={middlename}
                              placeholder='middlename' 
                              className='w-full shadow-inner shadow-gray-500/50 border-[1px] p-[2px] border-gray-200 rounded-md px-2'/>
                            </div>
                            <div className='py-2'>
                                <div>Course:</div>
                                {dept == 'CITE'?
                                    <select  ref={course} className='bg-white text-[20px]' >
                                          <option value={'BSIT'}>BSIT</option>
                                          <option value={'BSIT_Anim'}>BSIT_Anim</option>
                                </select>:''}
                                {dept == 'CBE'?
                                    <select className='bg-white text-[20px]' >
                                        <option>BPA</option>
                                        <option>BSBA_M</option>
                                        <option>BSBA_MM</option>
                                </select>:''}
                                {dept == 'CCJE'?
                                      <select className='bg-white text-[20px]' >
                                        <option>CRIM</option>
                                </select>:''}
                            </div>

                            
                 </div>
     {/*footer*/}
             <div className="flex items-center justify-between px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                     <button
                         className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                         type="button"
                         onClick={() => close(false)}
                     >
                         Close
                     </button>
                     <button
                         className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                         type="button"
                         onClick={()=> SaveStudent()}
                     >
                         Save 
                     </button>
             </div>
         </motion.div>
 </div>
 
 <div  onClick={() => close(false)} className="opacity-25 fixed inset-0 z-40 bg-black "></div>
     </>
  )
}
