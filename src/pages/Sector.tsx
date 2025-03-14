import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { data } from "../data";
import { type Sector as SectorType } from "../types";
import InfoPiece from "../components/InfoPiece";
import DisplayCard from "../components/DisplayCard";

const Sector = () => {
  const { area, sector } = useParams();
  const [thisSector, setThisSector] = useState<SectorType | null>(null);

  useEffect(() => {
    const foundArea = data.find(
      (filteredArea: { name: string; sectors: SectorType[] }) =>
        filteredArea.name === area
    );
    const foundSector = foundArea?.sectors.find(
      (filteredSector: { name: string }) => filteredSector.name === sector
    );

    setThisSector(foundSector as SectorType);
  }, [area, sector]); // Also listen for `sector` changes

  if (!thisSector) {
    return <div className="text-center text-lg py-4">Sector not found</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <p className="font-bold text-2xl sm:text-3xl">
          {thisSector.displayName}
        </p>
        <p className="text-base text-gray-600 truncate max-w-full sm:max-w-xs">
          {thisSector.gpsCoordinates}
        </p>
      </div>

      {/* Info Sections */}
      <InfoPiece title="Overview" info={thisSector.overview} />
      <InfoPiece title="Access" info={thisSector.access} />
      <InfoPiece title="Conditions" info={thisSector.conditions} />
      <InfoPiece title="Approach" info={thisSector.approach} />

      {/* Blocks Section */}
      <div className="flex flex-col gap-y-3">
        <p className="font-bold text-lg">Blocks</p>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {thisSector.blocks.map((block) => (
            <DisplayCard
              key={block.name}
              displayName={block.displayName}
              image={`/altar-stones-header.png`}
              url={`/${area}/${sector}/${block.name}`}
              data={block.sections}
              // Ensures proper horizontal scrolling
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sector;
