import { User } from "@prisma/client";
import { UserLoginInfo, UserSignUpInfo } from "../core/types";

export const signUpUser = async (userInfo: UserSignUpInfo) => {
  try {
    const response = await fetch("/api/usersignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const responseData: User = await response.json();
    console.log(responseData);
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const loginUser = async (
  userInfo: UserLoginInfo
): Promise<User | undefined> => {
  try {
    const response = await fetch("/api/userlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      // Handle non-successful response (optional)
      throw new Error(`Failed to log in: ${response.statusText}`);
    }

    const responseData: User = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error signing in user:", error);
    return undefined; // Return undefined or handle the error as per your requirement
  }
};
