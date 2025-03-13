import * as React from "react";
import { cn } from "@/lib/utils";

const ArticleCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <article
        ref={ref}
        className={cn(
            "rounded-xl border bg-card text-card-foreground shadow overflow-hidden",
            className,
        )}
        {...props}
    />
));
ArticleCard.displayName = "ArticleCard";

const ArticleLead = React.forwardRef<
    HTMLDivElement,
    React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, src, alt, ...props }, ref) => (
    <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("w-full h-80 object-cover", className)}
        {...props}
    />
));
ArticleLead.displayName = "ArticleLead";

const ArticleHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <header
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
ArticleHeader.displayName = "ArticleHeader";

const ArticleTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn(
            "font-semibold text-xl leading-tight tracking-tight",
            className,
        )}
        {...props}
    />
));
ArticleTitle.displayName = "ArticleTitle";

const ArticleSubtitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
ArticleSubtitle.displayName = "ArticleSubtitle";

const ArticleAvatar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, src, alt, name, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center space-x-2", className)}
        {...props}
    >
        <img
            src={src}
            alt={alt}
            className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-sm font-medium">{name}</span>
    </div>
));
ArticleAvatar.displayName = "ArticleAvatar";

const ArticleContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
));
ArticleContent.displayName = "ArticleContent";

const ArticleFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center justify-between p-6 pt-0 text-xs text-muted-foreground",
            className,
        )}
        {...props}
    />
));
ArticleFooter.displayName = "ArticleFooter";

export {
    ArticleAvatar,
    ArticleCard,
    ArticleContent,
    ArticleFooter,
    ArticleHeader,
    ArticleLead,
    ArticleSubtitle,
    ArticleTitle,
};
