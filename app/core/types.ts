import { User } from "@prisma/client";

export type Note = {
  title: string;
  content: string;
  color: string;
  date: Date;
};
export const Color = [
  "bg-yellow-100",
  "bg-red-100",
  "bg-yellow-200",
  "bg-blue-100",
  "bg-purple-100",
];

export type NoteType = {
  title: string;
  content: string;
  color: string;
  date: string;
  id: string;
};

interface DatabaseEntity {
  id: string;
}

export type UserInfo = Omit<User, keyof DatabaseEntity> & {
  notes: {
    create: Note[]; // Assuming this matches Prisma's expected structure
  };
};

// export type INote = Omit<Note,keyof DatabaseEntity>

export type UserSignUpInfo = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginInfo = {
  email: string;
  password: string;
};

export type addNoteInfo = {
  email: string;
  note: Note;
};

export type getNoteInfo = {
  email: string;
};

export const noteDefualt: Note = {
  title: "error fetching",
  content: "Welcome to the Library we Welcome you",
  color: "",
  date: new Date(),
};

export type editNoteType = {
  note: Note;
  noteId: string;
};
