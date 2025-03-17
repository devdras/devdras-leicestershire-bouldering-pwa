import InfoPiece from "../components/InfoPiece";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { data } from "../data";
import { type Block as BlockType, type Sector as SectorType } from "../types";
import TickButton from "../components/TickButton";

const Blocks = () => {
  const { area, sector, block } = useParams(); // Get URL param
  console.log(area);
  console.log(sector);
  console.log(block);

  const [thisBlock, setThisBlock] = useState<BlockType | null>(null);

  useEffect(() => {
    const foundArea = data.find(
      (filteredArea: { name: string; sectors: SectorType[] }) =>
        filteredArea.name === area
    );
    console.log(foundArea);
    const foundSector = foundArea?.sectors.find(
      (filteredSector: { name: string }) => filteredSector.name === sector
    );

    const foundBlock = foundSector?.blocks.find(
      (filteredBlock: { name: string }) => filteredBlock.name === block
    );

    console.log(foundBlock);
    setThisBlock(foundBlock as BlockType);
  }, [area]); // Re-run effect when `area` changes

  if (!thisBlock) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2 ">
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
                <div key={index} className="">
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
