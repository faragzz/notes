import { UserInfo } from "@/app/core/types";
import { checkUser, createUser } from "@/lib/actions";
import { User } from "@prisma/client";
import { NextApiResponse } from "next";

// Creating
export async function POST(req: Request) {
  const userInfo: UserInfo = await req.json();
  const user = await createUser(userInfo);
  return new Response(JSON.stringify(user));
}

// SignIn
export async function GET(req: Request) {
    const userInfo: UserInfo = await req.json();
    const user = await checkUser(userInfo);
    if(user) new Response(JSON.stringify(user));
    new Response('User Not Found');
}