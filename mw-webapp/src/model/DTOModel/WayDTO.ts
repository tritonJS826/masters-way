import {z} from "zod";

export const WayDTOSchema = z.object({

  /**
   * Way's UUID
   */
  uuid: z.string(),

  /**
   * Way's name
   */
  name: z.string(),

  /**
   * @DayReport.uuids
   */
  dayReportUuids: z.array(z.string()),

  /**
   * Owner's UUIDs @User.uuid
   */
  ownerUuid: z.string(),

  /**
   * @MonthReport.uuids
   */
  monthReportUuids: z.array(z.string()),

  /**
   *Goal's UUID @Goal.uuid
   */
  goalUuid: z.string(),

  /**
   * Mentor's UUIDs @User.uuid
   */
  currentMentorUuids: z.array(z.string()),

  /**
   * UUIDs of Users who sent request to become Way's mentor @User.uuid
   */
  mentorRequestUuids: z.array(z.string()),

  /**
   * Return true if way is completed and false if not completed
   */
  isCompleted: z.boolean(),

}).strict();

export const WaysDTOSchema = z.array(WayDTOSchema);

/**
 * Way DTO model
 */
export type WayDTO = z.infer<typeof WayDTOSchema>
