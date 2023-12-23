
import {timestampType} from "fireschema";
import {z} from "zod";

export const DAY_REPORT_UUID_FIELD = "uuid";
export const DAY_REPORT_CREATED_AT_FIELD = "createdAt";

export const DayReportDTOSchema = z.object({

  /**
   * Day report's UUID
   */
  [DAY_REPORT_UUID_FIELD]: z.string(),

  /**
   * Report's created date
   */
  [DAY_REPORT_CREATED_AT_FIELD]: timestampType(),

  /**
   * Stringified jobsDone objects
   */
  jobsDoneStringified: z.array(z.string()),

  /**
   * Stringified plans objects
   */
  plansStringified: z.array(z.string()),

  /**
   * Stringified problems objects
   */
  problemsStringified: z.array(z.string()),

  /**
   * Stringified comments objects
   */
  commentsStringified: z.array(z.string()),

  /**
   * Return true if day is off and false if it is work day
   */
  isDayOff: z.boolean(),

  /**
   * Report's date (deprecated)
   */
  date: z.optional(timestampType()),

  /**
   * @JobDone.uuids (deprecated)
   */
  jobDoneUuids: z.optional(z.array(z.string())),

  /**
   * @PlanForNextPeriod.uuids (deprecated)
   */
  planForNextPeriodUuids: z.optional(z.array(z.string())),

  /**
   * @CurrentProblem.uuids (deprecated)
   */
  problemForCurrentPeriodUuids: z.optional(z.array(z.string())),

  /**
   * @Comment.uuids (deprecated)
   */
  commentUuids: z.optional(z.array(z.string())),

}).strict();

export const DayReportsDTOSchema = z.array(DayReportDTOSchema);

/**
 * Day's report DTO model
 */
export type DayReportDTO = z.infer<typeof DayReportDTOSchema>;
