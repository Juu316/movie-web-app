import { NextRequest } from "next/server";
import { searchMulti } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query) return Response.json({ results: [] });

  try {
    const { results } = await searchMulti(query);
    return Response.json({ results: results.slice(0, 6) });
  } catch (error) {
    console.error(error);
    return Response.json({ results: [] }, { status: 502 });
  }
}
