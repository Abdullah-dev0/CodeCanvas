"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);

export async function generateContent(prompt: string) {
	console.log("prompt", prompt);

	if (!prompt.trim() || prompt.trim() === "") {
		return "Please provide a prompt to generate content here.";
	}

	const modifiablePrompt =
		prompt +
		"The description should be not exceed 1200 characters. Avoid complex markup or unattractive formatting.";

	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const result = await model.generateContent(modifiablePrompt);
	const cleanText = result.response.text().replace(/<[^>]*>/g, ""); // Removes
	return cleanText;
}
