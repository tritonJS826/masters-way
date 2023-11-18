import {TimeUnit} from "src/model/DTOModel/time/timeUnit/TimeUnit";
import {z} from "zod";

export const GoalDTOSchema = z.object({

  /**
   * Goal's UUID
   */
  uuid: z.string(),

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
   * Enum @Time.unit for {@link estimationTime}
   */
  timeUnit: z.nativeEnum(TimeUnit),

  /**
   * Estimation time for complete goal
   */
  estimationTime: z.number(),
}).strict();

export const GoalDTOArraySchema = z.array(GoalDTOSchema);

/**
 * Goal DTO model
 */
export type GoalDTO = z.infer<typeof GoalDTOSchema>
