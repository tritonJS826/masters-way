import { Timestamp } from "firebase/firestore";

export type GoalMetricDTONew = {
    uuid: string;
    metricUuids: string[];
    description: string[];
    isDone: boolean[];
    doneDate: Timestamp[];
}
