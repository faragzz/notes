import { getNoteInfo } from "@/app/core/types";
import { getAllNotesFromAUser } from "@/lib/actions";

// Get Notes
export async function POST(req: Request) {
  const userInfo:getNoteInfo  = await req.json();
  const user = await getAllNotesFromAUser(userInfo.email);
  return new Response(JSON.stringify(user));
}
