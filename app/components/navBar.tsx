import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="flex flex-row justify-between items-center h-20 px-8">
        {/* left side */}
        <div className="flex items-center">
          <p className="text-3xl font-bold text-black">MY Library</p>
        </div>
        {/* mid */}
        {/* <div className="flex gap-8 text-black  text-xl">
          <Link href="/notes" className="bg-gray-200 p-4 rounded-xl">Notes</Link>
          <Link href="/diaries" className="bg-gray-200 p-4 rounded-xl">Diaries</Link>
        </div> */}
        {/* right side */}
        <Link href="/" className="bg-blue-600 p-4 rounded-xl text-white">
          logout
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
