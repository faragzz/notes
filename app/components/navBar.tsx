"use client";
import { useRouter } from "next/navigation";
import React from "react";

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jot_remember");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-[#f7f7f5]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-bold tracking-tight text-gray-900">Jot</p>
        <button
          onClick={handleLogout}
          className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default NavBar;
