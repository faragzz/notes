"use client";
import BasicDateCalendar from "@/app/components/Calendar";
import { Card } from "@/app/components/card";
import NavBar from "@/app/components/navBar";
import { generateRandomNotes } from "@/app/mocks/generateRandomNotes";
import React, { useEffect, useState } from "react";
import { BiSolidCalendarEdit, BiSolidNotepad } from "react-icons/bi";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { getUserNotes } from "@/app/util/handle";
import { Note } from "@prisma/client";

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]); // Initialize notes as undefined
  const cookies = useCookies();
  const userEmail: string = cookies.get("email") || "";
  console.log("email :" + userEmail);
  
  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const fetchedNotes = await getUserNotes(userEmail);
        setNotes(fetchedNotes); // Set the fetched notes
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]); // Set notes to an empty array or handle the error appropriately
      }
    };

    fetchUserNotes(); // Call the function to fetch user notes
  }, []); // Run this effect whenever userEmail changes

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
                <p className="text-black font-semibold text-sm ml-2">Add new Book</p>
              </div>
            </Link>
            <div className="flex items-center hover:bg-gray-200 rounded-xl mt-8 p-4">
              <BiSolidNotepad className="text-black" size={20} />
              <p className="text-black font-semibold text-sm ml-2">
                Show All Books
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
                date={note.date.toString()}
                id={note.id}
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
