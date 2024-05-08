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
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const cookies = useCookies();
  const userEmail: string = cookies.get("email") || "";

  useEffect(() => {
    const fetchUserNotes = async () => {
      setLoading(true);
      try {
        const fetchedNotes = (await getUserNotes(userEmail) as Note[]);
        console.log('email sent = ',userEmail);
        setNotes(fetchedNotes);
        setError("");
        console.log(fetchedNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setError("Failed to fetch notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserNotes();
  }, []);


  return (
    <>
      <NavBar />
      <div className="flex w-full h-screen bg-gray-100 relative">
        <div className="flex flex-col h-screen w-72 gap-8 mr-8">
          <div className="ml-8">
            <Link href={"/pages/note/add_note"}>
              <div className="flex items-center mt-10 hover:bg-gray-200 rounded-xl p-4">
                <BiSolidCalendarEdit className="text-black" size={20} />
                <p className="text-black font-semibold text-sm ml-2">
                  Add new Book
                </p>
              </div>
            </Link>
            <div className="flex items-center hover:bg-gray-200 rounded-xl mt-8 p-4">
              <BiSolidNotepad className="text-black" size={20} />
              <p className="text-black font-semibold text-sm ml-2">
                Show All Books
              </p>
            </div>
          </div>
          {/* <div className="text-black text-xs">
            <BasicDateCalendar />
          </div> */}
        </div>
        <div className="flex flex-wrap gap-4 p-4 w-full h-full rounded-tl-3xl bg-gray-200 overflow-auto">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            notes.map((note, index) => (
              <Card
                color={note.color}
                title={note.title}
                content={note.content}
                date={note.date.toString()}
                id={note.id}
                key={index}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
