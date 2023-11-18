
import {z} from "zod";

export const DayReportSchema = z.object({

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
   * Student comments
   */
  studentComments: z.array(z.string()),

  /**
   * New knowledge that the user has received
   */
  learnedForToday: z.array(z.string()),

  /**
   * @MentorComment.uuids
   */
  mentorCommentUuids: z.array(z.string()),

  /**
   * Return true if day is off and false if it is work day
   */
  isDayOff: z.boolean(),
}).strict();

export const DayReportsArraySchema = z.array(DayReportSchema);

/**
 * Day's report DTO model
 */
export type DayReportDTO = z.infer<typeof DayReportSchema>;