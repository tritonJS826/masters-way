export type CommentDTOMigration = {
  uuid: string;
  description: string;
  isDone: boolean;
  commentatorUuid: string;
  ownerUuid: string;
}

export type CommentDTO = {
  uuid: string;
  description: string;
  isDone: boolean;
  ownerUuid: string;
}