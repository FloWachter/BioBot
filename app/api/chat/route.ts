import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { z } from "zod";
import { fetchGoogleSearchResults } from "@/lib/fetchGoogleSearchResults";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // AI Model Configuration
  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
    system: `You are a journalist writing exciting short stories about people. 
    Whenever a user asks about a person, you MUST use the 'online_journalist' tool to look up information before responding.
    If Google search results are available, include them in the story along with relevant images.`,
    maxSteps: 5,
    tools: {
      online_journalist: tool({
        description: "Use this tool to research and write a story about a person. It fetches search results and images, incorporating them into the story.",
        parameters: z.object({
          name: z.string().describe("The name of the person"),
        }),
        execute: async ({ name }) => {
          console.log(`🔍 Searching for information about: ${name}`);

          // Fetch Google Search results and images
          const { searchResults = [], imageResults = [] } = await fetchGoogleSearchResults(name);

          // Format text results
          const textResults = searchResults.length > 0
            ? searchResults.map((result) => `- ${result.title}: ${result.snippet} (${result.link})`).join("\n")
            : "No information found.";

          // Format image results safely
          const formattedImages = imageResults.length > 0
            ? imageResults.slice(0, 3).map((img) => ({
              title: img.title,
              image: img.image,  // Make sure 'image' contains the actual image URL
              source: img.source, // Source link to the image
              contextLink: img.contextLink || "", // Additional metadata
            }))
            : [];

          const storyBase = `Once upon a time, there was a person named ${name}. They were a journalist who loved to write exciting short stories about people. It included what they did, what they said, and what they thought.`;

          return {
            name,
            story: `${storyBase}\n\nHere is what we found about ${name}:\n${textResults}`,
            images: formattedImages,
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
