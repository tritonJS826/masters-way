import {z} from "zod";

export const ProblemDTOSchema = z.object({

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

export const ProblemsDTOSchema = z.array(ProblemDTOSchema);

/**
 * Problem for current period DTO model
 */
export type ProblemDTO = z.infer<typeof ProblemDTOSchema>;
