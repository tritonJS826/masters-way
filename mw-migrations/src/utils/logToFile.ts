import path from "path";
import * as fs from "fs";

const OUT_DIR = "migration-logs";

// there are some troubles with ':' in windows
const date = new Date().toISOString().replaceAll(":", "-");
const logsDir = path.join(process.cwd(), OUT_DIR);

export const logToFile = (textToLog: string, fileName: string) => {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  const logFilePath = path.join(logsDir, `${date}_${fileName}.txt`);
  
  if (fs.existsSync(logFilePath)) {
    console.log(textToLog);
    fs.appendFileSync(logFilePath, `${textToLog}\n`, "utf8");
  } else {
    console.log('file created')
    console.log(textToLog);
    fs.writeFileSync(logFilePath, textToLog);
    fs.appendFileSync(logFilePath, `$\n`, "utf8");
  }
}
