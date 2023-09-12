import {Goal} from "src/model/businessModel/Goal";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {Time} from "src/model/businessModel/time/Time";
// import {User} from "src/model/businessModel/User";
import {Goal as GoalDTO} from "src/model/firebaseCollection/Goal";
import {GoalMetricService} from "src/service/GoalMetricService";
// import {UserService} from "src/service/UserService";

// const usersRaw = await UserService.onValueFromRealTimeDb();
const goalMetricsRaw = await GoalMetricService.onValueFromRealTimeDb();

export const GoalDTOToGoalConverter = (goalRaw: GoalDTO) => {
  // const user: User = usersRaw.find((elem) => elem.uuid === goalRaw.studentUuid) || usersRaw[0];

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

