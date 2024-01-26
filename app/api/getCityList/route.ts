import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const stateName = req.nextUrl.searchParams.get("stateName");
  const Authorization = req.nextUrl.searchParams.get("Authorization");
  if (!Authorization) return Response.json("auth_req");
  const response = await fetch(
    `https://www.universal-tutorial.com/api/cities/${stateName}`,
    {
      headers: {
        Accept: "*/*",
        Authorization,
      },
      method: "GET",
      next: { revalidate: 24 * 60 * 60 },
    }
  );
  const body = await response.json();
  return NextResponse.json(body);
}
