export type GoalDTOMigration = {
  uuid: string;
  description: string;
  estimationTime: number;
  studentUuid: string;
  metricsStringified: string[];
}

export type GoalDTO = {
  uuid: string;
  studentUuid: string;
  metricUuids: string[];
  description: string;
  estimationTime: number;
  timeUnit: string;
}

