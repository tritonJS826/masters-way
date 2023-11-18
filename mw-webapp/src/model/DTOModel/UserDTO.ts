import {z} from "zod";

export const UserDTOSchema = z.object({

  /**
   * User's UUID
   */
  uuid: z.string(),

  /**
   * User's name
   */
  name: z.string(),

  /**
   * User's e-mail
   */
  email: z.string(),

  /**
   * @Way.uuids
   */
  ownWayUuids: z.array(z.string()),

  /**
   * @Way.uuids
   */
  favoriteWayUuids: z.array(z.string()),

  /**
   * @Way.uuids
   */
  mentoringWayUuids: z.array(z.string()),

}).strict();

export const UserDTOArraySchema = z.array(UserDTOSchema);

/**
 * User DTO model
 */
export type UserDTO = z.infer<typeof UserDTOSchema>
