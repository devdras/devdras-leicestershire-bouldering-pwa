import { data } from "../data";
import { Settings } from "lucide-react";
import Area from "../components/Area";
import { Area as AreaType } from "../types";

const Areas = () => {
  return (
    <div className="p-2 flex flex-col gap-y-2">
      <div className=" flex items-center justify-between w-full">
        <input type="text" placeholder="Search" className="w-full" />
        <button className="rounded p-2">
          <Settings />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        {data.map((area) => (
          <div className="">
            <a href={`/${area.name}`} className="font-bold">
              {area.displayName}
            </a>
            <Area key={area.name} area={area as AreaType} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Areas;
