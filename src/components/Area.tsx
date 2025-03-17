import { type Area as AreaType } from "../types";
import DisplayCardSector from "./DisplayCardSector";

const Area = ({ area }: { area: AreaType }) => {
  return (
    <div>
      <div className="gap-y-2 flex flex-col pb-1 mt-2">
        {area.sectors.map((sector) => (
          <DisplayCardSector
            displayName={sector.displayName}
            image={`/${area.name}/${sector.name}/preview.webp`}
            url={`/areas/${area.name}/${sector.name}`}
            data={sector.blocks}
          />
        ))}
      </div>
    </div>
  );
};

export default Area;
