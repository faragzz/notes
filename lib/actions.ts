import {
  addNoteInfo,
  editNoteType,
  UserInfo,
  UserLoginInfo,
  UserSignUpInfo,
} from "@/app/core/types";

import argon2 from "argon2";
import prisma from "./prisma";

// SignIn and Login

export const createUser = async (userSignUpInfo: UserSignUpInfo) => {
  try {
    // Hash password using Argon2
    const hashedPassword = await argon2.hash(userSignUpInfo.password);

    const user: UserInfo = {
      email: userSignUpInfo.email,
      name: userSignUpInfo.name,
      password: hashedPassword,
      notes: {
        create: [],
      },
    };

    const data = await prisma.user.create({
      include: {
        notes: true,
      },
      data: user,
    });

    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const checkUser = async (userLoginInfo: UserLoginInfo) => {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: userLoginInfo.email,
      },
    });

    if (!user) {
      return null;
    }

    // Guard against malformed/legacy password hashes (non-PHC format).
    // argon2.verify() throws on anything that isn't a valid "$argon2id$..."
    // string instead of returning false, so we check the prefix first.
    if (!user.password || !user.password.startsWith("$argon2")) {
      console.error(
        `User ${user.email} has a malformed password hash; treating as invalid credentials.`,
      );
      return null;
    }

    // Verify password against Argon2 hash
    const passwordMatch = await argon2.verify(
      user.password,
      userLoginInfo.password,
    );

    if (!passwordMatch) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
};

// Notes

export const getAllNotesFromAUser = async (email: string) =>
  await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      notes: true,
    },
  });

export const addNote = async (userInfo: addNoteInfo) => {
  try {
    const user = await prisma.user.findUnique({
      include: {
        notes: true,
      },
      where: {
        email: userInfo.email,
      },
    });

    if (user) {
      await prisma.note.create({
        data: {
          title: userInfo.note.title,
          content: userInfo.note.content,
          color: userInfo.note.color || "bg-gray-100",
          date: new Date(),
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
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
    console.error("Error retrieving user Notes:", error);
  }
};
