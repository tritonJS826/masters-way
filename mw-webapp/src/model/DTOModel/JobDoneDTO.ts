import {TimeUnit} from "src/model/DTOModel/time/timeUnit/TimeUnit";
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
   * Unit of time measurement for {@link time}
   */
  timeUnit: z.nativeEnum(TimeUnit),

  /**
   * Number of time units {@link timeUnit}
   */
  time: z.number(),
}).strict();

/**
 * Job done DTO model
 */
export type JobDoneDTO = z.infer<typeof JobDoneDTOSchema>