import { MdEdit } from "react-icons/md";
import React, { useState } from "react";

type Props = {
  color: string;
  title: string;
  content: string;
  date: string;
  id: string;
  onClick: () => void;
};

export const Card = ({ color, title, content, date, onClick }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${color} w-full rounded-xl text-black p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
      style={{ minHeight: "15rem" }}
    >
      {isHovered ? (
        <div className="absolute inset-0 flex justify-center items-center gap-2 rounded-xl bg-black/10">
          <MdEdit size={20} />
          <p className="font-semibold text-sm">Edit Note</p>
        </div>
      ) : (
        <div className="flex flex-col h-full" style={{ minHeight: "13rem" }}>
          <p className="font-bold text-sm mb-2 line-clamp-2 break-words">{title}</p>
          <p className="text-sm leading-relaxed flex-1 overflow-hidden line-clamp-6 break-words whitespace-pre-wrap">{content}</p>
          <p className="text-xs text-black/60 text-right mt-3 pt-2 border-t border-black/10">{formattedDate}</p>
        </div>
      )}
    </div>
  );
};
