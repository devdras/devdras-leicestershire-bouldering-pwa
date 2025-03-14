import { type Area as AreaType } from "../types";
import Sector from "./Sector";

const Area = ({ area }: { area: AreaType }) => {
  return (
    <div className="w-full">
      <div className="gap-y-1 flex flex-col border-b pb-1">
        {area.sectors.map((sector) => (
          <Sector key={sector.name} area={area.name} sector={sector} />
        ))}
      </div>
    </div>
  );
};

export default Area;
