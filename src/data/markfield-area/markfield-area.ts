import { altarStonesAreaData } from "./sectors/altar-stones";
import { markfieldQuarryAreaData } from "./sectors/markfield-quarry";

export const markfieldAreaData = {
  name: `markfield-area`,
  displayName: `Markfield Area`,
  overview: `Area in Leicestershire.`,
  conditions: ``,
  approach: ``,
  access: ``,
  sectors: [altarStonesAreaData, markfieldQuarryAreaData],
};
