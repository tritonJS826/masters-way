import {z} from "zod";

export const PlanDTOSchema = z.object({

  /**
   * Plan's UUID
   */
  uuid: z.string(),

  /**
   * Task that should be done in next period
   */
  job: z.string(),

  /**
   * Uuid of User @User.uuid
   */
  ownerUuid: z.string(),

  /**
   * Estimation number of time units in minutes
   */
  estimationTime: z.number(),

  /**
   * JobDone's tags
   */
  tags: z.array(z.string()),

}).strict();

export const PlansDTOSchema = z.array(PlanDTOSchema);

/**
 * Plan for next period DTO model
 */
export type PlanDTO = z.infer<typeof PlanDTOSchema>;
