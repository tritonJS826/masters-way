import {z} from "zod";

export const PlanForNextPeriodDTOSchema = z.object({

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

/**
 * Plan for next period DTO model
 */
export type PlanForNextPeriodDTO = z.infer<typeof PlanForNextPeriodDTOSchema>;
