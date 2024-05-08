import {
  addNoteInfo,
  editNoteType,
  UserInfo,
  UserLoginInfo,
  UserSignUpInfo,
} from "@/app/core/types";
import prisma from "./prisma";

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
        password: userLoginInfo.password,
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

    console.log("user: ", user);
    console.log("user Notes: ", user?.notes);
  
    return user ? user.notes : [];
  } catch (error) {
    console.error("Error retrieving user Notes:", error);
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
        email: userInfo.email.toString(),
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
    await prisma.note.update({
      where: {
        id: data.noteId,
      },
      data: {
        color: data.note.color,
        content: data.note.content,
        title: data.note.title,
      },
    });

    console.log("note edited");
  } catch (error) {
    console.error("Error retrieving user Notes :", error);
  }
};
