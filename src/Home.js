import {React,useEffect} from 'react'
import Navigation from './Navigation'
import {AiFillFacebook} from "react-icons/ai"
import {CgMail} from "react-icons/cg"
import {BsGlobe} from "react-icons/bs"
import {useParams,useNavigate} from 'react-router-dom'

export default function Home() {

    const navigate = useNavigate();
   
    
  return (
    <>
        <div className='body-main'>
            <Navigation className="stickynav"/>

            <div className='flex flex-col md:flex-row w-full md:h-2/6 bg text-white border-t-2 border-[#BAD1C2]'>
                <div className='w-full md:w-2/6 h-full'>
                        <p className='mx-auto w-2/5 my-20 font-bold'>FORBES COLLEGE MAIN CAMPUS RIZAL CORNER ELIZONDO STREETS LEGASPI CITY. 4500 PHILIPPINES </p>
                </div>
                <div className='w-full md:w-2/6 h-full'>
                        <div className='mx-auto w-fit my-5 font-bold'>Mission</div>
                        <p className='mx-auto w-fit my-5'>Simplifying quality education for a better life.</p>
                        <hr className='border-white w-96 mx-auto'></hr>
                        <div className='mx-auto w-60 my-5 flex justify-between'>
                        <AiFillFacebook size={35} className='cursor-pointer'/>
                        <CgMail size={40} className='cursor-pointer'/>
                        <BsGlobe size={30} className='cursor-pointer'/>
                        </div>
                </div>
                <div className='w-full md:w-2/6 h-full'>
                <div className='mx-auto w-fit my-5 font-bold'>Vision</div>
                    <p className='mx-auto w-2/4 my-5'>We envision to be an institutoin that leads in 
                        educational innovation where 
                        Student want to study in;
                        Teacher want to teach in; 
                        Parent want to send their children to;
                        and Alumni want to return       
                    </p>
                </div>
            </div>
        </div>
        
    </>
    
  )
}
