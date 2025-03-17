import { type Area as AreaType } from "../types";
import DisplayCard from "./DisplayCard";

const Area = ({ area }: { area: AreaType }) => {
  return (
    <div>
      <div className="gap-y-2 flex flex-col pb-1 mt-2">
        {area.sectors.map((sector) => (
          <DisplayCard
            displayName={sector.displayName}
            image={`/altar-stones-header.png`}
            url={`/areas/${area.name}/${sector.name}`}
            data={sector.blocks}
          />
        ))}
      </div>
    </div>
  );
};

export default Area;
