import path from "path";
import * as fs from "fs";

const OUT_DIR = "backups";

// there are some troubles with ':' in windows
const date = new Date().toISOString().replaceAll(":", "-");
const outDir = path.join(process.cwd(), OUT_DIR);

export const writeBackup = (textToLog: string, fileName: string) => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  const logFilePath = path.join(outDir, `${date}_${fileName}.json`);
  
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
