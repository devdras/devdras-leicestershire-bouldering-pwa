import { useState } from "react";
import { Check } from "lucide-react";

const TickButton = () => {
  const [isTicked, setIsTicked] = useState(false);

  const toggleTick = () => {
    setIsTicked(!isTicked);
  };

  return (
    <button
      onClick={toggleTick}
      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
        isTicked ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
      }`}
      aria-label={isTicked ? "Untick route" : "Tick route"}
    >
      <Check size={16} className={isTicked ? "opacity-100" : "opacity-0"} />
    </button>
  );
};

export default TickButton;
