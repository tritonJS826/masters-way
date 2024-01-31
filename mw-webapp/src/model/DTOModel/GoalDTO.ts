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
   * Description of goal
   */
  description: z.string(),

  /**
   * Estimation time for complete goal
   */
  estimationTime: z.number(),

  /**
   * Stringified metrics objects {@link MetricDTO}
   */
  metricsStringified: z.array(z.string()),

}).strict();

export const GoalsDTOSchema = z.array(GoalDTOSchema);

/**
 * Goal DTO model
 */
export type GoalDTO = z.infer<typeof GoalDTOSchema>;

/**
 * Partial GoalDTO schema
 */
export const GoalPartialDTOSchema = GoalDTOSchema.partial().required({[GOAL_UUID_FIELD]: true});

/**
 * GoalPartialDTO model
 */
export type GoalPartialDTO = z.infer<typeof GoalPartialDTOSchema>;
