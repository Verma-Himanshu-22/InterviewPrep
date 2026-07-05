import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100'>
      <Navbar />

      <main className='flex-1 px-3 sm:px-4 lg:px-10 py-6 sm:py-8 lg:py-10'>
        <div className='mx-auto max-w-7xl space-y-12 sm:space-y-16'>

          <section className='relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-slate-800 bg-slate-900/90 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)] p-6 sm:p-8 lg:p-12'>
            <div className='pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-500/15 to-transparent blur-3xl' />
            <div className='relative space-y-6 sm:space-y-10 text-center'>
              <div className='inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 sm:px-4 py-2 text-xs sm:text-sm text-emerald-300'>
                <HiSparkles size={14} className='sm:size-[16px]' />
                <span className='hidden sm:inline'>AI-powered interview preparation for high performers</span>
                <span className='sm:hidden'>AI-powered interview prep</span>
              </div>
              <div className='space-y-4 sm:space-y-6'>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight'>
                  Get interview ready with modern AI coaching
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className='mx-auto max-w-2xl text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed px-2'>
                  Practice role-based interviews, receive instant feedback, and track progress with a premium UI designed for serious preparation.
                </motion.p>
              </div>

              <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-2'>
                <motion.button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true)
                      return;
                    }
                    navigate("/interview")
                  }}
                  whileHover={{ opacity: 0.95, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='rounded-full bg-emerald-500 px-6 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-950 transition shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 w-full sm:w-auto'>
                  Start Interview
                </motion.button>
                <motion.button
                  onClick={() => {
                    if (!userData) {
                      setShowAuth(true)
                      return;
                    }
                    navigate("/history")
                  }}
                  whileHover={{ opacity: 0.95, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='rounded-full border border-slate-700 bg-slate-900/90 px-6 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-300 transition hover:border-emerald-400 hover:text-white hover:bg-slate-800/50 w-full sm:w-auto'>
                  View History
                </motion.button>
              </div>
            </div>
          </section>

          <section className='grid gap-4 sm:gap-6 lg:grid-cols-3'>
            {[
              {
                icon: <BsRobot size={24} className='text-emerald-300' />,
                title: "Tailored AI interview paths",
                desc: "Select your role and experience for focused question sets.",
              },
              {
                icon: <BsMic size={24} className='text-emerald-300' />,
                title: "Voice-enabled conversation",
                desc: "Speak naturally while AI listens, evaluates, and adapts.",
              },
              {
                icon: <BsClock size={24} className='text-emerald-300' />,
                title: "Real-time timing feedback",
                desc: "Stay on pace with a polished interview timer and guidance.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className='rounded-[24px] sm:rounded-[28px] border border-slate-800 bg-slate-900/90 p-5 sm:p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)] hover:border-slate-700 hover:bg-slate-900 transition'>
                <div className='mb-4 sm:mb-6 inline-flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-3xl bg-slate-800 text-emerald-300'>
                  {item.icon}
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-slate-100 mb-2 sm:mb-3'>{item.title}</h3>
                <p className='text-slate-400 text-xs sm:text-sm leading-relaxed'>{item.desc}</p>
              </motion.div>
            ))}
          </section>

          <section className='space-y-6 sm:space-y-8'>
            <div className='text-center px-2'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100'>Modern interview capabilities</h2>
              <p className='mx-auto mt-3 sm:mt-4 max-w-2xl text-slate-400 text-xs sm:text-sm md:text-base'>
                Everything you need for confident interview preparation, from AI evaluation to actionable reports.
              </p>
            </div>
            <div className='grid gap-4 sm:gap-6 lg:grid-cols-2'>
              {[
                {
                  image: evalImg,
                  title: "AI Answer Evaluation",
                  desc: "Scores communication, technical accuracy, and confidence.",
                },
                {
                  image: resumeImg,
                  title: "Resume-Based Interview",
                  desc: "Questions adapt to your experience and project story.",
                },
                {
                  image: pdfImg,
                  title: "Downloadable Report",
                  desc: "Export polished feedback to share and review later.",
                },
                {
                  image: analyticsImg,
                  title: "Performance Analytics",
                  desc: "Track your skill growth with clear metrics and trends.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className='rounded-[24px] sm:rounded-[32px] border border-slate-800 bg-slate-900/90 p-5 sm:p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.9)] hover:border-slate-700 hover:bg-slate-900 transition'>
                  <div className='flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center'>
                    <div className='flex h-24 sm:h-28 w-24 sm:w-28 items-center justify-center rounded-3xl bg-slate-800 flex-shrink-0'>
                      <img src={item.image} alt={item.title} className='h-16 sm:h-20 w-auto object-contain' />
                    </div>
                    <div>
                      <h3 className='text-lg sm:text-xl font-semibold text-slate-100 mb-2 sm:mb-3'>{item.title}</h3>
                      <p className='text-slate-400 text-xs sm:text-sm leading-relaxed'>{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className='space-y-6 sm:space-y-8'>
            <div className='text-center px-2'>
              <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100'>Interview modes designed for every journey</h2>
            </div>
            <div className='grid gap-4 sm:gap-6 lg:grid-cols-2'>
              {[
                {
                  img: hrImg,
                  title: "HR Interview",
                  desc: "Behavioral and communication-focused practice.",
                },
                {
                  img: techImg,
                  title: "Technical Interview",
                  desc: "Deep role-based questioning for technical confidence.",
                },
                {
                  img: confidenceImg,
                  title: "Confidence Insights",
                  desc: "Feedback on tone, pacing, and delivery.",
                },
                {
                  img: creditImg,
                  title: "Credits System",
                  desc: "Flexible access to premium interview sessions.",
                },
              ].map((mode, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className='rounded-[24px] sm:rounded-[32px] border border-slate-800 bg-slate-900/90 p-5 sm:p-8 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.9)] hover:border-slate-700 hover:bg-slate-900 transition'>
                  <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex-1'>
                      <h3 className='text-lg sm:text-xl font-semibold text-slate-100 mb-2 sm:mb-3'>{mode.title}</h3>
                      <p className='text-slate-400 text-xs sm:text-sm leading-relaxed'>{mode.desc}</p>
                    </div>
                    <div className='flex items-center justify-center rounded-3xl bg-slate-800 p-3 sm:p-4 flex-shrink-0'>
                      <img src={mode.img} alt={mode.title} className='h-16 sm:h-20 w-auto object-contain' />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home
