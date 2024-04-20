"use client";
import { handleSubmit } from "@/app/util/handle";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useSearchParams } from "next/navigation";

const Note = ({ params }: { params: { type: string } }) => {
  const [title, setTitle] = useState<string>(" ");
  const [content, setContent] = useState<string>(" ");
  // add note->true edit->false
  const type = params.type === "edit" ? true : false;

  if (type) {
    // fkewjfk
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchParams = useSearchParams();
    console.log(searchParams.get("")); // Logs "search"
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100 p-8 ">
      <div className="flex justify-center items-center rounded-3xl w-4/5 h-full bg-gray-200 p-8 xl:container">
        {/* <Login/> */}
        <div className="flex flex-col justify-center w-full h-full">
          <p className="text-2xl text-black font-bold mb-2">Title</p>
          <input
            type="title"
            placeholder="Enter title ..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full bg-gray-100/95 border-2 py-4 text-black "
            required
          />
          <p className="mt-4 text-2xl text-black font-bold mb-2">Content</p>
          <TextareaAutosize
            maxRows={20}
            minRows={20}
            value={content}
            placeholder="Type here ..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="input input-bordered w-full py-3 resize-none bg-gray-100/95 text-black"
          />
          <button
            className="bg-blue-600 w-full mt-4 p-4 rounded-2xl text-white font-bold text-xl"
            onClick={() => handleSubmit({ title, content, type })}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};
export default Note;
