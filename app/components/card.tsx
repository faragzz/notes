import Link from "next/link";
import { MdEdit } from "react-icons/md";
import React, { useState } from "react";

type Props = {
  color: string;
  title: string;
  content: string;
  date: string;
  id: string;
};

export const Card = ({ color, title, content, date, id }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={{
        pathname: "/pages/note/edit",
        query: {
          color: color,
          title: title,
          content: content,
          formattedDate: formattedDate,
          id: id,
        },
      }}
    >
      <div
        className={`relative ${color} w-60 h-60 rounded-xl text-black p-4`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <div className="flex justify-center items-center w-full h-full gap-2">
            <MdEdit />
            <p className="">Edit Book</p>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full">
            <div className="flex-grow-1">
              <p className="font-bold pb-2">{title}</p>
              <p>{content}</p>
            </div>
            <div className="mt-auto">
              <p className="text-black self-end text-right">{formattedDate}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
