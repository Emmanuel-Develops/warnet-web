"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useInternalData } from "@/services/useInternalData";
import { InternalData } from "@/types";

type AwardedPointsContext = {
  internalData: InternalData;
  points: Record<string, number>;
  stylePoints: {name: string, score: string};
  updateStylePoints: ({type, value}: {type: "name" | "score", value: string}) => void;
  savePoints: () => void;
}

export const awardedPointsContext = React.createContext<AwardedPointsContext>(null!);

export const AwardedPointsProvider = ({
  children,
  initialInternalData,
}: {
  children: React.ReactNode;
  initialInternalData: InternalData;
}) => {
  const defaultStylePoints = {
    name: "",
    score: ""
  }
  const [points, setPoints] = useState(initialInternalData.points);
  const {data: internalData} = useInternalData({initialData: initialInternalData});

  console.log("internalData at award context", {internalData})

  const [stylePoints, setStylePoints] = useState(defaultStylePoints);

  const updateStylePoints = ({type, value}: {type: "name" | "score", value: string}) => {
    setStylePoints({...stylePoints, [type]: value});
  }

  const handleSaveConfig = async () => {
    updateClientPoints({name: stylePoints.name, score: Number(stylePoints.score)});
    try {
      const response = await fetch("/api/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [stylePoints.name]: Number(stylePoints.score) }),
      });

      const result = await response.json();
      if (response.ok) {
        updateClientPoints({name: stylePoints.name, score: Number(stylePoints.score)});
        console.log("updated config result");
      } else {
        alert("Error: " + result.message);
      }
      setStylePoints(defaultStylePoints)
    } catch (error) {
      console.error("Failed to save config:", error);
    }
  };

  const updateClientPoints = ({name, score}: {name: string, score: number}) => {
    console.log({name, score});
    const newPoints = JSON.parse(JSON.stringify(points));
    newPoints[name] = (newPoints[name] ?? 0) + score;
    console.log({newPoints})
    setPoints({...newPoints});
  }

  return (
    <awardedPointsContext.Provider
      value={{
        points,
        internalData,
        stylePoints,
        updateStylePoints,
        savePoints: handleSaveConfig,
      }}
    >
      {children}
    </awardedPointsContext.Provider>
  );
};

export const useAwardedPointsContext = () => {
  const context = React.useContext(awardedPointsContext);
  if (context === undefined) {
    throw new Error("useNetworkContext must be used within a AwardedPointsProvider");
  }
  return context;
};
