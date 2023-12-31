import {z} from "zod";

export const CommentDTOSchema = z.object({

  /**
   * Comment's UUID
   */
  uuid: z.string(),

  /**
   * Mentor's and way owner's UUID @User.uuid
   */
  ownerUuid: z.string(),

  /**
   * Comment's text
   */
  description: z.string(),

  /**
   * True if comment was done and false if not
   */
  isDone: z.boolean(),

}).strict();

export const CommentsDTOSchema = z.array(CommentDTOSchema);

/**
 * Mentor's and way owner's comments DTO model
 */
export type CommentDTO = z.infer<typeof CommentDTOSchema>;
