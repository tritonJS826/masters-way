import { JobTag } from "./JobDoneDTO.js";

export type PlanForNextPeriodDTOMigration = {
  uuid: string;
  job: string;
  estimationTime: number;
  ownerUuid: string;
  tags: JobTag[];
}

export type PlanTagDTOMigration = {
  uuid: string;
  name: string;
  description: string;
  color: string;
}

export type PlanForNextPeriodDTO = {
  estimationTime: number;
  job: string;
  ownerUuid: string;
  tags: string[];
  uuid: string;
}

