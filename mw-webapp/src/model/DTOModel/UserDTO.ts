import {timestampType} from "fireschema";
import {z} from "zod";

export const USER_UUID_FIELD = "uuid";
export const USER_NAME_FIELD = "name";
export const USER_EMAIL_FIELD = "email";
export const USER_CREATED_AT_FIELD = "createdAt";

export const UserDTOSchema = z.object({

  /**
   * User's UUID
   */
  [USER_UUID_FIELD]: z.string(),

  /**
   * User's name
   */
  [USER_NAME_FIELD]: z.string(),

  /**
   * User's e-mail
   */
  [USER_EMAIL_FIELD]: z.string(),

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
  [USER_CREATED_AT_FIELD]: timestampType(),

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

  /**
   * Stringified user's tags
   */
  tagsStringified: z.array(z.string()),

  /**
   * User's image path
   */
  imageUrl: z.string(),

  /**
   * Is user mentor or not
   */
  isMentor: z.boolean(),

  /**
   * Way's uuids requested user become a mentor @Way.uuid
   */
  wayRequestUuids: z.array(z.string()),

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
