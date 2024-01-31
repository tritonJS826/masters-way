import {timestampType} from "fireschema";
import {z} from "zod";

export const USER_UUID_FIELD = "uuid";

export const UserDTOSchema = z.object({

  /**
   * User's UUID
   */
  [USER_UUID_FIELD]: z.string(),

  /**
   * User's name
   */
  name: z.string(),

  /**
   * User's e-mail
   */
  email: z.string(),

  /**
   * User's description
   */
  description: z.string(),

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

  /**
   * Date when user was created
   */
  createdAt: timestampType(),

  /**
   * Stringified custom way collections
   */
  customWayCollectionsStringified: z.array(z.string()),

  /**
   * User's uuids for whom this user are favorite
   */
  favoriteForUserUuids: z.array(z.string()),

  /**
   * Uuids of users who you liked
   */
  favoriteUserUuids: z.array(z.string()),

}).strict();

export const UsersDTOSchema = z.array(UserDTOSchema);

/**
 * User DTO model
 */
export type UserDTO = z.infer<typeof UserDTOSchema>;

/**
 * Partial UserDTO schema
 */
export const UserPartialDTOSchema = UserDTOSchema.partial().required({[USER_UUID_FIELD]: true});

/**
 * UserPartialDTO model
 */
export type UserPartialDTO = z.infer<typeof UserPartialDTOSchema>;
