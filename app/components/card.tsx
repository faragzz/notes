import { MdDeleteOutline } from "react-icons/md";
import React, { useState } from "react";

type Props = {
  color: string;
  title: string;
  content: string;
  date: string;
  id: string;
  onClick: () => void;
  onDelete: () => void;
};

export const Card = ({ color, title, content, date, onClick, onDelete }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`relative ${color} w-full rounded-xl text-black shadow-sm hover:shadow-md transition-shadow duration-200`}
      style={{ minHeight: "15rem" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Delete button — top right corner */}
      {isHovered && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-black/10 hover:bg-red-500 hover:text-white transition-colors"
          title="Delete note"
        >
          <MdDeleteOutline size={18} />
        </button>
      )}

      {/* Card body */}
      <div
        onClick={onClick}
        className="flex flex-col h-full p-4 cursor-pointer"
        style={{ minHeight: "15rem" }}
      >
        {isHovered ? (
          <div className="flex flex-1 justify-center items-center gap-2">
            <p className="font-semibold text-sm">View Note</p>
          </div>
        ) : (
          <div className="flex flex-col h-full" style={{ minHeight: "13rem" }}>
            <p className="font-bold text-sm mb-2 line-clamp-2 break-words">{title}</p>
            <p className="text-sm leading-relaxed flex-1 overflow-hidden line-clamp-6 break-words whitespace-pre-wrap">{content}</p>
            <p className="text-xs text-black/60 text-right mt-3 pt-2 border-t border-black/10">{formattedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};
