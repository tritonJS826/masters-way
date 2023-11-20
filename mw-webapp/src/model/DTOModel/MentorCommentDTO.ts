import {z} from "zod";

export const MentorCommentDTOSchema = z.object({

  /**
   * Comment's UUID
   */
  uuid: z.string(),

  /**
   * Mentor's UUID @User.uuid
   */
  mentorUuid: z.string(),

  /**
   * Comment's text
   */
  description: z.string(),

  /**
   * True if comment was done and false if not
   */
  isDone: z.boolean(),
}).strict();

/**
 * Mentor's comments DTO model
 */
export type MentorCommentDTO = z.infer<typeof MentorCommentDTOSchema>
