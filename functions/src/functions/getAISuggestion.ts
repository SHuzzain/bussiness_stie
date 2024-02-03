import {
  app,
  HttpRequest,
  HttpRequestParams,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAISuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const formData: any = request.query;

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

app.http("getAISuggestion", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: getAISuggestion,
});
