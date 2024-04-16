"use client";
import BasicDateCalendar from "@/app/components/Calendar";
import { Card } from "@/app/components/card";
import NavBar from "@/app/components/navBar";
import { Note } from "@/app/core/types";
import { generateRandomNotes } from "@/app/mocks/generateRandomNotes";
import React from "react";
import { BiSolidCalendarEdit, BiSolidNotepad } from "react-icons/bi";
import Link from "next/link";

type Props = {};

const Home = (props: Props) => {
  const notes: Note[] = generateRandomNotes(20);
  return (
    <>
      <NavBar />
      <div className="flex w-full h-screen bg-gray-100 relative">
        {/* left */}
        <div className="flex flex-col h-screen w-72 gap-8 mr-8">
          <div className="ml-8">
            <Link href={"/pages/note/add_note"}>
              <div className="flex items-center mt-10 hover:bg-gray-200 rounded-xl p-4">
                <BiSolidCalendarEdit className="text-black" size={20} />
                <p className="text-black font-semibold text-sm ml-2">Add new</p>
              </div>
            </Link>
            <div className="flex items-center hover:bg-gray-200 rounded-xl mt-8 p-4">
              <BiSolidNotepad className="text-black" size={20} />
              <p className="text-black font-semibold text-sm ml-2">
                {" "}
                Show All Notes
              </p>
            </div>
          </div>
          <div className="text-black text-xs">
            <BasicDateCalendar />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 p-4 w-full h-full rounded-tl-3xl bg-gray-200 overflow-auto">
          {notes.map((note, index) => {
            return (
              <Card
                color={note.color}
                title={note.title}
                content={note.content}
                date={note.date}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Home;
