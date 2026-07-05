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
    <div className='bg-slate-950/90 flex justify-center px-3 sm:px-4 py-4 sm:py-5'>
        <motion.div 
        initial={{opacity:0 , y:-30}}
        animate={{opacity:1 , y:0}}
        transition={{duration: 0.35}}
        className='w-full max-w-6xl bg-slate-900/95 rounded-[20px] sm:rounded-[28px] border border-slate-800 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap justify-between items-center gap-3 sm:gap-0 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]'>
            <button onClick={()=>{
                if(!userData){
                    setShowAuth(true)
                    return;
                }
                navigate("/interview")
            }} className='flex items-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full hover:opacity-80 transition-opacity duration-200'>
                <div className='bg-emerald-500/10 text-emerald-300 p-2 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/50 transition-colors'>
                    <BsRobot size={18}/>
                </div>
                <h1 className='font-semibold hidden sm:block text-slate-100 text-lg'>InterviewPrep</h1>
            </button>

            <div className='flex items-center gap-2 sm:gap-4 relative flex-shrink-0'>
                <div className='relative'>
                    <button onClick={()=>{
                        if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowCreditPopup(!showCreditPopup);
                        setShowUserPopup(false)
                    }} className='flex items-center gap-1 sm:gap-2 bg-slate-900/90 border border-slate-800 px-2 sm:px-4 py-2 rounded-full text-xs sm:text-sm text-slate-200 hover:bg-slate-800 transition whitespace-nowrap'>
                        <BsCoin size={16}/>
                        <span className='hidden sm:inline'>{userData?.credits || 0}</span>
                        <span className='sm:hidden font-semibold'>{userData?.credits || 0}</span>
                    </button>

                    {showCreditPopup && (
                        <div className='absolute right-0 mt-2 sm:mt-3 w-64 sm:w-72 bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 z-50 shadow-2xl'>
                            <p className='text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4'>Need more credits to continue interviews?</p>
                            <button onClick={()=>navigate("/pricing")} className='w-full bg-emerald-500 text-slate-950 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold hover:bg-emerald-400 transition'>Buy more credits</button>

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
                    }} className='w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center font-semibold shadow-inner hover:bg-emerald-400 transition flex-shrink-0'>
                        {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={14}/>}
                    </button>

                    {showUserPopup && (
                        <div className='absolute right-0 mt-2 sm:mt-3 w-44 sm:w-48 bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-4 z-50 shadow-2xl'>
                            <p className='text-sm sm:text-md text-emerald-300 font-medium mb-2 truncate'>{userData?.name}</p>

                            <button onClick={()=>navigate("/history")} className='w-full text-left text-xs sm:text-sm py-2 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded px-2 transition'>Interview History</button>
                            <button onClick={handleLogout} 
                            className='w-full text-left text-xs sm:text-sm py-2 flex items-center gap-2 text-rose-400 hover:text-rose-200 hover:bg-slate-800/50 rounded px-2 transition'>
                                <HiOutlineLogout size={14}/>
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
