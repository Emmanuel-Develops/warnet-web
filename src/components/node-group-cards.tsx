import React from "react";
import { NodeDataWithStatus } from "@/types";
import { StatusCofig } from "@/app/config";

type NodeItemProps = {
  data: NodeDataWithStatus;
};
const NodeItem = ({ data }: NodeItemProps) => {
  const { reachable, id, tips } = data;

  const color = StatusCofig[data.status as keyof typeof StatusCofig];
  return (
    <div
      className={`${color} py-1 px-2.5 border border-[#2d2d2d]  flex items-center justify-center rounded cursor-pointer`}
    >
      <p className='font-semibold text-white'>{id}</p>
    </div>
  );
};

type NodeGroupCardsProps = {
  data: NodeDataWithStatus[];
  teamName: string;
  pointsMapper: Record<string, number>;
};

export const NodeGroupCards = ({ data, teamName, pointsMapper }: NodeGroupCardsProps) => {
  
  const reachableNodes = data.filter((item) => item.reachable).length;

  return (
    <div className='border p-3 rounded-xl w-full text-black dark:text-white flex flex-col items-start relative border-b border-gray-200 bg-white dark:bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30 '>
      <section className='flex flex-col gap-2'>
        <section className='flex gap-2 items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <h3 className='font-medium text-xl capitalize'>Team {teamName}</h3>
          </div>
        </section>
      </section>

      <div className='pt-5 flex flex-col gap-3 w-full'>
        <aside className='flex gap-2 items-center'>
          <p className=' font-medium text-white text-sm'>Nodes ({reachableNodes} active)</p>
          <div className='rounded-full bg-white h-2 w-2 opacity-40'></div>
          <p className=' font-medium text-white text-sm'>Total Points : {pointsMapper[teamName]}</p>
        </aside>
        <section className='flex gap-2 overflow-scroll w-fit max-w-fit flex-wrap'>
          {data.map((item, index) => (
            <NodeItem data={item} key={`${item.id}-${index}`} />
          ))}
        </section>
      </div>
    </div>
  );
};

type LeaderBoardCardsProps = {
  teamName: string;
  index: number;
  pointsMapper: Record<string, number>;
  awardedPoints: Record<string, number>;
};

export const LeaderBoardCards = ({ teamName, index, pointsMapper, awardedPoints }: LeaderBoardCardsProps) => {
  const totalPoints = pointsMapper[teamName] + (awardedPoints[teamName] ?? 0);

  return (
    <div className='flex gap-3 items-center'>
      <p className=' text-white font-semibold'>{index}.</p>
      <div className='flex justify-between w-full items-center'>
        <section>
          <p className='text-xl capitalize font-medium'>Team {teamName}</p>
        </section>
        <section>
          <p className=' text-xl font-medium'>
            {pointsMapper[teamName]} {totalPoints} <span className='font-normal opacity-75'>pts</span>
          </p>
        </section>
      </div>
    </div>
  );
};
