import { addNoteInfo } from "@/app/core/types";
import { addNote } from "@/lib/actions";

// Creating Note
export async function POST(req: Request) {
  const userInfo: addNoteInfo = await req.json();
  const user = await addNote(userInfo.email,userInfo.note);
  return new Response(JSON.stringify(user));
}
