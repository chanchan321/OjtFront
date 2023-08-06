import React, { useRef, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import logo from'./images/forbeslogo.png';
import Swal from 'sweetalert2'
import Axios from 'axios';

import useStore from '../store/store';

function Login() {
    
    let navigate= useNavigate();

    const userRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

 
    useEffect(() => {
        userRef.current.focus();
        window.localStorage.setItem("status",'false')
    }, [])

    const addcredentials = useStore( state => state.addCredentials)

        const handleSubmit = async (e) => {
            e.preventDefault(); 
            try{
                const response= await Axios.get(`http://localhost:3030/login/${user}/${pwd}`)
                
                    if(response.status === 250){
                          Swal.fire({
                            icon: 'warning',
                            title: 'User Not Found',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    }
                    if(response.status === 290){
                        Swal.fire({
                          icon: 'error',
                          title: 'Incorrect Password',
                          showConfirmButton: false,
                          timer: 1500
                        })
                    }
                    if(response.status === 200) {
                                Swal.fire({
                                  icon: 'success',
                                  title: 'Logged In',
                                  showConfirmButton: false,
                                  timer: 1500
                                })
                                addcredentials(response.data)
                                window.localStorage.setItem("status",'true')
                                 navigate(`/`);
                    }
                    setUser('');
                    setPwd('');
              }catch (err){
                if (!err?.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'SERVER ERROR',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
              }
        }

        const [showpass, setshowpass] = useState(true);

    return (
        <>
      
        <div className='body-main '>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white bg-opacity-50 rounded-md shadow-md shadow-black ring ring-2 ring-[#153462] sm:max-w-xl">
                    <img src={logo} className='w-40 mx-auto'/>
                    <h1 className="text-3xl font-semibold text-center">
                    Forbes College
                    </h1>
                    <form className="mt-6 mx-20" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Username
                            </label>
                            <input
                                name='username'
                                type="text"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e)=> setUser(e.target.value)}
                                value={user.toLowerCase()}
                                required
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#2146C7] focus:ring-[#2146C7] focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type={showpass ? 'password' : 'text'}
                                onChange={(e)=> setPwd(e.target.value)}
                                value={pwd}
                                required
                                className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#2146C7] focus:ring-[#2146C7] focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                            <input type='checkbox' className='w-[30px] align-center' selected={showpass} onClick={()=> setshowpass(!showpass)}/><span className='mx-2'>show password</span>
                        </div>
                    
                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#0008C1] rounded-md hover:bg-[#2146C7] focus:outline-none">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        </>
    )


}

export default  Login