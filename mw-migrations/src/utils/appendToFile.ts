import path from "path";
import * as fs from "fs";

export function appendToFile(data: string, fileName: string) {
  const filePath = path.join(process.cwd(), fileName);

  try {
    fs.appendFileSync(filePath, `${data}\n`, "utf8");
    console.log("The data was appended to file!");
  } catch (err) {
    if (err) console.log(err);
  }
}
