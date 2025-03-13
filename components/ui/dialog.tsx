import { ReactNode } from "react";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-4">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={() => onOpenChange(false)}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

interface DialogContentProps {
    children: ReactNode;
}

export const DialogContent = ({ children }: DialogContentProps) => {
    return <div className="mt-4 h-full">{children}</div>;
};
interface DialogHeaderProps {
    children: ReactNode;
}

export const DialogHeader = ({ children }: DialogHeaderProps) => {
    return <div className="text-lg font-semibold">{children}</div>;
};
interface DialogTitleProps {
    children: ReactNode;
}

export const DialogTitle = ({ children }: DialogTitleProps) => {
    return <h2 className="text-xl font-bold">{children}</h2>;
};
