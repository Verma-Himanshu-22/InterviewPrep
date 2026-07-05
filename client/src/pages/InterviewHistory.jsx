import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    return (
        <div className='min-h-screen bg-slate-950 text-slate-100 py-10'>
            <div className='mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-0'>
                <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                    <button
                        onClick={() => navigate("/")}
                        className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-100 transition hover:border-emerald-400'>
                        <FaArrowLeft className='text-slate-100' />
                    </button>
                    <div>
                        <h1 className='text-3xl font-semibold'>Interview History</h1>
                        <p className='mt-2 text-slate-400'>Track your past interviews and review performance trends.</p>
                    </div>
                </div>

                {interviews.length === 0 ?
                    <div className='rounded-[32px] border border-slate-800 bg-slate-900/90 p-12 text-center shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)]'>
                        <p className='text-slate-400'>No interviews found yet. Start your first practice session.</p>
                    </div>
                    :
                    <div className='grid gap-6'>
                        {interviews.map((item, index) => (
                            <div key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='rounded-[32px] border border-slate-800 bg-slate-900/90 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] transition hover:-translate-y-1 hover:border-emerald-400 cursor-pointer'>
                                <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-100">{item.role}</h3>
                                        <p className="mt-2 text-slate-400 text-sm">{item.experience} • {item.mode}</p>
                                        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                                        <div className="text-right">
                                            <p className="text-2xl font-semibold text-emerald-400">{item.finalScore || 0}/10</p>
                                            <p className="text-xs text-slate-500">Overall Score</p>
                                        </div>
                                        <span className={`px-4 py-1 rounded-full text-xs font-semibold ${item.status === "completed" ? "bg-emerald-500/15 text-emerald-300" : "bg-yellow-500/15 text-amber-200"}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default InterviewHistory
