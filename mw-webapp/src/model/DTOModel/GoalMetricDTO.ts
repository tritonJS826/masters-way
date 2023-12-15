import {timestampType} from "fireschema";
import {z} from "zod";

/**
 * If you choose all fields by the same index you will get data for specific GoalMetric
 */
export const GoalMetricDTOSchema = z.object({

  uuid: z.string().uuid(),

  /**
   * Metric's UUID
   */
  metricUuids: z.array(z.string().uuid()),

  /**
   * Metrics's description
   */
  description: z.array(z.string()),

  /**
   * True if comment was done and false if not
   */
  isDone: z.array(z.boolean()),

  /**
   * Time when goal metric was done in ms
   */
  doneDate: z.array(timestampType()),
}).strict();

/**
 * Goal's metrics DTO model
 */
export type GoalMetricDTO = z.infer<typeof GoalMetricDTOSchema>;
