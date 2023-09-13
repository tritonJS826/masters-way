import {Goal} from "src/model/businessModel/Goal";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Time} from "src/model/businessModel/time/Time";
import {Goal as GoalDTO} from "src/model/firebaseCollection/Goal";
import {GoalMetricService} from "src/service/GoalMetricService";

const goalMetricsRaw = await GoalMetricService.getValueFromRealTimeDb();

export const GoalDTOToGoalConverter = (goalRaw: GoalDTO) => {

  const goalMetrics = goalRaw.metrics?.map((item) => {
    const goalMetric: GoalMetric = goalMetricsRaw
      .find((elem) => elem.uuid === item) || goalMetricsRaw[0];
    return goalMetric;
  });

  const time = new Time({
    timeUnit: goalRaw.timeUnit,
    amount: goalRaw.estimationTime,
    getTime() {
      return `${this.amount} ${this.timeUnit}`;
    },
  });

  return new Goal({
    ...goalRaw,
    time: time,
    metrics: goalMetrics,
  });
};

