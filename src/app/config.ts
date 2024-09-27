
import { GameConfig } from "@/types";
import CONFIG_DATA from "../../public/config.json";

export const StatusCofig = {
  reachable: "bg-green-500",
  unreachable: "bg-red-500",
  lagging: "bg-gray-600",
} as const;

export const getConfig = () => {
  return CONFIG_DATA as GameConfig;
} 

// export const getTeamPoints = () => {
//   return AWARDED_TEAM_POINTS as Record<string, number>;
// }

export type StatusCofigType = keyof typeof StatusCofig;