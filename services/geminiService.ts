import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMovieMetadata = async (title: string) => {
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Returning mock data.");
    return {
      description: "AI description unavailable (Missing API Key). This is a placeholder description for the movie.",
      genre: "Unknown",
      rating: 0,
      year: new Date().getFullYear()
    };
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Generate a short, engaging movie description (max 50 words), a primary genre, an estimated rating (1-5), and the release year for a movie titled "${title}".
      Return the response in valid JSON format with keys: "description", "genre", "rating" (number), "year" (number).
      Do not include markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      description: "Could not generate description at this time.",
      genre: "General",
      rating: 3.0,
      year: new Date().getFullYear()
    };
  }
};

export const getAiRecommendation = async (userQuery: string, availableMovies: string[]) => {
   if (!process.env.API_KEY) {
    return "I can't provide recommendations without an API key. Please check out the trending section!";
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      User is asking: "${userQuery}".
      Available movies in our database: ${availableMovies.join(", ")}.
      Recommend one or two movies from the available list that match the user's vibe.
      Keep it short and friendly (max 2 sentences).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Check out our trending movies!";
  } catch (error) {
    console.error(error);
    return "I'm having trouble thinking right now. Try watching Big Buck Bunny!";
  }
}