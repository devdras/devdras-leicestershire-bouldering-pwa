import { useEffect, useState } from "react";
import { useParams } from "react-router";
import InfoPiece from "../components/InfoPiece";
import TickButton from "../components/TickButton";
import { data } from "../data";
import { type Block as BlockType, type Sector as SectorType } from "../types";

const Block = () => {
  const { area, sector, block } = useParams();
  const [thisBlock, setThisBlock] = useState<BlockType | null>(null);

  useEffect(() => {
    const foundArea = data.find(
      (filteredArea: { name: string; sectors: SectorType[] }) =>
        filteredArea.name === area
    );
    const foundSector = foundArea?.sectors.find(
      (filteredSector: { name: string }) => filteredSector.name === sector
    );
    const foundBlock = foundSector?.blocks.find(
      (filteredBlock: { name: string }) => filteredBlock.name === block
    );

    setThisBlock(foundBlock as BlockType);
  }, [area, sector, block]); // Also listen for `sector` & `block` changes

  if (!thisBlock) {
    return <div className="text-center text-lg py-4">Block not found</div>;
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <p className="font-bold text-2xl sm:text-3xl">
          {thisBlock.displayName}
        </p>
        <p className="text-base text-gray-600 truncate max-w-full sm:max-w-xs">
          {thisBlock.gpsCoordinates}
        </p>
      </div>

      {/* Info Sections */}
      <InfoPiece title="Overview" info={thisBlock.overview} />
      <InfoPiece title="Access" info={thisBlock.access} />
      <InfoPiece title="Conditions" info={thisBlock.conditions} />
      <InfoPiece title="Approach" info={thisBlock.approach} />

      {/* Sections */}
      <div className="flex flex-col gap-y-4">
        {thisBlock.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-y-3">
            {/* Section Title */}
            <p className="font-bold text-lg bg-gray-100 rounded-lg p-3">
              {section.displayName}
            </p>

            {/* Routes */}
            <div className="p-3 bg-gray-50 rounded-lg">
              {section.routes.map((route, routeIndex) => (
                <div key={routeIndex} className="pb-3 border-b last:border-b-0">
                  {/* Route Title + TickButton */}
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-base">
                      {`${route.number}. ${route.displayName} (${route.grade})`}
                    </p>
                    <TickButton />
                  </div>

                  {/* Route Description */}
                  <p className="text-sm text-gray-700">{route.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Block;
