import {WayNotSaturatedUser} from "src/model/businessModelPreview/WayNotSaturatedUser";

/**
 * Specific way collection data
 */
export type WaysCollection = {

  /**
   * Collection uuid
   */
  id: string;

  /**
   * Collection name
   */
  name: string;

  /**
   * Ways uuid
   */
  wayUuids: string[];
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
 * User preview model
 */
export class UserPreview {

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
   * Own ways @Way.uuid
   */
  public ownWays: string[];

  /**
   * The favorite ways @Way.uuid
   */
  public favoriteWays: string[];

  /**
   * Ways for mentoring @Way.uuid
   */
  public mentoringWays: string[];

  /**
   * Date when user was created
   */
  public createdAt: Date;

  /**
   * Custom way collections {@link WaysCollection}
   */
  public customWayCollections: WaysCollection[];

  /**
   * User's uuids for whom this user are favorite
   */
  public favoriteForUserUuids: string[];

  /**
   * Uuids of users who you liked
   */
  public favoriteUserUuids: string[];

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

  constructor(userData: UserPreview) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.description = userData.description;
    this.ownWays = userData.ownWays;
    this.favoriteWays = userData.favoriteWays;
    this.mentoringWays = userData.mentoringWays;
    this.createdAt = userData.createdAt;
    this.customWayCollections = userData.customWayCollections;
    this.favoriteForUserUuids = userData.favoriteForUserUuids;
    this.favoriteUserUuids = userData.favoriteUserUuids;
    this.tags = userData.tags;
    this.imageUrl = userData.imageUrl;
    this.isMentor = userData.isMentor;
    this.wayRequests = userData.wayRequests;
  }

}
