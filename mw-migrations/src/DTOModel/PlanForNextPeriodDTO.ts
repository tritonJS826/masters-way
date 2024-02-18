export type PlanForNextPeriodDTOMigration = {
  uuid: string;
  job: string;
  estimationTime: number;
  ownerUuid: string;
  tags: string[];
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

