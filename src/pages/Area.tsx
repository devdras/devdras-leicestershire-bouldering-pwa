import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { data } from "../data";
import { type Area as AreaType } from "../types";
import AreaComponent from "../components/Area";

const Area = () => {
  const { area } = useParams(); // Get URL param
  console.log(area);
  const [thisArea, setThisArea] = useState<AreaType | null>(null);

  useEffect(() => {
    // Find the area from the data
    const foundArea =
      data.find((filteredArea) => filteredArea.name === area) || null;

    console.log(foundArea);
    setThisArea(foundArea as AreaType);
  }, [area]); // Re-run effect when `area` changes

  if (thisArea !== null) {
    return (
      <div className="p-2">
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
    //return <div className="">{JSON.stringify(thisArea)}</div>;
  }

  return <div>Area not found</div>;
};

export default Area;
