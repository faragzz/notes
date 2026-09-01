"use client";

import { useState } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";

import groovyWalkAnimation from "../public/loginAnimation.json";
import AutohideSnackbar from "./components/AutohideSnackbar";
import AutohideSnackbarError from "./components/AutohideSnackbarError";
import { loginUser } from "./util/handle";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });

      if (data) {
        setOpen(true);

        setTimeout(() => {
          setOpen(false);
          router.push("/pages/home");
        }, 1000);
      } else {
        setOpenError(true);

        setTimeout(() => {
          setOpenError(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error logging in:", error);

      setOpenError(true);

      setTimeout(() => {
        setOpenError(false);
      }, 1000);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-6">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="h-1/2 bg-blue-800" />
        <div className="h-1/2 bg-gray-200" />
      </div>

      {/* Main Card */}
      <div
        className="
          relative z-10
          h-[650px]
          w-full
          max-w-[1100px]
          overflow-hidden
          rounded-3xl
          shadow-2xl
          sm:h-[680px]
          md:h-[650px]
        "
      >
        <div className="flex h-full w-full">
          {/* Login */}
          <div
            className="
              relative
              flex h-full w-full
              items-center justify-center
              bg-gray-50
              px-6
              sm:px-12
              md:w-1/2
              md:px-14
            "
          >
            <div className="w-full max-w-[400px]">
              <p className="mb-10 text-center text-4xl font-bold text-black">
                Login
              </p>

              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-gray-500 font-readex-pro">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full border-2 bg-gray-100"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="mb-2 block text-gray-500 font-readex-pro">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full border-2 bg-gray-100"
                  required
                />
              </div>

              {/* Login */}
              <button
                onClick={handleLogin}
                className="
                  w-full
                  rounded-2xl
                  bg-blue-800
                  p-4
                  font-bold
                  text-white
                  transition
                  hover:bg-blue-900
                  active:scale-[0.98]
                "
              >
                Login
              </button>
            </div>

            {/* Signup */}
            <div
              className="
                absolute
                bottom-5
                left-0
                flex
                w-full
                justify-center
                gap-2
                text-sm
                sm:text-base
              "
            >
              <p className="text-black">Don&apos;t have an account?</p>

              <Link
                href="/pages/signup"
                className="text-blue-700 hover:underline"
              >
                Signup
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div
            className="
              hidden
              h-full
              w-1/2
              flex-col
              items-center
              justify-center
              bg-blue-100
              px-10
              md:flex
            "
          >
            <div className="w-[75%]">
              <Lottie animationData={groovyWalkAnimation} loop />
            </div>

            <p className="mt-6 max-w-[450px] text-center font-semibold text-black">
              Welcome to our notes website! Safeguard your thoughts with ease as
              you unlock your personalized space on our secure platform,
              tailored just for you.
            </p>
          </div>
        </div>
      </div>

      <AutohideSnackbar message="User Logged In Successfully" state={open} />

      <AutohideSnackbarError message="User Not Found" state={openError} />
    </div>
  );
}
