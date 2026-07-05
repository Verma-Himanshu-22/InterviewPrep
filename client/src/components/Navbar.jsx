import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';
function Navbar() {
    const {userData} = useSelector((state)=>state.user)
    const [showCreditPopup,setShowCreditPopup] = useState(false)
    const [showUserPopup,setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='bg-slate-950/90 flex justify-center px-4 py-5'>
        <motion.div 
        initial={{opacity:0 , y:-30}}
        animate={{opacity:1 , y:0}}
        transition={{duration: 0.35}}
        className='w-full max-w-6xl bg-slate-900/95 rounded-[28px] border border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]'>
            <button onClick={()=>navigate("/")} className='flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full'>
                <div className='bg-emerald-500/10 text-emerald-300 p-2 rounded-2xl border border-emerald-500/20'>
                    <BsRobot size={18}/>
                </div>
                <h1 className='font-semibold hidden sm:block text-slate-100 text-lg'>InterviewPrep</h1>
            </button>

            <div className='flex items-center gap-4 relative'>
                <div className='relative'>
                    <button onClick={()=>{
                        if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowCreditPopup(!showCreditPopup);
                        setShowUserPopup(false)
                    }} className='flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-full text-sm text-slate-200 hover:bg-slate-800 transition'>
                        <BsCoin size={18}/>
                        {userData?.credits || 0}
                    </button>

                    {showCreditPopup && (
                        <div className='absolute right-0 mt-3 w-72 bg-slate-900 border border-slate-800 rounded-3xl p-5 z-50 shadow-2xl'>
                            <p className='text-sm text-slate-400 mb-4'>Need more credits to continue interviews?</p>
                            <button onClick={()=>navigate("/pricing")} className='w-full bg-emerald-500 text-slate-950 py-2 rounded-2xl text-sm font-semibold'>Buy more credits</button>

                        </div>
                    )}
                </div>

                <div className='relative'>
                    <button
                    onClick={()=>{
                         if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowUserPopup(!showUserPopup);
                        setShowCreditPopup(false)
                    }} className='w-10 h-10 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center font-semibold shadow-inner'>
                        {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                    </button>

                    {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-800 rounded-3xl p-4 z-50 shadow-2xl'>
                            <p className='text-md text-emerald-300 font-medium mb-2'>{userData?.name}</p>

                            <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2 text-slate-300 hover:text-white transition'>Interview History</button>
                            <button onClick={handleLogout} 
                            className='w-full text-left text-sm py-2 flex items-center gap-2 text-rose-400 hover:text-rose-200 transition'>
                                <HiOutlineLogout size={16}/>
                                Logout</button>
                        </div>
                    )}
                </div>

            </div>
        </motion.div>

        {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
      
    </div>
  )
}

export default Navbar
