import path from "path";
import * as fs from "fs";
import { formatDate } from "./formatDate.js";

export function logFile(logData: string, fileName: string, date: Date) {
  const logsDir = path.join(process.cwd(), "migration-logs");
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  const logFilePath = path.join(logsDir, `${fileName}_${formatDate(date)}.txt`);

  fs.writeFileSync(logFilePath, logData);
}
