"use client";

import { useState } from "react";
import React from "react";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import groovyWalkAnimation from "@/public/loginAnimation.json";
import { signUpUser } from "@/app/util/handle";
import AutohideSnackbar from "@/app/components/AutohideSnackbar";
import AutohideSnackbarError from "@/app/components/AutohideSnackbarError";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSignUp = async () => {
    const data = await signUpUser({ name, email, password });
    if (data) {
      setOpen(true);
      setTimeout(() => { setOpen(false); router.push("/"); }, 1000);
    } else {
      setOpenError(true);
      setTimeout(() => setOpenError(false), 1000);
    }
  };

  return (
    <div onKeyDown={(e) => e.key === "Enter" && handleSignUp()} className="min-h-screen w-full bg-[#f7f7f5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl shadow-xl flex flex-col md:flex-row">

        {/* Illustration side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gray-900 w-1/2 px-10 py-12">
          <div className="w-3/4">
            <Lottie animationData={groovyWalkAnimation} loop />
          </div>
          <p className="mt-6 text-center text-sm leading-relaxed text-gray-400 max-w-xs">
            Capture and organize your thoughts, ideas, and reminders — all in one place.
          </p>
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-center bg-white px-8 py-12 w-full md:w-1/2 sm:px-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
          <p className="text-sm text-gray-500 mb-8">Start organizing your thoughts today</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-11 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSignUp}
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
          >
            Create account
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/" className="font-semibold text-black hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <AutohideSnackbar message="Account created successfully" state={open} />
      <AutohideSnackbarError message="Something went wrong" state={openError} />
    </div>
  );
}
