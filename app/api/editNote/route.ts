import { editNoteType } from "@/app/core/types";
import { editUserNote } from "@/lib/actions";

// Get Notes
export async function POST(req: Request) {
  const userInfo:editNoteType = await req.json();
  await editUserNote(userInfo);
  return new Response("done");
}
