import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const queryParams: Record<string, string> = {};

  request.nextUrl.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  // const url = `https://bussiness-site-fn.azurewebsites.net/api/getaisuggestion`;
  // const response = await axios.get(url, { params: queryParams });
  // const messages = await response.data;

  const messages = await getAISuggestion(queryParams);
  return NextResponse.json(messages.body);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAISuggestion(params: object) {
  const formData: any = params;

  if (!formData || typeof formData !== "object")
    return { body: "No suggestion" };
  const {
    firstName,
    email,
    state,
    city,
    qualification,
    capitalInvestment,
    experience,
  } = formData;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that provides job recommendations based on user input.",
      },
      {
        role: "user",
        content:
          "Generate job suggestions based on the following information and Qualification to briefy explanation:",
      },
      {
        role: "assistant",
        content: `First Name: ${firstName}\nEmail: ${email}\nState: ${state}\nCity: ${city}\nQualification: ${qualification}\nCapital Investment: ${capitalInvestment}\nExperience: ${
          experience === "Yes" ? 1 : 0
        } year`,
      },
    ],
  });

  console.log(completion.choices[0]);

  return { body: completion.choices[0].message.content || "No suggestion" };
}
