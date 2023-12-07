export type CurrentProblemDTOMigration = {
  uuid: string;
  description: string;
  isDone: boolean;
  ownerUuid: string;
  tags: string[];
}

export type CurrentProblemDTO = {
  uuid: string;
  description: string;
  isDone: boolean;
}