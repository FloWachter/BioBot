import axios from "axios";

const GOOGLE_API_Key = process.env.GOOGLE_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

if (!GOOGLE_API_Key || !GOOGLE_SEARCH_ENGINE_ID) {
    console.error("❌ Missing Google API Key or Search Engine ID");
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
        return { searchResults: [], imageResults: [] }; // ✅ Ensure it always returns an object
    }
}


// // lib/fetchGoogleSearchResults.ts
// import axios from "axios";

// const GOOGLE_API_Key = "AIzaSyDu5QePXAyVmeJ4AYky-n5cQr8BHpJBomQ";
// const GOOGLE_SEARCH_ENGINE_ID = "60a7a660d056f43c4";
// // const GOOGLE_API_Key = process.env.GOOGLE_API_KEY;
// // const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

// if (!GOOGLE_API_Key || !GOOGLE_SEARCH_ENGINE_ID) {
//     console.error("❌ Missing Google API Key or Search Engine ID");
//     throw new Error("Missing API configuration.");
// }

// export async function fetchGoogleSearchResults(query: string) {
//     if (!GOOGLE_API_Key || !GOOGLE_SEARCH_ENGINE_ID) {
//         console.error("❌ Missing Google API Key or Search Engine ID");
//         return [{ title: "Error fetching results", snippet: "Try again later.", link: "#" }];
//     }

//     const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
//         query
//     )}&key=${GOOGLE_API_Key}&cx=${GOOGLE_SEARCH_ENGINE_ID}&num=10`;

//     try {
//         console.log("🔍 Sending Google Search API request to:", apiUrl);

//         const response = await axios.get(apiUrl);
//         console.log("✅ API Response:", response.data);

//         if (!response.data.items) {
//             console.warn("⚠️ No search results found!");
//             return [{ title: "No results found", snippet: "Try another query.", link: "#" }];
//         }

//         return response.data.items.map((item: any) => ({
//             title: item.title,
//             snippet: item.snippet,
//             link: item.link,
//         }));
//     } catch (error) {
//         console.error("❌ Error fetching search results:", error);
//         return [{ title: "Error fetching results", snippet: "Try again later.", link: "#" }];
//     }
// }
