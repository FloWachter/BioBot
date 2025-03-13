import axios from "axios";

const GOOGLE_API_Key = process.env.GOOGLE_API_KEY
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID

if (!GOOGLE_API_Key) {
    console.error("❌ Missing Google API Key ");
    throw new Error("Missing API configuration.");
}

if (!GOOGLE_SEARCH_ENGINE_ID) {
    console.error("❌ Missing Google Search Engine ID");
    throw new Error("Missing API configuration.");
}

export async function fetchGoogleSearchResults(query: string) {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_Key}&cx=${GOOGLE_SEARCH_ENGINE_ID}&num=10`;
    const imageUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_Key}&cx=${GOOGLE_SEARCH_ENGINE_ID}&searchType=image&num=5`;

    try {
        console.log("🔍 Fetching search results...");
        console.log("🔍 Sending Google Search API request to:", searchUrl);
        console.log("🔍 Sending Google Image API request to:", imageUrl);
        const [searchResponse, imageResponse] = await Promise.all([
            axios.get(searchUrl),
            axios.get(imageUrl)
        ]);

        const searchResults = searchResponse.data.items?.map((item: any) => ({
            title: item.title,
            snippet: item.snippet,
            link: item.link,
        })) || [];

        const imageResults = imageResponse.data.items?.map((item: any) => ({
            image: item.link,
            title: item.title,
            source: item.link,
            contextLink: item.image?.contextLink || "",
        })) || [];

        return { searchResults, imageResults };
    } catch (error) {
        console.error("❌ Error fetching search results:", error);

        if (error.response?.status === 429) {
            console.error("⚠️ Rate limit exceeded. Please wait or upgrade your plan.");
            throw new Error("Rate limit exceeded. Please try again later.");
        }

        return { searchResults: [], imageResults: [] }; // ✅ Ensure it always returns an object
    }
}
