import Link from "next/link";
import { MdEdit } from "react-icons/md";
import React, { useState } from "react";

type Props = {
  color: string;
  title: string;
  content: string;
  date: Date;
};

export const Card = ({ color, title, content, date }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={"/pages/note"}>
      <div
        className={`relative ${color} w-60 h-60 rounded-xl text-black p-4`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <div className="flex justify-center items-center w-full h-full gap-2">
            <MdEdit />
            <p className="">Edit note</p>
          </div>
        ) : (
          <div>
            <p className="font-bold pb-2">{title}</p>
            <p>{content}</p>
            <p className="absolute bottom-1 right-1 text-black">
              {formattedDate}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};
