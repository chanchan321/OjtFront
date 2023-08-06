import {React,useState,useEffect} from 'react'
import { RiDeleteBin4Fill } from "react-icons/ri";
import { IoPersonAddSharp } from "react-icons/io5";
import { GrCaretNext } from "react-icons/gr";
import Axios from 'axios';
import Swal from 'sweetalert2'
import useStore from '../../store/store';
import { Tooltip } from '@material-tailwind/react';
import Addstudents from './Addstudents';

export default function ListStudent() {

        const cUser = useStore(state => state.cUser)
        const dept = cUser.department

        //year today
        const from= new Date(). getFullYear();
        const to= new Date(). getFullYear() + 1;
        const todayYear = `SY:${from}-${to}`;
        
        const [nodata,setNodata] =useState();      




        const [students, setStudents] = useState([]);
        const [displaydata, setDisplaydata] = useState([]);

    

        //function for adding student

        const [lastname,setLastname] = useState('');
        const [firstname,setFirstname] = useState('');
        const [course,setCourse] = useState('BSIT');
       

        const handleAdd = async () => {
            const genID = Math.floor((Math.random() * 1000) + (Math.random() * 1000));
            Swal.fire({
                icon: 'question',
                title: 'Are you sure?',
                showCancelButton: true,
                confirmButtonText: 'Save',
              }).then( async (result) => {
                if (result.isConfirmed) {
                    try{
                        await Axios.post(`http://localhost:3001/api/addstudents`,{
                            genID:genID,
                            lastname:lastname,
                            firstname:firstname,
                            course:course,
                            schoolyear:todayYear,
                            department:dept
                        })
                        setLastname('')
                        setFirstname('')
                        Swal.fire({
                            icon: 'success',
                            title: 'Saved',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          setTimeout(()=>{
                            getstudents(todayYear);
                        },1500)
                    } catch (err){
                        if (err){
                            Swal.fire({
                                    icon: 'error',
                                    title: 'An Error Occured!',
                                    showConfirmButton: false,
                                    timer: 1500
                                    })
                        }else{
                        console.log("error")
                        }
                      }
                }
                 else {
                }
              })
        }
        const syTODAY= ()=>{
            if(new Date().getMonth() < 7){
                return new Date().getFullYear() - 1
            }
            if(new Date().getMonth() >= 7){
                return new Date().getFullYear()
            }
        }
        const [schoolyear,setschoolyear] = useState(syTODAY());
        // const schoolyears = []
        // for (let i = 2020; i < 2040; i++) {
        //     schoolyears.push(`SY ${i} - ${i + 1}`)
        // }
        const filterCourse = (e)=>{
            setCourse(e)
            setDisplaydata(students.filter((value)=> value.course === e))
        }
        const [fsearch,setFsearch] = useState('');
        const filtersearch = (name) =>{
            setFsearch(name)
            if (name){
               const filtern = students.filter((info) => (info.lastname+info.firstname+info.course+info.groupname).toLowerCase().includes(name.toLowerCase()) && (info.schoolyear == year) && (info.course === course))
               if(filtern[0]){
                    setDisplaydata(filtern)
                    setNodata(false)
               }else{
                setNodata('NO RECORD')
               }
            }else{
                const filtern = students.filter((info) => (info.schoolyear == year) && (info.course === course))
                setNodata(false)
               setDisplaydata(filtern)
            }
        }
        const [year,setYear] =useState(todayYear);
        const filteryear =(action) =>{
            setFsearch('')
            if(action === 'add'){
                setYear(`SY:${Number(schoolyear)+ 1}-${Number(schoolyear) + 2}`)
                const filtersy = students.filter((info) => (info.schoolyear == `SY:${Number(schoolyear)+ 1}-${Number(schoolyear) + 2}`) && (info.course == course))
              
                if(!filtersy[0]){
                    setNodata('NO RECORD')
                }
                setDisplaydata(filtersy)
            }
            if(action === 'minus'){
                setYear(`SY:${Number(schoolyear)- 1}-${Number(schoolyear)}`)
               
                const filtersy = students.filter((info) => (info.schoolyear == `SY:${Number(schoolyear)- 1}-${Number(schoolyear)}`) && (info.course == course))
                
                if(!(filtersy[0])){
                    setNodata('NO RECORD')
                }
                setDisplaydata(filtersy)
            }
          
                
        }

        const getstudents = async (year) => {
            try{
                const response= await Axios.get(`http://localhost:3030/students`)
                        setStudents(response.data)
                        setDisplaydata(response.data.filter((value)=> value.course === course))
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
          useEffect(() => {
            getstudents()
            },[]);

            const DeleteStud = (id) =>{
                Swal.fire({
                    title: 'Are you sure?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'DELETE'
                  }).then( async (result) => {
                    if (result.isConfirmed) {
                      try{
                        const response= await Axios.delete(`http://localhost:3030/students/${id}`)
                        Swal.fire({
                          icon: 'success',
                          title: 'Student deleted!',
                          showConfirmButton: false,
                          timer: 1500
                        })
                        getstudents()
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
                // for add
        const [showModal, setShowModal] = useState(false);

  return (
    <>

<div className='w-[90%] h-[100vh] mx-auto'>
            <div className='flex flex-col sm:flex-row w-full justify-between px-2 py-2'>
                        <div className='flex flex-row'>
                            <p className='text-[25px] textS font-bold'>BATCH</p>
                            <div className='flex flex-row items-center border-b-2 border-black'>
                                <div onClick={()=> {
                                    filteryear('minus')
                                    setschoolyear(Number(schoolyear) - 1)
                                    } } className='mr-5 cursor-pointer text-[30px] font-bold flex items-center rotate-180'><GrCaretNext size={20}/></div>
                                <div className='text-[20px] text-center bg-transparent mx-1'>SY </div>
                                <input type="number" className='text-[20px] w-[55px] text-center cursor-pointer bg-transparent' value={schoolyear} onChange={(e)=> setschoolyear(e.target.value)} id="quantity" name="quantity" min="2020" max="3000"/>
                                {/* <div className='text-[20px] text-center bg-transparent'>{Number(schoolyear)}</div> */}
                                <div className='text-[20px] '>-</div>
                                <div className='text-[20px] mx-3 text-center bg-transparent'>{Number(schoolyear) + 1}</div>
                                <div onClick={()=> {
                                    filteryear('add')
                                    setschoolyear(Number(schoolyear) + 1)
                                    } } className='ml-5 cursor-pointer text-[15px] font-bold flex items-center '><GrCaretNext size={20}/></div>
                            </div>
                     </div>
                <div className='flex flex-row'>
                    {`SY:${Number(syTODAY())}-${Number(syTODAY()) + 1}` === year &&
                    <Tooltip content="add student" placement="bottom" className='z-30 px-2 bg-blue-600' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 }}}>
                        <p onClick={()=> setShowModal(true)} className='px-2 w-fit p-1 rounded-md flex items-center bg-white mx-1 cursor-pointer'><IoPersonAddSharp size={25}/></p>
                    </Tooltip>}
                    <div className='w-full flex flex-row'>
                        <div className='px-2 bg-white rounded-md '>TOTAL:<span className=' px-2 text-[30px]'>{displaydata.length}</span></div>
                        <select name="status" onChange={(e)=> filterCourse(e.target.value)} className='h-full mx-2 rounded-md text-center'>
                            <option value="BSIT">BSIT</option>
                            <option value="BSIT_Anim">BSIT_Anim</option>
                        </select>
                    </div>
                    <input type='text' placeholder='Enter lastname' value={fsearch} onChange={(e)=> filtersearch(e.target.value)} className='w-full shadow-inner shadow-gray-500/50 border-[1px] p-[2px] border-gray-200 rounded-md px-2'></input>
                </div>
            </div>
            <div className='w-full h-[80vh]  bg-neutral-100 rounded-md overflow-auto'>
                    <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] '>
                        <thead className='border-b font-medium dark:border-neutral-500 sticky top-0'>
                            <tr className='font-bold '>
                                <th scope="col" className="px-6 py-[12px]">Lastname</th>
                                <th scope="col" className="px-6 py-[12px]">Firstname</th>
                                <th scope="col" className="px-6 py-[12px]">Middlename</th>
                                <th scope="col" className="px-6 py-[12px]">Course</th>
                                <th scope="col" className="px-6 py-[12px]">Group</th>
                                <th scope="col" className="px-6 py-[12px]"></th>
                            </tr>
                        </thead>
                        {!displaydata[0]? 
                        <tbody>
                            <tr>
                                <td className='text-[30px] py-2'>NO RECORD</td>
                            </tr>
                        </tbody>
                        :<>
                        {displaydata && displaydata.map((value,index)=>{
                            return  <tbody key={index}>
                            <tr className="border-b dark:border-neutral-500 text-[18px] ">
                                <td className="whitespace-nowrap px-6 py-[12px]">{value.lastname}</td>
                                <td className="whitespace-nowrap px-6 py-[12px]">{value.lastname}</td>
                                <td className="whitespace-nowrap px-6 py-[12px]">{value.firstname}</td>
                                <td className="whitespace-nowrap px-6 py-[12px]">{value.course}</td>
                                <td className="whitespace-nowrap px-6 py-[12px]">{value.groupname? value.groupname:'NONE'}</td>
                                <td className="whitespace-nowrap  flex flex-row justify-around items-center ">
                                    {`SY:${Number(syTODAY())}-${Number(syTODAY()) + 1}` === year &&
                                    <Tooltip content="Delete" placement="bottom" className='z-30 px-2 bg-red-600' animate={{mount: { scale: 1.5, y: 10,  x:1 },unmount: { scale: 0, y: 0, x:0 } }}>
                                        <p className= 'px-2 w-fit p-1 rounded-md flex items-center  mx-1 cursor-pointer'><RiDeleteBin4Fill onClick={()=> DeleteStud(value.id)} className='text-[red]' size={25}/></p>
                                    </Tooltip>}
                                </td>
                            </tr>
                        </tbody>
                        })}</>}
                       
                    </table>
            </div>
        </div>
        {showModal && <Addstudents refresh={getstudents} sy={`SY:${Number(schoolyear)}-${Number(schoolyear) + 1}`} close={setShowModal} /> } 
        
    </>
    
  )
}

// <>
// <div className='w-[300px] mx-auto '>
//   <p className='w-[100px] mx-auto text-2xl'>BATCH</p>
//       {/* <select className='w-fit ml-12 text-2xl bg-transparent cursor-pointer  ' onChange={(e) => filteryear(e.target.value)}>
//         <option className='bg-transparent'>{todayYear}</option>
//         <option className='bg-transparent'>SY:2022-2023</option>   
//         <option className='bg-transparent'>SY:2023-2024</option>
//         <option className='bg-transparent'>SY:2024-2025</option>
//         <option className='bg-transparent'>SY:2025-2026</option>
//         <option className='bg-transparent'>SY:2026-2027</option>
//         <option className='bg-transparent'>SY:2027-2028</option>
//       </select> */}

//         <span onClick={()=> setschoolyear(Number(schoolyear) - 1) } className='mx-2 cursor-pointer'>{'<'}</span>
//         <span className='text-[20px] text-center bg-transparent mx-1'>SY</span>
//         {/* <input type="number" className='text-[20px] w-[55px] text-center bg-transparent' value={schoolyear} onChange={(e)=> setschoolyear(e.target.value)} id="quantity" name="quantity" min="2020" max="3000"/> */}
//         <span className='text-[20px] text-center bg-transparent'>{Number(schoolyear)}</span>
//         <span className='text-[20px] mx-1'>-</span>
//         <span className='text-[20px] text-center bg-transparent'>{Number(schoolyear) + 1}</span>
//         <span onClick={()=> setschoolyear(Number(schoolyear) + 1) } className='mx-2 cursor-pointer'>{'>'}</span>
    

 
// </div>
// <div className='w-8/12 mx-auto h-fit flex justify-around m-8'>
//     <div className='relative'>
//             <div size={'1.8em'} className='absolute top-1 left-2'/>
//             <input type='text' placeholder='Search' className='px-10 py-2 rounded-lg'  
//             onChange={(e) => filtersearch(e.target.value)} value={fsearch}></input>
//     </div>
//     <div className='cursor-pointer hover:text-[green]'>
//         <div size={'2.8em'} onClick={() => setShowModal(true)}>awd </div>
//     </div>
// </div>
// <section className='xl:w-3/4 w-full mx-auto max-h-[60vh] min-h-[40vh] min-w-[400px] overflow-auto my-10 '>
// <table className='w-full'>
//     <thead className=''>
//         <tr className='text-[20px] sticky top-0 border-black border-2 text-bold text-white bg-black'>
//           <th className='p-4'>Last Name</th>
//           <th className='p-4'>First Name</th>
//           <th className='p-4'>Course</th>
//           <th className='p-4'>Group</th>
//           <th className='p-4'></th>
//         </tr>
//     </thead>
//     {nodata ?
//     <tbody>
//         <tr>
//              <td><p className='w-full mx-autp text-[30px]'>{nodata}</p></td>
//         </tr>
//     </tbody>
//     : 
//     displaydata.map((stud) =>{
//         return <DisplayStud key={stud.id} student={stud} refresh={getstudents} year={year}/>
//      })
//     }
    
// </table>
// </section>

// {showModal ? (
//     <>
   
//    <Addstudents close={setShowModal} />
//     </>) : null}


// </>
// )
// }
// function DisplayStud({student,refresh,year}){


// //year today
// const from= new Date(). getFullYear();
// const to= new Date(). getFullYear() + 1;
// const todayYear = `SY:${from}-${to}`;

// // for delete
// const handledel = async () => {
// Swal.fire({
// title: 'Are you sure?',
// text: "You won't be able to revert this!",
// icon: 'warning',
// showCancelButton: true,
// confirmButtonColor: '#3085d6',
// cancelButtonColor: '#d33',
// confirmButtonText: 'Yes, delete it!'
// }).then( async (result) => {
// if (result.isConfirmed) {
//     try{
//         await Axios.delete(`http://localhost:3001/api/deletestudents/${student.id}`)
//         .then((response)=>{
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Deleted',
//                 showConfirmButton: false,
//                 timer: 1500
//               })
//               setTimeout(()=>{
//                 refresh(todayYear)
//             },1500)
//            }).catch((err)=>{
//                alert(err)
//            }) 
          
        
//     } catch (err){
//         if (err){
//             Swal.fire({
//                     icon: 'error',
//                     title: 'An Error Occured!',
//                     showConfirmButton: false,
//                     timer: 1500
//                     })
//         }else{
//           console.log("error")
//         }
//       }
// }
// })
// }

// return(
// <>

// <tbody>
// <tr className='bold-text text-[20px]'>
// <td className='py-[15px] px-4 border-black border-b-2 border-l-2'>{student.lastname}</td>
// <td className='py-[15px] px-4 border-black border-b-2'>{student.firstname}</td>
// <td className='py-[15px] px-4 border-black border-b-2'>{student.course}</td>
// <td className='py-[15px] px-4 border-black border-b-2'>{student.groupname}</td>
// <td className='py-[15px] px-4 border-black border-b-2 border-r-2 '>
// {todayYear === year ? <RiDeleteBin4Fill size={30} className='hover:text-[red]' onClick={()=> handledel()}/>:''}
// </td>
// </tr>
// </tbody>

// </>
// )
// }