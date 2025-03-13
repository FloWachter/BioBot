import { useState } from "react";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface TooltipProps {
    title: string;
    modalContent: ReactNode;
    children: ReactNode;
}

const Tooltip = ({ title, modalContent, children }: TooltipProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative group inline-block">
            {/* Child element (trigger) */}
            <div
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer"
            >
                {children}
            </div>

            {/* Tooltip content (shows on hover) */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-lg">
                {title}
            </div>

            {/* Modal (opens on click) */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    <div>{modalContent}</div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Tooltip;
