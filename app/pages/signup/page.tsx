"use client";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../public/loginAnimation.json";

export default function Home() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  return (
    <div className="flex justify-center items-center w-full h-screen relative">
      <div className="-z-10 w-full h-full absolute">
        <div className="h-1/2 bg-blue-800"></div>
        <div className="h-1/2 bg-gray-200"></div>
      </div>
      <div className="z-10 w-2/3 h-4/5 rounded-3xl relative">
        <div className="absolute flex flex-row w-full h-full rounded-6xl drop-shadow-2xl  overflow-hidden">
          <div className="flex justify-center items-center w-1/2 h-full bg-gray-50">
            {/* <Login/> */}
            <div>
              <p className="text-4xl text-black font-bold text-center">
                SignUp
              </p>
              <label className="text-gray-500 font-readex-pro">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full bg-gray-100 border-2 py-4"
                required
              />
              <div>
                <label className="text-gray-500 font-readex-pro">
                  Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full bg-gray-100 border-2"
                  required
                />
              </div>
              <Link href={"/"} className=" text-white font-bold">
                <button className="bg-blue-800 w-full mt-4 p-4 rounded-2xl">
                  Login
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-1/2 h-full bg-blue-100">
            <Lottie animationData={groovyWalkAnimation} loop={true} />
            <p className="px-4 mt-10 text-black font-semibold text-center">
              Capture and organize your thoughts, ideas, and personal musings
              effortlessly with our intuitive notes website tailored for your
              unique expressions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
