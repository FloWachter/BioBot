// @/app/page.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "lucide-react"; // Importing Lucide's link icon
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import Tooltip from "@/components/ui/tooltip";

type ChatReturnType = ReturnType<typeof useChat>;
type Message = ChatReturnType["messages"][number];
type MessagePart = Message["parts"][number];

const MessagePart = ({ part }: { part: MessagePart }) => {
  if (!part) return null;

  if (part.type === "tool-invocation") {
    const { toolInvocation } = part;

    if (
      toolInvocation.toolName === "online_journalist" &&
      toolInvocation.state === "result"
    ) {
      const { result } = toolInvocation;

      interface ImageProps {
        title: string;
        image: string;
        source: string;
        contextLink: string;
      }

      // Function to render search result links as small icons
      const formatLinks = (story: string) => {
        const linkRegex = /\((https?:\/\/[^\s)]+)\)/g; // Regex to detect URLs in parentheses
        return story.split("\n").map((line, index) => {
          const matches = [...line.matchAll(linkRegex)];
          if (matches.length > 0) {
            return (
              <div key={index} className="flex items-center gap-2">
                {line.replace(linkRegex, "").trim()}{" "}
                {matches.map((match, i) => (
                  <Tooltip key={i} text={match[1]}>
                    <a
                      href={match[1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Link size={16} />
                    </a>
                  </Tooltip>
                ))}
              </div>
            );
          }
          return <p key={index}>{line}</p>;
        });
      };

      return (
        <div className="">
          <h3 className="font-medium text-lg">Story</h3>
          {/* Display all references found in the google search */}
          {/* <div className="space-y-2">{formatLinks(result.story)}</div> */}

          {/* Display images if available */}
          {Array.isArray(result.images) && result.images.length > 0 && (
            console.log(result.images),
              (
                <div className="mt-4">
                  <h4 className="font-medium text-md">Related Images:</h4>
                  <div className="flex flex-row w-full gap-2 overflow-x-auto">
                    {result.images.map((img: ImageProps, index: number) => (
                      <div
                        key={index}
                        className="border rounded-lg overflow-hidden p-2"
                      >
                        <img
                          src={img?.image}
                          alt={`Related image ${index + 1}`}
                          className=" w-auto object-cover aspect-square h-24"
                        />

                        <p className="text-sm text-gray-500  ">
                          {img?.title}
                        </p>
                        <a
                          href={img?.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 text-xs"
                        >
                          Source
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      );
    }

    return null;
  }

  if (part.type === "text") {
    return <div>{part.text}</div>;
  }

  return null;
};

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
    <div className="flex flex-col relative w-full max-w-[50%] py-24 mx-auto stretch gap-6 pb-[200px]">
      {messages.length === 0 && (
        <div className="text-center text-slate-500">
          The intergalactic weather assistant is here to help you with the
          weather and what to wear. Try asking it about the weather in any place
          in the galaxy or what to wear based on the weather. 🪐
        </div>
      )}
      {messages.map((m) => (
        <div key={m.id} className="flex flex-col gap-2 animate-in">
          {m.role === "user"
            ? (
              <div className="flex gap-2 w-full  p-4 justify-end">
                <div className=" flex flex-col gap-2 items-end justify-center p-4 rounded-xl">
                  {
                    /* <Avatar>
                    <AvatarImage src="https://mighty.tools/mockmind-api/content/alien/16.jpg" />
                    <AvatarFallback>Me</AvatarFallback>
                  </Avatar> */
                  }
                  <div>{m.content}</div>
                  <div className="text-center text-slate-500">
                    <StaticTimestamp />
                  </div>
                </div>
              </div>
            )
            : (
              <div className="flex gap-2">
                <div className="flex flex-col gap-2 items-start justify-center bg-slate-100 p-4 rounded-xl">
                  <div className="flex flex-row gap-2 items-center">
                    <Avatar>
                      <AvatarImage src="https://mighty.tools/mockmind-api/content/abstract/23.jpg" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <h2 className=" font-bold">Artifical Integligent</h2>
                  </div>

                  <div className="flex-1">
                    {m.parts?.map((part, index) => (
                      <MessagePart key={index} part={part} />
                    ))}
                  </div>
                  <div className="text-center text-slate-500 w-full flex justify-end">
                    <StaticTimestamp />
                  </div>
                </div>
              </div>
            )}
        </div>
      ))}

      <div ref={messagesEndRef} />
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 z-10 right-0 mb-8 w-full flex items-center justify-center"
      >
        <div className="relative w-full max-w-[50%] mx-auto">
          <div className="flex flex-row gap-2 pb-2">
            <Button
              variant="secondary"
              onClick={() =>
                setInput(
                  "Write me a story about Florian Wachter from Stockholm",
                )}
            >
              👑 Florian
            </Button>

            <Button
              variant="secondary"
              onClick={() => setInput("Write me a story about Jack White")}
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
