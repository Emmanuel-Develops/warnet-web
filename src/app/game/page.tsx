import React from "react";
import Game from "./game";
import { GameConfig } from "@/types";
import CONFIG_DATA from "@/public/config.json";

const page = () => {
  const config = CONFIG_DATA as GameConfig;

  return (
      <Game gameConfig={config} />
  );
};

export default page;
