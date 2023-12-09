import {z} from "zod";

export const JobDoneDTOSchema = z.object({

  /**
   * Job's UUID
   */
  uuid: z.string(),

  /**
   * What was done
   */
  description: z.string(),

  /**
   * Number of time units in minutes
   */
  time: z.number(),

  /**
   * JobDone's tags
   */
  tags: z.array(z.string()),
}).strict();

/**
 * Job done DTO model
 */
export type JobDoneDTO = z.infer<typeof JobDoneDTOSchema>;