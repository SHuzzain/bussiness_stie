import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface GetParams {
  state: string;
  city: string;
  firstName: string;
  email: string;
  qualification: string;
  capitalInvestment: string;
  experience: string;
}

export async function GET(request: NextRequest) {
  const queryParams: Record<string, string> = {};

  request.nextUrl.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  const url = `https://bussiness-site-fn.azurewebsites.net/api/getaisuggestion`;
  const response = await axios.get(url, { params: queryParams });
  const messages = await response.data;
  return NextResponse.json(messages);
}
