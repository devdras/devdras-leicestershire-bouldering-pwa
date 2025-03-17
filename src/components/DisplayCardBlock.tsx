import SimpleBarChart from "./SimpleBarChart";
import { gradeMap } from "../utils/gradeMap";

const DisplayCardBlock = ({
  area,
  sector,
  block,
}: {
  area: string;
  sector: string;
  block: any;
}) => {
  const sortedArray = gradeMap(block.sections);

  return (
    <a
      href={`/areas/${area}/${sector}/${block.name}`}
      className="flex gap-x-2 flex flex-col flex-grow overflow-hidden"
    >
      <p className="font-bold">{block.displayName}</p>
      <p>{block.overview}</p>

      <div className="flex items-center scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-grow items-center gap-x-2 scroll-smooth touch-pan-x touch-pan-y overflow-x-auto p-1 h-full">
        <SimpleBarChart data={sortedArray} />
        {block.sections.map((section: any) => (
          <img
            src={`/${area}/${sector}/${block.name}/${section.name}/topo.webp`}
            className="h-32"
          />
        ))}
      </div>
    </a>
  );
};
export default DisplayCardBlock;
