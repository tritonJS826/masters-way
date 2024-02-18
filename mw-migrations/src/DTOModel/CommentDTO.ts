export type CommentDTOMigration = {
  uuid: string;
  description: string;
  isDone: boolean;
  ownerUuid: string;
}

export type CommentDTO = {
  uuid: string;
  description: string;
  ownerUuid: string;
}