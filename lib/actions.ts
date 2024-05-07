import {
  UserInfo,
  UserLoginInfo,
  UserSignUpInfo,
  Note,
} from "@/app/core/types";
import prisma from "./prisma";
// import { Note } from "@prisma/client";

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
    console.log("user Notes = ", user?.notes);
    return user?.notes;
  } catch (error) {
    console.error("Error retrieving user Notes :", error);
  }
};

export const addNote = async (email: string, note: Note) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        notes: {
          create: note, // Create a new note
        },
      },
      include: {
        notes: true, // Include notes to ensure they are loaded
      },
    });
    console.log("user Notes= ", updatedUser?.notes);
    return updatedUser?.notes;
  } catch (error) {
    console.error("Error adding user Note :", error);
  }
};
