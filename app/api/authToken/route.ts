import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const REST_API = req.nextUrl.searchParams.get("REST_API");

  const headers: HeadersInit = {
    Accept: "application/json",
    "api-token": process.env.API_TOKEN_STATE!,
    "user-email": process.env.USER_EMAIL!,
  };
  const revalidate = REST_API ? 1 : 24 * 60 * 60;

  const response = await fetch(process.env.ACCESS_TOKEN_URL_SITE!, {
    headers,
    method: "GET",
    next: { revalidate },
  });
  const body = await response.json();
  return NextResponse.json(body);
}
