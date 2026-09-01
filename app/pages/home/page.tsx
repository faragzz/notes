"use client";

import { Card } from "@/app/components/card";
import NavBar from "@/app/components/navBar";
import NoteEditor from "@/app/components/NoteEditor";
import { deleteNote, getUserNotes } from "@/app/util/handle";
import { Note } from "@prisma/client";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";
import { BiSolidCalendarEdit, BiSolidNotepad } from "react-icons/bi";

const Home = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);

  const cookies = useCookies();
  const userEmail = cookies.get("email") || "";

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await getUserNotes(userEmail);
      setNotes(res.notes ?? []);
      setError("");
    } catch {
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail) fetchNotes();
  }, [userEmail]);

  const isEmpty = !loading && !error && notes.length === 0;

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <NavBar />

      <div className="mx-auto flex w-full max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 px-4 py-8 lg:block">
          <div className="sticky top-24">
            <button
              onClick={() => setAddOpen(true)}
              className="flex w-full items-center gap-3 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <BiSolidCalendarEdit size={19} />
              <span>New note</span>
            </button>
            <div className="mt-3">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm"
              >
                <BiSolidNotepad size={19} />
                <span>All notes</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
            <div>
              <p className="mb-1 text-sm font-medium text-gray-500">Your workspace</p>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Notes</h1>
            </div>
            <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm sm:block">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </div>
          </div>

          {/* Mobile actions */}
          <div className="mb-6 flex gap-3 lg:hidden">
            <button
              onClick={() => setAddOpen(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
            >
              <BiSolidCalendarEdit size={19} />
              <span>New note</span>
            </button>
          </div>

          {loading && (
            <div className="flex min-h-80 items-center justify-center rounded-2xl bg-white">
              <div className="flex flex-col items-center gap-3">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
                <p className="text-sm text-gray-500">Loading your notes...</p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
              <p className="font-semibold text-red-700">Something went wrong</p>
              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          )}

          {isEmpty && (
            <div className="flex min-h-96 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                <BiSolidNotepad size={28} className="text-gray-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">No notes yet</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Start writing down your ideas and thoughts.
              </p>
              <button
                onClick={() => setAddOpen(true)}
                className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Create your first note
              </button>
            </div>
          )}

          {!loading && !error && notes.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  color={note.color}
                  title={note.title}
                  content={note.content}
                  date={note.date.toString()}
                  id={note.id}
                  onClick={() => setEditNote(note)}
                  onDelete={async () => { await deleteNote(note.id); fetchNotes(); }}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => setAddOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-xl transition hover:scale-105 lg:hidden"
        aria-label="Create new note"
      >
        <BiSolidCalendarEdit size={24} />
      </button>

      {addOpen && (
        <NoteEditor
          mode="add"
          email={userEmail}
          onClose={() => setAddOpen(false)}
          onSaved={() => { setAddOpen(false); fetchNotes(); }}
        />
      )}

      {editNote && (
        <NoteEditor
          mode="edit"
          noteId={editNote.id}
          initialTitle={editNote.title}
          initialContent={editNote.content}
          initialColor={editNote.color}
          onClose={() => setEditNote(null)}
          onSaved={() => { setEditNote(null); fetchNotes(); }}
          onDeleted={() => { setEditNote(null); fetchNotes(); }}
        />
      )}
    </div>
  );
};

export default Home;
