import {z} from "zod";

export const MetricDTOSchema = z.object({

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

  /**
   * Time when goal metric was done
   */
  doneDate: z.number(),

}).strict();

export const MetricsDTOSchema = z.array(MetricDTOSchema);

/**
 * Goal's metric DTO model
 */
export type MetricDTO = z.infer<typeof MetricDTOSchema>;
