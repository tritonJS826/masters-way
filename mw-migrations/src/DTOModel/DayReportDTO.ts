import { Timestamp } from "firebase/firestore";
import { CommentDTO } from "./CommentDTO.js";
import { JobDoneDTO } from "./JobDoneDTO.js";
import { PlanForNextPeriodDTO } from "./PlanForNextPeriodDTO.js";
import { CurrentProblemDTO } from "./CurrentProblemDTO.js";

export type DayReportDTOMigration = {
  uuid: string;
  createdAt: Timestamp;
  jobsDoneStringified: string[];
  plansStringified: string[];
  problemsStringified: string[];
  commentsStringified: string[];
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

export type DayReportBackup = {
  uuid: string;
  commentsStringified: CommentDTO[],
  jobsDoneStringified: JobDoneDTO[],
  plansStringified: PlanForNextPeriodDTO[],
  problemsStringified: CurrentProblemDTO[],
  createdAt: {
    seconds: number,
    nanoseconds: number,
  }
  updatedAt: {
    seconds: number,
    nanoseconds: number,
  }
  /**
   * @deprecated
   */
  isDayOff: boolean;
}

