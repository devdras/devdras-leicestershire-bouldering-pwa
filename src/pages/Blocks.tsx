import InfoPiece from "../components/InfoPiece";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { data } from "../data";
import type { Block as BlockType, Sector as SectorType } from "../types";
import TickButton from "../components/TickButton";

const Blocks = () => {
  const { areaName, sectorName, blockName } = useParams(); // Updated param names
  const [thisBlock, setThisBlock] = useState<BlockType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundArea = data.find(
      (filteredArea: { name: string; sectors: SectorType[] }) =>
        filteredArea.name === areaName
    );

    const foundSector = foundArea?.sectors.find(
      (filteredSector: { name: string }) => filteredSector.name === sectorName
    );

    const foundBlock = foundSector?.blocks.find(
      (filteredBlock: { name: string }) => filteredBlock.name === blockName
    );

    setThisBlock(foundBlock as BlockType);
    setLoading(false);
  }, [areaName, sectorName, blockName]); // Updated dependency array

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!thisBlock) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Block not found</h2>
        <p>The requested block could not be found.</p>
        <a
          href={`/areas/${areaName}/${sectorName}`}
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Return to sector
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 ">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-500 p-2">
        <a href={`/areas/${areaName}`} className="hover:underline">
          {areaName}
        </a>
        <span>›</span>
        <a
          href={`/areas/${areaName}/${sectorName}`}
          className="hover:underline"
        >
          {sectorName}
        </a>
        <span>›</span>
        <span className="font-medium text-gray-700">
          {thisBlock.displayName}
        </span>
      </div>

      <div className="flex justify-between items-center p-2">
        <p className="font-bold text-xl">{thisBlock.displayName}</p>
        <p className="text-sm">{thisBlock.gpsCoordinates}</p>
      </div>

      <div className="p-2">
        <InfoPiece title={"Overview"} info={thisBlock.overview} />
        <InfoPiece title={"Access"} info={thisBlock.access} />
        <InfoPiece title={"Conditions"} info={thisBlock.conditions} />
        <InfoPiece title={"Approach"} info={thisBlock.approach} />
      </div>

      <div className="flex flex-col gap-y-2">
        {thisBlock.sections.map((section, index) => (
          <div key={index} className="flex flex-col gap-y-2">
            <p className="font-bold bg-gray-200 rounded p-2">
              {section.displayName}
            </p>
            {/* pic goes here */}
            <div className="p-2">
              {section.routes.map((route, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <p className="font-bold">{`${route.number} ${route.displayName} ${route.grade}`}</p>
                    <TickButton />
                  </div>

                  <p>{route.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blocks;
