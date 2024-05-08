import { getNoteInfo } from "@/app/core/types";
import { getAllNotesFromAUser } from "@/lib/actions";

// Get Notes
export async function POST(req: Request) {
  const userInfo: string = await req.json();
  const user = await getAllNotesFromAUser(userInfo);
  if (user) {
    return new Response(JSON.stringify(user));
  }
  return new Response(JSON.stringify([]));
}
