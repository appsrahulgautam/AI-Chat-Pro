"use client";

import { useEffect } from "react";

interface MessageLimitDialogProps {
  onClose: () => void;
}

export default function MessageLimitDialog({
  onClose,
}: MessageLimitDialogProps) {
  // Close dialog when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent scrolling when dialog is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Store that user has seen the dialog
  const handleUnderstand = () => {
    localStorage.setItem("neuralchat_dialog_seen", "true");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] animate-in fade-in"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div
          className="relative max-w-md w-full bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/40 via-purple-600/40 to-red-600/40 rounded-2xl blur-xl opacity-70" />

          <div className="relative p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-500 to-purple-600 p-1 animate-pulse">
                <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.282 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                ⚠️ Message Limit Reached
              </h2>

              <div className="space-y-3">
                <p className="text-gray-300 text-lg">
                  "I, Rahul Gautam, am restricting sending 2nd message to not
                  incur charges to me."
                </p>

                <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                  <p className="text-sm text-gray-300">
                    This project is for demonstration purposes only.
                    <br />
                    <span className="text-red-400 font-semibold">
                      Additional messages would incur API charges to me.
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>
                    Message limit: <strong>2 messages total</strong>
                  </span>
                </div>

            
              </div>

              {/* Button */}
              <button
                onClick={handleUnderstand}
                className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                I understand, Rahul
              </button>
            </div>

            {/* Footer note */}
            <p className="mt-6 text-center text-xs text-gray-500">
              You can still view your previous 2 messages
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
