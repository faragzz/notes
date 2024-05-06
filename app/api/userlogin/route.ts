import { UserLoginInfo } from "@/app/core/types";
import { checkUser } from "@/lib/actions";

export async function POST(req: Request) {
  const userInfo: UserLoginInfo = await req.json();
  const user = await checkUser(userInfo);
  return new Response(JSON.stringify(user));
}
