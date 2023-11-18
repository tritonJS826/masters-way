import {z} from "zod";

export const GoalMetricDTOSchema = z.object({

  /**
   * Metric's UUID
   */
  uuid: z.string(),

  /**
   * Metrics's description
   */
  description: z.string(),

  /**
   * True if comment was done and false if not
   */
  isDone: z.boolean(),
}).strict();

/**
 * Goal's metrics DTO model
 */
export type GoalMetricDTO = z.infer<typeof GoalMetricDTOSchema>
