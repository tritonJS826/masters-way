import { WayService } from "../service/WayService.js";

export const exportWays = async (params: {log: (textToLog: string) => void, backupToFile: (data:string) => void}) => {
  params.log(`Starting export Ways collection`)
  const allWays = await WayService.getWaysDTO();
  params.log(`Got ${allWays.length} ways`);

  params.backupToFile(JSON.stringify(allWays));
  params.log(`Export WAYS finished`);

  return allWays.length;
}
