import React from "react";
import { Loader2 , Ellipsis } from "lucide-react";

const LoadingSpinner = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-row gap-2">
  <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
  <div
    className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"
  ></div>
  <div
    className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"
  ></div>
</div>
    </div>
  );
};

const LoadingOverlay = ({ message = "Loading...", isFullScreen = false }) => {
  const overlayClasses = isFullScreen
    ? "fixed inset-0 bg-black bg-opacity-50 z-50"
    : "absolute inset-0 bg-white bg-opacity-75";

  return (
    <div className={`${overlayClasses} flex items-center justify-center`}>
      <div className="text-center">
        <LoadingSpinner size={48} className="mb-4" />
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

const Spinning = () => {
  return (
    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
  )
}

export { LoadingSpinner, LoadingOverlay, Spinning }