import React, { useEffect, useState } from 'react'
import Logo from '../assests/Website Logo NIGST Small.png'
import '../CSS/app.css'
import ViewCourses from './ViewCourses';
import ViewEnrolledCourse from './ViewEnrolledCourse';
import ViewCanceledCourse from './ViewCanceledCourse';
import { Button } from '@mui/material';
import ErrorBoundary from '../ErrorBoundary';
// import VerificationPage from './VerificationPage';



export default function Student() {
 const [viewCourse , setViewCourse] = useState(true);
 const [ViewEnrollCourse , setViewEnrollCourse] = useState(false);
 const [viewCancelledEnroll,setViewCanceledEnroll] = useState(false);
 const[user,setUser] = useState({})

 useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user)
 },[])

function viewCourseFun(){
    setViewCourse(true);
    setViewEnrollCourse(false);
    setViewCanceledEnroll(false)
}
function viewEnrollCourseFun(){
    setViewCourse(false);
    setViewEnrollCourse(true)
    setViewCanceledEnroll(false)
}
function viewCancelEnrollCourseFun(){
    setViewCanceledEnroll(true)
    setViewCourse(false);
    setViewEnrollCourse(false)
}
function logout(){
    window.location.hash = "/";
    localStorage.clear("user")
  }
  return (
    <ErrorBoundary>

    
    <div className='flex justify-between main-page-header'>
        <div className='side-bar border-r-2 side-bar-wrapper'> 
        <div className=' text-center pt-14 pb-14  border-b-2 mb-8'>
        <h3 className='text-lg   text-white font-bold ' style={{textAlign:"center"}}>Welcome {user.name}</h3>
        </div>
        <div>
            <ul className=' text-white cursor-pointer '>
                {viewCourse ? <li className='p-3 ' style={{background:"#ffcb00"}} onClick={viewCourseFun}>Courses</li> : <li className='p-3 ' onClick={viewCourseFun}>Courses</li>}
                {ViewEnrollCourse ? <li className='p-3 ' style={{background:"#ffcb00"}} onClick={viewEnrollCourseFun}>Enrolled Courses</li> : <li className='p-3 ' onClick={viewEnrollCourseFun}>Enrolled Course</li>}
                {viewCancelledEnroll ? <li className='p-3 ' style={{background:"#ffcb00"}} onClick={viewCancelEnrollCourseFun}>Cancel Enrolled Courses</li> : <li className='p-3 ' onClick={viewCancelEnrollCourseFun}>Cancelled Enrolled Course</li>}
            </ul>
        </div>
        </div>
        <div className='content-wrapper-admin-panel w-full'>
            <header className='h-240  w-full flex justify-evenly items-center'>
                <div>
                    <img src={Logo} alt="logo" className='header-logo-admin-panel'></img>
                </div>
                <Button onClick={logout} variant='contained'>Logout</Button>
            </header>
            <div className='min-h-max flex justify-center border-t-2'>
                { viewCourse ? <ViewCourses/> : ""}
                {ViewEnrollCourse && <ViewEnrolledCourse/>}
                {viewCancelledEnroll && <ViewCanceledCourse/>}
            </div>
        </div>
    </div>
    </ErrorBoundary>
  )
}