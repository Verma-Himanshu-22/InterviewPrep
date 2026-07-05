import React from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { ServerUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
function Auth({ isModel = false }) {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let name = User.displayName;
      let email = User.email;
      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        { name, email },
        { withCredentials: true },
      );
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    }
  };
  return (
    <div
      className={`
      w-full 
      ${isModel ? "py-3 px-3" : "min-h-screen bg-slate-950 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-20"}
    `}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`
        w-full 
        ${isModel ? "max-w-md p-6 sm:p-8 rounded-2xl sm:rounded-3xl" : "max-w-lg p-8 sm:p-12 rounded-[28px] sm:rounded-[32px]"}
        bg-slate-900/95 shadow-2xl border border-slate-800
      `}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="bg-emerald-500/15 text-emerald-300 p-2 sm:p-3 rounded-2xl border border-emerald-500/20 flex-shrink-0">
            <BsRobot size={16} className='sm:size-[18px]' />
          </div>
          <h2 className="font-semibold text-sm sm:text-lg text-slate-100">InterviewPrep</h2>
        </div>

        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-center leading-snug mb-3 sm:mb-4 text-slate-100">
          Continue with
          <span className="bg-emerald-500/10 text-emerald-300 px-2 sm:px-3 py-1 rounded-full inline-flex items-center gap-2 ml-1 sm:ml-2 text-base sm:text-xl">
            <IoSparkles size={14} className='sm:size-[16px]' />
            <span className='hidden sm:inline'>AI Smart Interview</span>
            <span className='sm:hidden'>AI Smart</span>
          </span>
        </h1>

        <p className="text-slate-400 text-center text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
          Sign in to begin premium AI mock interviews, track progress, and unlock
          actionable performance insights.
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.95, scale: 1.02 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 bg-slate-100 text-slate-950 rounded-full shadow-xl shadow-slate-950/20 text-xs sm:text-base font-medium hover:bg-slate-50 transition"
        >
          <FcGoogle size={18} className='sm:size-[20px]' />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Auth;
