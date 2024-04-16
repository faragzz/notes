"use client";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

const Note = ({ params }: { params: { type: string } }) => {
  // add note->true edit->false
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
            // value={}
            // onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full bg-gray-100/95 border-2 py-4 text-black "
            required
          />
          <p className="mt-4 text-2xl text-black font-bold mb-2">Content</p>
          <TextareaAutosize
            maxRows={20}
            minRows={20}
            // value={newMessage}
            // onKeyDown={handleKeyDown}
            onChange={(e) => {
              // setNewMessage(e.target.value);
            }}
            placeholder="Type here ..."
            className="input input-bordered w-full py-3 resize-none bg-gray-100/95 text-black"
          />
          <button className="bg-blue-600 w-full mt-4 p-4 rounded-2xl text-white font-bold text-xl">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};
export default Note;
