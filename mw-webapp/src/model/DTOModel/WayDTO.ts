import {timestampType} from "fireschema";
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
   *Goal's UUID @Goal.uuid
   */
  goalUuid: z.string(),

  /**
   * Mentor's UUIDs @User.uuid
   */
  mentorUuids: z.array(z.string()),

  /**
   * UUIDs of Users who sent request to become Way's mentor @User.uuid
   */
  mentorRequestUuids: z.array(z.string()),

  /**
   * Return true if way is completed and false if not completed
   */
  isCompleted: z.boolean(),

  /**
   * Last time whe way was updated in ms (timestamp)
   */
  lastUpdate: timestampType(),

  /**
   * Uuids od Users for whom this way are favorite
   */
  favoriteForUserUuids: z.array(z.string()),

  /**
   * Time when way was created in ms (timestamp)
   */
  createdAt: timestampType(),

  /**
   * Way's tags
   */
  wayTags: z.array(z.string()),

  /**
   * Tags that was used for jobDone
   */
  jobTags: z.array(z.string()),

}).strict();

export const WaysDTOSchema = z.array(WayDTOSchema);

/**
 * Way DTO model
 */
export type WayDTO = z.infer<typeof WayDTOSchema>;