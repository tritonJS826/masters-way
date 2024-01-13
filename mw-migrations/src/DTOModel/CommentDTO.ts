export type CommentDTOMigration = {
  uuid: string;
  description: string;
  commentatorUuid: string;
  ownerUuid: string;
}

export type CommentDTO = {
  uuid: string;
  description: string;
  ownerUuid: string;
}