import {
  addNoteInfo,
  editNoteType,
  UserInfo,
  UserLoginInfo,
  UserSignUpInfo,
} from "@/app/core/types";
import prisma from "./prisma";
import { userAgent } from "next/server";
import { Note } from "@prisma/client";

// SignIn and Login
export const createUser = async (userSignUpInfo: UserSignUpInfo) => {
  const user: UserInfo = {
    email: userSignUpInfo.email,
    name: userSignUpInfo.name,
    password: userSignUpInfo.password,
    notes: {
      create: [], // Empty array of NoteCreateInput objects
    },
  };
  const data = await prisma.user.create({
    include: { notes: true },
    data: user,
  });
  return data;
};

export const checkUser = async (userLoginInfo: UserLoginInfo) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userLoginInfo.email,
      },
    });
    console.log("user = ", user);
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
  }
};

// Notes

export const getAllNotesFromAUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      include: { notes: true },
      where: {
        email: email,
      },
    });

    console.log(user);
    console.log("user Notes = ", user?.notes);
    return user?.notes;
  } catch (error) {
    console.error("Error retrieving user Notes :", error);
  }
};
export const addNote = async (userInfo: addNoteInfo) => {
  try {
    // Find the user including their notes
    const user = await prisma.user.findUnique({
      include: {
        notes: true,
      },
      where: {
        email: userInfo.email,
      },
    });

    if (user) {
      // Create the new note
      const newNote = await prisma.note.create({
        data: {
          title: userInfo.note.title,
          content: userInfo.note.content,
          color: userInfo.note.color,
          date: new Date(),
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      console.log("New note created:", newNote);
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Error adding user note:", error);
  }
};

export const editUserNote = async (data: editNoteType) => {
  try {
    const user = await prisma.note.update({
      where: {
        id: data.noteId,
      },
      data: data.note,
    });

    console.log("note edited");
  } catch (error) {
    console.error("Error retrieving user Notes :", error);
  }
};
