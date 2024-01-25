import {timestampType} from "fireschema";
import {z} from "zod";

export const WAY_UUID_FIELD = "uuid";
export const WAY_NAME_FIELD = "name";
export const WAY_OWNER_UUID_FIELD = "ownerUuid";
export const WAY_MENTOR_UUIDS_FIELD = "mentorUuids";
export const WAY_CREATED_AT_FIELD = "createdAt";

export const WayPartialDTOSchema = z.object({

  /**
   * Way's UUID
   */
  [WAY_UUID_FIELD]: z.string(),

  /**
   * Way's name
   */
  [WAY_NAME_FIELD]: z.string().optional(),

  /**
   * @DayReport.uuids
   */
  dayReportUuids: z.array(z.string()).optional(),

  /**
   * Owner's UUIDs @User.uuid
   */
  [WAY_OWNER_UUID_FIELD]: z.string().optional(),

  /**
   *Goal's UUID @Goal.uuid
   */
  goalUuid: z.string().optional(),

  /**
   * Mentor's UUIDs @User.uuid
   */
  [WAY_MENTOR_UUIDS_FIELD]: z.array(z.string()).optional(),

  /**
   * Former mentor's UUIDs @User.uuid
   */
  formerMentorUuids: z.array(z.string()).optional(),

  /**
   * UUIDs of Users who sent request to become Way's mentor @User.uuid
   */
  mentorRequestUuids: z.array(z.string()).optional(),

  /**
   * Return true if way is completed and false if not completed
   */
  isCompleted: z.boolean().optional(),

  /**
   * Last time whe way was updated in ms (timestamp)
   */
  lastUpdate: timestampType().optional(),

  /**
   * Uuids od Users for whom this way are favorite
   */
  favoriteForUserUuids: z.array(z.string()).optional(),

  /**
   * Time when way was created in ms (timestamp)
   */
  [WAY_CREATED_AT_FIELD]: timestampType().optional(),

  /**
   * Way's tags
   */
  wayTags: z.array(z.string()).optional(),

  /**
   * Tags that was used for jobDone
   */
  jobTags: z.array(z.string()).optional(),

}).strict();

export const WaysPartialDTOSchema = z.array(WayPartialDTOSchema);

/**
 * Way DTO model
 */
export type WayPartialDTO = z.infer<typeof WayPartialDTOSchema>;

