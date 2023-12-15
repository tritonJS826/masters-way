import {z} from "zod";

export const CurrentProblemDTOSchema = z.object({

  /**
   * Problem's UUID
   */
  uuid: z.string(),

  /**
   * Problem's description
   */
  description: z.string(),

  /**
   * True if problem is resolved and false if not resolved
   */
  isDone: z.boolean(),

  /**
   * Uuid of owner or mentor @User.uuid
   */
  ownerUuid: z.string(),

  /**
   * CurrentProblem's tags
   */
  tags: z.array(z.string()),
}).strict();

/**
 * Problem for current period DTO model
 */
export type CurrentProblemDTO = z.infer<typeof CurrentProblemDTOSchema>;
