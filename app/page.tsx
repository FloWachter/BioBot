// @/app/page.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "lucide-react"; // Importing Lucide's link icon
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import Tooltip from "@/components/ui/tooltip";
import ArticelParts from "./messages";
import { ArticleCard, ArticleFooter } from "@/components/ui/article";

export default function Home() {
  const { messages, input, setInput, status, handleInputChange, handleSubmit } =
    useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages change

  function StaticTimestamp() {
    const [time] = useState(new Date().toLocaleTimeString()); // Store the initial time when mounted

    return (
      <div className="text-center text-slate-500 text-xs">
        {time}
      </div>
    );
  }

  return (
    <div className="flex flex-col relative w-full max-w-[50%] py-24 mx-auto stretch gap-6 pb-[200px] ">
      <div className=" fixed top-12 left-12 justify-center items-center h-16 w-16  rounded-full flex flex-row gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-24,16v24H116V152ZM80,164a12,12,0,0,1,12-12h8v24H92A12,12,0,0,1,80,164Zm84,12h-8V152h8a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z">
            </path>
          </svg>
        </div>
        <h5 className="font-bold" style={{ fontSize: "24px" }}>BioBot</h5>
      </div>

      {messages.length === 0 && (
        <div className="text-center text-slate-500">
          {
            /* <h1 className="font-serif" style={{ fontSize: "48px" }}>
            Welcome to the BioBot
          </h1>
          <p className="font-sans" style={{ fontSize: "16px" }}>
            Ask the BioBot about everyperson you know and it will search the
            internet for this person and creates with the information provided a
            nice exciting short story
          </p>
          <p className="font-sans" style={{ fontSize: "16px" }}>
            You dont know what to promt, here are some examples.
          </p> */
          }
          <h1
            className="font-serif pb-4"
            style={{ fontSize: "48px", lineHeight: "1.2" }}
          >
            Welcome to BioBot Your Personal Storyteller!
          </h1>
          <p className="font-sans" style={{ fontSize: "16px" }}>
            Ever wondered what the internet knows about someone? BioBot is here
            to turn online breadcrumbs into a thrilling, quirky, or downright
            mysterious short story about anyone you have in mind. Just ask, and
            let the magic happen!
          </p>

          <p className="font-sans pt-4 pb-2" style={{ fontSize: "14px" }}>
            Not sure what to ask? No worries – here are some fun prompts to get
            you started!
          </p>

          <div className="flex flex-row gap-2 pb-2 w-full justify-center ">
            <Button
              variant="secondary"
              onClick={() =>
                setInput(
                  "Write me a story about Joni Juup from Helsinki who works for intentface",
                )}
            >
              👑 Joni Juup
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                setInput(
                  "Write me a story about Florian Wachter from Stockholm",
                )}
            >
              Florian
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setInput("Write me a story about Jack White");
              }}
            >
              Jack White
            </Button>

            <Button
              variant="secondary"
              onClick={() => setInput("Write me a story about Amy Winehouse")}
            >
              Amy Winehouse
            </Button>
          </div>
        </div>
      )}
      {messages.map((m) => (
        <div key={m.id} className="flex flex-col gap-2 animate-in">
          {m.role === "user"
            ? (
              <div className="flex gap-2 w-full  p-4 justify-end">
                <div className=" flex flex-col gap-2 items-end justify-center p-4 rounded-xl">
                  <div>{m.content}</div>
                  <div className="text-center text-slate-500">
                    <StaticTimestamp />
                  </div>
                </div>
              </div>
            )
            : (
              <>
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 items-start justify-center">
                    <div className="flex flex-row gap-2 items-center">
                      <Avatar>
                        <AvatarImage src="https://mighty.tools/mockmind-api/content/abstract/23.jpg" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <h2 className=" font-bold">Artifical Integligent</h2>
                    </div>

                    <ArticleCard className="max-w-md mx-auto relative">
                      <div className="flex-1">
                        {m.parts?.map((part, index) => (
                          <ArticelParts key={index} part={part} />
                        ))}
                      </div>
                      <ArticleFooter>
                        <StaticTimestamp />
                      </ArticleFooter>
                    </ArticleCard>
                  </div>
                </div>
              </>
            )}
        </div>
      ))}

      <div ref={messagesEndRef} />
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 z-10 right-0 mb-8 w-full flex items-center justify-center"
      >
        <div className="relative w-full max-w-[50%] mx-auto">
          <Textarea
            className="dark:bg-zinc-900 bg-white/50 backdrop-blur-xl rounded-xl w-full pb-[60px] border border-zinc-300 dark:border-zinc-800 shadow-xl"
            value={input}
            rows={3}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            disabled={status === "streaming"}
            size="sm"
            className="absolute bottom-2 right-2"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
