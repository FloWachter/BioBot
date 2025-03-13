import {
    ArticleAvatar,
    ArticleCard,
    ArticleContent,
    ArticleFooter,
    ArticleHeader,
    ArticleLead,
    ArticleSubtitle,
    ArticleTitle,
} from "@/components/ui/article";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Popover from "@/components/ui/popover";
import Tooltip from "@/components/ui/tooltip";
import { useChat } from "@ai-sdk/react";
import { Info, Link } from "lucide-react";
import { useState } from "react";

type ChatReturnType = ReturnType<typeof useChat>;
type Message = ChatReturnType["messages"][number];
type MessagePart = Message["parts"][number];

const ArticelParts = ({ part }: { part: MessagePart }) => {
    if (!part) return null;

    if (part.type === "tool-invocation") {
        const { toolInvocation } = part;

        console.log("parts", part);

        if (
            toolInvocation.toolName === "online_journalist" &&
            toolInvocation.state === "result"
        ) {
            const result: { name: string; images: ImageProps[] } =
                toolInvocation.result;
            console.log("result", result);

            interface ImageProps {
                title: string;
                image: string;
                source: string;
                contextLink: string;
            }

            // const formatLinks = (text: string) => {
            //     const linkRegex = /\((https?:\/\/[^\s)]+)\)/g; // Regex to detect URLs in parentheses
            //     const matches = [...text.matchAll(linkRegex)];

            //     console.log("matches", matches);
            //     return {
            //         title: text.split("\n")[0], // First line as the title
            //         subtitle: text.replace(linkRegex, "").trim(), // Remove links from text
            //         links: matches.map((match) => match[1]), // Extracted URLs
            //     };
            // };

            // const rawTexts: string[] = []; // Define rawTexts as an empty array or populate it with actual data
            // const sourceItems = rawTexts.map((text) => {
            //     const { title, subtitle, links } = formatLinks(result.story);
            //     return {
            //         title,
            //         subtitle,
            //         link: links.length > 0 ? links[0] : "", // Use first extracted link
            //     };
            // });

            const formatLinks = (story: string) => {
                const linkRegex = /\((https?:\/\/[^\s)]+)\)/g; // Regex to detect URLs in parentheses
                return story.split("\n").map((line, index) => {
                    const matches = [...line.matchAll(linkRegex)];
                    if (matches.length > 0) {
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                {line.replace(linkRegex, "").trim()}{" "}
                                {matches.map((match, i) => (
                                    <div className="flex flex-col gap-2 w-full">
                                        <span>
                                            <p className="text-blue-500 hover:text-blue-700">
                                                {match?.text}
                                            </p>
                                        </span>
                                        <span>
                                            <a
                                                href={match[1]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-700 flex flex-row gap-2 items-center"
                                            >
                                                <Link size={16} />
                                                link
                                            </a>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        );
                    }
                    return <p key={index}>{line}</p>;
                });
            };

            const [isModalOpen, setIsModalOpen] = useState(false);

            return (
                <>
                    <Button
                        variant={"ghost"}
                        className="absolute top-2 right-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Story Sources
                    </Button>
                    {result?.images.length > 2 && (
                        <ArticleLead
                            src={result.images[0].source}
                            alt={"Lead image about " + result.name}
                        />
                    )}
                    <ArticleHeader>
                        <ArticleSubtitle>
                            A story about

                            <div className="inline-block">
                                <Dialog
                                    open={isModalOpen}
                                    onOpenChange={setIsModalOpen}
                                >
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Story References
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="overflow-y-auto max-h-[50vh]">
                                            {formatLinks(result?.story)}
                                        </div>

                                        <div className="flex justify-end mt-4">
                                            <Button
                                                onClick={() =>
                                                    setIsModalOpen(false)}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </ArticleSubtitle>
                        <ArticleTitle>
                            {result.name}
                        </ArticleTitle>
                        {result?.images.length > 2 && (
                            <ArticleAvatar
                                src={result.images[1].source}
                                name={result.images[1].title}
                                alt={"The image shows " + result.name}
                                className="mt-2"
                            />
                        )}
                    </ArticleHeader>
                </>
            );
        }

        return null;
    }

    if (part.type === "tool-invocation") {
        const { toolInvocation } = part;

        console.log("parts", part);

        if (
            toolInvocation.toolName === "online_journalist" &&
            toolInvocation.state === "result"
        ) {
            const { result } = toolInvocation;
            console.log("result", result);

            interface ImageProps {
                title: string;
                image: string;
                source: string;
                contextLink: string;
            }

            return (
                <ArticleHeader>
                    <ArticleTitle>
                        A story about
                    </ArticleTitle>
                    <ArticleSubtitle>
                        {result.name}
                    </ArticleSubtitle>
                    {result?.images.length > 2 && (
                        <ArticleAvatar
                            src={result.images[1].source}
                            name={result.images[1].title}
                            alt={"The image shows " + result?.name}
                            className="mt-2"
                        />
                    )}
                </ArticleHeader>
            );
        }

        return null;
    }

    if (part.type === "text") {
        return (
            <ArticleContent>
                <p>
                    {part.text}
                </p>
            </ArticleContent>
        );
    }

    return null;
};
export default ArticelParts;
