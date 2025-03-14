import { type Block as BlockType } from "../types";

const Block = ({ block }: { block: BlockType }) => {
  return (
    <div>
      <p className="font-bold">{block.displayName}</p>
      <p>{block.overview}</p>
      <div className="">
        {block.sections.map((section) => (
          <div className="">
            <p>{section.displayName}</p>
            <div className="">
              {section.routes.map((route) => (
                <div className="">
                  <p>{route.displayName}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Block;
