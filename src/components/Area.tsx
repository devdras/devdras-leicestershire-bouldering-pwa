import { type Area as AreaType } from "../types";
import DisplayCard from "./DisplayCard";

const Area = ({ area }: { area: AreaType }) => {
  return (
    <div className="w-full">
      <div className="gap-y-2 flex flex-col border-b pb-1">
        {area.sectors.map((sector) => (
          // <Sector key={sector.name} area={area.name} sector={sector} />
          <DisplayCard
            displayName={sector.displayName}
            image={`/altar-stones-header.png`}
            url={`/${area.name}/${sector.name}`}
            data={sector.blocks}
          />
        ))}
      </div>
    </div>
  );
};

export default Area;
