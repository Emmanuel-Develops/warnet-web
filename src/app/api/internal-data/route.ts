import path from "path";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { InternalData } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const teamPath = path.join(process.cwd(), "data", "team-points.json");
    const eventsPath = path.join(process.cwd(), "data", "events.json");

    const points = await fs.readFile(teamPath, "utf-8");
    const events = await fs.readFile(eventsPath, "utf-8");
    
    const data: InternalData = {
      points: JSON.parse(points) ?? {},
      events: JSON.parse(events) ?? [],
    };
    // data.nodes[1].reachable = !data.nodes[1].reachable;

    // await saveDataToJSONFile(data);

    return NextResponse.json({ data, message: "Success" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message ?? "Error generating node data", data: null },
      { status: 500 }
    );
  }
}
