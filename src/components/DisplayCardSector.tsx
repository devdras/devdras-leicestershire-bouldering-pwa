import SimpleBarChart from "./SimpleBarChart";
import { gradeMap } from "../utils/gradeMap";

const DisplayCardSector = ({
  displayName,
  image,
  url,
  data,
}: {
  displayName: string;
  image: string;
  url: string;
  data: any;
}) => {
  const sortedArray = gradeMap(data);

  return (
    <a href={url} className="flex gap-x-2">
      <div className="flex flex-col flex-grow overflow-hidden">
        <p className="font-bold">{displayName}</p>
        <div className="flex items-center scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-grow items-center gap-x-2 scroll-smooth touch-pan-x touch-pan-y overflow-x-auto p-1 h-full">
          <img
            src={image}
            alt=""
            className="w-48 h-48 rounded flex-shrink-0 object-cover"
          />
          <SimpleBarChart data={sortedArray} />
        </div>
      </div>
    </a>
  );
};
export default DisplayCardSector;
