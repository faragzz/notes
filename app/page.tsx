"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import groovyWalkAnimation from "../public/loginAnimation.json";
import AutohideSnackbar from "./components/AutohideSnackbar";
import AutohideSnackbarError from "./components/AutohideSnackbarError";
import { loginUser } from "./util/handle";

const STORAGE_KEY = "jot_remember";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [autoLogging, setAutoLogging] = useState(true);
  const router = useRouter();

  // On mount: if saved credentials exist, auto-login silently
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) { setAutoLogging(false); return; }

    const { email: savedEmail, password: savedPassword } = JSON.parse(saved);
    loginUser({ email: savedEmail, password: savedPassword })
      .then((data) => {
        if (data) router.replace("/pages/home");
        else { localStorage.removeItem(STORAGE_KEY); setAutoLogging(false); }
      })
      .catch(() => { localStorage.removeItem(STORAGE_KEY); setAutoLogging(false); });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      if (data) {
        if (rememberMe) localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, password }));
        else localStorage.removeItem(STORAGE_KEY);
        setOpen(true);
        setTimeout(() => { setOpen(false); router.push("/pages/home"); }, 1000);
      } else {
        setOpenError(true);
        setTimeout(() => setOpenError(false), 1000);
      }
    } catch {
      setOpenError(true);
      setTimeout(() => setOpenError(false), 1000);
    }
  };

  if (autoLogging) {
    return (
      <div className="min-h-screen w-full bg-[#f7f7f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
          <p className="text-sm text-gray-500">Signing you in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f7f7f5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl shadow-xl flex flex-col md:flex-row">

        {/* Form side */}
        <div className="flex flex-col justify-center bg-white px-8 py-12 w-full md:w-1/2 sm:px-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-8">Sign in to your Jot account</p>

          <form onSubmit={handleLogin} className="flex flex-col">
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

            <div className="mb-4">
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

            <label className="flex items-center gap-2 mb-6 cursor-pointer select-none w-fit">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-black cursor-pointer"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/pages/signup" className="font-semibold text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Illustration side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gray-900 w-1/2 px-10 py-12">
          <div className="w-3/4">
            <Lottie animationData={groovyWalkAnimation} loop />
          </div>
          <p className="mt-6 text-center text-sm leading-relaxed text-gray-400 max-w-xs">
            Capture and organize your thoughts, ideas, and reminders — all in one place.
          </p>
        </div>
      </div>

      <AutohideSnackbar message="Logged in successfully" state={open} />
      <AutohideSnackbarError message="Invalid email or password" state={openError} />
    </div>
  );
}
