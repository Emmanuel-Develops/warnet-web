import React from "react";
import * as fs from "fs";
import { LeaderBoardCards, NodeGroupCards } from "@/components/node-group-cards";
import styles from "@/components/styles.module.css";
import { getAllTeamPoints, organiseNodesIntoTeams, sortNodesAccordingToPoints } from "@/helpers";

const page = () => {
  const { nodeGroups } = organiseNodesIntoTeams();
  const teamPoints = getAllTeamPoints();
  const sorted = sortNodesAccordingToPoints();

  const initialiseTeamPointsJSON = () => {
    const teamPoints = getAllTeamPoints();

    const initialiseToZero = Object.fromEntries(Object.entries(teamPoints).map(([key]) => [key, 0]));

    if (fs.existsSync("public/team-points.json")) {
      return;
    } else {
      fs.writeFileSync("public/team-points.json", JSON.stringify(initialiseToZero, null, 2), "utf-8");
      console.log("awarded points initialized");
    }
    return teamPoints;
  };

  initialiseTeamPointsJSON();

  return (
    <div className={`text-black max-h-screen min-h-screen overflow-hidden h-screen flex flex-col p-6 ${styles.adminWrapper}`}>
      <>
        <div className='rounded-lg flex h-[35%] gap-3 flex-[0.3]'>
          <section className='h-full flex flex-col gap-6 px-4 pr-0 rounded-lg w-full text-black dark:text-white'>
            <h2 className='font-medium text-2xl text-white'>Activity Feed</h2>
            <section className='flex flex-col gap-6 p-4 rounded-lg overflow-scroll border border-b border-gray-200 bg-white dark:bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 h-full'>
              <div className='flex gap-4 items-center justify-between w-full h-full'>
                <div className='w-full h-full flex-[0.6]'>
                  <h3 className='text-xl leading-[150%] border-b w-fit'>Activity</h3>
                </div>

                <div className='h-full border border-[#2d2d2d]'></div>
                <div className='w-full h-full flex-[0.4] flex flex-col gap-3'>
                  <h3 className='text-xl leading-[150%] border-b w-fit'>Color Codes</h3>
                  <div className='flex flex-col gap-2'>
                    <section className='flex gap-2 items-center'>
                      <section className='h-6 w-6 rounded bg-green-500'></section>
                      <p className='text-sm'>Reachable Node</p>
                    </section>
                    <section className='flex gap-2 items-center'>
                      <section className='h-6 w-6 rounded bg-red-500'></section>
                      <p className='text-sm'>Unreachable Node</p>
                    </section>
                    <section className='flex gap-2 items-center'>
                      <section className='h-6 w-6 rounded bg-gray-500'></section>
                      <p className='text-sm'>Node outdated</p>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section className='flex flex-col gap-6 px-4 pl-0 rounded-lg w-full text-black dark:text-white'>
            <h2 className='font-medium text-2xl text-white'>Leaderboard</h2>
            <section className='flex flex-col gap-6 p-4 rounded-lg overflow-scroll border border-b border-gray-200 bg-white dark:bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 h-full'>
              {Object.entries(sorted).map(([key], index) => (
                <LeaderBoardCards teamName={key} index={index + 1} key={`${key}-${index}`} pointsMapper={teamPoints} />
              ))}
            </section>
          </section>
        </div>
      </>

      <>
        <div className='p-4 pb-6 rounded-lg flex flex-col gap-3 h-[65%] overflow-scroll'>
          <h2 className='font-medium text-2xl text-white'>Teams</h2>
          <section className={styles.gridStyles}>
            {Object.entries(nodeGroups).map(([key, value], index) => (
              <NodeGroupCards teamName={key} data={value} key={`${key}-${index}`} pointsMapper={teamPoints} />
            ))}
          </section>
        </div>
      </>
    </div>
  );
};

export default page;
