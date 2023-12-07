export type PlanForNextPeriodDTOMigration = {
  uuid: string;
  job: string;
  estimationTime: number;
  ownerUuid: string;
  tags: string[];
  timeUnit: string;
}

export type PlanForNextPeriodDTO = {
  uuid: string;
  job: string;
  estimationTime: number;
  timeUnit: string;
}

