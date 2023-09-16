import path from "path";
import fs from "fs";

const FILE_LOCATION = path.resolve("src/component/button/Button.tsx");


const generateEnvIfNotExist = (modulePath: string) => {

  fs.readFile(modulePath, function (err, data) {
    if (err) {
      throw err;
    }
    if(data.includes("console.log")){
      console.log("222");
    } else {
      console.log("Success!!");
    }
  });

};

generateEnvIfNotExist(FILE_LOCATION);

console.log(`Looking for console.log in file ${FILE_LOCATION}`);
console.log(111);
