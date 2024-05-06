import { User } from "@prisma/client";
import { UserLoginInfo } from "../core/types";

export const signUpUser = async (userInfo: UserLoginInfo) => {
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const responseData: User = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const loginUser = async (userInfo:UserLoginInfo) => {
  try {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const responseData: User = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Error SignIn user:", error);
  }
};
