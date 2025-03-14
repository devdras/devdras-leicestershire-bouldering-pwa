import { type Sector as SectorType } from "../types";
import SimpleBarChart from "./SimpleBarChart";
import { gradeOrder } from "../lib/gradeOrder";

const Sector = ({ area, sector }: { area: string; sector: SectorType }) => {
  // create array of grades
  const gradeArray: string[] = [];
  sector.blocks.forEach((block) => {
    block.sections.forEach((section) => {
      section.routes.forEach((route) => {
        gradeArray.push(route.grade);
      });
    });
  });

  // get unique list of grades
  const uniqueGrades = [...new Set(gradeArray)];

  // for each unique grade get the number of them in the gradeArray
  const gradeCount = uniqueGrades.map((grade) => {
    return {
      grade: grade,
      count: gradeArray.filter((item) => item === grade).length,
    };
  });

  const sortedArray = gradeCount.sort((a, b) => {
    return gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
  });

  return (
    <a href={`/${area}/${sector.name}`} className="flex h-40 gap-x-2">
      <img
        src={`/altar-stones-header.png`}
        alt=""
        className="w-40 h-40 rounded flex-shrink-0"
      />
      <div className="flex flex-col flex-grow overflow-hidden">
        <span>{sector.displayName}</span>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2 flex-grow">
          <div className="scroll-smooth touch-pan-x touch-pan-y overflow-x-auto p-1 h-full">
            <SimpleBarChart data={sortedArray} />
          </div>
        </div>
      </div>
    </a>
  );
};
export default Sector;
