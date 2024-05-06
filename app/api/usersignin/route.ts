import { UserInfo, UserLoginInfo } from "@/app/core/types";
import { checkUser, createUser } from "@/lib/actions";

// Creating
export async function POST(req: Request) {
  const userInfo: UserInfo = await req.json();
  const user = await createUser(userInfo);
  return new Response(JSON.stringify(user));
}