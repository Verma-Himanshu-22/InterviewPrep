import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <div className='bg-slate-950 py-12'>
      <div className='w-full max-w-6xl mx-auto bg-slate-900/80 rounded-[28px] border border-slate-800 py-10 px-6 text-center shadow-[0_30px_80px_-60px_rgba(0,0,0,0.9)]'>
        <div className='flex justify-center items-center gap-3 mb-4'>
            <div className='bg-emerald-500/15 text-emerald-300 p-3 rounded-2xl border border-emerald-500/20'><BsRobot size={16}/></div>
            <h2 className='font-semibold text-slate-100 text-lg'>InterviewPrep</h2>
        </div>
        <p className='text-slate-400 text-sm max-w-xl mx-auto leading-relaxed'>
          AI-powered interview preparation platform designed to elevate your confidence,
          sharpen communication, and polish technical performance for every next opportunity.
        </p>
      </div>
    </div>
  )
}

export default Footer
