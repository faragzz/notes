import { UserInfo, UserLoginInfo } from "@/app/core/types";
import prisma from "./prisma";

// SignIn and Login
export const createUser = async (userLoginInfo: UserLoginInfo) => {
  const user: UserInfo = {
    email: userLoginInfo.email,
    name: userLoginInfo.name,
    password: userLoginInfo.password,
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
  const user = await prisma.user.findUnique({
    where: {
      email: userLoginInfo.email,
    },
  });
  if (user) return user;
  else return -1;
};

// Notes
