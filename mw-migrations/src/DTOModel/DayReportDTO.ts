import { Timestamp } from "firebase/firestore";

export type DayReportDTOMigration = {
  uuid: string;
  date: Timestamp;
  jobDoneUuids: string[];
  planForNextPeriodUuids: string[];
  problemForCurrentPeriodUuids: string[];
  commentUuids: string[];
  isDayOff: boolean;
}

export type DayReportDTO = {
  uuid: string;
  date: string;
  jobDoneUuids: string[];
  planForNextPeriodUuids: string[];
  problemForCurrentPeriodUuids: string[];
  commentUuids: string[];
  isDayOff: boolean;
}

