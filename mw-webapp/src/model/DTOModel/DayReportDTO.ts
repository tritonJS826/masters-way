
import {timestampType} from "fireschema";
import {z} from "zod";

export const DAY_REPORT_UUID_FIELD = "uuid";
export const DAY_REPORT_DATE_FIELD = "date";

export const DayReportDTOSchema = z.object({

  /**
   * Day report's UUID
   */
  [DAY_REPORT_UUID_FIELD]: z.string(),

  /**
   * Report's date
   */
  [DAY_REPORT_DATE_FIELD]: timestampType(),

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