import { UserInfo, UserLoginInfo, UserSignUpInfo } from "@/app/core/types";
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
      },
    });
    console.log("user = ", user);
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
  }
};

// Notes
