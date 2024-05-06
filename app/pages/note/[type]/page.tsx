"use client";
import { handleSubmit } from "@/app/util/handle";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { NoteType } from "@/app/core/types";
import AutohideSnackbar from "@/app/components/AutohideSnackbar";
import { useRouter } from "next/navigation";
const Note = ({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: NoteType;
}) => {
  const [title, setTitle] = useState<string>((searchParams)? searchParams.title:"");
  const [content, setContent] = useState<string>((searchParams)? searchParams.content:"");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  // add note->false | edit->true
  const type = params.type === "edit" ? true : false;

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
          <div>
            <AutohideSnackbar state={open}  message="Book Saved successfully"/>;
          </div>
          <button
            className="bg-blue-600 w-full mt-4 p-4 rounded-2xl text-white font-bold text-xl"
            onClick={() => {
              setOpen(true);
              handleSubmit({ title, content, type });
              setTimeout(() => {
                setOpen(false);
                router.push("/pages/home");
              }, 1000);
            }}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};
export default Note;
