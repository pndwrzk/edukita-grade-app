import { useEffect } from "react";
import {Loading} from "@/components/loading";

interface ModalProps {
  isOpen: boolean;
  title: string;
  isLoading?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  size?: "sm" | "md" | "lg";
  showFooter?: boolean;
}

export function Modal({
  isOpen,
  title,
  isLoading,
  children,
  onClose,
  onSubmit,
  size = "md",
  showFooter = true,
}: Readonly<ModalProps>) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-full ${sizeClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div>{children}</div>
        {showFooter && (
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded-lg" onClick={onClose}>
              Close
            </button>
            {onSubmit && (
              <button type="button" className="py-2 px-4 bg-blue-500 text-white rounded-lg" onClick={onSubmit}>
                {isLoading && <Loading />} Submit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
