import { useState } from "react";
import { Check } from "lucide-react";

const TickButton = () => {
  const [ticked, setTicked] = useState(false);

  return (
    <button
      onClick={() => setTicked(!ticked)}
      className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors 
        ${ticked ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"}
      `}
    >
      <Check size={20} />
    </button>
  );
};

export default TickButton;
