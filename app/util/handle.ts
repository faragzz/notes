import { Note, User } from "@prisma/client";
import {
  addNoteInfo,
  editNoteType,
  getNoteInfo,
  UserInfo,
  // INote,
  UserLoginInfo,
  UserSignUpInfo,
} from "../core/types";

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
      throw new Error(`Failed to log in: ${response.statusText}`);
    }

    const responseData: User = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error signing in user:", error);
    return undefined; // Return undefined or handle the error as per your requirement
  }
};

export const addUserNote = async (data: addNoteInfo) => {
  try {
    const response = await fetch("/api/createNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to add Note : ${response.statusText}`);
    }

    // const responseData = await response.json();
    console.log("note created");
  } catch (error) {
    console.error("Error when adding Note :", error);
    return undefined;
  }
};
export const getUserNotes = async (email: string) => {
  try {
    const response = await fetch("/api/getNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user notes");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error when getting user notes:", error);
    return []; // Return an empty array if there's an error
  }
};
export const editNote = async (data: editNoteType) => {
  try {
    const response = await fetch("/api/editNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to get All User notes : ${response.statusText}`);
    }

    const responseData: Note[] = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error when getting All User Notes :", error);
    return [];
  }
};
