export type GoalDTOMigration = {
  uuid: string;
  studentUuid: string;
  metricUuids: string[];
  description: string;
  estimationTime: number;
}

export type GoalDTO = {
  uuid: string;
  studentUuid: string;
  metricUuids: string[];
  description: string;
  estimationTime: number;
  timeUnit: string;
}

