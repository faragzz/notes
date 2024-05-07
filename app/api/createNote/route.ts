import { addNoteInfo } from "@/app/core/types";
import { addNote } from "@/lib/actions";
import { Note } from "@prisma/client";

// Creating Note
export async function POST(req: Request) {
  const userInfo: addNoteInfo = await req.json();
  const user = await addNote(userInfo);
  return new Response('ok');
}
