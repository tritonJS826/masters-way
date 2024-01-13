import { GoalService } from "../../service/GoalService.js";

export const exportGoals = async (params: {log: (textToLog: string) => void, backupToFile: (data:string) => void}) => {
  params.log(`Starting export Goals collection`)
  const allGoals = await GoalService.getGoalsDTO();
  params.log(`Got ${allGoals.length} goals`)

  params.backupToFile(JSON.stringify(allGoals));
  params.log(`Export GOALS finished`);

  return allGoals.length;
}