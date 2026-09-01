import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-[#f7f7f5]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-bold tracking-tight text-gray-900">My Notes</p>
        <Link
          href="/"
          className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Logout
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
