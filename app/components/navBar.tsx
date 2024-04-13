import Image from "next/image";
import React from "react";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className="bg-amber-100 w-full">
      <div className="flex justify-between items-center h-20 px-2">
        {/* left side */}
        <div>
          <p>profile pic</p>
        </div>
        {/* right side */}
        <div>logout</div>
      </div>
    </div>
  );
};
export default NavBar;
