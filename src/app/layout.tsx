import "./globals.css";
import * as fs from "fs";
import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import CONFIG_DATA from "../../public/config.json";
import QueryProvider from "@/app/providers";
import { AwardedPointsProvider } from "@/contexts/awarded-points-context";
import { EVENT, InternalData } from "@/types";
import path from "path";

const { teams } = CONFIG_DATA;

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Warnet",
  description: "Warnet",
};

const initialiseTeamPoints = () => {
  const teamsJson: { [key: string]: number } = {};

  teams.forEach((team) => {
    teamsJson[team.name] = 0;
  });

  const teamPath = path.join(process.cwd(), "data", "team-points.json");
  if (fs.existsSync(teamPath)) {
    try {
      return JSON.parse(fs.readFileSync(teamPath, "utf-8"));
    } catch (error) {
      return teamsJson;
    }
  } else {
    fs.writeFileSync(
      teamPath,
      JSON.stringify(teamsJson, null, 2),
      "utf-8"
    );
    return teamsJson;
  }
};

const initialiseEvents = (): EVENT[] => {
  const defaultEventsJson = {
    events: [{ message: "initial event", date: "2024-09-25T12:00:00.000Z" }],
  };
  const eventsPath = path.join(process.cwd(), "data", "events.json");
  if (fs.existsSync(eventsPath)) {
    try {
      const eventsJson = JSON.parse(fs.readFileSync(eventsPath, "utf-8"));
      return eventsJson.events;
    } catch (error) {
      return defaultEventsJson.events;
    }
  } else {
    fs.writeFileSync(
      eventsPath,
      JSON.stringify(defaultEventsJson, null, 2),
      "utf-8"
    );
    return defaultEventsJson.events
  }
};

const internalData: InternalData = {
  points: initialiseTeamPoints(),
  events: initialiseEvents(),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibm.variable} font-ibm`}>
        <QueryProvider>
          <AwardedPointsProvider initialInternalData={internalData}>{children}</AwardedPointsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
