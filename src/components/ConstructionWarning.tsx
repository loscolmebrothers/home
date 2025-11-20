import { useState } from "react";
import { AlertTriangle } from "react-feather";

export const ConstructionWarning = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="fixed top-4 right-4 z-30 pointer-events-auto"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onTouchStart={() => setIsExpanded(!isExpanded)}
    >
      <div
        className={`bg-yellow-500/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 ease-out flex items-center gap-2 ${
          isExpanded ? "px-4 py-2" : "p-2"
        }`}
      >
        <AlertTriangle size={20} className="text-black/80 flex-shrink-0" />
        <span
          className={`text-black/80 text-sm font-medium whitespace-nowrap transition-all duration-300 overflow-hidden ${
            isExpanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
          }`}
          style={{ fontFamily: "'ApfelGrotezk', sans-serif" }}
        >
          This site is under construction still
        </span>
      </div>
    </div>
  );
};
