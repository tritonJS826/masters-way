
import {z} from "zod";

export const DayReportDTOSchema = z.object({

  /**
   * Day report's UUID
   */
  uuid: z.string(),

  /**
   * Report's date
   */
  date: z.string(),

  /**
   * @JobDone.uuids
   */
  jobDoneUuids: z.array(z.string()),

  /**
   * @PlanForNextPeriod.uuids
   */
  planForNextPeriodUuids: z.array(z.string()),

  /**
   * @CurrentProblem.uuids
   */
  problemForCurrentPeriodUuids: z.array(z.string()),

  /**
   * @Comment.uuids
   */
  commentUuids: z.array(z.string()),

  /**
   * Return true if day is off and false if it is work day
   */
  isDayOff: z.boolean(),
}).strict();

export const DayReportsDTOSchema = z.array(DayReportDTOSchema);

/**
 * Day's report DTO model
 */
export type DayReportDTO = z.infer<typeof DayReportDTOSchema>;