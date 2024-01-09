import {z} from "zod";

export const GOAL_UUID_FIELD = "uuid";

export const GoalDTOSchema = z.object({

  /**
   * Goal's UUID
   */
  [GOAL_UUID_FIELD]: z.string(),

  /**
   * Student's UUID @User.uuid
   */
  studentUuid: z.string(),

  /**
   * Metrics @GoalMetrics.uuid
   */
  metricUuids: z.array(z.string()),

  /**
   * Description of goal
   */
  description: z.string(),

  /**
   * Estimation time for complete goal
   */
  estimationTime: z.number(),
}).strict();

export const GoalsDTOSchema = z.array(GoalDTOSchema);

/**
 * Goal DTO model
 */
export type GoalDTO = z.infer<typeof GoalDTOSchema>;
