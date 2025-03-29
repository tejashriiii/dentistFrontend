// src/components/Modal.jsx
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose(); // Close on 'Escape' key press
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-20 flex p-0 m-0 justify-center items-center">
      <div
        className="fixed inset-0 bg-gray-300 p-0 m-0 blur-sm opacity-90 z-30 flex justify-center items-center hover:cursor-pointer"
        onClick={onClose}
      ></div>
      <div
        className="bg-[var(--bg)] p-10 rounded-lg shadow-xl z-50 w-full max-w-[50vw] relative max-h-[50vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 self-start hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
