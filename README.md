# BioBot – Automated Biographical Writing

BioBot is a tool for automating biographical writing. It utilizes various APIs to research information and generate well-structured biographies.

[![Watch the video](https://img.youtube.com/vi/WNIm9nJUT0I/0.jpg)](https://youtu.be/WNIm9nJUT0I)

## 🚀 Setup

### 1. Add API Keys
Create a `.env.local` file in the root directory of the project and add the following API keys:

```env
GOOGLE_GENERATIVE_AI_API_KEY=...
GOOGLE_API_KEY=...
GOOGLE_SEARCH_ENGINE_ID=...
```

### 2. Start the Project
Run the following commands:

```sh
npm install  # Install dependencies
npm start dev  # Start the project in development mode
```

## 🔍 How It Works
BioBot automates the process of writing biographies using the following steps:
1. It performs a Google Search to gather foundational data about a person.
2. The retrieved data is structured into a prompt.
3. The system extracts the first 15 search results.
4. The Google Generative AI processes the collected information and generates a compelling biographical story.

## 🛠️ Technologies
- **Based on tool-calling-template** — Git Repo: https://github.com/Intentface/tool-calling-template
- **React & Next.js** – For the user interface
- **Node.js** – Server-side processing
- **Google Generative AI API** – Automated text generation
- **Google Search API** – Web search for relevant information

## 📌 Features (Implemented)
- ✅ Automated research for biographical information
- ✅ Generation of well-structured biographies
- ✅ By Code generated UX / UI
- ⏳ Text to speech
- ⏳ Navigation for old chats and to create new chats
- ⏳ UI/UX improvements for a better user experience 
- ⏳ Export of generated biographies as PDF

## 🔜 Next Steps
To improve the UI/UX of the project, check out this design in Figma:
🎨 [Figma Design](https://www.figma.com/design/J7vPbQ9R1zerraRvnNc0wu/BioBot-%E2%80%93-Automated-biographical-writing?node-id=1-104&t=Y5gPZT67xPHbBX4D-1)
▶️ [Prototype Video from Figma Design](https://youtu.be/2Whmb22UZqg)


---

⭐ **Give the project a star if you like it!** 🚀
