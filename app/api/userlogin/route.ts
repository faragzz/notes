import { UserLoginInfo } from "@/app/core/types";
import { checkUser } from "@/lib/actions";
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const userInfo: UserLoginInfo = await req.json();
  const user = await checkUser(userInfo);
  if(user){
    const cookieStore = cookies();
    cookieStore.set('email',user.email);
  }
  return new Response(JSON.stringify(user));
}
