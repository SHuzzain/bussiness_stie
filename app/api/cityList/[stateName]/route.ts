import axios from "axios";
import { NextResponse } from "next/server";

interface GetParams {
  params: { params: any };
}

export async function GET(request: Request, params: any) {
  const url = `https://www.universal-tutorial.com/api/cities/Assam`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN_STATE}`,
      Accept: "application/json",
    },
  });
  return NextResponse.json(res);
}
