import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =  
      plan.id === "basic" ? 100 :
      plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order" , {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      },{withCredentials:true})
      
      const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: result.data.amount,
      currency: "INR",
      name: "InterviewPrep",
      description: `${plan.name} - ${plan.credits} Credits`,
      order_id: result.data.id,

      handler:async function (response) {
        const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
        dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")

      },
      theme:{
        color: "#10b981",
      },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null);
    } catch (error) {
      setLoadingPlan(null);
      const errorMsg = error.response?.data?.message || error.message || "Payment failed. Please try again.";
      alert(`Error: ${errorMsg}`);
      console.log(error)
     setLoadingPlan(null);
    }
  }

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-10'>
      <div className='mx-auto max-w-6xl space-y-12'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <button onClick={() => navigate("/")} className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-100 transition hover:border-emerald-400'>
            <FaArrowLeft className='text-slate-100' />
          </button>
          <div className='text-center md:text-left'>
            <h1 className='text-4xl font-semibold text-slate-100'>Choose your InterviewPrep plan</h1>
            <p className='mt-3 max-w-2xl text-slate-400'>Flexible pricing designed for developers and professionals preparing with AI-powered interviews.</p>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            return (
              <motion.div key={plan.id}
                whileHover={!plan.default && { scale: 1.02 }}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`relative rounded-[32px] border p-8 transition duration-300 ${isSelected ? 'border-emerald-500/40 bg-slate-900 shadow-[0_30px_80px_-50px_rgba(16,185,129,0.35)]' : 'border-slate-800 bg-slate-900/90 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.8)]'} ${plan.default ? 'cursor-default' : 'cursor-pointer'}`}>
                {plan.badge && (
                  <div className='absolute right-6 top-6 rounded-full bg-emerald-500 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-950 shadow-sm'>
                    {plan.badge}
                  </div>
                )}
                {plan.default && (
                  <div className='absolute right-6 top-6 rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300'>
                    Default
                  </div>
                )}
                <h3 className='text-2xl font-semibold text-slate-100'>{plan.name}</h3>
                <div className='mt-4 flex items-end gap-2'>
                  <span className='text-4xl font-bold text-emerald-400'>{plan.price}</span>
                  <span className='text-sm text-slate-400'>{plan.credits} Credits</span>
                </div>
                <p className='mt-4 text-slate-400'>{plan.description}</p>
                <div className='mt-6 space-y-3'>
                  {plan.features.map((feature, i) => (
                    <div key={i} className='flex items-center gap-3 text-slate-300'>
                      <FaCheckCircle className='text-emerald-400' />
                      <span className='text-sm'>{feature}</span>
                    </div>
                  ))}
                </div>
                {!plan.default && (
                  <button
                    disabled={loadingPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSelected) {
                        setSelectedPlan(plan.id)
                      } else {
                        handlePayment(plan)
                      }
                    }}
                    className={`mt-8 w-full rounded-3xl py-3 text-sm font-semibold transition ${isSelected ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' : 'bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:bg-slate-700'}`}>
                    {loadingPlan === plan.id ? 'Processing...' : isSelected ? 'Proceed to Pay' : 'Select Plan'}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Pricing
