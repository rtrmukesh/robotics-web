"use client";
import bookAnimation from "@/animations/SignInModelBooks.json";
import Lottie from "lottie-react";
import { supabase } from "../lib/supabaseClient";

type SignInModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SignInModal({ open, onClose }: SignInModalProps) {
  if (!open) return null;

  const handleGoogleSignIn = async () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
         redirectTo: `${siteUrl}/api/auth/callback`,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    } else {
      console.log("Redirecting to Google login...", data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-51 px-3">
      <div
        className="
              w-[95%] 
              md:w-[900px] 
              h-auto 
              md:h-[550px] 
              bg-white/10 
              backdrop-blur-xl 
              rounded-3xl 
              shadow-2xl 
              border 
              border-white/20 
              flex 
              flex-col 
              md:flex-row 
              overflow-y-auto   
              max-h-[90vh]     
              animate-fadeIn
            "
      >
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center py-6 md:py-0">
          <div className="w-[200px] md:w-[320px]">
            <Lottie animationData={bookAnimation} loop />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-white flex flex-col justify-center relative">
          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 md:hidden"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6">Sign in to continue</p>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
          >
            Continue with Google
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="text-right mb-4">
            <a href="#" className="text-indigo-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* SIGN IN */}
          <button className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
            Sign In
          </button>

          <button
            onClick={onClose}
            className="mt-4 text-gray-400 hover:text-gray-600 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
