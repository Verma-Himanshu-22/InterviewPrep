import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Step1SetUp({ onStart }) {
    const {userData}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);


    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
           const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role, experience, mode , resumeText, projects, skills } , {withCredentials:true}) 
           console.log(result.data)
           if(userData){
            dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
           }
           setLoading(false)
           onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-slate-950 px-3 sm:px-4 py-6 sm:py-10'>

            <div className='w-full max-w-6xl rounded-[24px] sm:rounded-[32px] border border-slate-800 bg-slate-900/95 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] grid md:grid-cols-2 overflow-hidden'>

                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative flex flex-col justify-center gap-6 sm:gap-8 bg-slate-950/80 p-6 sm:p-10 md:p-12'>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mb-2 sm:mb-6">
                        Start Your AI Interview
                    </h2>

                    <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-10">
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className='space-y-3 sm:space-y-5'>
                        {
                            [
                                {
                                    icon: <FaUserTie className="text-emerald-300 text-lg sm:text-xl" />,
                                    text: "Choose role & experience",
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-emerald-300 text-lg sm:text-xl" />,
                                    text: "Smart voice interview",
                                },
                                {
                                    icon: <FaChartLine className="text-emerald-300 text-lg sm:text-xl" />,
                                    text: "Performance analytics",
                                },
                            ].map((item, index) => (
                                <motion.div key={index}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.15 }}
                                    whileHover={{ scale: 1.03 }}
                                    className='flex items-center space-x-3 sm:space-x-4 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/90 p-3 sm:p-4 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.9)] hover:border-slate-700 hover:bg-slate-900/95 transition'>
                                    {item.icon}
                                    <span className='text-slate-200 font-medium text-sm sm:text-base'>{item.text}</span>
                                </motion.div>
                            ))
                        }
                    </div>



                </motion.div>



                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="p-6 sm:p-8 md:p-12 bg-slate-950/95">

                    <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 mb-6 sm:mb-8'>
                        Interview Setup
                    </h2>


                    <div className='space-y-4 sm:space-y-6'>

                        <div className='relative'>
                            <FaUserTie className='pointer-events-none absolute left-3 sm:left-4 top-3 sm:top-4 text-slate-500 text-sm sm:text-base' />
                            <input type='text' placeholder='Enter role'
                                className='w-full rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950/90 py-2.5 sm:py-4 pl-10 sm:pl-14 pr-4 text-xs sm:text-base text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 hover:border-slate-700'
                                onChange={(e) => setRole(e.target.value)} value={role} />
                        </div>

                        <div className='relative'>
                            <FaBriefcase className='pointer-events-none absolute left-3 sm:left-4 top-3 sm:top-4 text-slate-500 text-sm sm:text-base' />
                            <input type='text' placeholder='Experience (e.g. 2 years)'
                                className='w-full rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950/90 py-2.5 sm:py-4 pl-10 sm:pl-14 pr-4 text-xs sm:text-base text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 hover:border-slate-700'
                                onChange={(e) => setExperience(e.target.value)} value={experience} />



                        </div>

                        <select value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950/90 py-2.5 sm:py-4 px-3 sm:px-4 text-xs sm:text-base text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 hover:border-slate-700'>

                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>

                        </select>

                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='rounded-[20px] sm:rounded-[28px] border border-dashed border-slate-700 bg-slate-950/90 p-6 sm:p-8 text-center cursor-pointer transition hover:border-emerald-400 hover:bg-slate-950'>

                                <FaFileUpload className='text-3xl sm:text-4xl mx-auto mb-2 sm:mb-3 text-emerald-400' />

                                <input type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])} />

                                <p className='text-slate-200 font-medium text-xs sm:text-base'>
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}

                                        className='mt-3 sm:mt-4 bg-gray-900 text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-800 transition'>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}



                                    </motion.button>)}

                            </motion.div>


                        )}

                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='rounded-[20px] sm:rounded-[28px] border border-slate-800 bg-slate-950/90 p-4 sm:p-6 space-y-4 sm:space-y-5'>
                                <h3 className='text-base sm:text-lg font-semibold text-slate-100'>Resume Analysis Result</h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className='font-medium text-slate-300 mb-2 text-sm sm:text-base'>Projects:</p>
                                        <ul className='space-y-2 text-slate-400 text-xs sm:text-sm'>
                                            {projects.map((p, i) => (
                                                <li key={i} className='rounded-xl sm:rounded-2xl bg-slate-900/80 px-3 sm:px-4 py-2'>{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className='font-medium text-slate-300 mb-2 text-sm sm:text-base'>Skills:</p>
                                        <div className='flex flex-wrap gap-2'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='rounded-full bg-emerald-500/10 px-2 sm:px-3 py-1 text-xs sm:text-sm text-emerald-300'>{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}


                        <motion.button
                        onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            className='w-full rounded-full bg-emerald-500 px-6 py-3 sm:py-4 text-sm sm:text-lg font-semibold text-slate-950 transition disabled:bg-slate-700 hover:bg-emerald-400'>
                            {loading ? "Starting..." : "Start Interview"}


                        </motion.button>
                    </div>

                </motion.div>
            </div>

        </motion.div>
    )
}

export default Step1SetUp
