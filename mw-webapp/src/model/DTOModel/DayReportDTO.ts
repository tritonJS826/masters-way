
import {timestampType} from "fireschema";
import {z} from "zod";

export const DAY_REPORT_UUID_FIELD = "uuid";
export const DAY_REPORT_DATE_FIELD = "date";
export const DAY_REPORT_CREATED_AT_FIELD = "createdAt";

export const DayReportDTOSchema = z.object({

  /**
   * Day report's UUID
   */
  [DAY_REPORT_UUID_FIELD]: z.string(),

  /**
   * Report's date (deprecated)
   */
  [DAY_REPORT_DATE_FIELD]: timestampType(),

  /**
   * @JobDone.uuids (deprecated)
   */
  jobDoneUuids: z.array(z.string()),

  /**
   * @PlanForNextPeriod.uuids (deprecated)
   */
  planForNextPeriodUuids: z.array(z.string()),

  /**
   * @CurrentProblem.uuids (deprecated)
   */
  problemForCurrentPeriodUuids: z.array(z.string()),

  /**
   * @Comment.uuids (deprecated)
   */
  commentUuids: z.array(z.string()),

  /**
   * Report's created date
   */
  [DAY_REPORT_CREATED_AT_FIELD]: z.optional(timestampType()),

  /**
   * Stringified jobsDone objects
   */
  jobsDoneStringified: z.optional(z.array(z.string())),

  /**
   * Stringified plans objects
   */
  plansStringified: z.optional(z.array(z.string())),

  /**
   * Stringified problems objects
   */
  problemsStringified: z.optional(z.array(z.string())),

  /**
   * Stringified comments objects
   */
  commentsStringified: z.optional(z.array(z.string())),

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
