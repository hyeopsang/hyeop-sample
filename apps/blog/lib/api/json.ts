import { promises as fs } from "fs";
import path from "path";

import { DatabaseStructure } from "@/app/types";

const dataFilePath = path.join(process.cwd(), "data/db.json");

export async function readData(): Promise<DatabaseStructure> {
  const data = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(data);
}

export async function writeData(data: DatabaseStructure): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
}
