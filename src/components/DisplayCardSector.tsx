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
      <div className="flex flex-grow overflow-hidden gap-x-2">
        <img
          src={image}
          alt=""
          className="w-40 h-40 rounded flex-shrink-0 object-cover"
        />
        <div className="">
          <p className="font-bold">{displayName}</p>
          <div className="flex flex-col items-center scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-grow items-center gap-x-2 scroll-smooth touch-pan-x touch-pan-y overflow-x-auto p-1 h-full">
            <SimpleBarChart data={sortedArray} />
          </div>
        </div>
      </div>
    </a>
  );
};
export default DisplayCardSector;
