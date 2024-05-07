
// Get Notes
export async function POST(req: Request) {
  const userInfo:string  = await req.json();
  return new Response('done');
}
