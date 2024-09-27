import { useQuery } from "@tanstack/react-query";
import type { InternalData } from "@/types";

const getData = async (): Promise<InternalData> => {
  return fetch("http://localhost:3000/api/internal-data")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.data);
      return data.data;
    })
    .catch((err) => err);

  // return getInternalData();

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       points: { solomon: 48, emma: 20, andreas: 15 },
  //       events: [
  //         { message: "team solomon awarded 5 points", date: "2024-09-25T00:00:00.000Z" },
  //         { message: "team emmanuel awarded 8 points", date: "2024-09-25T00:00:00.000Z" },
  //       ],
  //     });
  //   }, 1000);
  // });
};

export const useInternalData = ({initialData}: {initialData: InternalData}) =>
  useQuery<InternalData, Error>({
    queryFn: () => getData(),
    queryKey: ["events", "points"],
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 3, // 3 seconds
    initialData: initialData,
  });
