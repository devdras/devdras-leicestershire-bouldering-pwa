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
      <div className="">
        <span className="font-bold">{thisArea.displayName}</span>
        <AreaComponent key={thisArea.name} area={thisArea} />
      </div>
    );
    //return <div className="">{JSON.stringify(thisArea)}</div>;
  }

  return <div>Area not found</div>;
};

export default Area;
