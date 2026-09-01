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
          color,
          title,
          content,
          formattedDate,
          id,
        },
      }}
      style={{
        display: "block",
        width: "240px",
        height: "240px",
      }}
    >
      <div
        className={`${color}`}
        style={{
          width: "100%",
          height: "100%",
          padding: "16px",
          borderRadius: "12px",
          color: "black",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <div className="flex justify-center items-center w-full h-full gap-2">
            <MdEdit />
            <p>Edit Note</p>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  paddingBottom: "8px",
                  margin: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </p>

              <p
                style={{
                  margin: 0,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 6,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {content}
              </p>
            </div>

            <div
              style={{
                paddingTop: "8px",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  margin: 0,
                  textAlign: "right",
                }}
              >
                {formattedDate}
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
