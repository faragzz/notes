import { deleteUserNote } from "@/lib/actions";

export async function POST(req: Request) {
  const { noteId }: { noteId: string } = await req.json();
  await deleteUserNote(noteId);
  return new Response("deleted");
}
