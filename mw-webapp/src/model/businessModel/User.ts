import {WayNotSaturatedUser} from "src/model/businessModelPreview/WayNotSaturatedUser";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Specific way collection data
 */
export type WayCollection = {

  /**
   * Date in ISO format
   */
  createdAt: Date;

  /**
   * Way collection name
   */
  name: string;

  /**
   * Way collection's owner
   */
  ownerUuid: string;

  /**
   * Date in ISO format
   */
  updatedAt: Date;

  /**
   * Way collection's UUID
   */
  uuid: string;

  /**
   * Ways preview that exist inside way collection
   */
  ways: WayPreview[];

  /**
   * Way collection type
   */
  type: string;
};

/**
 * User tag data
 */
export type UserTag = {

  /**
   * User tag uuid
   */
  uuid: string;

  /**
   * User tag name
   */
  name: string;
};

/**
 * Main short user information
 */
export class UserPlain {

  /**
   * User's UUID
   */
  public uuid: string;

  /**
   * Date when user was created
   */
  public createdAt: Date;

  /**
   * User's description
   */
  public description: string;

  /**
   * User's e-mail
   */
  public email: string;

  /**
   * User's image path
   */
  public imageUrl: string | null;

  /**
   * Is user mentor or not
   */
  public isMentor: boolean;

  /**
   * User's name
   */
  public name: string;

  constructor(user: UserPlain) {
    this.uuid = user.uuid;
    this.createdAt = user.createdAt;
    this.description = user.description;
    this.email = user.email;
    this.imageUrl = user.imageUrl;
    this.isMentor = user.isMentor;
    this.name = user.name;
  }

}

/**
 * User preview model
 */
export class User {

  /**
   * User's UUID
   */
  public uuid: string;

  /**
   * User's name
   */
  public name: string;

  /**
   * User's e-mail
   */
  public email: string;

  /**
   * User's description
   */
  public description: string;

  /**
   * Date when user was created
   */
  public createdAt: Date;

  /**
   * Custom way collections {@link WayCollection}
   */
  public wayCollections: WayCollection[];

  /**
   * User's uuids for whom this user are favorite
   */
  public favoriteForUserUuids: string[];

  /**
   * Uuids of users who you liked
   */
  public favoriteUsers: UserPlain[];

  /**
   * User's tags {@link UserTag}
   */
  public tags: UserTag[];

  /**
   * User's image path
   */
  public imageUrl: string;

  /**
   * Is user mentor or not
   */
  public isMentor: boolean;

  /**
   * Way's that requested user become a mentor {@link WayNotSaturatedUser}
   */
  public wayRequests: WayNotSaturatedUser[];

  constructor(userData: User) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.description = userData.description;
    this.createdAt = userData.createdAt;
    this.wayCollections = userData.wayCollections;
    this.favoriteForUserUuids = userData.favoriteForUserUuids;
    this.favoriteUsers = userData.favoriteUsers;
    this.tags = userData.tags;
    this.imageUrl = userData.imageUrl;
    this.isMentor = userData.isMentor;
    this.wayRequests = userData.wayRequests;
  }

}
