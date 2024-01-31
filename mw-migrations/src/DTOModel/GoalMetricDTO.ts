import { Timestamp } from "firebase/firestore";

export type GoalMetricDTOMigration = {
  uuid: string;
  description: string;
  isDone: boolean;
  doneDate: number | null;
}

export type GoalMetricDTONew = {
    uuid: string;
    metricUuids: string[];
    description: string[];
    isDone: boolean[];
    doneDate: Timestamp[];
}

export type GoalMetricBackup = {
    uuid: string;
    metricUuids: string[];
    description: string[];
    isDone: boolean[];
    doneDate: {
        seconds: number,
        nanoseconds: number,
    }[];
}
