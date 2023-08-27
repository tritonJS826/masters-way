/**
 * User
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
   * Array of @Way.uuid
   */
  public ownWays: string[];

  /**
   * Array of @Way.uuid
   */
  public favouriteWays: string[];

  /**
   * Array of @Way.uuid
   */
  public mentoringWay: string[];

  constructor(userData: User) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.ownWays = userData.ownWays;
    this.favouriteWays = userData.favouriteWays;
    this.mentoringWay = userData.mentoringWay;
  }

}
