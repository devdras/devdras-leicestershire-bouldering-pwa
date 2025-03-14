import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BlockComponent from "../components/Block";
import { data } from "../data";
import { type Sector as SectorType } from "../types";

const Sector = () => {
  const { area, sector } = useParams(); // Get URL param
  console.log(area);
  console.log(sector);
  const [thisSector, setThisSector] = useState<SectorType | null>(null);

  useEffect(() => {
    const foundArea = data.find(
      (filteredArea: { name: string; sectors: SectorType[] }) =>
        filteredArea.name === area
    );
    console.log(foundArea);
    const foundSector = foundArea?.sectors.find(
      (filteredSector: { name: string }) => filteredSector.name === sector
    );

    console.log(foundSector);
    setThisSector(foundSector as SectorType);
  }, [area]); // Re-run effect when `area` changes

  if (!thisSector) {
    return null;
  }

  return (
    <div className="">
      <span>{thisSector.displayName}</span>
      <div className="">
        {thisSector.blocks.map((block) => (
          <BlockComponent key={block.name} block={block} />
        ))}
      </div>
      {JSON.stringify(thisSector.blocks) || "No sector found"}
    </div>
    // <SectorComponent area={area || ""} sector={thisSector as SectorType} />
  );
};
export default Sector;
