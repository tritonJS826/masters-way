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
export class UserNotSaturatedWay {

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
   * The own ways amount
   */
  public ownWays: number;

  /**
   * The favorite ways amount
   */
  public favoriteWays: number;

  /**
   * The mentoring ways amount
   */
  public mentoringWays: number;

  /**
   * Date when user was created
   */
  public createdAt: Date;

  /**
   * User's uuids for whom this user are favorite
   */
  // public favoriteForUserUuids: string[];

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
   * Amount of like for current user
   */
  public favoriteForUsers: number;

  constructor(userData: UserNotSaturatedWay) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.description = userData.description;
    this.ownWays = userData.ownWays;
    this.favoriteWays = userData.favoriteWays;
    this.mentoringWays = userData.mentoringWays;
    this.createdAt = userData.createdAt;
    this.favoriteUserUuids = userData.favoriteUserUuids;
    this.favoriteForUsers = userData.favoriteForUsers;
    this.tags = userData.tags;
    this.imageUrl = userData.imageUrl;
    this.isMentor = userData.isMentor;
  }

}
