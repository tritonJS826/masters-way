import {TimeUnit} from "src/model/DTOModel/time/timeUnit/TimeUnit";
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
   * Unit of time measurement for {@link estimationTime}
   */
  timeUnit: z.nativeEnum(TimeUnit),

  /**
   * Estimation number of time units {@link timeUnit}
   */
  estimationTime: z.number(),

}).strict();

/**
 * Plan for next period DTO model
 */
export type PlanForNextPeriodDTO = z.infer<typeof PlanForNextPeriodDTOSchema>
