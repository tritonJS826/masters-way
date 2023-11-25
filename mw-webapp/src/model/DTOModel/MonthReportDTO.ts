import {z} from "zod";

export const MonthReportDTOSchema = z.object({

  /**
   * Month report's UUID
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
   * @MentorComment.uuids
   */
  mentorCommentUuids: z.array(z.string()),
}).strict();

/**
 * Month's report DTO model
 */
export type MonthReportDTO = z.infer<typeof MonthReportDTOSchema>
