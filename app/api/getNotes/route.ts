import { getAllNotesFromAUser } from "@/lib/actions";

// Get Notes
export async function POST(req: Request) {
  const { email }: { email: string } = await req.json();
  const user = await getAllNotesFromAUser(email);
  return new Response(JSON.stringify(user));
}
