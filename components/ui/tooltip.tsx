import { ReactNode } from "react";

interface TooltipProps {
    text: string;
    children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
    return (
        <div className="relative group inline-block">
            {/* Child element (the trigger, e.g., the link icon) */}
            {children}

            {/* Tooltip content */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
