import { GoalMetricService } from "../service/GoalMetricService.js";

export const exportGoalMetrics = async (params: {log: (textToLog: string) => void, backupToFile: (data:string) => void}) => {
  params.log(`Starting export GoalMetrics collection`)
  const allGoalMetrics = await GoalMetricService.getGoalMetricsDTO();
  params.log(`Got ${allGoalMetrics.length} goalMetrics`)

  params.backupToFile(JSON.stringify(allGoalMetrics));
  params.log(`Export GOALS finished`);

  return allGoalMetrics.length;
}