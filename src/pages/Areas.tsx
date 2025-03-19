import { data } from "../data";
import Area from "../components/Area";
import { Area as AreaType } from "../types";

const Areas = () => {
  return (
    <div className="p-2 flex flex-col gap-y-2">
      {data.map((area) => (
        <div className="">
          <a href={`/areas/${area.name}`} className="font-bold text-xl">
            {area.displayName}
          </a>
          <Area key={area.name} area={area as AreaType} />
        </div>
      ))}
    </div>
  );
};
export default Areas;
