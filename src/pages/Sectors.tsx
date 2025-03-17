import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { data } from "../data";
import type { Sector as SectorType } from "../types";
import InfoPiece from "../components/InfoPiece";
import DisplayCard from "../components/DisplayCard";
import ConditionalImage from "../components/ConditionalImage";

const Sectors = () => {
  const { areaName, sectorName } = useParams(); // Updated param names
  const [thisSector, setThisSector] = useState<SectorType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundArea = data.find(
      (filteredArea: { name: string; sectors: SectorType[] }) =>
        filteredArea.name === areaName
    );

    const foundSector = foundArea?.sectors.find(
      (filteredSector: { name: string }) => filteredSector.name === sectorName
    );

    setThisSector(foundSector as SectorType);
    setLoading(false);
  }, [areaName, sectorName]); // Updated dependency array

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!thisSector) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Sector not found</h2>
        <p>The requested sector could not be found.</p>
        <a
          href={`/areas/${areaName}`}
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Return to area
        </a>
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col gap-y-2">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <a href={`/areas/${areaName}`} className="hover:underline">
          {areaName}
        </a>
        <span>›</span>
        <span className="font-medium text-gray-700">
          {thisSector.displayName}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-bold text-xl">{thisSector.displayName}</p>
        <p className="text-sm">{thisSector.gpsCoordinates}</p>
      </div>

      <InfoPiece title={"Overview"} info={thisSector.overview} />
      <InfoPiece title={"Access"} info={thisSector.access} />
      <InfoPiece title={"Conditions"} info={thisSector.conditions} />
      <InfoPiece title={"Approach"} info={thisSector.approach} />

      <ConditionalImage
        src={`/${areaName}/${sectorName}/map.webp`}
        alt={thisSector.displayName}
      />

      <div className="flex flex-col gap-y-2">
        <p className="font-bold">Blocks</p>
        {thisSector.blocks.map((block, index) => (
          <DisplayCard
            key={index}
            displayName={block.displayName}
            image={`/altar-stones-header.png`}
            url={`/areas/${areaName}/${sectorName}/${block.name}`}
            data={block.sections}
          />
        ))}
      </div>
    </div>
  );
};

export default Sectors;
