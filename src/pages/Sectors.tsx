import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { data } from "../data";
import { type Sector as SectorType } from "../types";
import InfoPiece from "../components/InfoPiece";
import DisplayCard from "../components/DisplayCard";

const Sectors = () => {
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
    <div className="p-2 flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <p className="font-bold text-xl">{thisSector.displayName}</p>
        <p className="text-sm">{thisSector.gpsCoordinates}</p>
      </div>

      <InfoPiece title={"Overview"} info={thisSector.overview} />
      <InfoPiece title={"Access"} info={thisSector.access} />
      <InfoPiece title={"Conditions"} info={thisSector.conditions} />
      <InfoPiece title={"Approach"} info={thisSector.approach} />

      <div className="flex flex-col gap-y-2">
        <p className="font-bold">Blocks</p>
        {thisSector.blocks.map((block) => (
          <DisplayCard
            displayName={block.displayName}
            image={`/altar-stones-header.png`}
            url={`/${area}/${sector}/${block.name}`}
            data={block.sections}
          />
        ))}
      </div>
    </div>
  );
};
export default Sectors;
