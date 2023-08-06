import {React,useState} from 'react'
import {Outlet,useNavigate,useParams,NavLink} from 'react-router-dom';
import { ImMenu } from "react-icons/im";
import {MdOutlineClose} from "react-icons/md"
import logo from'./components/images/forbeslogo.png';
import Swal from 'sweetalert2'
import useStore from './store/store';

export default function Navigation() {
   
    const cUser = useStore(state => state.cUser)
    
    const navigate= useNavigate()

    const [nav,setNav] =useState(true);

    const handelnav=()=>{
      setNav(!nav)
    }
    const navLinkStyles = ({isActive}) =>{
      return {
        fontWeight: !isActive? 'bold' : 'normal',
        textDecoration: !isActive? 'none' : 'underline',
        fontSize:!isActive? '15px' : '25px',
      }
    }
    
  return (
    <>
      <div className='bg-[#F6F6C9] sticky z-40 top-0 '>
            <div className='flex sticky top-0 justify-between items-center h-12 max-w-[1240px] mx-auto text-[#153462] bg-[#F6F6C9] z-50 overflow-auto'>
              <h1 className='w-full text-3xl font-bold text-[#153462] cursor-pointer flex items-center mx-2' onClick={()=> navigate('/')}>FORBES COLLEGE</h1>
                <nav className='hidden md:flex'>
                  <NavLink style={navLinkStyles} to='/listStudent' className='px-4 text-xl font-bold cursor-pointer hover:text-[green]'>Students</NavLink>
                  <NavLink style={navLinkStyles} to='/faculty' className='px-4 text-xl font-bold cursor-pointer hover:text-[green]' >Faculty</NavLink>
                  <NavLink style={navLinkStyles} to='/groups' className='px-4 text-xl font-bold cursor-pointer hover:text-[green]' >Groups</NavLink>
                  {cUser.accID?
                    <div className='px-4 text-xl font-bold text-[15px] cursor-pointer hover:text-[green]'>Account</div>
                    :
                    <div className='px-4 text-xl font-bold text-[15px] cursor-pointer hover:text-[green]'>LogIn</div>
                  }
                </nav>
                <div onClick={handelnav}  className='mr-10 block md:hidden hover:text-[green] cursor-pointer'>
                  {nav ? <ImMenu size={30}/>: <MdOutlineClose size={30}/>}
                  
                </div>
                {/* <div className={!nav ? 'md:hidden fixed left-0 top-[45px] ease-in-out duration-300':'fixed left-[-500%]'}>
                    <nav className='flex'>
                      <NavLink className='p-4 text-xl cursor-pointer hover:text-[green]' >Students</NavLink>
                      <NavLink className='p-4 text-xl cursor-pointer hover:text-[green]' >Faculty</NavLink>
                      <NavLink className='p-4 text-xl cursor-pointer hover:text-[green]' >Groups</NavLink>
                      <NavLink className='p-4 text-xl cursor-pointer hover:text-[green]'>Account</NavLink>
                    </nav>
                </div> */}
            </div>
        </div> 
                 <div className=' min-h-[600px] pt-[10px]  overflow-auto '>
                    <Outlet />
                </div>
  
    </>
  )
}
