"use client";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import ColorPalettes from "./colorPalettes";
import AutohideSnackbar from "./AutohideSnackbar";
import { MdClose } from "react-icons/md";
import { Color } from "@/app/core/types";
import { addUserNote, editNote } from "@/app/util/handle";
import { Note } from "@prisma/client";

type Props = {
  mode: "add" | "edit";
  email?: string;
  noteId?: string;
  initialTitle?: string;
  initialContent?: string;
  initialColor?: string;
  onClose: () => void;
  onSaved: () => void;
};

const NoteEditor = ({
  mode,
  email = "",
  noteId = "",
  initialTitle = "",
  initialContent = "",
  initialColor = "bg-yellow-100",
  onClose,
  onSaved,
}: Props) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [bgColor, setBgColor] = useState(initialColor);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const note: Omit<Note, "id"> = {
    title,
    content,
    color: bgColor,
    date: new Date(),
    userId: "",
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    if (mode === "edit") {
      await editNote({ note, noteId });
    } else {
      await addUserNote({ email, note });
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setSaving(false);
      onSaved();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        className={`relative flex flex-col w-full max-w-2xl rounded-3xl shadow-2xl p-8 ${bgColor} transition-colors duration-200`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-black">
            {mode === "edit" ? "Edit Note" : "New Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
          >
            <MdClose size={22} className="text-black" />
          </button>
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-white/60 border border-black/10 rounded-xl px-4 py-3 text-black font-semibold text-lg placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 mb-4"
        />

        {/* Content */}
        <TextareaAutosize
          minRows={8}
          maxRows={16}
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-white/60 border border-black/10 rounded-xl px-4 py-3 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/20 resize-none overflow-auto mb-6"
        />

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
          <ColorPalettes colors={Color} onClickHandle={setBgColor} />
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-black/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <AutohideSnackbar state={open} message="Note saved successfully" />
      </div>
    </div>
  );
};

export default NoteEditor;
