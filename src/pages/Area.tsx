import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { data } from "../data";
import type { Area as AreaType } from "../types";
import AreaComponent from "../components/Area";

const Area = () => {
  const { areaName } = useParams(); // Updated param name
  const [thisArea, setThisArea] = useState<AreaType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the area from the data
    const foundArea =
      data.find((filteredArea) => filteredArea.name === areaName) || null;
    setThisArea(foundArea as AreaType);
    setLoading(false);
  }, [areaName]); // Re-run effect when `areaName` changes

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!thisArea) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Area not found</h2>
        <p>The area "{areaName}" could not be found.</p>
        <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to all areas
        </a>
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <a href={`/areas/${areaName}`} className="hover:underline">
          {areaName}
        </a>
      </div>
      <p className="font-bold text-xl">{thisArea.displayName}</p>
      <div className="">
        <p className="font-bold">Overview</p>
        <p>{thisArea.overview}</p>
      </div>
      <div className="">
        <p className="font-bold">Access</p>
        <p>{thisArea.access}</p>
      </div>
      <div className="">
        <p className="font-bold">Conditions</p>
        <p>{thisArea.conditions}</p>
      </div>
      <div className="">
        <p className="font-bold">Approach</p>
        <p>{thisArea.approach}</p>
      </div>
      <div className="">
        <p className="font-bold">Sectors</p>
        <AreaComponent key={thisArea.name} area={thisArea} />
      </div>
    </div>
  );
};

export default Area;
