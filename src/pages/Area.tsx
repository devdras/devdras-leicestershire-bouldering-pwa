import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { data } from "../data";
import { type Area as AreaType } from "../types";
import AreaComponent from "../components/Area";

const Area = () => {
  const { area } = useParams(); // Get URL param
  const [thisArea, setThisArea] = useState<AreaType | null>(null);

  useEffect(() => {
    // Find the area from the data
    const foundArea =
      data.find((filteredArea) => filteredArea.name === area) || null;
    setThisArea(foundArea as AreaType);
  }, [area]); // Re-run effect when `area` changes

  if (!thisArea) {
    return <div className="text-center text-gray-500 p-4">Area not found</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      {/* Area Name */}
      <h1 className="text-2xl font-bold">{thisArea.displayName}</h1>

      {/* Info Sections */}
      {[
        { title: "Overview", content: thisArea.overview },
        { title: "Access", content: thisArea.access },
        { title: "Conditions", content: thisArea.conditions },
        { title: "Approach", content: thisArea.approach },
      ].map((item, index) => (
        <div key={index} className="p-3 bg-gray-100 rounded-lg">
          <p className="font-bold text-lg">{item.title}</p>
          <p className="text-sm text-gray-700">{item.content}</p>
        </div>
      ))}

      {/* Sectors */}
      <div className="p-3 bg-gray-200 rounded-lg">
        <p className="font-bold text-lg">Sectors</p>
        <AreaComponent key={thisArea.name} area={thisArea} />
      </div>
    </div>
  );
};

export default Area;
